import React from 'react';
import { Button } from 'react-bootstrap';

import TotalGoodItem from './TotalGoodItem.jsx';
import * as utils from '../../utils/utils';

const EditSelectedList = props => {
  const { selected, clearAll, onChange, onSubmit, translate } = props;
  const total = utils.calculateSelectedTotal(selected);
  return (
    <div className="row good-list">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <h2 className="cursive-font primary-color">{translate('basket')}</h2>
        </div>
      </div>
      <form className="col-sm-12 col-xs-12" onSubmit={onSubmit}>
        <ul>
          {selected.map(good =>
            good.selected.map(item =>
              <TotalGoodItem
                key={item.id}
                title={good.name}
                item={item}
                onChange={onChange}
              />
            ))}
          <li className="dotted">
            <span className="col-sm-10 item">
            <span className="primary-color">{translate('total')}</span><span className="sum">{total.toFixed(2)} $</span>
            </span>
          </li>
        </ul>
        <div className="col-sm-12 buttons text-center top-indent">
          <Button bsStyle="primary" type="submit">{translate('toOrder')}</Button>
          <Button type="button" onClick={clearAll}>{translate('clear')}</Button>
        </div>
      </form>
    </div>
  );
};

export default EditSelectedList;
