import React from 'react';
import { BasicPicker } from 'react-color-tools';


class ColorPicker extends React.Component {
  state = {
    color: 'skyBlue',
  };

  render() {
    const themeColor = this.state.color;
    return (
      <div>
        <BasicPicker
          color={this.state.color}
          onChange={color => this.setState({ color })}
        />
        <br />
        <h1 style={{ color: themeColor }}>You had choosen this color</h1>
      </div>
    );
  }
}
export default ColorPicker;
