import React, { Component } from 'react';
import { Row, Col, Upload, Icon, message } from 'antd';
import { Form, Button, Rate } from 'antd'
import FormBuilder from 'antd-form-builder'
import { withRouter } from "react-router-dom";
import { apiURL } from './consts';
import './AddRecipe.css';
import EditableTagGroup from './EditableTagGroup.js'

const recipeStep = { 
  key: 'recipe-step-0', 
  label: 'Krok 1', 
  colSpan: 4,
  required: true,
  message: 'Podaj opis przygotowania.',
  tooltip: 'Opisz sposób przygotowywania potrawy.',
  widget: 'textarea',
}

class AddRecipe extends Component {

  constructor(props) {
    super(props);
    const foodItem = { 
      key: 'food-item-0', 
      tooltip: 'Podaj nazwę składnika.',
      label: 'Nazwa składnika',
      required: true,
      message: 'Podaj nazwę.',
      colSpan: 3 
    }
    const foodAmount = {
      key: 'food-amount-0',
      tooltip: 'Podaj wymaganą ilość składnika wraz z jednostką.',
      required: true,
      message: 'Podaj ilość.',
      label: 'Ilość',
    }
    this.state = { 
      foodItemArray: [foodItem, foodAmount],
      recipeStepArray: [recipeStep],
      tags: [],
      pictures: [],
      loading: false,
    };
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Błędny typ pliku. Sprawdź, czy na pewno wybrałeś zdjęcie.');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Twoje zdjęcie jest za duże.');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  onDrop = (picture) => {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.form.validateFields()
    .then(() => {
      const fieldsValues = this.props.form.getFieldsValue();
      const array = Object.entries(fieldsValues);
      const foodItems = array.filter(item => item[0].search('food-item') !== -1);
      const foodAmounts = array.filter(item => item[0].search('food-amount') !== -1);
      const recipeSteps = array.filter(item => item[0].search('recipe-step') !== -1);
      let ingredients = [];
      var i;
      for (i = 0; i < foodItems.length && i < foodAmounts.length; i++) {
        const amount = parseInt(foodAmounts[i][1]) ? parseInt(foodAmounts[i][1]) : "";
        const unit = foodAmounts[i][1] ? foodAmounts[i][1].replace(amount, "") : "";
        ingredients.push({ name: foodItems[i][1], quantity: amount, unit: unit })
      }
      let recipe_steps = [];
      for (i = 0; i < recipeSteps.length; i++) {
        recipe_steps.push({ id: "Krok " + (i+1), description: recipeSteps[i][1] })
      }
      const diet_type = {
        id: fieldsValues.diet_type === "Standardowa" ? 1 : (fieldsValues.diet_type === "Wegetariańska" ? 2 : 3),
        name: fieldsValues.diet_type
      }
      const tags = this.state.tags;
      const recipeObject = {
        title: fieldsValues.title,
        thumbnailUrl: "",
        difficulty: fieldsValues.difficulty,
        diet_type: diet_type,
        tags: tags,
        ingredients: ingredients,
        saved: "false",
        gallery: [
          {
            id: 1,
            photoUrl: ""
          }
        ],
        recipe_steps: recipe_steps
      }
      evt.preventDefault();
      (async () => {
        const rawResponse = await fetch(`${apiURL}/recipes/`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(recipeObject)
        });
        const content = await rawResponse.json();
        if (content.id)
          this.props.history.push('/przepis/' + content.id);
      })();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const options = ['Standardowa', 'Wegetariańska', 'Wegańska'];
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Kliknij i wybierz zdjęcie</div>
      </div>
    );
    const UploadInput = () => {
      return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    ) };
    const TagInput = () => (
      <EditableTagGroup label="Dodaj Tag" onTagUpdate={(tags) => { console.log(tags); this.setState({tags: tags}) }} />
    );
    try {
      FormBuilder.defineWidget('UploadInput', UploadInput);
      FormBuilder.defineWidget('TagInput', TagInput);
    } catch (e) { }
    
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
          key: 'title',
          colSpan: 4,
          label: 'Nazwa',
          required: true,
          message: 'Podaj nazwę potrawy.',
          tooltip: 'Podaj nazwę potrawy.',
        },
        { key: 'difficulty', tooltip: 'Podaj trudność wykonania.', label: 'Trudność', widget: Rate, initialValue: 2 },
        { key: 'portions', tooltip: 'Podaj standardową liczbę porcji dla przepisu.', colSpan: 4, initialValue: 1, label: 'Liczba porcji', widget: 'number' },
        {
          key: 'tags',
          tooltip: 'Dodaj etykiety opisujące przepis, np. "wegetariański", "owoce", "przyjęcie".',
          label: 'Tagi opisujące przepis',
          colSpan: 4,
          widget: 'TagInput',
        },
        {
          key: 'label0',
          colSpan: 4,
          render() {
            return (
              <fieldset>
                <legend>Zdjęcie</legend>
              </fieldset>
            )
          },
        },
        {
          key: 'picture',
          colSpan: 4,
          widget: 'UploadInput',
        },
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
              const value = Math.floor(len/2);
              const foodItem = { 
                key: 'food-item-' + value,
                label: 'Nazwa składnika',
                colSpan: 3,
              }
              const foodAmount = {
                key: 'food-amount-' + value,
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
              const len = array.length;
              const recipeStep = { 
                key: 'recipe-step-' + len, 
                label: 'Krok ' + (len + 1), 
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
        { key: 'diet_type', required: true, message: 'Wybierz dietę.', tooltip: 'Zaznacz, czy potrawa jest wegetariańska lub wegańska.', colSpan: 4, label: 'Dieta', widget: 'radio-group', options },
      ],
    }

    return (
      <div>
      <Row>
        <Col span={16}>
        <span className="column-header">Dodaj przepis</span>
            <div className="recipe-column-add">
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