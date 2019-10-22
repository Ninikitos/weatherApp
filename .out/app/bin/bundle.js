var _ = (function (React) {
    'use strict';

    React = React && React.hasOwnProperty('default') ? React['default'] : React;

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
        this.state = {
          currentTemp: props.temperature,
          currentCity: props.city,
          currentCondition: props.condition
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
        }, this.state.currentCondition));
      }

    }

    return MyApp;

}(React));
