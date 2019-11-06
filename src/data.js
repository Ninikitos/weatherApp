const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
// const baseURL = 'https://samples.openweathermap.org/data/2.5/forecast/hourly?zip=33313&';
const appId = '0f4670104e656aa457f158cbe7631c18';

export default class Data {

    // My class has following "properies" and one method requestData()
  getData = async (...parameters) => {
      const data = await this.requestData(...parameters);
      return {
        temperature : data.main.temp,
        city        : data.name,
        condition   : data.weather[0].description,
        humidity    : data.main.humidity,
        tempMin     : data.main.temp_min,
        tempMax     : data.main.temp_max
      }
  }

  requestData = async (cityId, units) => {

      let result;
      try {
        // 'id=4168782&&units=imperial'
        result = await fetch(`${baseURL}&id=${cityId}&units=${units}&appid=${appId}&`); 
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