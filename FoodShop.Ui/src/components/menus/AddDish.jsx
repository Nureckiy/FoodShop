/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RenderSelect from '../common/RenderSelect.jsx';
import * as utils from '../../utils/utils';

class AddDish extends Component {
  componentWillMount() {
    this.calculateTotal();
  }
  onDishSelect(number, meal) {
    const { onSelect, selected } = this.props;
    const newMeal = {
      configurationId: meal.Id,
      price : meal.Price,
      number
    };
    onSelect(utils.mergeSelected(selected, newMeal));
    this.calculateTotal();
  }
  calculateTotal() {
    const { selected } = this.props;
    const total = utils.calculateGoodTotal(selected);
    this.setState({ total });
  }
  getNumber(confId) {
    const { selected } = this.props;
    return utils.findNumber(selected, confId);
  }
  render() {
  const { ImageUrl, Description, Configurations, Name } = this.props;
  const { total } = this.state;
  const values = utils.renderNumberOptions(10);
    return (
      <div>
        <div className="col-md-5">
          <img src={ImageUrl} />
        </div>
        <div className="col-md-7">
          <p>{ Name }</p>
          <p className="dish_option">{ Description }</p>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
              <TableHeaderColumn>Размер</TableHeaderColumn>
              <TableHeaderColumn>Вес</TableHeaderColumn>
              <TableHeaderColumn>Стоимость</TableHeaderColumn>
              <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {Configurations.map((item, key) => (
                <TableRow key={key}>
                  <TableRowColumn>{item.Size}</TableRowColumn>
                  <TableRowColumn>{item.Weight}</TableRowColumn>
                  <TableRowColumn>${item.Price}</TableRowColumn>
                  <TableRowColumn><RenderSelect
                    label="Количество"
                    defaultValue={this.getNumber(item.Id)}
                    options={values}
                    onChange={(value) => this.onDishSelect(value, item)}
                  />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="pull-left">Итого:</p><p className="pull-right">${total}</p>
        </div>
      </div>
    );
  }
}

export default AddDish;

