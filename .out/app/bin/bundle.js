var _ = (function (React) {
    'use strict';

    React = React && React.hasOwnProperty('default') ? React['default'] : React;

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
        this.city = 'Miami';
        this.condition = {
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
          modelPath: "res/Clouds.fbx",
          materialPath: "res/Cloud_Material.kmat",
          localScale: [0.0020, 0.0020, 0.0020]
        }));
      }

    }

    return MyApp;

}(React));
