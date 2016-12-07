import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MotionMenu from './MotionMenu/MotionMenu'
import SpacedMotionMenu from './SpacedMotionMenu/SpacedMenu'

const btn = {iconSrc: logo}
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>react-motion-menu</h2>
        </div>
        <div className="App-intro">
          <h3>Basic MotionMenu</h3>
          <div className="App-container">
            <MotionMenu
              className="centered blue"
              btns={[btn,btn,btn,btn,btn]}
              angle={35} />
          </div>
          <h3>Corner menu example</h3>
          <div className="App-container">
            <MotionMenu
              className="btmRight"
              btns={[btn,btn,btn,btn]}
              spaceBetween={22}
              btnRadius={20}
              mainBtnRadius={30}
              angle={37}
              angleOffset={45} />
          </div>
          <h3>SpacedMotionMenu - <small>example of evenly spaced buttons using SpacedMotionMenu component</small></h3>
          <div className="App-container">
            <SpacedMotionMenu className="centered" btns={[btn,btn,btn,btn,btn,btn]} spaceBetween={20} />
          </div>
          <h3>CrazyMenu - <small>example of changing springConfig for animation</small></h3>
          <div className="App-container">
            <MotionMenu
              className="centered purple"
              btns={[btn,btn,btn,btn,btn,btn]}
              btnRadius={20}
              angle={20}
              angleOffset={-90}
              spaceBetween={80}
              springConfig={{
                open: {stiffness: 200, damping: 13},
                close: {stiffness: 20, damping: 22}
              }}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
