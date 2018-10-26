import PubSub from 'pubsub-js';

class main {
    constructor(props) {
        this.logs = typeof props === 'object' && typeof props.log === 'boolean' ? props.log : true;
        this.cache = {};
        this.errorList = {
            prefix: 'Noux.js [ERROR]',
            internal_error: 'Internal error.',
            invalid_state: 'Invalid state.',
            stateless_component: 'Stateless component.',
            invalid_component: 'Invalid component.'
        }
    }

    init(props) {
        try {
            this.cache[props.name] = props.self;
            PubSub.subscribe('_u', (v, d) => {
                this.cache[d.target].setState({[d.variable]: d.value});
            });
        } catch (ex) {
            if (this.logs) console.error(`${self.errorList.prefix} ${self.errorList.internal_error}\n   ex: ${ex.toString()}`);
            return null;
        }
    }

    setState(props) {
        try {
            const isValid = this.componentChecker(this, props.target, props);
            if (!isValid.success) {
                if (this.logs) console.error(isValid.msg);
                return null;
            }
            PubSub.publish("_u", {target: props.target, variable: props.state, value: props.value});
        } catch (ex) {
            if (this.logs) console.error(`${self.errorList.prefix} ${self.errorList.internal_error}\n   obj: ${props}   ex: ${ex.toString()}`);
            return null;
        }
    };

    state(props) {
        try {
            const isValid = this.componentChecker(this, props.target, {n: props.target, p: props.state});
            if (!isValid.success) {
                if (this.logs) console.error(isValid.msg);
                return null;
            }
            if (typeof this.cache[props.target].state[props.state] !== 'undefined') {
                return this.cache[props.target].state[props.state];
            } else {
                if (this.logs) console.error(`${this.errorList.prefix} ${this.errorList.invalid_state}`);
                return null;
            }
        } catch (ex) {
            if (this.logs) console.error(`${self.errorList.prefix} ${self.errorList.internal_error}\n   obj: ${props}   ex: ${ex.toString()}`);
            return null;
        }
    };

    componentChecker(self, n, d) {
        try {
            d = JSON.stringify(d);
            if (typeof self.cache[n] !== 'undefined') {
                if (typeof self.cache[n].state !== 'undefined') {
                    return {success: true, err: null}
                } else {
                    return {
                        success: false,
                        err: `${self.errorList.prefix} ${self.errorList.stateless_component}\n  obj: ${d}`
                    }
                }
            } else {
                return {
                    success: false,
                    msg: `${self.errorList.prefix} ${self.errorList.invalid_component}\n    obj: ${d}`
                };
            }
        } catch (ex) {
            return {
                success: false,
                msg: `${self.errorList.prefix} ${self.errorList.internal_error}\n   obj: ${n} | ${d}   ex: ${ex.toString()}`
            };
        }
    }
}

export default main;