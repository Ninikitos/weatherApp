import React from '../node_modules/react/index.js';
import { View, Text } from '../node_modules/magic-script-components/src/components.js';

//
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTemp: props.temperature,
      currentCity: props.city,
      currentCondition: props.condition
    };
  }

  render() {
    return React.createElement(View, {
      name: "main-view"
    }, React.createElement(Text, {
      textSize: 0.13,
      localPosition: [0.1, 0.4, 0],
      weight: "bold",
      textAlignment: 'center'
    }, this.state.currentTemp), React.createElement(Text, {
      textSize: 0.06,
      localPosition: [0.1, 0.3, 0],
      weight: "medium",
      textAlignment: 'center'
    }, this.state.currentCity), React.createElement(Text, {
      textSize: 0.06,
      localPosition: [0.1, 0.2, 0],
      weight: "medium",
      textAlignment: 'center'
    }, this.state.currentCondition));
  }

}

export default MyApp;
