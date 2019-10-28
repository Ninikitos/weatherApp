import React from '../node_modules/react/index.js';
import { defineProperty as _defineProperty } from '../_virtual/_rollupPluginBabelHelpers.js';
import Data from './data.js';
import FakeData from './fakeData.js';
import { View, Text, Model, ScrollView, ScrollBar, LinearLayout } from '../node_modules/magic-script-components/src/components.js';

class MyApp extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", async () => {
      const data = await this.data.getData();
      this.setState({
        currentTemp: data.temperature,
        currentCity: data.city,
        currentCondition: data.condition
      });
      print("  works");
    });

    this.data = new Data();
    const fakeData = new FakeData();
    this.state = {
      currentTemp: "undefined",
      currentCity: "undefined",
      currentCondition: "undefined",
      currentTime: fakeData.hours[0],
      currentDay: fakeData.days[0]
    };
  } // onButtonClick = async () => {
  //   let result;
  //   try {
  //     result = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Plantation,US&appid=0f4670104e656aa457f158cbe7631c18'); 
  //   } catch(error) {
  //     print(`API Data Fetch error: ${error.message}`);
  //   }
  //   let jsonData;
  //   try {
  //     jsonData = await result.json();
  //   } catch(error) {
  //     print(`JSON conversion error: ${error.message}`);
  //   }
  //    console.log('JSON Data:', jsonData);
  //    print(JSON.stringify(jsonData));
  // }


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
    }, this.state.currentDay), React.createElement(Model, {
      modelPath: 'res/donut.fbx',
      materialPath: 'res/donut.kmat',
      texturePaths: ['res/Black.png', 'res/Grey.png', 'res/Normal.png', 'res/White.png'],
      textureName: 'donut_material',
      importScale: 5,
      defaultTextureIndex: 0,
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
