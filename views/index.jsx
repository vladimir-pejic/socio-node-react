
import React from 'react';
import { render } from 'react-dom';


import styles from './scss/application.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: ['article 1', 'article 2', 'article 3'],
            age: 30,
        };
    } // Initial STATEs for ES6, instead of getInitialState()
    render(){
        var ager = setTimeout(function(){
            this.setState({
                age: 35
            });
        }.bind(this), 5000); // Set state to 35 after 5 seconds
        return (
            <div>
                <p><strong>Name: </strong>{this.props.size.name}</p>
                <p><strong>Length: </strong>{this.props.size.length}</p>
                <p><strong>Girth: </strong>{this.props.size.girth}</p>
                <p>{this.props.bog}</p>
                <p>{this.state.age}</p>
                <div id="articles-list">
                    <ul>
                        <li>{this.state.articles[0]}</li>
                        <li>{this.state.articles[1]}</li>
                        <li>{this.state.articles[2]}</li>
                    </ul>
                </div>
            </div>
        );
    } // Render the component
}

let size = {
    name: 'Vladimir',
    length: '20cm',
    girth: '12,5cm',
}; // Pass to PROPS

render(<Home bog="Vladjimir je bog." size={size} />, document.getElementById('root'));