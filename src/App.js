import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import UserPage from './UserPage';
import PageLayout from './Layout';

export default function App() {
  return (
    <Switch>
      <PageLayout>
        <Route exact path="/" component={HomePage} />
        <Route path="/moje-przepisy" component={UserPage} />
      </PageLayout>
    </Switch>
  )
}