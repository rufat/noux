import React, {Component} from 'react';

class compB extends Component {
    constructor(props) {
        super();
        this.noux = props.noux;

        this.state = {
            text: "I'm component B.",
            message: "Message #2"
        };

        this.noux.init({
            name: 'compB',
            self: this
        });
    }

    changeVal() {
        this.noux.setState({
            target: "main",
            state: "welcomeTxt",
            value: "I'm component B!"
        });
    }

    render() {
        return (
            <div className={'Component-data'}>
                {this.state.text}
                <button className={'Component-button'} onClick={() => this.changeVal()}>change welcome text from component B</button>
            </div>
        );
    }
}

export default compB;
