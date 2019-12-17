import React, { Component } from 'react';
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
                <Icon className="logout-icon" type="logout" />
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