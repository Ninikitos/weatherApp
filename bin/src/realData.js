import React from '../node_modules/react/index.js';
import { View, Button } from 'lumin';
import { defineProperty as _defineProperty } from '../_virtual/_rollupPluginBabelHelpers.js';

// const Plantation_City_code = 4168782;
// // async function getData() {
// //     let api_call = await fetch(`api.openweathermap.org/data/2.5/weather?q=${Plantation_City_code},US&appid=${API_KEY}`);
// //     // if (!api_call.ok) {
// //     //     throw new Error("HTTP error, status = " + api_call.status);
// //     // }
// //     let json = await api_call.json();
// //     print(JSON.stringify(json));
// // //   let string = "basicFetch - Success:\n";
// // //   string += JSON.stringify(json);
// // }
// const data = () => {
// }

class Data extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onButtonClick", async () => {
      let api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Plantation,US&appid=0f4670104e656aa457f158cbe7631c18`);

      if (!api_call.ok) {
        throw new Error("HTTP error, status = " + api_call.status);
      }

      let json = await api_call.json();
      print(JSON.stringify(json));
    });
  }

  render() {
    return React.createElement(View, {
      name: "data-view"
    }, React.createElement(Button, {
      onClick: this.onButtonClick
    }, "Get Data"));
  }

}

export default Data;
