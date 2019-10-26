import React from '../node_modules/react/index.js';
import Data from './data.js';
import RealData from './realData.js';
import { View, Text, Button, Model, ScrollView, ScrollBar, LinearLayout } from '../node_modules/magic-script-components/src/components.js';

//
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    let fakeData = new Data();
    this.state = {
      currentTemp: fakeData.temperature.Friday,
      currentCity: fakeData.city,
      currentCondition: fakeData.conditions.Sunny,
      currentTime: fakeData.hours[0],
      currentDay: fakeData.days[5]
    };
  }

  render() {
    const aabb = {
      min: [-0.45, -0.15, -0.1],
      max: [0.45, 0.15, 0.1]
    };
    const realData = React.createElement(RealData, null);
    const time = ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12pm'];
    return React.createElement(View, {
      name: "main-view"
    }, React.createElement(Text, {
      textSize: 0.15,
      localPosition: [0, 0.2, 0],
      weight: "bold",
      textAlignment: 'center'
    }, this.state.currentTemp), React.createElement(Text, {
      textSize: 0.03,
      localPosition: [0.2, 0.285, 0],
      weight: "medium",
      textAlignment: 'center'
    }, this.state.currentCity), React.createElement(Text, {
      textSize: 0.03,
      localPosition: [0.2, 0.225, 0],
      weight: "medium",
      textAlignment: 'center'
    }, this.state.currentCondition), React.createElement(Text, {
      textSize: 0.13,
      localPosition: [-0.250, -0.150, 0],
      weight: "medium",
      textAlignment: 'center'
    }, this.state.currentDay), React.createElement(Button, null, "Get Weather"), React.createElement(Model, {
      modelPath: "res/Clouds.fbx",
      localScale: [0.0020, 0.0020, 0.0020],
      localPosition: [-0.180, 0.050, 0]
    }), React.createElement(ScrollView, {
      scrollBarVisibility: "always",
      scrollBounds: aabb,
      localPosition: [0, -0.3, 0],
      scrollDirection: "horizontal"
    }, React.createElement(ScrollBar, {
      width: 0.4,
      thumbSize: 0.04,
      orientation: "horizontal"
    }), React.createElement(LinearLayout, {
      defaultItemAlignment: "center-center",
      defaultItemPadding: [0.02, 0.07, 0.02, 0.07],
      orientation: "horizontal"
    }, time.map((hour, index) => React.createElement(Text, {
      textSize: 0.07,
      key: index,
      text: `${hour}`
    })))), realData);
  }

}

export default MyApp;
