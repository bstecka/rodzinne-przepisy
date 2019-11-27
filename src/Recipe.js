import React from 'react';
import { Row, Col, List, Card  } from 'antd';
import './Recipe.css';

function Recipe() {
  return (
    <div>
    <Row>
      <Col span={16}>
      <span className="column-header">Makaron wegański</span>
          <div className="recipe-column">
          <Card cover={<img alt="example" src={'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg'} />}>Składniki:</Card>
          </div>
      </Col>
      <Col span={8}>
      </Col>
    </Row>
  </div>
  );
}

export default Recipe;
