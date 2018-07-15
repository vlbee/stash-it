
import React from 'react';
import Button from '../button/button'
import './header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <header>
        <h1>Find It, Stash It</h1>
        <div className="filter-list">
          <Button text="Open 24/7" handle247={this.props.handle247} />
        </div>
      </header>
    );
  }
}

export default Header;
