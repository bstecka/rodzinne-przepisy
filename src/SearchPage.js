import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withRouter } from "react-router-dom";
import './HomePage.css';
import { apiURL } from './consts';
import RecipeList from './RecipeList.js'

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = { recipes: [], query: '' };
  }

  fetchAndFilterRecipes(query) {
    fetch(`${apiURL}/recipes`)
    .then(res => res.json())
    .then((data) => {
      const filteredRecipes = data.filter(function(item){
        const nameContains = item.title ? item.title.toLowerCase().search(query.toLowerCase()) !== -1 : false;
        const tagContains = item.tags ? item.tags.some(item => item.toLowerCase().search(query.toLowerCase()) !== -1) : false;
        return nameContains || tagContains;
      });
      this.setState({ query: query, recipes: filteredRecipes })
    })
    .catch(console.log)
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.fetchAndFilterRecipes(params.query);
  }

  componentDidUpdate() {
    const { match: { params } } = this.props;
    if (this.state.query !== params.query)
      this.fetchAndFilterRecipes(params.query);
  }

  handleClick = (path) => {
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
      <Row>
        <Col span={24}>
        <span className="column-header">Szukaj przepisów</span>
            <div className="recipe-column">
              {this.state.recipes.length > 2
              ? <RecipeList recipes={this.state.recipes} handleClick={this.handleClick} columns={3}/>
              : <RecipeList recipes={this.state.recipes} handleClick={this.handleClick} columns={this.state.recipes.length}/>}
            </div>
        </Col>
      </Row>
    </div>
    );
  };
}

export default withRouter(SearchPage);