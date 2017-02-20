/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import history from '../../store/History';

class Basket extends Component {
  // componentWillMount() {
  //   const { updateTotal }  = this.props.actions;
  //   const { selectedGoods } = this.props.app;
  //
  //   updateTotal(selectedGoods);
  // }
  // goToOrder() {
  //   history.push('/order');
  // }
  render() {
    const { total } = this.props.view;
    return (
      <div>
        <p>Всего выбрано на сумму: {total}</p>
        <FlatButton primary label="Продолжить" backgroundColor="#fff" onClick={this.goToOrder} />
        <hr />
        <Paper className="title" rounded={false}>Выбранные товары</Paper>
      </div>
    );
  }
}

export default Basket;