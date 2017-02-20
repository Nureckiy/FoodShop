/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    const { getSubstitutions, profile } = props;
    getSubstitutions(profile.user_id);
  }
  render() {
    const { profile } = this.props;
    console.log(profile);
    return (
      <div className="gtco-section">
        <div className="gtco-container">
          <div className="row">
            <div className="well profile">
              <div className="col-sm-12">
                <div className="col-xs-12 col-sm-8">
                  <h2>{profile.nickname}</h2>
                  <p><strong>Имя: </strong>{profile.name}</p>
                  <p><strong>Email: </strong>{profile.email}</p>
                  <p><strong>Адрес: </strong>{profile.user_metadata.address}</p>
                  <p><strong>Подписки: </strong>
                    <span className="label label-info">Фреши</span>
                    <span className="label label-info">Напитки</span>
                    <span className="label label-info">Горячие блюда</span>
                    <span className="label label-info">Холодные блюда</span>
                  </p>

                  <ul id="menu">
                    <li><span><strong>Текущие заказы: </strong></span>
                      <ul>
                        <li>подпункт 1</li>
                        <li>подпункт 2</li>
                        <li>подпункт 3</li>
                      </ul>
                    </li>
                    <li><span><strong>Прошлые заказы: </strong></span>
                      <ul>
                        <li>подпункт 1</li>
                        <li>подпункт 2</li>
                        <li>подпункт 3</li>
                        <li>подпункт 4</li>
                      </ul>
                    </li>
                  </ul>

                </div>
                <div className="col-xs-12 col-sm-4 text-center">
                  <figure className="pull-right">
                    <img src={profile.picture} alt="user" className="img-circle img-responsive" />
                  </figure>
                </div>
              </div>
              <div className="col-xs-12 text-center">
                <div className="col-xs-12 col-sm-3 emphasis">
                  <div className="btn-group dropup btn-block">
                    <button type="button" className="btn btn-primary"><span className="fa fa-gear"/> Опции</button>
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                      <span className="caret"/>
                      <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu text-right" role="menu">
                      <li><a href="#"><span className="fa fa-list pull-right"/> Редактировать профиль </a></li>
                      <li><a href="#"><span className="fa fa-user pull-right"/> Изменить аватар </a></li>
                      <li className="divider"/>
                      <li><a href="#"><span className="fa fa-cutlery pull-right"/> Управление подписками </a></li>
                      <li className="divider"/>
                      <li><a href="#"><span className="fa fa-window-close pull-right"/> Выход </a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewProfile;