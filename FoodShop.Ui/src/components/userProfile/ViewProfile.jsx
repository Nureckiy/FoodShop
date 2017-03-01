/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import OrderItem from './OrderItem.jsx';

class ViewProfile extends Component {
  renderOrders() {
    const { orders } = this.props;
    let closed = [];
    let open = [];
    orders.map(order => {
      if (order.Closed) {
        closed.push(order);
      } else {
        open.push(order);
      }
    });
    return (
      <div>
        <h4>Текущие заказы</h4>
        <ul>
          { open.map(order => <OrderItem key={order.Id} order={order}/>) }
        </ul>
        <h4>Завершенные заказы</h4>
        <ul>
          { closed.map(order => <OrderItem key={order.Id} order={order}/>) }
        </ul>
        {/*// <Panel header="Текущие заказы" className="panel panel-success">*/}
        {/*//   <UserOrdersList orders={open}/>*/}
        {/*// </Panel>*/}
        {/*<Panel header="Завершенные заказы" className="panel panel-success">*/}
          {/*<UserOrdersList orders={closed}/>*/}
        {/*</Panel>*/}
      </div>
    );
  }
  render() {
    const { profile, userSubscriptions } = this.props;
    const ordersTable = this.renderOrders();
    return (
      <div className="view-profile">
        <ul>
          <li><h3>{profile.name}</h3></li>
          <li><strong>E-mail:</strong> {profile.email}</li>
          <li><strong>Адрес:</strong> {profile.user_metadata && profile.user_metadata.address}</li>
          <li><strong>Телефон:</strong> {profile.user_metadata && profile.user_metadata.phoneNumber}</li>
          <li><strong>Подписки:</strong> {userSubscriptions.map(subscription =>
            <label key={subscription.Id} className="label label-info">{subscription.Name}</label>
          )}</li>
          <li><strong>Заказы:</strong></li>
          <li>{ ordersTable }</li>
        </ul>

      </div>
    );
  }
}

export default ViewProfile;


//
// render() {
//   const { profile } = this.props;
//   console.log(profile);
//   return (
//     <div className="gtco-section">
//       <div className="gtco-container">
//         <div className="row">
//           <div className="well profile">
//             <div className="col-sm-12">
//               <div className="col-xs-12 col-sm-8">
//                 <h2>{profile.nickname}</h2>
//                 <p><strong>Имя: </strong>{profile.name}</p>
//                 <p><strong>Email: </strong>{profile.email}</p>
//                 <p><strong>Адрес: </strong>{profile.user_metadata.address}</p>
//                 <p><strong>Подписки: </strong>
//                   <span className="label label-info">Фреши</span>
//                   <span className="label label-info">Напитки</span>
//                   <span className="label label-info">Горячие блюда</span>
//                   <span className="label label-info">Холодные блюда</span>
//                 </p>
//
//                 <ul id="menu">
//                   <li><span><strong>Текущие заказы: </strong></span>
//                     <ul>
//                       <li>подпункт 1</li>
//                       <li>подпункт 2</li>
//                       <li>подпункт 3</li>
//                     </ul>
//                   </li>
//                   <li><span><strong>Прошлые заказы: </strong></span>
//                     <ul>
//                       <li>подпункт 1</li>
//                       <li>подпункт 2</li>
//                       <li>подпункт 3</li>
//                       <li>подпункт 4</li>
//                     </ul>
//                   </li>
//                 </ul>
//
//               </div>
//               <div className="col-xs-12 col-sm-4 text-center">
//                 <figure className="pull-right">
//                   <img src={profile.picture} alt="user" className="img-circle img-responsive" />
//                 </figure>
//               </div>
//             </div>
//             <div className="col-xs-12 text-center">
//               <div className="col-xs-12 col-sm-3 emphasis">
//                 <div className="btn-group dropup btn-block">
//                   <ButtonToolbar>
//                     <DropdownButton className="btn btn-primary" title="Опции" dropup id="options" onSelect={(a, b, c) => {debugger;}}>
//                       <MenuItem eventKey="1">Редактировать профиль</MenuItem>
//                       <MenuItem eventKey="2">Изменить аватар</MenuItem>
//                       <MenuItem eventKey="3">Управление подписками</MenuItem>
//                       <MenuItem divider />
//                       <MenuItem eventKey="4">Выйти</MenuItem>
//                     </DropdownButton>
//                   </ButtonToolbar>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }