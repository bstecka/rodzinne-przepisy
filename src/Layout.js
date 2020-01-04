import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon, Input, Button } from 'antd';
import { message } from 'antd';
import { withCookies } from 'react-cookie';
import './Layout.css';
import './LoginModal.js';
import LoginModal from './LoginModal.js';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

class PageLayout extends Component {

  handleClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key);
  }

  handleSearch = (value) => {
    if (value.length > 0) {
        this.props.history.push('/szukaj/'+ value);
    }
  }

  handleLogInRequiredClick = ({ item, key, keyPath, domEvent }) => {
    const { cookies } = this.props;
    if (cookies.cookies.loggedIn === "true") {
      this.props.history.push(key);
    }
    else {
      this.props.openModal('login');
    }
  }

  handleButtonClick = () => {
    this.handleLogInRequiredClick({key: '/dodaj'});
  }

  handleLoginLogout = () => {
    const { cookies } = this.props;
    if (cookies.cookies.loggedIn === "true"){
      cookies.remove('loggedIn');
      message.success('Prawidłowo wylogowano.');
      this.props.history.push('/');
    }
    else {
      this.props.openModal('login');
    }
  }

  render() {
    const SearchInput = () => {
        const pathname = this.props.history.location.pathname;
        const value = pathname.includes('szukaj') ? pathname.split('/').pop() : "";
        return <Search placeholder="Wpisz nazwę potrawy..." defaultValue={value} onSearch={value => this.handleSearch(value)} enterButton />;
    }
    const { cookies } = this.props;
    return (
    <Layout className="layout"><LoginModal/>
        <Header>
          <div className="header-container">
              <SearchInput/>
          </div>
          <Button type="primary" size='large' onClick={this.handleButtonClick}>Dodaj przepis</Button>
          <Menu 
              theme="dark"
              mode="horizontal"
              selectedKeys={[this.props.location.pathname]}
              style={{ lineHeight: '100px' }}
          >
          <Menu.Item onClick={this.handleLogInRequiredClick} key="/moje-przepisy"><Icon type="read"/>Książka kucharska</Menu.Item>
          <Menu.Item onClick={this.handleClick} key="/"><Icon type="home"/>Strona główna</Menu.Item>
          <Icon className="logout-icon" onClick={this.handleLoginLogout} type={cookies.cookies.loggedIn === "true" ? "logout" : "login"} />
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Made with ❤ by Kania&Stecka, 2019</Footer>
    </Layout>
    );
  };
}

export default withCookies(withRouter(PageLayout));