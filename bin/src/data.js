import '../node_modules/react/index.js';
import { defineProperty as _defineProperty } from '../_virtual/_rollupPluginBabelHelpers.js';

class Data {
  constructor() {
    _defineProperty(this, "getData", async () => {
      return {
        temperature: this.requestData().temp,
        city: this.requestData().name,
        condition: this.requestData().weather[0].description
      };
    });

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

      return jsonData;
    });
  }

}

export default Data;
