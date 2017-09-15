import React, { Component } from 'react';

import { Collapse } from 'react-bootstrap';

class Snackbar extends Component {

  constructor(props) {
    super(props);
    this.state = { show: props.show };
    this.close = this.close.bind(this);
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show && this.props.show) {
      this.runTimer();
    }
  }

  render() {
    const { show } = this.state;
    const { children } = this.props;
    return (
      <Collapse in={show} className="snackbar">
        <span>
          <div className="snackbar-content">
            { children }
          </div>
        </span>
      </Collapse>
    );
  }

  runTimer() {
    const { autoHideTimeout } = this.props;
    this.setState({ show: true });
    setTimeout(this.close, autoHideTimeout);
  }

  close() {
    const { onClose } = this.props;
    this.setState({ show: false });
    onClose();
  }
}

export default Snackbar;