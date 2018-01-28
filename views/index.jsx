// React
import React from 'react';
import { render } from 'react-dom';
// CSS
import styles from './scss/application.scss';
// Import partials
import ArticleIndex from './articles/ArticleIndex.jsx';


class Index extends React.Component {

    constructor(props) {
        super(props);
        this.itemDelete = this.itemDelete.bind(this);
        this.state = {
            articles: ['article 1', 'article 2', 'article 3'],
        };
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ articles: res.articles }))
            .catch(err => console.log(err));
    }

    async callApi() {
        const response = await fetch('/articles/index');
        const body = await response.json();
        return body;
    };

    itemDelete(index) {
        let updatedArticles = this.state.articles.filter((article, key) => {
            return index !== key;
        });
        this.setState({
            articles: updatedArticles
        });
    }

    render() {

        // Iterate articles spawning component with passed unique values + delete function
        let articles = this.state.articles.map((article, key) => {
            return <ArticleIndex article={article} key={key} itemDelete={this.itemDelete}/>
        });

        return (
            <div id="articles-index">
                <ul>
                    {articles}
                </ul>
            </div>
        )
    }
}

render(<Index />, document.getElementById('root'));