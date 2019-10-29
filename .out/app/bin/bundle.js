var _ = (function (React) {
  'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
  const appId = '0f4670104e656aa457f158cbe7631c18';
  class Data {
    constructor() {
      _defineProperty(this, "getData", async (...parameters) => {
        const data = await this.requestData(...parameters);
        return {
          temperature: data.main.temp,
          city: data.name,
          condition: data.weather[0].description,
          humidity: data.main.humidity,
          tempMin: data.main.temp_min,
          tempMax: data.main.temp_max
        };
      });

      _defineProperty(this, "requestData", async (cityId, units) => {
        let result;

        try {
          // 'id=4168782&&units=imperial'
          result = await fetch(`${baseURL}&id=${cityId}&units=${units}&appid=${appId}`);
        } catch (error) {
          print(`API Data Fetch error: ${error.message}`);
        }

        let jsonData;

        try {
          jsonData = await result.json();
        } catch (error) {
          print(`JSON conversion error: ${error.message}`);
        }

        return jsonData;
      });
    }

  }

  class FakeData {
    constructor() {
      this.temperature = {
        Monday: 90,
        Tuesday: 90,
        Wednesday: 90,
        Thursday: 90,
        Friday: 90,
        Saturday: 90,
        Sunday: 90
      };
      this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      this.hours = [{
        onePm: 1
      }, {
        twoPm: 2
      }, {
        threePm: 3
      }, {
        fourPm: 4
      }, {
        fivePm: 5
      }, {
        sixPm: 6
      }, {
        sevenPm: 7
      }, {
        eightPm: 8
      }, {
        ninePm: 9
      }, {
        tenPm: 10
      }, {
        elevenPm: 11
      }, {
        twelvePm: 12
      }];
      this.city = 'Miami';
      this.conditions = {
        Sunny: 'Sunny',
        Rainy: 'Rainy',
        Cloudy: 'Cloudy',
        Snow: 'Snow'
      };
    }

  }

  function Model (props) {
      // return (<model {...props} />);
      return React.createElement('model', props);
  }

  function Text (props) {
      // return (<text {...props} />);
      return React.createElement('text', props);
  }

  function View (props) {
      // return (<view {...props} />);
      return React.createElement('view', props);
  }

  function Toggle (props) {
      return React.createElement('toggle', props);
  }

  function ScrollBar (props) {
      // return (<scrollBar {...props} />);
      return React.createElement('scrollBar', props);
  }

  function ScrollView (props) {
      // return (<scrollView {...props} />);
      return React.createElement('scrollView', props);
  }

  function LinearLayout (props) {
      // return (<linearLayout {...props} />);
      return React.createElement('linearLayout', props);
  }

  class MyApp extends React.Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "getTempUnits", () => this.state.useMetricUnits ? 'metric' : 'imperial');

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

      _defineProperty(this, "getCity", () => '4168782');

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
      const aabb = {
        min: [-0.45, -0.15, -0.1],
        max: [0.45, 0.15, 0.1]
      };
      const time = ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12pm'];
      let flooredTemp = Math.floor(this.state.currentTemp);
      return React.createElement(View, {
        name: "main-view"
      }, React.createElement(Text, {
        textSize: 0.15,
        localPosition: [0, 0.2, 0],
        weight: "bold",
        textAlignment: 'center'
      }, flooredTemp), React.createElement(Text, {
        textSize: 0.05,
        localPosition: [0.2, 0.285, 0],
        weight: "medium",
        textAlignment: 'center'
      }, this.state.currentCity), React.createElement(Text, {
        textSize: 0.05,
        localPosition: [0.2, 0.225, 0],
        weight: "medium",
        textAlignment: 'center'
      }, this.state.currentCondition), React.createElement(Text, {
        textSize: 0.05,
        localPosition: [0.2, 0.165, 0],
        weight: "medium",
        textAlignment: 'center'
      }, this.state.currentHumidity, "% Humidity"), React.createElement(Text, {
        textSize: 0.1,
        localPosition: [-0.050, -0.050, 0],
        weight: "medium",
        textAlignment: 'center'
      }, this.getCurrentDay()), React.createElement(Text, {
        textSize: 0.05,
        localPosition: [-0.020, -0.1250, 0],
        weight: "medium",
        textAlignment: 'center'
      }, this.getCurrentMonthAndDay()), React.createElement(Toggle, {
        textSize: 0.03,
        localPosition: [0.13, 0.165, 0],
        text: "F / \xB0C",
        onToggleChanged: this.onToggleChangedHandler
      }), React.createElement(Model, {
        modelPath: 'res/sunny_plantation.glb',
        importScale: 12,
        localScale: [0.0020, 0.0020, 0.0020],
        localPosition: [-0.3, 0.250, 0]
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

  return MyApp;

}(React));
