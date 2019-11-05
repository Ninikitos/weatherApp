import React from '../node_modules/react/index.js';
import { defineProperty as _defineProperty } from '../_virtual/_rollupPluginBabelHelpers.js';
import Data from './data.js';
import FakeData from './fakeData.js';
import { View, GridLayout, Model, Text, Toggle } from '../node_modules/magic-script-components/src/components.js';

class MyApp extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "getTempUnits", () => this.state.useMetricUnits ? 'metric' : 'imperial');

    _defineProperty(this, "getCity", () => '4168782');

    _defineProperty(this, "getAppData", async (cityId, units) => {
      const data = await this.data.getData(cityId, units);
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
            modelPath: 'res/cloudy_plantation.glb'
          });
        } else if (this.state.currentCondition === 'few clouds' || this.state.currentCondition === 'clear sky') {
          this.setState({
            timeIntervalFinished: true,
            modelPath: 'res/sunny_plantation.glb'
          });
        } else if (this.state.currentCondition === 'shower rain' || this.state.currentCondition === 'rain' || this.state.currentCondition === 'thunderstorm' || this.state.currentCondition === 'mist') {
          this.setState({
            timeIntervalFinished: true,
            modelPath: 'res/rainy_plantation.glb'
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
    const fakeData = new FakeData();
    this.state = {
      currentTemp: "undefined",
      currentCity: "undefined",
      currentCondition: "undefined",
      currentHumidity: "undefined",
      currentMinTemp: "undefined",
      currentMaxTemp: "undefined",
      currentTime: fakeData.hours[0],
      useMetricUnits: false,
      modelPath: undefined,
      timeIntervalFinished: false
    };
  }

  render() {
    // const aabb = {
    //   min: [-0.45, -0.15, -0.1],
    //   max: [0.45, 0.15, 0.1]
    // };
    // const time = ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12pm'];
    let flooredTemp = Math.floor(this.state.currentTemp);
    print('Model path = ' + this.state.modelPath);
    return React.createElement(View, {
      name: "main-view"
    }, React.createElement(GridLayout, {
      name: "content-grid",
      rows: 2,
      defaultItemPadding: [0, 0, 0.1, 0.5],
      localPosition: [-1.05, 0.4, 0],
      defaultItemAlignment: "center-center"
    }, React.createElement(GridLayout, {
      name: "model-grid",
      defaultItemAlignment: "center-center"
    }, this.state.modelPath !== undefined ? React.createElement(Model, {
      modelPath: this.state.modelPath,
      importScale: 20,
      localScale: [0.0020, 0.0020, 0.0020]
    }) : null), React.createElement(GridLayout, {
      name: "content-grid",
      rows: 2,
      columns: 3,
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
    }, this.state.currentHumidity, "% Humidity"))));
  }

}

export default MyApp;
