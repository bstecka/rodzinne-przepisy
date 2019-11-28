import React, { Component } from 'react';
import { Row, Col, List, Card, Tag } from 'antd';
import { withRouter } from "react-router-dom";
import './UserPage.css';

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
];

class UserPage extends Component {

  handleClick = () => {
      this.props.history.push('/przepis');
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={16}>
            <span className="column-header">Moje przepisy</span>
            <div className="recipe-column">
            <List
              grid={{ gutter: 12, column: 2 }}
              dataSource={data}
              renderItem={item => (
                <List.Item onClick={this.handleClick}>
                  <Card hoverable cover={<img alt="example" src={item.url} />}>{item.title}
                  <br/>
                  <Tag color="red">obiad</Tag>
                  <Tag color="purple">zdrowy</Tag>
                  <Tag color="yellow">wegetariańskie</Tag>
                  <Tag color="green">warzywa</Tag>
                  </Card>
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

export default withRouter(UserPage);