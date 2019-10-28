import React from '../node_modules/react/index.js';
import { defineProperty as _defineProperty } from '../_virtual/_rollupPluginBabelHelpers.js';
import Data from './data.js';
import { View, Text, Button, Model, ScrollView, ScrollBar, LinearLayout } from '../node_modules/magic-script-components/src/components.js';

class MyApp extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onButtonClick", async data => {
      const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Plantation,US&appid=0f4670104e656aa457f158cbe7631c18');

      if (!api_call.ok) {
        throw new Error("HTTP error, status = " + api_call.status);
      }

      const json = await api_call.json(); // export function makeButton(prism, text) {
      //   const { UiButton, EclipseButtonParams, EclipseButtonType } = ui;
      //   let prms = new EclipseButtonParams(EclipseButtonType.kText, "Press me");
      //   let node = UiButton.CreateEclipseButton(prism, prms);
      //   node.onActivateSub(uiEventData => {
      //     basicFetch(text).catch(error => {
      //       text.setText("basicFetch - Error: " + error.message);
      //     });
      //   });
      //   return node;
      // }

      api_call.catch(error => {
        print("basicFetch - Error: " + error.message);
      });
      print(JSON.stringify(json));
    });

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
    }, this.state.currentDay), React.createElement(Button, {
      onClick: this.onButtonClick
    }, "Get weather"), React.createElement(Model, {
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
    })))));
  }

}

export default MyApp;
