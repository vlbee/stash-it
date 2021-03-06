import React from 'react';
import './button.css';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
    }
  };

  render() {
    return (
      <button onClick={(e) => {
        this.props.handle247(e);
        this.setState(prevState => ({ toggled: !prevState.toggled }))
      }}>
        {this.props.text}
        {this.state.toggled ? ' Only' : this.props.children}
      </button>
    );
  }
}

export default Button;
