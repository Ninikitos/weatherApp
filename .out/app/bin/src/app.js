import React from '../node_modules/react/index.js';
import { defineProperty as _defineProperty } from '../_virtual/_rollupPluginBabelHelpers.js';
import Data from './data.js';
import { View, LinearLayout, Model, Audio, GridLayout, Text, Toggle, ScrollView, ScrollBar } from '../node_modules/magic-script-components/src/components.js';

class MyApp extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "getTempUnits", () => this.state.useMetricUnits ? 'metric' : 'imperial');

    _defineProperty(this, "getCity", () => '4168782');

    _defineProperty(this, "getAppData", async (cityId, units) => {
      const data = await this.data.getData(cityId, units);
      print("Whole Data set", JSON.stringify(data));
      return {
        currentTemp: data.temperature,
        currentCity: data.city,
        currentCondition: data.condition,
        currentHumidity: data.humidity,
        currentMinTemp: data.temp_min,
        currentMaxTemp: data.temp_max
      };
    });

    _defineProperty(this, "componentDidMount", async () => {
      // Plantation: 4168782
      // debugger;
      const newState = await this.getAppData(this.getCity(), this.getTempUnits());
      print("componentDidMount works", JSON.stringify(newState));
      this.setState(newState);
      this.timeOutForModel();
    });

    _defineProperty(this, "timeOutForModel", () => {
      setTimeout(() => {
        print("this.state.currentCondition before condition: " + this.state.currentCondition);

        if (this.state.currentCondition === 'scattered clouds' || this.state.currentCondition === 'broken clouds') {
          this.setState({
            timeIntervalFinished: true,
            modelPath: 'res/cloudy_plantation.glb',
            audioPath: 'res/ES_Wind Storm Forest 1 - SFX Producer.mp3'
          });
        } else if (this.state.currentCondition === 'few clouds' || this.state.currentCondition === 'clear sky') {
          this.setState({
            timeIntervalFinished: true,
            modelPath: 'res/sunny_plantation.glb',
            audioPath: 'res/ES_Sunny Field With Birds - Organic Nature Sounds.mp3'
          });
        } else if (this.state.currentCondition === 'shower rain' || this.state.currentCondition === 'rain' || this.state.currentCondition === 'thunderstorm' || this.state.currentCondition === 'mist' || this.state.currentCondition === 'light rain') {
          this.setState({
            timeIntervalFinished: true,
            modelPath: 'res/rainy_plantation.glb',
            audioPath: 'res/ES_Rain Heavy 4 - SFX Producer.mp3'
          });
        } else {
          print("There is no snow in Florida");
        }

        print("this.state.currentCondition after condition: " + this.state.currentCondition);
      }, 2000);
    });

    _defineProperty(this, "onToggleChangedHandler", async () => {
      const tempUnit = this.state.useMetricUnits ? 'imperial' : 'metric';
      const newState = await this.getAppData(this.getCity(), tempUnit);
      this.setState(state => ({ ...newState,
        useMetricUnits: !state.useMetricUnits
      }));
    });

    _defineProperty(this, "getCurrentDay", () => {
      let date = new Date();
      let currentWeekDay = date.getDay();
      let weekDayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return weekDayArr[currentWeekDay - 1];
    });

    _defineProperty(this, "getCurrentMonthAndDay", () => {
      let date = new Date();
      let currentDay = date.getDate();
      let currentMonth = date.getMonth();
      let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let newDate = allMonths[currentMonth] + " " + currentDay;
      return newDate;
    });

    this.data = new Data();
    this.state = {
      currentTemp: "undefined",
      currentCity: "undefined",
      currentCondition: "undefined",
      currentHumidity: "undefined",
      currentMinTemp: "undefined",
      currentMaxTemp: "undefined",
      useMetricUnits: false,
      modelPath: undefined,
      audioPath: undefined,
      timeIntervalFinished: false
    };
  }

  // calcRotation = () => {
  //   const tempArr = new Array(4);
  //   const rot = quat.fromEuler([], 0, 180, 0);
  //   tempArr[0] = rot[0];
  //   tempArr[1] = rot[1];
  //   tempArr[2] = rot[2];
  //   tempArr[3] = rot[3];
  //   print(tempArr + rot);
  //   return tempArr;
  // }
  render() {
    const aabb = {
      min: [-0.45, -0.15, -0.1],
      max: [0.45, 0.15, 0.1]
    };
    const time = ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12pm', '1am', '2am', '3am', '4am', 'am', '6am', '7am', '8am', '9am', '10am', '11am', '12am'];
    let flooredTemp = Math.floor(this.state.currentTemp);
    print('Model path = ' + this.state.modelPath);
    return React.createElement(View, {
      name: "main-view"
    }, React.createElement(LinearLayout, {
      name: "model-grid",
      defaultItemAlignment: "center-center",
      localPosition: [-0.150, 0.6, 0]
    }, this.state.modelPath !== undefined ? React.createElement(View, null, React.createElement(Model, {
      modelPath: this.state.modelPath,
      importScale: 20,
      localScale: [0.0020, 0.0020, 0.0020]
    }), React.createElement(Audio, {
      fileName: this.state.audioPath,
      loadFile: true,
      action: "start"
    })) : null), React.createElement(GridLayout, {
      name: "content-grid",
      rows: 2,
      columns: 3,
      localPosition: [-0.550, 0.250, 0],
      defaultItemAlignment: "center-left",
      defaultItemPadding: [0, 0.005, 0, 0.1]
    }, React.createElement(Text, {
      textSize: 0.05,
      weight: "medium",
      textAlignment: 'center'
    }, this.getCurrentDay()), React.createElement(Text, {
      textSize: 0.2,
      weight: "bold",
      textAlignment: 'center'
    }, flooredTemp), React.createElement(Text, {
      textSize: 0.05,
      weight: "medium",
      textAlignment: 'center'
    }, this.state.currentCondition), React.createElement(Text, {
      textSize: 0.05,
      weight: "medium",
      textAlignment: 'center'
    }, this.getCurrentMonthAndDay()), React.createElement(Toggle, {
      textSize: 0.03,
      text: "F / \xB0C",
      onToggleChanged: this.onToggleChangedHandler
    }), React.createElement(Text, {
      textSize: 0.05,
      weight: "medium",
      textAlignment: 'center'
    }, this.state.currentHumidity, "% Humidity")), React.createElement(ScrollView, {
      scrollBarVisibility: "always",
      scrollBounds: aabb,
      localPosition: [0, -0.3, 0],
      scrollDirection: "horizontal"
    }, React.createElement(ScrollBar, {
      width: 0.4,
      thumbSize: 0.04,
      orientation: "horizontal"
    }), React.createElement(LinearLayout, {
      localPosition: [-0.2, -0.2, 0],
      defaultItemAlignment: "center-left",
      defaultItemPadding: [0.02, 0.0, 0.02, 0.06],
      orientation: "horizontal"
    }, time.map((hour, index) => React.createElement(View, null, React.createElement(Text, {
      localPosition: [0, 0.1, 0],
      textSize: 0.04,
      key: index
    }, "24 Cel"), React.createElement(Text, {
      textSize: 0.07,
      key: index,
      text: `${hour}`
    }))))));
  }

}

export default MyApp;
