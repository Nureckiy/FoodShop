// /*eslint no-unused-vars: "off"*/
// import React, { Component } from 'react';
// import {GridList, GridTile} from 'material-ui/GridList';
// import Subheader from 'material-ui/Subheader';
// import Dialog from 'material-ui/Dialog';
// import Snackbar from 'material-ui/Snackbar';
// import AddDish from './AddDish.jsx';
// import FlatButton from 'material-ui/FlatButton';
// import * as utils from '../../utils/utils';
// import history from '../../store/History';
//
// class MenusList extends Component {
//   constructor() {
//     super();
//     this.state = {
//       selected: [],
//       snackShow: false,
//       dialogOptions: {
//         open: false,
//         menu: {},
//         modal: false,
//         title: 'Добавить в корзину'
//       },
//     };
//     this.closeModal = this.closeModal.bind(this);
//     this.onMealSelected = this.onMealSelected.bind(this);
//     this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
//   }
//   onMealSelected(selected) {
//     this.setState({ selected });
//   }
//   findSelected(configurations) {
//     const { selectedGoods } = this.props;
//     return utils.findSelectedConfigurations(selectedGoods, configurations);
//   }
//   openDialog(menu) {
//     let { dialogOptions } = this.state;
//     const selected = this.findSelected(menu.Configurations);
//     dialogOptions.open = true;
//     dialogOptions.menu = menu;
//     this.setState({ dialogOptions, selected });
//   }
//   closeModal(submit) {
//     let { dialogOptions, selected } = this.state;
//     const { selectMeal, selectedGoods } = this.props;
//     dialogOptions.open = false;
//     if (submit) {
//       selectMeal(selectedGoods, selected);
//     }
//     this.setState({ dialogOptions, selected: [], snackShow: submit });
//   }
//   handleCloseSnackbar() {
//     this.setState({ snackShow: false });
//   }
//   render() {
//     const { menus } = this.props;
//     const { dialogOptions, selected, snackShow } = this.state;
//     const actions = [
//       <FlatButton
//         label="Cancel"
//         primary={true}
//         onTouchTap={() => this.closeModal(false)}
//       />,
//       <FlatButton
//         label="Submit"
//         primary={true}
//         keyboardFocused={true}
//         onTouchTap={() => this.closeModal(true)}
//       />
//     ];
//     return (
//       <span>
//         <GridList cellHeight={300} cols={4} >
//           <Subheader>Пицца</Subheader>
//           {menus.map((menu, key) => (
//             <GridTile
//               className="dish_tile"
//               titleBackground="rgba(255, 255, 255, 0.6)"
//               titleStyle={{ color: '#000' }}
//               key={key}
//               title={menu.Name}
//               subtitle={menu.Description}
//               onClick={() => this.openDialog(menu)}
//             >
//               <img src={menu.ImageUrl} />
//             </GridTile>
//           ))}
//         </GridList>
//         <Dialog
//           className="add_modal"
//           {...dialogOptions}
//           actions={actions}
//           onRequestClose={() => this.closeModal(false)}
//           autoScrollBodyContent
//         >
//           <AddDish
//             {...dialogOptions.menu}
//             selected={selected}
//             onSelect={this.onMealSelected}
//           />
//         </Dialog>
//         <Snackbar
//           open={snackShow}
//           message={dialogOptions.menu.Name + ' добавлен в корзину'}
//           autoHideDuration={4000}
//           action="просмотреть"
//           onActionTouchTap={() => history.push('/basket')}
//           onRequestClose={this.handleCloseSnackbar}
//         />
//       </span>
//     );
//   }
// }
//
// export default MenusList;