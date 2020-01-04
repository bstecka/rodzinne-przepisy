import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withRouter } from "react-router-dom";
import RecipeList from './RecipeList.js'
import './UserPage.css';
import { apiURL } from './consts';

class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = { recipes: [] };
  }

  componentDidMount() {
    fetch(`${apiURL}/recipes`)
    .then(res => res.json())
    .then((data) => {
      const filteredData = data.filter(item => item.saved.search('true') !== -1);
      this.setState({ recipes: filteredData })
    })
    .catch(console.log)
  }

  handleClick = (path) => {
    this.props.history.push(path);
  }
  
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <span className="column-header">Moje przepisy</span>
            <div className="recipe-column">
              {this.state.recipes.length > 2
              ? <RecipeList recipes={this.state.recipes} handleClick={this.handleClick} columns={3}/>
              : <RecipeList recipes={this.state.recipes} handleClick={this.handleClick} columns={this.state.recipes.length}/>}
            </div>
          </Col>
          <Col span={8}>
          </Col>
        </Row>
      </div>
    );
  };
}

export default withRouter(UserPage);