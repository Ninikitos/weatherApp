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

  class Data {
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

      _defineProperty(this, "onButtonClick", async data => {
        let result;

        try {
          result = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Plantation,US&appid=0f4670104e656aa457f158cbe7631c18');
        } catch (error) {
          print(`API Data Fetch error: ${error.message}`);
        }

        let jsonData;

        try {
          jsonData = await result.json();
        } catch (error) {
          print(`JSON conversion error: ${error.message}`);
        }

        console.log('JSON Data:', jsonData);
        print(JSON.stringify(jsonData));
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

  return MyApp;

}(React));
