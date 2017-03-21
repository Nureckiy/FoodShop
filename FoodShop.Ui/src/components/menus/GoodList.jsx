/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import AddGoodModal from './AddGoodModal.jsx';
import Tile from '../common/Tile.jsx';

class GoodList extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      currentGood: {}
    };
    this.closeModal = this.closeModal.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  openModal(item) {
    this.setState({
      showModal: true,
      currentGood: item
    });
  }
  closeModal() {
    this.setState({ showModal: false });
  }
  onSave(saved) {
    let { onSelect } = this.props;
    this.closeModal();
    onSelect(saved);
  }
  render() {
    const { selected, items } = this.props;
    const { showModal, currentGood } = this.state;
    const model = selected.find(x => x.id === currentGood.id);
    return (
      <div className="row">
        <AddGoodModal
          show={showModal}
          onHide={this.closeModal}
          onSave={this.onSave}
          model={model ? model : currentGood}
        />
        {items.map(item =>
          <Tile key={item.id} item={item} onClick={() => this.openModal(item)} />
        )}
      </div>
    );
  }
}

export default GoodList;