import React, { Component } from 'react';
import { Row, Col, List, Card } from 'antd';
import { withRouter } from "react-router-dom";
import './UserPage.css';

const data = [
  {
    title: 'Title 1',
    url: 'https://www.runners-world.pl/media/lib/1720/fast_food_burger_indyk-87e27092bc721dfda6881b781ab8b091.jpg'
  },
  {
    title: 'Title 2',
    url: 'http://www.tandooriovenlogan.com/images/gallery/img-03.jpg'
  },
  {
    title: 'Title 3',
    url: 'http://www.gustocatering.com.pl/images/grafika/start_gusto_krakow_finger_food.jpg'
  },
  {
    title: 'Title 4',
    url: 'https://irp-cdn.multiscreensite.com/4b0d7b92/dms3rep/multi/mobile/Yorkshire+Pudding+Wrap+Landscape+edit.jpg'
  },
];

class HomePage extends Component {

  handleClick = () => {
      this.props.history.push('/przepis');
  }

  render() {
    return (
      <div>
      <Row>
        <Col span={16}>
        <span className="column-header">Przepisy</span>
            <div className="recipe-column">
            <List
              grid={{ gutter: 12, column: 2 }}
              dataSource={data}
              renderItem={item => (
                <List.Item onClick={this.handleClick}>
                  <Card hoverable cover={<img alt="example" src={item.url} />}>{item.title}</Card>
                </List.Item>
              )}
            />
            </div>
        </Col>
        <Col span={8}>
          <span className="column-header">Promocje</span>
        </Col>
      </Row>
    </div>
    );
  };
}

export default withRouter(HomePage);