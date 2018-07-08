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
      <button onClick={() => this.setState(prevState => ({ toggled: !prevState.toggled }))}>
        {this.props.text}
        {this.state.toggled ? ' selected' : this.props.children}
      </button>
    );
  }
}

export default Button;
