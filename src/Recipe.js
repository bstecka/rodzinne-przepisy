import React from 'react';
import { Row, Col, List, Card, Input, Checkbox } from 'antd';
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

var photos = [
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

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

function Recipe() {
  return (
    <div>
    <Row>
      <Col span={12}>
      <span className="column-header">Ciasto Marchewkowe</span>
          <div className="recipe-column">
          <Card cover={<img alt="example" src={'https://www.kwestiasmaku.com/sites/kwestiasmaku.com/files/ciasto_marchewkowe_01.jpg'} />}>
            Liczba porcji: <Input className="postion-input" size="small" placeholder="liczba porcji" value={1} /> 
            Składniki:
          <List className="ingredients-list"
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
          </Card>

        </div>
      </Col>
      <Col span={12}>
      <span className="column-header">Galeria</span> 
      <br />
      <div className="galerry">
        <DztImageGalleryComponent imageBackgroundColor="red"
          images={photos} />
      </div>
      <br />
      <span className="column-header">Wersja potrawy</span> 
      <br />
      <Checkbox className="diet-kind-checkbox" onChange={onChange}>Wegetariańska</Checkbox> 
      <br />
      <Checkbox className="diet-kind-checkbox" onChange={onChange}>Wegańska</Checkbox>
      </Col>
    </Row>
  </div>
  );
}

export default Recipe;
