import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withRouter } from "react-router-dom";
import './HomePage.css';
import { apiURL } from './consts';
import RecipeList from './RecipeList.js'

const data = [
  {
    title: 'Wykwintne śniadanie',
    url: 'https://www.holidify.com/blog/wp-content/uploads/2016/01/DalBati.jpg'
  },
  {
    title: 'Makaron wegański',
    url: 'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg'
  },
  {
    title: 'Ramen z paluszkami krabowymi',
    url: 'https://mothership.sg/wp-content/uploads/2016/11/3.jpg'
  },
  {
    title: 'Makaron włoski',
    url: 'https://img.etimg.com/thumb/msid-72104865,width-640,resizemode-4,imgsize-222155/italian-menu-for-the-entire-week.jpg'
  },
];

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
        const nameContains = item.title ? item.title.toLowerCase().search(query) !== -1 : false;
        const tagContains = item.tags ? item.tags.some(item => item.name.search(query) !== -1) : false;
        const ingredientListContains = item.ingredients ? item.ingredients.some(item => item.name.search(query) !== -1) : false;
        return nameContains || tagContains || ingredientListContains;
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