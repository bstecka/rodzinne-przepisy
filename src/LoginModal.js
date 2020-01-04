import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ReactModalLogin from "react-modal-login";
import { withCookies } from 'react-cookie';
import { message } from 'antd';
import './Layout.css';

class LoginModal extends Component {
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
    const login = document.querySelector('#login').value;
    const password = document.querySelector('#password').value;
    if (!login || !password) {
      this.setState({
        error: true
      })
    } else {
      this.onLoginSuccess('form');
    }
    message.success('Witaj, '+ login + '!');
  }

  onRegister() {
    const login = document.querySelector('#login').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if (!login || !email || !password) {
      this.setState({
        error: true
      })
    } else {
      this.onLoginSuccess('form');
      message.success('Twoje konto zostało utworzone. Automatycznie zalogowano.');
    }
  }

  onRecoverPassword() {
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

  render() {
    const updateChildrenWithProps = React.Children.map(this.props.children, 
        (child, i) => { return React.cloneElement(child, { openModal: (initialTab) => this.openModal(initialTab)});});
    return (
        <>
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
                    label: "Nowe hasło zostało wysłane na Twój adres."
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
                label: 'Nazwa użytkownika:',
                type: 'text',
                inputClass: 'RML-form-control',
                id: 'login',
                name: 'login',
                placeholder: 'Nazwa użytkownika',
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
                },
                {
                  containerClass: 'RML-form-group',
                  label: 'Powtórz hasło:',
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
        {updateChildrenWithProps}
        </>
    );
  };
}

export default withCookies(withRouter(LoginModal));