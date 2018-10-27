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
            const isValid = this.componentChecker(this, props.target, props, 'setState');
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
            const isValid = this.componentChecker(this, props.target, props, 'state');
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

    all() {
        try {
            const t = this.cache;
            let o = {};
            for (let k in t) {
                let s = t[k];
                if (typeof s === 'object' && typeof s.state === 'object') o[k] = s.state;
            }
            return o;
        } catch (ex) {
            if (this.logs) console.error(`${self.errorList.prefix} ${self.errorList.internal_error}\n   ex: ${ex.toString()}`);
            return null;
        }
    }

    revoke(props) {
        try {
            const isValid = this.componentChecker(this, props.target, props, 'revoke');
            if (!isValid.success) {
                if (this.logs) console.error(isValid.msg);
                return null;
            }
            const t = this.cache;
            if (typeof t[props.state] === 'object') delete t[props.target];
            return null;
        } catch (ex) {
            if (this.logs) console.error(`${self.errorList.prefix} ${self.errorList.internal_error}\n   ex: ${ex.toString()}`);
            return null;
        }
    }

    componentChecker(s, n, p, t) {
        try {
            p = JSON.stringify(p);
            if (typeof s.cache[n] !== 'undefined') {
                if (typeof s.cache[n].state !== 'undefined') {
                    return {success: true, err: null}
                } else {
                    return {
                        success: false,
                        err: `${s.errorList.prefix} ${s.errorList.stateless_component}\n   obj: ${p} | ${t}`
                    }
                }
            } else {
                return {
                    success: false,
                    msg: `${s.errorList.prefix} ${s.errorList.invalid_component}\n   obj: ${p} | ${t}`
                };
            }
        } catch (ex) {
            return {
                success: false,
                msg: `${s.errorList.prefix} ${s.errorList.internal_error}\n   obj: ${p} | ${t}  ex: ${ex.toString()}`
            };
        }
    }
}

export default main;