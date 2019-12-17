import React, { Component } from 'react';
import { Row, Col, List, Card, Radio, Button, message, InputNumber, Rate } from 'antd';
import './Recipe.css';
import DztImageGalleryComponent from 'reactjs-image-gallery';
import { apiURL, defaultImageURL } from './consts';

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

  constructor(props) {
    super(props);
    this.state = { recipe: null, value: 1 };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    fetch(`${apiURL}/recipes/${params.id}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ recipe: data, value: data.diet_type.id })
    })
    .catch(console.log)
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
    this.state.recipe ?
      <Row>
        <Col span={12}>
        <span className="column-header">{this.state.recipe.title}</span>
            <div className="recipe-column">
              <Card cover={<img alt="example" src={this.state.recipe.thumbnailUrl.length > 1 ? this.state.recipe.thumbnailUrl : defaultImageURL} />}>
                <div className="button-container"> 
                  <Button type="primary" size='large' onClick={this.handleButtonClick}>Zapisz w książce kucharskiej</Button>
                </div>
                <div className="recipe-description">
                  <div className="column-header-options">Przepis:</div>
                  {this.state.recipe.recipe_steps.map(step => <p key={step.id}>{step.description}</p>)}
                  <div className="column-header-options">Wersja potrawy</div>
                    <Radio.Group options={options} onChange={this.onChange} value={this.state.value} />
                  </div>
              </Card>
          </div>
        </Col>
        <Col span={12}>
          <div className="recipe-ingredients">
            <div className="ingredients-title">Trudność przygotowania</div>
            <div className="rate"><Rate allowHalf disabled defaultValue={this.state.recipe.difficulty} /></div>
            <div>Liczba porcji:</div>
            <div className="portion-input"><InputNumber min={0} max={20} step={1} defaultValue={1}/></div>
             <div className="ingredients-title"><span>Składniki:</span></div>
             <div className="ingredients-list">
              <List
                itemLayout="horizontal"
                dataSource={this.state.recipe.ingredients}
                size="large"
                renderItem={item => (
                  <List.Item>
                      <List.Item.Meta
                        title={item.name} />
                      <div>{item.quantity} {item.unit}</div>
                  </List.Item>
                )}
              />
              </div>
            </div>
          <span className="column-header">Galeria</span>
          <div className="gallery">
            <DztImageGalleryComponent imageBackgroundColor="red"
              images={this.state.recipe.gallery} />
          </div>
        </Col>
      </Row> : null
    );
  };
}

export default Recipe;
