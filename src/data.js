// const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?';
const appId = '0f4670104e656aa457f158cbe7631c18';
//6167865
export default class Data {
  getData = async (...parameters) => {
      const data = await this.requestData(...parameters);
      return {
        temperature   : data.list[0].main.temp,
        cityByZipId   : data.city.name,
        condition     : data.list[0].weather[0].description,
        humidity      : data.list[0].main.humidity,
        tempMin       : data.list[0].main.temp_min,
        tempMax       : data.list[0].main.temp_max,
        timeOfDay12am    : data.list[0].main.temp,
        timeOfDay3am     : data.list[1].main.temp,
        timeOfDay6am     : data.list[2].main.temp,
        timeOfDay9am     : data.list[3].main.temp,
        timeOfDay12pm    : data.list[4].main.temp,
        timeOfDay3pm     : data.list[5].main.temp,
        timeOfDay6pm     : data.list[6].main.temp,
        timeOfDay9pm     : data.list[7].main.temp,
        timeOfDay12am    : data.list[8].main.temp
      }
  }

  requestData = async (cityByZipId, units) => {
    let result;
    try {
      result = await fetch(`${baseURL}&zip=${cityByZipId}&units=${units}&appid=${appId}`); 
      print("requestData " + JSON.stringify(result));
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
  
  getDataForTor = async (...parameters) => {
    const dataTor = await this.requestDataForToronto(...parameters);
    return {
      temperature   : dataTor.list[0].main.temp,
      cityId        : dataTor.city.id,
      condition     : dataTor.list[0].weather[0].description,
      humidity      : dataTor.list[0].main.humidity,
      tempMin       : dataTor.list[0].main.temp_min,
      tempMax       : dataTor.list[0].main.temp_max,
      timeOfDay12am    : dataTor.list[0].main.temp,
      timeOfDay3am     : dataTor.list[1].main.temp,
      timeOfDay6am     : dataTor.list[2].main.temp,
      timeOfDay9am     : dataTor.list[3].main.temp,
      timeOfDay12pm    : dataTor.list[4].main.temp,
      timeOfDay3pm     : dataTor.list[5].main.temp,
      timeOfDay6pm     : dataTor.list[6].main.temp,
      timeOfDay9pm     : dataTor.list[7].main.temp,
      timeOfDay12am    : dataTor.list[8].main.temp
    }
  }

  requestDataForToronto = async (cityId, units) => {
    let result;
    try {
      result = await fetch(`${baseURL}&id=${cityId}&units=${units}&appid=${appId}`); 
      print("Toronto " + JSON.stringify(result));
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