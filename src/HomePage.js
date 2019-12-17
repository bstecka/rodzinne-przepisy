import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withRouter } from "react-router-dom";
import './HomePage.css';
import { apiURL } from './consts';
import RecipeList from './RecipeList.js'
import SaleList from './SaleList.js'

const data = [
  {
    title: 'Zdrowy burger',
    thumbnailUrl: 'https://www.runners-world.pl/media/lib/1720/fast_food_burger_indyk-87e27092bc721dfda6881b781ab8b091.jpg'
  },
  {
    title: 'Azjatycka przekąska z sosem sojowym',
    thumbnailUrl: 'http://www.tandooriovenlogan.com/images/gallery/img-03.jpg'
  },
  {
    title: 'Zawijaski z łososiem',
    thumbnailUrl: 'http://www.gustocatering.com.pl/images/grafika/start_gusto_krakow_finger_food.jpg'
  },
  {
    title: 'Roladki z pomidorami',
    thumbnailUrl: 'https://irp-cdn.multiscreensite.com/4b0d7b92/dms3rep/multi/mobile/Yorkshire+Pudding+Wrap+Landscape+edit.jpg'
  },
  {
    title: 'Makaron włoski',
    thumbnailUrl: 'https://img.etimg.com/thumb/msid-72104865,width-640,resizemode-4,imgsize-222155/italian-menu-for-the-entire-week.jpg'
  },
  {
    title: 'Pikantne burgery drobiowe',
    thumbnailUrl: 'https://bi.im-g.pl/im/55/a6/fe/z16688725IH,Pikantne-burgery-drobiowe.jpg'
  },
  {
    title: 'Makaron wegański',
    thumbnailUrl: 'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg'
  },
  {
    title: 'Przekąska świąteczna',
    thumbnailUrl: 'https://irp-cdn.multiscreensite.com/4b0d7b92/dms3rep/multi/mobile/Cauliflower%2C+Grains+Christmas+Salad+Landscape+RGB-77e63f88.jpg'
  },
  {
    title: 'Chłodnik',
    thumbnailUrl: 'http://haveabite.in/uploads/2017/08/20707413_10212254096569766_36460454_n.jpg'
  },
  {
    title: 'Jakitori Kabab',
    thumbnailUrl: 'https://img.etimg.com/thumb/width-640,height-480,imgsize-925331,resizemode-1,msid-72252118/japanese-fast-food-yakitori-kebabs-get-space-thumbs-up-astronaut-can-now-take-cans-to-iss.jpg'
  },
  {
    title: 'Awokado Toast',
    thumbnailUrl: 'https://i.redd.it/6btqvzw3h2311.jpg'
  },
  {
    title: 'Rogaliki czekoladowe',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQxrr2B0HdluDy9q92lKLDz1yKt48XbK5jCz4UQd7J-2nQ5EL3&s'
  },
  {
    title: 'Muffinki',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5EClqiWcSYb5KLNY045BAnhr2fSWMJCeIZnv9-PRvdoEVAVPe&s'
  },
  {
    title: 'Zdrowa sałatka',
    thumbnailUrl: 'https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmU8C5PffkDsRVpgY8N6pQc9ApBLYQ8V9APrVUBVt7xuBT/BE1DBCDB-CF08-46BB-90B7-74883CB39D16.jpeg'
  },
];

const sales = [
  {
    title: 'Awokado',
    thumbnailUrl: 'https://zasoby.ekologia.pl/artykulyNew/18517/xxl/shutterstock-785296315_800x600.jpg'
  },
  {
    title: 'Pomidor malinowy',
    thumbnailUrl: 'http://www.sklepogrodniczy.net.pl/images/POMIDOR%20HA%203626%20NASIONA%20HAZERA.jpg'
  },
  {
    title: 'Cytryny',
    thumbnailUrl: 'https://s6.dziennik.pl/pliki/4710000/4710498-cytryna-643-477.jpg'
  },
  {
    title: 'Ogórki kiszone',
    thumbnailUrl: 'https://d-art.ppstatic.pl/kadry/k/r/1/5b/58/5d3ffda626594_o_large.jpg'
  },
];

const salesStores = [
  {
    title: 'Biedronka',
    thumbnailUrl: 'https://pbs.twimg.com/profile_images/3578001181/990ad36a51b8e483cde968adbb53df5a_400x400.png'
  },
  {
    title: 'Lidl',
    thumbnailUrl: 'https://www.freeiconspng.com/uploads/lidl-logo-icon-5.jpg'
  },
  {
    title: 'Kaufland',
    thumbnailUrl: 'https://banner2.cleanpng.com/20180614/cty/kisspng-kaufland-supermarket-business-lidl-retail-hbo-5b225f3334e139.5575801215289792512166.jpg'
  },
  {
    title: 'Auchan',
    thumbnailUrl: 'https://atrium-copernicus.pl/assets/uploads/2019/04/auchan_logo.png'
  },
];

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = { recipes: [], sales: [] };
  }

  componentDidMount() {
    fetch(`${apiURL}/recipes`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ recipes: data })
    })
    .catch(console.log)

    fetch(`${apiURL}/sales`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ sales: data })
    })
    .catch(console.log)
  }

  handleClick = (path) => {
      this.props.history.push(path);
  }

  handleSalesClick = (path) => {
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
      <Row>
        <Col span={16}>
        <span className="column-header">Przepisy</span>
            <div className="recipe-column">
            <RecipeList recipes={this.state.recipes} handleClick={this.handleClick} columns={2}/>
            </div>
        </Col>
        <Col span={6}>
          <span className="column-header">Promocje</span>
          <div className="sales-column">
            <SaleList sales={this.state.sales} handleSalesClick={this.handleSalesClick}/>
          </div>
        </Col>
      </Row>
    </div>
    );
  };
}

export default withRouter(HomePage);