import React from '../node_modules/react/index.js';
import { View } from 'lumin';
import { defineProperty as _defineProperty } from '../_virtual/_rollupPluginBabelHelpers.js';

// const API_KEY = '0f4670104e656aa457f158cbe7631c18';
// const Plantation_City_code = 4168782;
// async function getData() {
//     let api_call = await fetch(`api.openweathermap.org/data/2.5/weather?q=${Plantation_City_code},US&appid=${API_KEY}`);
//     if (!api_call.ok) {
//         throw new Error("HTTP error, status = " + api_call.status);
//     }
//     let json = await api_call.json();
//     print(JSON.stringify(json));
//   let string = "basicFetch - Success:\n";
//   string += JSON.stringify(json);
// }

class RealData extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "requestData", async () => {
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

    this.props = props;
  }

  render() {
    return React.createElement(View, {
      name: "data-view"
    });
  }

}

export default RealData;
