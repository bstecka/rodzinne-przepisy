import React from 'react';
import { Row, Col, List, Card } from 'antd';
import './UserPage.css';

const data = [
  {
    title: 'Title 1',
    url: 'http://www.gustocatering.com.pl/images/grafika/start_gusto_krakow_finger_food.jpg'
  },
  {
    title: 'Title 2',
    url: 'https://img.etimg.com/thumb/msid-72104865,width-640,resizemode-4,imgsize-222155/italian-menu-for-the-entire-week.jpg'
  },
  {
    title: 'Title 3',
    url: 'https://www.runners-world.pl/media/lib/1720/fast_food_burger_indyk-87e27092bc721dfda6881b781ab8b091.jpg'
  },
  {
    title: 'Title 4',
    url: 'https://bi.im-g.pl/im/55/a6/fe/z16688725IH,Pikantne-burgery-drobiowe.jpg'
  },
];

function UserPage() {
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
              <List.Item>
                <Card cover={<img alt="example" src={item.url} />}>{item.title}</Card>
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
}

export default UserPage;
