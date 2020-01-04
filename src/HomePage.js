import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withRouter } from "react-router-dom";
import './HomePage.css';
import { apiURL } from './consts';
import RecipeList from './RecipeList.js'
import SaleList from './SaleList.js'

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = { recipes: [], sales: [] };
  }

  componentDidMount() {
    fetch(`${apiURL}/recipes`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ recipes: data })
    })
    .catch(console.log)

    fetch(`${apiURL}/sales`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ sales: data })
    })
    .catch(console.log)
  }

  handleClick = (path) => {
      this.props.history.push(path);
  }

  handleSalesClick = (path) => {
    this.props.history.push(path);
  }

  render() {
    console.log(this.props);
    return (
      <div>
      <Row>
        <Col span={16}>
        <span className="column-header">Przepisy</span>
            <div className="recipe-column">
            <RecipeList recipes={this.state.recipes} handleClick={this.handleClick} columns={2}/>
            </div>
        </Col>
        <Col span={6}>
          <span className="column-header">Promocje</span>
          <div className="sales-column">
            <SaleList sales={this.state.sales} handleSalesClick={this.handleSalesClick}/>
          </div>
        </Col>
      </Row>
    </div>
    );
  };
}

export default withRouter(HomePage);