/*eslint no-unused-vars: "off"*/
import React, { Component } from 'react';

class Slider extends Component {
  constructor() {
    super();
    this.state = {
      checked: 0
    };
  }
  render() {
    const { images } = this.props;
    const { checked } = this.state;
    return (
      <div className="slider">
        {images && images.map((image, key) => [
          <input
            type="radio"
            name="slide_switch"
            id={key}
            checked={checked === key}
            onChange={() => this.setState({ checked: key })}
          />,
          <label htmlFor={key}><img src={image} width="100"/></label>,
          <img src={image} />
        ])}
      </div>
    );
  }
}

export default Slider;