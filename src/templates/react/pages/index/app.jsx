import React, {Component} from 'react';
import './${name}.scss';
export default class App extends Component{
    render(){
        return (
            <div>Hello ${name}</div>
        )
    }
}