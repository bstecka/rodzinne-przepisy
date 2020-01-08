import React, { Component } from 'react';
import { Row, Col, List, Card, Avatar } from 'antd';
import './Sale.css';
import { apiURL } from './consts';

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
    {
        title: 'Piotr i Paweł',
        url: 'https://scontent.fpoz1-1.fna.fbcdn.net/v/t1.0-9/17362598_276259166130676_5306279389512007954_n.png?_nc_cat=110&_nc_ohc=cVu56mKGFp4AQnMMLyKmUgcszvuBcuU14-n1_5dOeM0hqFJEpF5xsJL2A&_nc_ht=scontent.fpoz1-1.fna&oh=0c890071a5b884f2ba389ed02edb5f14&oe=5E8AA3A2'
    },
    {
        title: 'Carrefour',
        url: 'http://bramapomorza.pl/wp-content/uploads/2018/05/Carrefour_Market.png'
    },
    {
        title: 'Tesco',
        url: 'https://practicalevents.pl/wp-content/uploads/2017/09/tesco-logo.png'
    },
    {
        title: 'T&J',
        url: 'http://tradycjaijakosc.com.pl/templates/images/logo.png'
    },
  ];

class Sale extends Component {

  constructor(props) {
    super(props);
    this.state = { sale: null };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    fetch(`${apiURL}/sales/${params.id}?_sort=stores,price&_order=asc`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ sale: data })
    })
    .catch(console.log)
  }

  render() {
    return (
    (
    this.state.sale
    ? <Row>
          <Col span={10}>
          <span className="column-header">{this.state.sale.product_name}</span>
              <div className="sale-image">
              <Card cover={<img alt="example" src={this.state.sale.product_url} />}></Card>
              </div>
          </Col>
          <Col span={14}>
          <span className="column-header">Promocje w sklepach</span>
          <List className="sales-list" itemLayout="horizontal" dataSource={this.state.sale.stores && this.state.sale.stores.sort((a, b) => a.price - b.price)} size="large" 
              renderItem={item => <List.Item>
                <List.Item.Meta width={150} avatar={<Avatar src={item.logo_url} shape="square" />} title={item.name} />
                <div className="item-price">{item.price} zł</div>
            </List.Item>} />
          </Col>
        </Row>
    : null
    ));
  }
}

export default Sale;