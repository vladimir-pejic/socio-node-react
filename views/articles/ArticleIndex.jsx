import React from 'react';

export default class ArticleIndex extends React.Component {

    // Custom functions
    handleDelete() {
        console.log(this);
        this.props.itemDelete(this.props.index);
    }

    // Render the component
    render(){
        console.log(this.props.article)

        return(
            <li key={this.props.index}>
                <div className="articles-item">
                    <span className="item-title">{this.props.article.title}</span>
                    <span className="item-body">{this.props.article.body}</span>
                    <span className="item-delete" onClick={this.handleDelete.bind(this)}> X </span>
                </div>
            </li>
        )
    }

}