import React, { Component } from 'react';
import { Row, Col, Upload, Icon, message } from 'antd';
import { Form, Button, Rate } from 'antd'
import FormBuilder from 'antd-form-builder'
import { withRouter } from "react-router-dom";
import './AddRecipe.css';

const recipeStep = { 
  key: 'textarea', 
  label: 'Krok 1', 
  colSpan: 4, 
  tooltip: 'Opisz sposób przygotowywania potrawy.',
  widget: 'textarea',
}

class AddRecipe extends Component {

  constructor(props) {
    super(props);
    const foodItem = { 
      key: 'food-item-1', 
      tooltip: 'Podaj nazwę składnika.',
      label: 'Nazwa składnika', 
      colSpan: 3 
    }
    const foodAmount = {
      key: 'food-item-amount-1',
      tooltip: 'Podaj wymaganą ilość składnika wraz z jednostką.',
      label: 'Ilość',
    }
    this.state = { 
      foodItemArray: [foodItem, foodAmount],
      recipeStepArray: [recipeStep],
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
      // Get this url from response in real world.
      console.log('d');
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
    this.props.history.push('/przepis');
  }

  render() {
    const options = ['wegetariańskiej', 'wegańskiej'];
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Kliknij i wybierz zdjęcie</div>
      </div>
    );
    const UploadInput = ({ value, onChange }) => {
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
    try {
      FormBuilder.defineWidget('UploadInput', UploadInput);
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
          key: 'name',
          colSpan: 4,
          label: 'Nazwa',
          required: true,
          tooltip: 'Podaj nazwę potrawy.',
        },
        { key: 'rating', tooltip: 'Podaj trudność wykonania.', label: 'Trudność', widget: Rate, initialValue: 2 },
        { key: 'number', tooltip: 'Podaj liczbę porcji dla przepisu.', colSpan: 4, required: true, initialValue: 1, label: 'Liczba porcji', widget: 'number' },
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
        { key: 'checkbox-group', tooltip: 'Zaznacz, czy potrawa jest wegetariańska lub', colSpan: 4, label: 'Spełnia wymagania diety', widget: 'checkbox-group', options },
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