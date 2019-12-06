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

  // const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
  const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?';
  const appId = '0f4670104e656aa457f158cbe7631c18';
  class Data {
    constructor() {
      _defineProperty(this, "getData", async (...parameters) => {
        const data = await this.requestData(...parameters);
        return {
          temperature: data.list[0].main.temp,
          cityByZipId: data.city.name,
          condition: data.list[0].weather[0].description,
          humidity: data.list[0].main.humidity,
          tempMin: data.list[0].main.temp_min,
          tempMax: data.list[0].main.temp_max,
          timeOfDay12am: data.list[0].main.temp,
          timeOfDay3am: data.list[1].main.temp,
          timeOfDay6am: data.list[2].main.temp,
          timeOfDay9am: data.list[3].main.temp,
          timeOfDay12pm: data.list[4].main.temp,
          timeOfDay3pm: data.list[5].main.temp,
          timeOfDay6pm: data.list[6].main.temp,
          timeOfDay9pm: data.list[7].main.temp,
          timeOfDay12am: data.list[8].main.temp
        };
      });

      _defineProperty(this, "requestData", async (cityByZipId, units) => {
        let result;

        try {
          // 'id=4168782&&units=imperial'
          result = await fetch(`${baseURL}&zip=${cityByZipId}&units=${units}&appid=${appId}`);
          print(JSON.stringify(result));
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

  function Button (props) {
      // return (<button {...props} />);
      return React.createElement('button', props);
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

  function GridLayout (props) {
      // return (<gridLayout {...props} />);
      return React.createElement('gridLayout', props);
  }

  function LinearLayout (props) {
      // return (<linearLayout {...props} />);
      return React.createElement('linearLayout', props);
  }

  function Audio (props) {
      // return (<audio {...props} />);
      return React.createElement('audio', props);
  }

  class MyApp extends React.Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "getTempUnits", () => this.state.useMetricUnits ? 'metric' : 'imperial');

      _defineProperty(this, "getCityZip", () => '33313');

      _defineProperty(this, "getAppData", async (cityByZipId, units) => {
        const data = await this.data.getData(cityByZipId, units);
        return {
          currentTemp: data.temperature,
          currentCityByZip: data.cityByZipId,
          currentCondition: data.condition,
          currentHumidity: data.humidity,
          currentMinTemp: data.temp_min,
          currentMaxTemp: data.temp_max,
          timeOfDay: [{
            time: '12am',
            temp: data.timeOfDay12am
          }, {
            time: '3am',
            temp: data.timeOfDay3am
          }, {
            time: '6am',
            temp: data.timeOfDay6am
          }, {
            time: '9am',
            temp: data.timeOfDay9am
          }, {
            time: '12pm',
            temp: data.timeOfDay12pm
          }, {
            time: '3pm',
            temp: data.timeOfDay3pm
          }, {
            time: '6pm',
            temp: data.timeOfDay6pm
          }, {
            time: '9pm',
            temp: data.timeOfDay9pm
          }, {
            time: '12am',
            temp: data.timeOfDay12am
          }]
        };
      });

      _defineProperty(this, "componentDidMount", async () => {
        const newState = await this.getAppData(this.getCityZip(), this.getTempUnits());
        this.setState(newState);
        this.timeOutForModel();
      });

      _defineProperty(this, "timeOutForModel", () => {
        setTimeout(() => {
          if (this.state.currentCondition === 'few clouds' || this.state.currentCondition === 'clear sky') {
            this.setState({
              timeIntervalFinished: true,
              modelPath: 'res/sunny_plantation.glb',
              audioPath: 'res/ES_Sunny Field With Birds - Organic Nature Sounds.mp3'
            });
          } else if (this.state.currentCondition === 'scattered clouds' || this.state.currentCondition === 'broken clouds') {
            this.setState({
              timeIntervalFinished: true,
              modelPath: 'res/cloudy_plantation.glb',
              audioPath: 'res/ES_Wind Storm Forest 1 - SFX Producer.mp3'
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
        }, 2000);
      });

      _defineProperty(this, "onToggleChangedHandler", async () => {
        const tempUnit = this.state.useMetricUnits ? 'imperial' : 'metric';
        const newState = await this.getAppData(this.getCityZip(), tempUnit);
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
        currentCityByZip: "undefined",
        currentCondition: "undefined",
        isConditionChanged: true,
        currentHumidity: "undefined",
        currentMinTemp: "undefined",
        currentMaxTemp: "undefined",
        timeOfDay: [],
        useMetricUnits: false,
        modelPath: undefined,
        audioPath: undefined,
        timeIntervalFinished: false
      };
    }

    render() {
      const aabb = {
        min: [-0.45, -0.15, -0.1],
        max: [0.45, 0.15, 0.1]
      };
      let flooredTemp = Math.floor(this.state.currentTemp);
      return React.createElement(View, {
        name: "main-view"
      }, React.createElement(Button, {
        localPosition: [-0.5, 0.4, 0],
        type: "icon",
        iconType: "exit",
        height: 0.1,
        width: 0.1,
        roundness: 0.02,
        textSize: 0.03
      }), React.createElement(LinearLayout, {
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
        action: "start",
        soundLooping: true,
        spatialSoundEnable: true
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
        localPosition: [-0.3, -0.2, 0],
        defaultItemAlignment: "center-center",
        defaultItemPadding: [0.02, 0.06, 0.04, 0.06],
        orientation: "horizontal"
      }, this.state.timeOfDay.map((data, index) => React.createElement(LinearLayout, null, React.createElement(Text, {
        localPosition: [0, 0.1, 0],
        textSize: 0.04,
        key: index
      }, Math.floor(data.temp)), React.createElement(Text, {
        textSize: 0.07,
        key: index,
        text: `${data.time}`
      }))))));
    }

  }

  return MyApp;

}(React));
