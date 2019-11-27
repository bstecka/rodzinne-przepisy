import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import UserPage from './UserPage';
import Recipe from './Recipe';
import AddRecipe from './AddRecipe';
import PageLayout from './Layout';
import SearchPage from './SearchPage';
import Sale from './Sale';

export default function App() {
  return (
    <Switch>
      <PageLayout>
        <Route exact path="/" component={HomePage} />
        <Route path="/moje-przepisy" component={UserPage} />
        <Route path="/przepis" component={Recipe} />
        <Route path="/dodaj" component={AddRecipe} />
        <Route path="/szukaj/:query" component={SearchPage} />
        <Route path="/promocja" component={Sale} />
      </PageLayout>
    </Switch>
  )
}