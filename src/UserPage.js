import React, { Component } from 'react';
import { Row, Col, List, Card, Tag } from 'antd';
import { withRouter } from "react-router-dom";
import RecipeList from './RecipeList.js'
import './UserPage.css';
import { apiURL } from './consts';

const data = [
  {
    title: 'Zawijaski z łososiem',
    url: 'http://www.gustocatering.com.pl/images/grafika/start_gusto_krakow_finger_food.jpg'
  },
  {
    title: 'Makaron wegański',
    url: 'https://img.etimg.com/thumb/msid-72104865,width-640,resizemode-4,imgsize-222155/italian-menu-for-the-entire-week.jpg'
  },
  {
    title: 'Zdrowy burger',
    url: 'https://www.runners-world.pl/media/lib/1720/fast_food_burger_indyk-87e27092bc721dfda6881b781ab8b091.jpg'
  },
  {
    title: 'Pikantne burgery drobiowe',
    url: 'https://bi.im-g.pl/im/55/a6/fe/z16688725IH,Pikantne-burgery-drobiowe.jpg'
  },
  {
    title: 'Jakitori Kabab',
    url: 'https://img.etimg.com/thumb/width-640,height-480,imgsize-925331,resizemode-1,msid-72252118/japanese-fast-food-yakitori-kebabs-get-space-thumbs-up-astronaut-can-now-take-cans-to-iss.jpg'
  },
  {
    title: 'Awokado Toast',
    url: 'https://i.redd.it/6btqvzw3h2311.jpg'
  },
];

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