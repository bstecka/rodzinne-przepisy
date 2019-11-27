import React, { Component } from 'react';
import { Row, Col, List, Card } from 'antd';
import { Form, Button, Rate } from 'antd'
import FormBuilder from 'antd-form-builder'
import { withRouter } from "react-router-dom";
import './AddRecipe.css';

const foodItem = { 
  key: 'food-item-1',
  label: 'Nazwa składnika',
  colSpan: 3,
}

const foodAmount = {
  key: 'food-item-amount-1',
  label: 'Ilość',
}

const recipeStep = { 
  key: 'textarea', 
  label: 'Krok 1', 
  colSpan: 4, 
  widget: 'textarea',
}

class AddRecipe extends Component {

  constructor(props) {
    super(props);
    const foodItem = { key: 'food-item-1', label: 'Nazwa składnika', colSpan: 3 }
    this.state = { 
      foodItemArray: [foodItem, foodAmount],
      recipeStepArray: [recipeStep]
    };
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('submit: ', this.props.form.getFieldsValue());
    this.props.history.push('/przepis');
  }

  // https://rekit.github.io/antd-form-builder/
  render() {
    console.log(this.state.foodItemArray[0]);
    const options = ['wegetariańskiej', 'wegańskiej'];
    const meta = {
      columns: 4,
      formItemLayout: null,
      fields: [
        {
          key: 'label2',
          colSpan: 4,
          render() {
            return (
              <fieldset>
                <legend>Informacje podstawowe</legend>
              </fieldset>
            )
          },
        },
        {
          key: 'name',
          colSpan: 4,
          label: 'Nazwa',
          required: true,
          tooltip: 'Podaj nazwę potrawy.',
        },
        { key: 'rating', tooltip: 'Podaj trudność wykonania.', label: 'Trudność', widget: Rate, initialValue: 2 },
        { key: 'number', tooltip: 'Podaj liczbę porcji powstałą w przepisie', colSpan: 4, label: 'Liczba porcji', widget: 'number' },
        {
          key: 'label2',
          colSpan: 4,
          render() {
            return (
              <fieldset>
                <legend>Składniki</legend>
              </fieldset>
            )
          },
        },
        ...this.state.foodItemArray,
        { 
          key: 'foodItemButton',
          widget: 'button',
          children: 'Dodaj składnik',
          widgetProps: {
            onClick: () => {
              const array = this.state.foodItemArray;
              const len = array.length + 1;
              const foodItem = { 
                key: 'food-item-' + len,
                label: 'Nazwa składnika',
                colSpan: 3,
              }
              const foodAmount = {
                key: 'food-item-amount-' + len,
                label: 'Ilość',
              }
              array.push(foodItem);
              array.push(foodAmount);
              this.setState({foodItemArray: array})
            },
          },
          colSpan: 1 
        },
        {
          key: 'label3',
          colSpan: 4,
          render() {
            return (
              <fieldset>
                <legend>Przygotowanie</legend>
              </fieldset>
            )
          },
        },
        ...this.state.recipeStepArray,
        { 
          key: 'recipeStepButton',
          widget: 'button',
          children: 'Dodaj krok przepisu',
          widgetProps: {
            onClick: () => {
              const array = this.state.recipeStepArray;
              const len = array.length + 1;
              const recipeStep = { 
                key: 'textarea', 
                label: 'Krok ' + len, 
                colSpan: 4, 
                widget: 'textarea',
              }             
              array.push(recipeStep);
              this.setState({recipeStepArray: array})
            },
          },
          colSpan: 1 
        },
        {
          key: 'label4',
          colSpan: 4,
          render() {
            return (
              <fieldset>
                <legend>Informacje dodatkowe</legend>
              </fieldset>
            )
          },
        },
        { key: 'checkbox-group', colSpan: 4, label: 'Spełnia wymagania diety', widget: 'checkbox-group', options },
      ],
    }

    return (
      <div>
      <Row>
        <Col span={16}>
        <span className="column-header">Dodaj przepis</span>
            <div className="recipe-column">
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
              <FormBuilder form={this.props.form} meta={meta} />
              <Form.Item wrapperCol={{ span: 16, offset: 8 }} className="form-footer">
                <Button htmlType="submit" type="primary">Zapisz</Button>
              </Form.Item>
            </Form>
            </div>
        </Col>
        <Col span={8}>
        </Col>
      </Row>
    </div>
    )
  };
}

export default withRouter(Form.create()(AddRecipe));