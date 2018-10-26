import PubSub from 'pubsub-js';

const noux = function (props) {
    this.logs = props.log || true;
    this.cache = {};
    this.errorList = {
        prefix: 'Noux.js [ERROR]',
        internal_error: 'Internal error.',
        invalid_state: 'Invalid state.',
        stateless_component: 'Stateless component.',
        invalid_component: 'Invalid component.'
    }
};

noux.prototype = {};

function componentChecker(self, n, d) {
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
            return {success: false, msg: `${self.errorList.prefix} ${self.errorList.invalid_component}\n    obj: ${d}`};
        }
    } catch (ex) {
        return {success: false, msg: `${self.errorList.prefix} ${self.errorList.internal_error}\n   obj: ${d}`};
    }
}

noux.prototype.setState = function (props) {
    const isValid = componentChecker(this, props.target, props);
    if (!isValid.success) {
        if (this.logs) console.error(isValid.msg);
        return null;
    }
    PubSub.publish("_u", {target: props.target, variable: props.state, value: props.value});
};

noux.prototype.state = function (n, p) {
    const isValid = componentChecker(this, n, {n, p});
    if (!isValid.success) {
        if (this.logs) console.error(isValid.msg);
        return null;
    }
    if (typeof this.cache[n].state[p] !== 'undefined') {
        return this.cache[n].state[p];
    } else {
        if (this.logs) console.error(`${this.errorList.prefix} ${this.errorList.invalid_state}`);
        return null;
    }
};

noux.prototype.init = function (props) {
    this.cache[props.name] = props.self;
    PubSub.subscribe('_u', (v, d) => {
        this.cache[d.target].setState({[d.variable]: d.value});
    });
};

export default noux;