import React, { Component } from 'react';
import { Row, Col, List, Card, Input, Radio, Button, message, Descriptions } from 'antd';
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
          </div>
        </Col>
        <Col span={12}>
        <div className="recipe-description">
        <Descriptions title="Przepis:">

        <Descriptions.Item label="">

        Wszystkie składniki powinny być w temperaturze pokojowej.
        <br/>
        <br/>
        W jednym naczyniu wymieszać składniki suche: przesianą mąkę pszenną, cukier, sól, proszek, sodę, przyprawy. W drugim naczyniu roztrzepać jajka z olejem (np. rózgą kuchenną).
        <br/>
        <br/>
        Połączyć zawartość obu naczyń, dodać startą marchewkę, orzechy i ananasy, wymieszać łyżką. 
        <br/>
        <br/>
        Formę o średnicy 20 cm wyłożyć papierem do pieczenia. Do formy wyłożyć ciasto, wyrównać. Piec w temperaturze 175ºC przez 40 - 45 minut lub do tzw. suchego patyczka. Wystudzić w formie, następnie wyjąć i wystudzić na kratce.
        <br/>
        <br/>
        <b>Krem z serka philadelphia:</b>
        <br/>
        <br/>
        300 g serka philadelphia, w temperaturze pokojowej
        <br/>
        90 g masła, w temperaturze pokojowej
        <br/>
        1 szklanka cukru pudru, przesianego (lub mniej, do smaku)
        <br/>
        1 łyżeczka ekstraktu lub pasty z wanilii
        <br/>
        <br/>
        Masło, cukier i wanilię umieścić w misie miksera. Utrzeć do otrzymania puszystej i jasnej masy maślanej. Dodawać serek kremowy, w trzech turach, cały czas ucierając.
        <br/>
        Wystudzone ciasto przekroić wzdłuż. Połową kremu przełożyć ciasto, resztę rozsmarować na górze. Ozdobić orzechami włoskimi, można delikatnie oprószyć cynamonem.
        <br/>
        <br/>
        Smacznego :-).
    </Descriptions.Item>

        </Descriptions>
        </div>
        <div className="column-header-options">Wersja potrawy</div>
            <Radio.Group options={options} onChange={this.onChange} value={this.state.value} />
        <br/>
        <br/>
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
