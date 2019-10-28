import React from 'react';

export default class Data {

    // My class has following "properies" and one method requestData()
  getData = async () => {

      return {
        temperature : this.requestData().temp,
        city        : this.requestData().name,
        condition   : this.requestData().weather.description
      }
  }

  requestData = async () => {

      let result;
      try {
        result = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Plantation,US&appid=0f4670104e656aa457f158cbe7631c18'); 
      } catch(error) {
        print(`API Data Fetch error: ${error.message}`);
      }
  
      let jsonData;
      try {
        jsonData = await result.json();
      } catch(error) {
        print(`JSON conversion error: ${error.message}`);
      }
  
        return jsonData;
  }    
}