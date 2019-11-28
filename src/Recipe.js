import React, { Component } from 'react';
import { Row, Col, List, Card, Input, Radio, Button, message } from 'antd';
import './Recipe.css';
import DztImageGalleryComponent from 'reactjs-image-gallery';

const ingredients = [
  {
    name: 'Olej',
    amount: ' 1 i 1/4 szklanki'
  },
  {
    name: 'Jajka',
    amount: '4 sztuki'
  },
  {
    name: 'Mąka',
    amount: '2 szklanki'
  },
  {
    name: 'Drobno starta marchewka',
    amount: '2 szklanki'
  },
  {
    name: 'Cukier',
    amount: '1,5 szklanki'
  },
  {
    name: 'Proszek do pieczenia',
    amount: '1 łyzeczka'
  },
  {
    name: 'Cynamon',
    amount: '1 łyzeczka'
  },
  {
    name: 'Soda oczyszczona',
    amount: '1 łyzeczka'
  },
  {
    name: 'Sól',
    amount: 'szczypta'
  },
];

const photos = [
  {
    thumbUrl: 'https://static.mojewypieki.com/upload/images/przepisy/Proste%20ciasto%20marchewkowe/Proste_ciasto_marchewkowe_2.jpg',
    original:      'https://static.mojewypieki.com/upload/images/przepisy/Proste%20ciasto%20marchewkowe/Proste_ciasto_marchewkowe_2.jpg'
  },
  {
    thumbUrl: 'https://static.mojewypieki.com/upload/images/przepisy/Proste%20ciasto%20marchewkowe/Proste_ciasto_marchewkowe_1.jpg',
    url:      'https://static.mojewypieki.com/upload/images/przepisy/Proste%20ciasto%20marchewkowe/Proste_ciasto_marchewkowe_2.jpg'
  },
  {
    thumbUrl: 'https://static.mojewypieki.com/upload/images/przepisy/Proste%20ciasto%20marchewkowe/Proste_ciasto_marchewkowe_3.jpg',
    url:      'https://static.mojewypieki.com/upload/images/przepisy/Proste%20ciasto%20marchewkowe/Proste_ciasto_marchewkowe_2.jpg'
  },
  {
    thumbUrl: 'https://static.mojewypieki.com/upload/images/przepisy/Ciasto%20marchewkowe%2C%20najlepsze/Ciasto_marchewkowe%2C_najlepsze_1.jpg',
    url:      'https://static.mojewypieki.com/upload/images/przepisy/Ciasto%20marchewkowe%2C%20najlepsze/Ciasto_marchewkowe%2C_najlepsze_1.jpg'
  },
  {
    thumbUrl: 'https://static.mojewypieki.com/upload/images/przepisy/Ciasto%20marchewkowe%2C%20najlepsze/Ciasto_marchewkowe%2C_najlepsze_3.jpg',
    url:      'https://static.mojewypieki.com/upload/images/przepisy/Ciasto%20marchewkowe%2C%20najlepsze/Ciasto_marchewkowe%2C_najlepsze_3.jpg'
  },
  {
    thumbUrl: 'https://static.mojewypieki.com/upload/images/przepisy/Ciasto%20marchewkowe%2C%20najlepsze/Ciasto_marchewkowe%2C_najlepsze_2.jpg',
    url:      'https://static.mojewypieki.com/upload/images/przepisy/Ciasto%20marchewkowe%2C%20najlepsze/Ciasto_marchewkowe%2C_najlepsze_2.jpg'
  },
];

const options = [
  { label: 'Standardowa', value: 1},
  { label: 'Wegetariańska', value: 2 },
  { label: 'Wegańska', value: 3 },
];

class Recipe extends Component {

  state = {
    value: 1,
  };

  handleClick = () => {
      this.props.history.push('/przepis');
  }

  handleSalesClick = () => {
    this.props.history.push('/promocja');
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  handleButtonClick = () => {
    message.success('Zapisano przepis w książce kucharskiej.');
  }

  render() {
    return (
      <div>
      <Row>
        <Col span={12}>
        <span className="column-header">Ciasto Marchewkowe</span>
            <div className="recipe-column">
            <Card cover={<img alt="example" src={'https://www.kwestiasmaku.com/sites/kwestiasmaku.com/files/ciasto_marchewkowe_01.jpg'} />}>
            <div className="button-container"> 
              <Button type="primary" size='large' onClick={this.handleButtonClick}>Zapisz w książce kucharskiej</Button>
            </div>
            <div>Liczba porcji:</div>
            <div className="portion-input"><Input size="small" placeholder="liczba porcji" value={1} /></div>
            <span>Składniki:</span>
            <div className="ingredients-list">
              <List
                itemLayout="horizontal"
                dataSource={ingredients}
                size="large"
                renderItem={item => (
                  <List.Item>
                      <List.Item.Meta
                        title={item.name} />
                      <div>{item.amount}</div>
                  </List.Item>
                )}
            />
           </div>
            </Card>
            <div className="column-header-options">Wersja potrawy</div>
            <Radio.Group options={options} onChange={this.onChange} value={this.state.value} />
          </div>
        </Col>
        <Col span={12}>
        <span className="column-header">Galeria</span>
        <div className="gallery">
          <DztImageGalleryComponent imageBackgroundColor="red"
            images={photos} />
        </div>
        </Col>
      </Row>
    </div>
    );
  };
}

export default Recipe;
