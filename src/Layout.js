import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ReactModalLogin from "react-modal-login";
import { Layout, Menu, Breadcrumb, Icon, Input, Button } from 'antd';
import { withCookies, Cookies } from 'react-cookie';
import './Layout.css';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

class PageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loggedIn: null,
      error: null,
      initialTab: null,
      recoverPasswordSuccess: null,
    };
  }

  onLogin() {
    console.log('__onLogin__');
    console.log('email: ' + document.querySelector('#email').value);
    console.log('password: ' + document.querySelector('#password').value);
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if (!email || !password) {
      this.setState({
        error: true
      })
    } else {
      this.onLoginSuccess('form');
    }
  }

  onRegister() {
    console.log('__onRegister__');
    console.log('login: ' + document.querySelector('#login').value);
    console.log('email: ' + document.querySelector('#email').value);
    console.log('password: ' + document.querySelector('#password').value);
    const login = document.querySelector('#login').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if (!login || !email || !password) {
      this.setState({
        error: true
      })
    } else {
      this.onLoginSuccess('form');
    }
  }

  onRecoverPassword() {
    console.log('__onForgottenPassword__');
    console.log('email: ' + document.querySelector('#email').value);
    const email = document.querySelector('#email').value;
    if (!email) {
      this.setState({
        error: true,
        recoverPasswordSuccess: false
      })
    } else {
      this.setState({
        error: null,
        recoverPasswordSuccess: true
      });
    }
  }

  openModal(initialTab) {
    this.setState({
      initialTab: initialTab
    }, () => {
      this.setState({
        showModal: true,
      })
    });
  }

  onLoginSuccess(method, response) {
    const { cookies } = this.props;
    this.closeModal();
    this.setState({
      loggedIn: method
    }, () => {
      cookies.set('loggedIn', "true", { path: '/' });
    })
  }

  onLoginFail(method, response) {
    this.setState({
      error: response
    })
  }

  afterTabsChange() {
    this.setState({
      error: null,
      recoverPasswordSuccess: false,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
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

  doSomething = value => {
    console.log('doSomething called by child with value:', value);
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
          <Icon className="logout-icon" onClick={() => this.openModal('login')} type="logout" />
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <ReactModalLogin
              visible={this.state.showModal}
              onCloseModal={this.closeModal.bind(this)}
              initialTab={this.state.initialTab}
              error={this.state.error}
              tabs={{
                afterChange: this.afterTabsChange.bind(this),
                loginLabel: "Zaloguj się",
                registerLabel: "Stwórz konto"
              }}
              form={{
                onLogin: this.onLogin.bind(this),
                onRegister: this.onRegister.bind(this),
                onRecoverPassword: this.onRecoverPassword.bind(this),
                recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
                  ? {
                      label: "Nowe hasło zostało wysłane na twój adres"
                    }
                  : null,
                recoverPasswordAnchor: {
                  label: "Nie pamiętam hasła"
                },
                loginBtn: {
                  label: "Zaloguj się"
                },
                registerBtn: {
                  label: "Stwórz konto"
                },
                recoverPasswordBtn: {
                  label: "Wyślij nowe hasło"
                },
                loginInputs: [
                  {
                    containerClass: 'RML-form-group',
                    label: 'Adres e-mail:',
                    type: 'email',
                    inputClass: 'RML-form-control',
                    id: 'email',
                    name: 'email',
                    placeholder: 'Adres e-mail',
                  },
                  {
                    containerClass: 'RML-form-group',
                    label: 'Hasło:',
                    type: 'password',
                    inputClass: 'RML-form-control',
                    id: 'password',
                    name: 'password',
                    placeholder: 'Hasło',
                  }
                ],
                registerInputs: [
                  {
                    containerClass: 'RML-form-group',
                    label: 'Nazwa użytkownika:',
                    type: 'text',
                    inputClass: 'RML-form-control',
                    id: 'login',
                    name: 'login',
                    placeholder: 'Nazwa użytkownika',
                  },
                  {
                    containerClass: 'RML-form-group',
                    label: 'Adres e-mail:',
                    type: 'email',
                    inputClass: 'RML-form-control',
                    id: 'email',
                    name: 'email',
                    placeholder: 'Adres e-mail',
                  },
                  {
                    containerClass: 'RML-form-group',
                    label: 'Hasło:',
                    type: 'password',
                    inputClass: 'RML-form-control',
                    id: 'password',
                    name: 'hasło',
                    placeholder: 'Hasło',
                  }
                ],
                recoverPasswordInputs: [
                  {
                    containerClass: 'RML-form-group',
                    label: 'Adres e-mail',
                    type: 'email',
                    inputClass: 'RML-form-control',
                    id: 'email',
                    name: 'email',
                    placeholder: 'Adres e-mail',
                  },
                ],
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

export default withCookies(withRouter(PageLayout));