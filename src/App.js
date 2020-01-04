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
import LoginModal from './LoginModal';

export default function App() {
  return (
    <Switch>
        <LoginModal>
          <PageLayout>
            <Route exact path="/" render={(props) => <HomePage {...props} />} />
            <Route path="/moje-przepisy" render={(props) => <LoginModal><UserPage {...props} /></LoginModal>} />
            <Route path="/przepis/:id" render={(props) => <LoginModal><Recipe {...props} /></LoginModal>} />
            <Route path="/dodaj" render={(props) => <AddRecipe {...props} />} />
            <Route path="/szukaj/:query" render={(props) => <SearchPage {...props} />} />
            <Route path="/promocja/:id" render={(props) => <Sale {...props} />} />
          </PageLayout>
        </LoginModal>
    </Switch>
  )
}