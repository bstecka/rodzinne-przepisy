import React, { Component } from 'react';
import { Row, Col, List, Card , Avatar, Tag} from 'antd';
import { withRouter } from "react-router-dom";
import './HomePage.css';

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
    title: 'Makaron włoski',
    url: 'https://img.etimg.com/thumb/msid-72104865,width-640,resizemode-4,imgsize-222155/italian-menu-for-the-entire-week.jpg'
  },
  {
    title: 'Pikantne burgery drobiowe',
    url: 'https://bi.im-g.pl/im/55/a6/fe/z16688725IH,Pikantne-burgery-drobiowe.jpg'
  },
  {
    title: 'Makaron wegański',
    url: 'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg'
  },
  {
    title: 'Przekąska świąteczna',
    url: 'https://irp-cdn.multiscreensite.com/4b0d7b92/dms3rep/multi/mobile/Cauliflower%2C+Grains+Christmas+Salad+Landscape+RGB-77e63f88.jpg'
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
                  <Card hoverable cover={<img alt="example" src={item.url} />}>{item.title}
                  <br/>
                  <br/>
                  <Tag color="purple">obiad</Tag>
                  <Tag color="red">zdrowy</Tag>
                  <Tag color="green">warzywa</Tag>
                  <Tag color="yellow">wegetariańskie</Tag>
                  </Card>
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
