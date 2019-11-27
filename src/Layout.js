import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon, Input, Button } from 'antd';
import './Layout.css';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

class PageLayout extends Component {

    handleClick = ({ item, key, keyPath, domEvent }) => {
        this.props.history.push(key);
    }

    handleSearch = (value) => {
        if (value.length > 0)
            this.props.history.push('/szukaj/'+ value);
    }

    render() {
        return (
        <Layout className="layout">
            <Header>
                <div className="header-container">
                    <Search placeholder="Wpisz nazwę potrawy..." onSearch={value => this.handleSearch(value)} enterButton />
                </div>
                <Button type="primary" size='large'>Dodaj przepis</Button>
                <Menu onClick={this.handleClick}
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[this.props.location.pathname]}
                    style={{ lineHeight: '100px' }}
                >
                <Menu.Item key="/moje-przepisy"><Icon type="book" />Książka kucharska</Menu.Item>
                <Menu.Item key="/"><Icon type="home" />Strona główna</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{this.props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Made with ❤ by Kania&Stecka, 2019</Footer>
        </Layout>
        );
    };
}

export default withRouter(PageLayout);