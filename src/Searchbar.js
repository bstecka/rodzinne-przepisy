import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Input } from 'antd';
import './Searchbar.css';

const { Search } = Input;

export default class Searchbar extends Component {
  render() {
    return (
    <div>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
        <br />
        <br />
        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
        <br />
        <br />
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)}
        />
      </div>
    );
  };
}