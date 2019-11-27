import React, { Component } from 'react';
import { Row, Col, List, Card } from 'antd';
import { withRouter } from "react-router-dom";
import './UserPage.css';

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

  handleClick = () => {
      this.props.history.push('/przepis');
  }

  render() {
    return (
      <div>
      <Row>
        <Col span={16}>
        <span className="column-header">Szukaj przepisów</span>
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
        </Col>
      </Row>
    </div>
    );
  };
}

export default withRouter(SearchPage);