import React, { Component } from 'react';
import { Row, Col, List, Card , Avatar} from 'antd';
import { withRouter } from "react-router-dom";
import './UserPage.css';

const data = [
  {
    title: 'Zdrowy burger',
    url: 'https://www.runners-world.pl/media/lib/1720/fast_food_burger_indyk-87e27092bc721dfda6881b781ab8b091.jpg'
  },
  {
    title: 'Azjatycka przekąska z sosem sojowym',
    url: 'http://www.tandooriovenlogan.com/images/gallery/img-03.jpg'
  },
  {
    title: 'Zawijaski z łososiem',
    url: 'http://www.gustocatering.com.pl/images/grafika/start_gusto_krakow_finger_food.jpg'
  },
  {
    title: 'Roladki z pomidorami',
    url: 'https://irp-cdn.multiscreensite.com/4b0d7b92/dms3rep/multi/mobile/Yorkshire+Pudding+Wrap+Landscape+edit.jpg'
  },
  {
    title: 'Lasagne',
    url: 'https://kuchnialidla.pl/img/PL/960x540/51c3b902a430-dc24d133e562-Klassische-Lasagne.jpg'
  },
  {
    title: 'Pierogi ruskie',
    url: 'https://akademiasmaku.pl/upload/recipes/4370/tradycyjne-pierogi-ruskie-4370.jpg'
  },
  {
    title: 'Barszcz Czerwony',
    url: 'http://zpierwszegotloczenia.pl/obrazek/393391.jpeg'
  },
  {
    title: 'Ciasto Marchewkowe',
    url: 'https://www.kwestiasmaku.com/sites/kwestiasmaku.com/files/ciasto_marchewkowe_01.jpg'
  },
];

const sales = [
  {
    title: 'Awokado',
    url: 'https://zasoby.ekologia.pl/artykulyNew/18517/xxl/shutterstock-785296315_800x600.jpg'
  },
  {
    title: 'Pomidor malinowy',
    url: 'http://www.sklepogrodniczy.net.pl/images/POMIDOR%20HA%203626%20NASIONA%20HAZERA.jpg'
  },
  {
    title: 'Cytryny',
    url: 'https://s6.dziennik.pl/pliki/4710000/4710498-cytryna-643-477.jpg'
  },
  {
    title: 'Ogórki kiszone',
    url: 'https://d-art.ppstatic.pl/kadry/k/r/1/5b/58/5d3ffda626594_o_large.jpg'
  },
];

const salesStores = [
  {
    title: 'Biedronka',
    url: 'https://pbs.twimg.com/profile_images/3578001181/990ad36a51b8e483cde968adbb53df5a_400x400.png'
  },
  {
    title: 'Lidl',
    url: 'https://www.freeiconspng.com/uploads/lidl-logo-icon-5.jpg'
  },
  {
    title: 'Kaufland',
    url: 'https://banner2.cleanpng.com/20180614/cty/kisspng-kaufland-supermarket-business-lidl-retail-hbo-5b225f3334e139.5575801215289792512166.jpg'
  },
  {
    title: 'Auchan',
    url: 'https://atrium-copernicus.pl/assets/uploads/2019/04/auchan_logo.png'
  },
];

class HomePage extends Component {

  handleClick = () => {
      this.props.history.push('/przepis');
  }

  handleSalesClick = () => {
    this.props.history.push('/promocja');
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
        <Col span={6}>
          <span className="column-header">Promocje</span>
          <div className="sales-column">
            <List
              grid={{ gutter: 12, column: 1 }}
              dataSource={sales}
              renderItem={item => (
                <List.Item onClick={this.handleSalesClick}>
                  <Card hoverable cover={<img alt="sales_example" src={item.url} />}>{item.title}
                  <List
                  itemLayout="horizontal"
                  dataSource={salesStores}
                  size="large"
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        width={150}
                        avatar={<Avatar src={item.url} shape="square"/>}
                        title={item.title}
                      />
                      <div>{parseFloat(Math.random()*6).toFixed(2) + " zł"}</div>
                    </List.Item>
                  )}
                  />
                  </Card>
                </List.Item>
              )}
            />
            </div>
        </Col>
      </Row>
    </div>
    );
  };
}

export default withRouter(HomePage);
