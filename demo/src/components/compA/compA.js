import React, {Component} from 'react';

class compA extends Component {
    constructor(props) {
        super();
        this.noux = props.noux;

        this.state = {
            text: "I'm component A.",
            message: "Message #1"
        };

        this.noux.init({
            name: 'compA',
            self: this
        });
    }

    changeVal() {
        this.noux.setState({
            target: "main",
            state: "welcomeTxt",
            value: "I'm component A!"
        });
    }

    render() {
        return (
            <div className={'Component-data'}>
                {this.state.text}
                <button className={'Component-button'} onClick={() => this.changeVal()}>change welcome text from component A</button>
            </div>
        );
    }
}

export default compA;
