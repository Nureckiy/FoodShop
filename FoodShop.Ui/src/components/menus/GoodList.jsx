/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

import AddGoodModal from './AddGoodModal.jsx';

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
    return (
      <div className="row">
        <AddGoodModal
          show={showModal}
          onHide={this.closeModal}
          onSave={this.onSave}
          model={currentGood}
          selected={selected}
        />
        {items.map((item, key) =>
          <div key={key} className="col-lg-4 col-md-4 col-sm-6" onClick={() => this.openModal(item)}>
            <a className="fh5co-card-item image-popup">
              <figure>
                <div className="overlay"><i className="ti-plus"/></div>
                <img src={item.ImageUrl} alt="Image" className="img-responsive" />
              </figure>
              <div className="fh5co-text">
                <h2>{item.Name}</h2>
                <p>{item.Description}</p>
                <p><span className="price cursive-font">$1</span></p>
              </div>
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default GoodList;