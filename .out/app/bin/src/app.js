import React from '../node_modules/react/index.js';
import Data from './data.js';
import { View, Text, Model } from '../node_modules/magic-script-components/src/components.js';

//
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    let fakeData = new Data();
    this.state = {
      currentTemp: fakeData.temperature.Friday,
      currentCity: fakeData.city,
      currentCondition: fakeData.condition.Sunny
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
    }, this.state.currentCondition), React.createElement(Model, {
      modelPath: "res/model.fbx",
      localScale: [0.0015, 0.0015, 0.0015]
    }));
  }

}

export default MyApp;
