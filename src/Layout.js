import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ReactModalLogin from "react-modal-login";
import { Layout, Menu, Breadcrumb, Icon, Input, Button } from 'antd';
import './Layout.css';
import { facebookConfig, googleConfig } from "./social-config.js";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

class PageLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          loading: false,
          error: null
        };
    }

    openModal() {
      console.log(window.FB);
      if (window.FB) {
        window.FB.getLoginStatus(function(response) {
          console.log(response);
        }, true);
      }
        this.setState({
          showModal: true
        });
      }
     
      closeModal() {
        this.setState({
          showModal: false,
          error: null
        });
      }
     
      onLoginSuccess(method, response) {
        console.log("logged successfully with " + method);
        console.log(response.authResponse.accessToken);
        this.closeModal();
      }
     
      onLoginFail(method, response) {
        console.log("logging failed with " + method);
        this.setState({
          error: response
        });
      }
     
      startLoading() {
        this.setState({
          loading: true
        });
      }
     
      finishLoading() {
        this.setState({
          loading: false
        });
      }
     
      afterTabsChange() {
        this.setState({
          error: null
        });
      }

    handleClick = ({ item, key, keyPath, domEvent }) => {
        this.props.history.push(key);
    }

    handleSearch = (value) => {
        if (value.length > 0) {
            this.props.history.push('/szukaj/'+ value);
        }
    }

    handleButtonClick = () => {
        this.props.history.push('/dodaj');
    }

    render() {

        const SearchInput = () => {
            const pathname = this.props.history.location.pathname;
            const value = pathname.includes('szukaj') ? pathname.split('/').pop() : "";
            return <Search placeholder="Wpisz nazwę potrawy..." defaultValue={value} onSearch={value => this.handleSearch(value)} enterButton />;
        }        

        return (
        <Layout className="layout">
            <Header>
                <div className="header-container">
                    <SearchInput/>
                </div>
                <Button type="primary" size='large' onClick={this.handleButtonClick}>Dodaj przepis</Button>
                <Menu onClick={this.handleClick}
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[this.props.location.pathname]}
                    style={{ lineHeight: '100px' }}
                >
                <Menu.Item key="/moje-przepisy"><Icon type="read"/>Książka kucharska</Menu.Item>
                <Menu.Item key="/"><Icon type="home"/>Strona główna</Menu.Item>
                <Icon className="logout-icon"onClick={this.openModal.bind(this)}  type="logout" />
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <ReactModalLogin
                visible={this.state.showModal}
                onCloseModal={this.closeModal.bind(this)}
                loading={this.state.loading}
                error={this.state.error}
                tabs={{
                  afterChange: this.afterTabsChange.bind(this),
                  loginLabel: "Zaloguj",
                  registerLabel: "Zarejestruj"
                }}
                loginError={{
                  label: "Couldn't sign in, please try again."
                }}
                registerError={{
                  label: "Couldn't sign up, please try again."
                }}
                startLoading={this.startLoading.bind(this)}
                finishLoading={this.finishLoading.bind(this)}
                providers={{
                  facebook: {
                    config: facebookConfig,
                    onLoginSuccess: this.onLoginSuccess.bind(this),
                    onLoginFail: this.onLoginFail.bind(this),
                    label: "Zaloguj przez Facebook"
                  },
                  google: {
                    config: googleConfig,
                    onLoginSuccess: this.onLoginSuccess.bind(this),
                    onLoginFail: this.onLoginFail.bind(this),
                    label: "Zaloguj przez Google"
                  }
                }}
              />
                {this.props.children}
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Made with ❤ by Kania&Stecka, 2019</Footer>
        </Layout>
        );
    };
}

export default withRouter(PageLayout);