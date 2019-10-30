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
      const newState = await this.getAppData(this.getCity(), this.getTempUnits());
      print("componentDidMount works", JSON.stringify(newState));
      this.setState(newState);
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

    _defineProperty(this, "setModelIcon", () => {
      let result = "";

      if (this.state.currentCondition === 'scattered clouds' || this.state.currentCondition === 'broken clouds') {
        result = 'res/cloudy_plantation.glb';
      } else if (this.state.currentCondition === 'few clouds' || this.state.currentCondition === 'clear sky') {
        result = 'res/sunny_plantation.glb';
      } else if (this.state.currentCondition === 'shower rain' || this.state.currentCondition === 'rain' || this.state.currentCondition === 'thunderstorm' || this.state.currentCondition === 'mist') {
        result = 'res/rainy_plantation.glb';
      } else {
        print("There is no snow in Florida");
      }

      print("setModelIcon Result: " + result);
      return result;
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
      useMetricUnits: false
    };
  }

  render() {

    let flooredTemp = Math.floor(this.state.currentTemp);
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
    }, React.createElement(Model, {
      modelPath: `${this.setModelIcon()}`,
      importScale: 20,
      localScale: [0.0020, 0.0020, 0.0020]
    })), React.createElement(GridLayout, {
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
