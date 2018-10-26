![](https://raw.githubusercontent.com/oop/noux/master/demo/public/logo.png)

Noux
-
#### Simple, Easy and Fast State Management for React.JS
##### You don't need to implement Reducers, Actions, and other complex concepts to manage the component states.

### Install
    npm i noux --save

### About
Noux is using Pub/Sub pattern with [PubSubJS](https://github.com/mroderick/PubSubJS) library.
Please check the [demo page](https://codesandbox.io/s/l329pr2467) to understand it.
This is an alpha version. It still needs some improvements.

### Examples
##### Import and declare Noux in your main component.
```javascript
import noux from 'noux';

class Main extends Component {
    constructor() {
        super();
        this.noux = new noux({
            log: false // Optional [default: true]
        });
    }
}
```

### Initialization in a sub component.
##### You have to initialization Noux in every new component.
```javascript
class SubComponent extends Component {
    constructor(props) {
        super();
        this.noux = props.noux;
        this.noux.init({
            name: 'SubComponent',
            self: this
        });
    }
}
```

### Passing Noux as props
##### You have to pass Noux into new components as props.
```javascript
<SubComponent noux={this.noux}/>
```

### Usage
### init
##### To initialize Noux you have to call "noux.init" function. You can use this in any component.
```javascript
this.noux.init({
    name: '<current_component_name>',
    self: this
});
```

### state
##### Get the value of a specific state from the component.
```javascript
this.noux.state('<component_name>', '<state_name>')
```

### setState
##### Set the value of a specific state from the component.
```javascript
this.noux.setState({
    target: "<component_name>",
    state: "<state_name>",
    value: "<state_value>"
});
```

### Contributing
* Fork the project.
* Make your feature addition or bug fix.
* Send me a pull request.

[Demo](https://codesandbox.io/s/l329pr2467)
---
[![](https://raw.githubusercontent.com/oop/noux/master/img/demo.png)](https://codesandbox.io/s/l329pr2467)
###### Developed by [@rufatmammadli](https://twitter.com/rufatmammadli)