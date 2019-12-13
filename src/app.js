import React from "react";
import Data from "./data.js";

import { View, Text, Model, ScrollView, ScrollBar, LinearLayout, Toggle, GridLayout, Button, Audio, DropdownList, DropdownListItem } from "magic-script-components";


export default class MyApp extends React.Component {
  constructor(props) {
    super(props);

    this.data = new Data();

    this.state = {
      currentTemp:          "undefined",
      currentCityByZip:     "undefined",
      currentCityById:      "undefined",
      modelPath:            undefined,
      audioPath:            undefined,
      currentCondition:     "undefined",
      isConditionChanged:   true,
      currentHumidity:      "undefined",
      currentMinTemp:       "undefined",
      currentMaxTemp:       "undefined",
      isAPICallTor:         true,
      timeOfDay:            [],
      useMetricUnits:       false,
      weatherMeasureType:   "imperial",
      timeIntervalFinished: false,
      cityZipCode:          "33313"
    };
  }

  getTempUnits = () => this.state.useMetricUnits ? 'metric' : 'imperial'

  changeWeatherMetrics = () => {
    if(this.state.weatherMeasureType === 'imperial') {
      this.setState({
        weatherMeasureType: 'metric'
      })
    } else if (this.state.weatherMeasureType === 'metric') {
      this.setState({
        weatherMeasureType: 'imperial'
      })
    }
  }

  getAustinZip = () => {
    return '73301';
  }

  getLosAngelesZip = () => {
    return '90001';
  }

  getPlantationZip = () => {
    return '33313';
  }

  getSunnyvaleZip = () => {
    return '94087';
  }
  
  getTorontoCityId = () => {
    return "6167865";
  }

  getAppData = async (cityByZipId, units) => { 

    const data = await this.data.getData(cityByZipId, units);
    print("data all cities: ", data);
    return {
      currentTemp:          data.temperature,
      currentCityByZip:     data.cityByZipId,
      currentCondition:     data.condition,
      currentHumidity:      data.humidity,
      currentMinTemp:       data.temp_min,
      currentMaxTemp:       data.temp_max,
      isAPICallTor:         false,
      timeOfDay:            [
        { time: '12am', temp: data.timeOfDay12am },
        { time: '3am', temp: data.timeOfDay3am },
        { time: '6am', temp: data.timeOfDay6am },
        { time: '9am', temp: data.timeOfDay9am },
        { time: '12pm', temp: data.timeOfDay12pm },
        { time: '3pm', temp: data.timeOfDay3pm },
        { time: '6pm', temp: data.timeOfDay6pm },
        { time: '9pm', temp: data.timeOfDay9pm },
        { time: '12am', temp: data.timeOfDay12am }
      ]
    };
  }

  getWeatherDataForToronto = async (cityId, units) => { 

    const data = await this.data.getDataForTor(cityId, units);
    print("getWeatherDataForToronto called");
    print("data all cities: ", data);
    return {
      currentTemp:          data.temperature,
      currentCityById:      data.cityId,
      currentCondition:     data.condition,
      currentHumidity:      data.humidity,
      currentMinTemp:       data.temp_min,
      currentMaxTemp:       data.temp_max,
      isAPICallTor:         true,
      timeOfDay:            [
        { time: '12am', temp: data.timeOfDay12am },
        { time: '3am', temp: data.timeOfDay3am },
        { time: '6am', temp: data.timeOfDay6am },
        { time: '9am', temp: data.timeOfDay9am },
        { time: '12pm', temp: data.timeOfDay12pm },
        { time: '3pm', temp: data.timeOfDay3pm },
        { time: '6pm', temp: data.timeOfDay6pm },
        { time: '9pm', temp: data.timeOfDay9pm },
        { time: '12am', temp: data.timeOfDay12am }
      ]
    };
  }

  componentDidMount = async () => {
    const newState = await this.getAppData(this.state.cityZipCode, this.state.weatherMeasureType);
    this.setState( newState );
    this.timeOutForModel();
  }

  timeOutForModel = () => {
    print("didMount: " + this.state.currentCondition );
    setTimeout(() => {
      print("didMafter 2 sec : " + this.state.currentCondition );
      if ((this.state.currentCondition === 'few clouds') || 
          (this.state.currentCondition === 'clear sky')) {
          
        this.setState({
          timeIntervalFinished: true,
          modelPath: 'res/sunny.fbx',
          audioPath: 'res/ES_Sunny Field With Birds - Organic Nature Sounds.mp3'
          
        })

      } else if ((this.state.currentCondition === 'scattered clouds') || 
                (this.state.currentCondition === 'broken clouds') || 
                (this.state.currentCondition === 'overcast clouds')) {

        this.setState({
          timeIntervalFinished: true,
          modelPath: 'res/cloudy.fbx',
          audioPath: 'res/ES_Wind Storm Forest 1 - SFX Producer.mp3'
       
        })

      } else if ((this.state.currentCondition === 'shower rain') || 
                 (this.state.currentCondition === 'rain') || 
                 (this.state.currentCondition === 'thunderstorm') || 
                 (this.state.currentCondition === 'mist') || 
                 (this.state.currentCondition === 'light rain')) {
                  
        this.setState({
          timeIntervalFinished: true,
          modelPath: 'res/Rainy.fbx',
          audioPath: 'res/ES_Rain Heavy 4 - SFX Producer.mp3'

        })

      } else {
        print("There is no snow in Florida");
      }
    }, 2000);
  }

  setModelAndAudio = (state) => {
    const data = {...state};
    print("didMafter 2 sec : " + data.currentCondition );
    if ((data.currentCondition === 'few clouds') || 
        (data.currentCondition === 'clear sky')) {
      data.modelPath = 'res/sunny.fbx';
      data.audioPath = 'res/ES_Sunny Field With Birds - Organic Nature Sounds.mp3';

    } else if ((data.currentCondition === 'scattered clouds') || 
               (data.currentCondition === 'broken clouds') || 
               (data.currentCondition === 'overcast clouds')) {
      data.modelPath = 'res/cloudy.fbx';
      data.audioPath = 'res/ES_Wind Storm Forest 1 - SFX Producer.mp3';

    } else if ((data.currentCondition === 'shower rain') || 
               (data.currentCondition === 'rain') || 
               (data.currentCondition === 'thunderstorm') || 
               (data.currentCondition === 'mist') || 
               (data.currentCondition === 'light rain')) {
      data.modelPath = 'res/Rainy.fbx';
      data.audioPath = 'res/ES_Rain Heavy 4 - SFX Producer.mp3';

    } else {
      print("There is no snow in Florida");
    }
    return data;
  }

  onToggleChangedHandler = async () => {
    const tempUnit = this.state.useMetricUnits ? 'imperial' : 'metric';
    this.changeWeatherMetrics();
    if(this.state.isAPICallTor === false) {
      const newState = await this.getAppData(this.state.cityZipCode, tempUnit);
      this.setState( state => ({...newState, useMetricUnits: !state.useMetricUnits}));

    } else if (this.state.isAPICallTor === true) {
      const torontoState = await this.getWeatherDataForToronto(this.state.currentCityById, tempUnit);
      this.setState( state => ({...torontoState, useMetricUnits: !state.useMetricUnits}));
    }
  }

  getCurrentDay = () => {
    let date = new Date();
    let currentWeekDay = date.getDay();
    let weekDayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return weekDayArr[currentWeekDay - 1];
  }

  getCurrentMonthAndDay = () => {
    let date = new Date();
    let currentDay = date.getDate();
    let currentMonth = date.getMonth();
    let allMonths = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let newDate = allMonths[currentMonth] + " " + currentDay;

    return newDate;
  }

  getAustinWeatherHandler = async () => {
    const newState = await this.getAppData(this.getAustinZip(), this.state.weatherMeasureType);
    this.setState(this.setModelAndAudio(newState));
    print("getLosAngelesWeatherHandler: " + JSON.stringify(this.state));
   }

  getLosAngelesWeatherHandler = async () => {
    const newState = await this.getAppData(this.getLosAngelesZip(), this.state.weatherMeasureType);
    this.setState(this.setModelAndAudio(newState));
    print("getLosAngelesWeatherHandler: " + JSON.stringify(this.state));
   }

  getPlantationWeatherHandler = async () => {
    const newState = await this.getAppData(this.getPlantationZip(), this.state.weatherMeasureType);
    this.setState(this.setModelAndAudio(newState));
    print("getLosAngelesWeatherHandler: " + JSON.stringify(this.state));
   }

  getSunnyvalWeatherHandler = async () => {
    const newState = await this.getAppData(this.getSunnyvaleZip(), this.state.weatherMeasureType);
    this.setState(this.setModelAndAudio(newState));
    print("getLosAngelesWeatherHandler: " + JSON.stringify(this.state));
   }

  getTorontoWeatherHandler = async () => {
    const newState = await this.getWeatherDataForToronto(this.getTorontoCityId(), this.state.weatherMeasureType);
    this.setState(this.setModelAndAudio(newState));
    print("getLosAngelesWeatherHandler: " + JSON.stringify(this.state));
   }

  render() {
    const aabb = {
      min: [-0.45, -0.15, -0.1],
      max: [0.45, 0.15, 0.1]
    };

    let flooredTemp = Math.floor(this.state.currentTemp);

    // const cities = [
    //   "Austin, TX",
    //   "Boulder, CO",
    //   "Culver City, CA",
    //   "Dallas, TX",
    //   "Guadalajara, Mexico",
    //   "Haifa, Israel",
    //   "Hong Kong, Chine",
    //   "Lausanne, Switzerland",
    //   "Los Angeles, CA",
    //   "New York, NY",
    //   "Plantation, FL(HQ)",
    //   "San Francisco, CA, Israel",
    //   "Seattle, WA",
    //   "Sunnyvale, CA",
    //   "Tel Aviv, Israel",
    //   "Tokyo, Japan",
    //   "Wellington, New Zealand",
    //   "Zurich, Switzerland"
    // ];
    print("Model path: " + JSON.stringify(this.state.modelPath));
    return (
      <View name="main-view">
        <GridLayout
            name="content-grid"
            rows={1}
            columns={1}
            localPosition={[-1, 0.1750, 0]}
            defaultItemAlignment="center-left"
            defaultItemPadding={[0, 0.005, 0, 0.1]} 
          ><Text
              localPosition={[0, 0.5, 0]}
              textSize={0.05}
              weight='medium'
            >Cities list</Text>
            <Button 
              localPosition={[-0.7, 0.3, 0]}
              type="text"
              height={0.1}
              width={0.2}
              roundness={0.02}
              textSize={0.03}
              onClick={this.getAustinWeatherHandler}
              >Austin, TX</Button>
            <Button 
              localPosition={[-0.7, 0.1, 0]}
              type="text"
              height={0.1}
              width={0.2}
              roundness={0.02}
              textSize={0.03}
              onClick={this.getLosAngelesWeatherHandler}
              >Los Angeles, CA</Button>
            <Button 
              localPosition={[-0.7, -0.1, 0]}
              type="text"
              height={0.1}
              width={0.2}
              roundness={0.02}
              textSize={0.03}
              onClick={this.getPlantationWeatherHandler}
              >Plantation, FL</Button>
            <Button 
              localPosition={[-0.7, -0.3, 0]}
              type="text"
              height={0.1}
              width={0.2}
              roundness={0.02}
              textSize={0.03}
              onClick={this.getSunnyvalWeatherHandler}
              >Sunnyvale, CA</Button>
            <Button 
              localPosition={[-0.7, -0.5, 0]}
              type="text"
              height={0.1}
              width={0.2}
              roundness={0.02}
              textSize={0.03}
              onClick={this.getTorontoWeatherHandler}
              >Toronto, ON</Button>
        </GridLayout>
          <LinearLayout
            name="model-grid"
            defaultItemAlignment="center-center"
            localPosition={[-0.350, 0.5, -0.4]}
            >
              { 
                this.state.modelPath !== undefined ? 
                <View>
                  <Model
                    key={this.state.modelPath}
                    modelPath={this.state.modelPath}
                    importScale={1}
                    animationPauseState={false}
                    animationTime={10}
                    animation={{ name: "Take 001", loops: 100 }}
                    animationPlaybackSpeed={1}
                    localScale={[0.001, 0.001, 0.001]}
                  ></Model>
                  <Audio
                    key={this.state.audioPath}
                    fileName={this.state.audioPath}
                    loadFile={true}
                    action="start"
                    soundLooping={true}
                    spatialSoundEnable={true}
                  ></Audio>
                </View> : null 
              }
          </LinearLayout>
          <GridLayout
            name="content-grid"
            rows={2}
            columns={3}
            localPosition={[-0.550, 0.250, 0]}
            defaultItemAlignment="center-left"
            defaultItemPadding={[0, 0.005, 0, 0.1]} 
          >
            <Text textSize={0.05} weight='medium'   textAlignment={'center'}>{this.getCurrentDay()}</Text>
            <Text textSize={0.2}  weight='bold'     textAlignment={'center'}>{flooredTemp}</Text>
            <Text textSize={0.05} weight='medium'   textAlignment={'center'}>{this.state.currentCondition}</Text>
            <Text textSize={0.05} weight='medium'   textAlignment={'center'}>{this.getCurrentMonthAndDay()}</Text>
            <Toggle textSize={0.03} text="F / °C"   onToggleChanged={this.onToggleChangedHandler}></Toggle>
            <Text textSize={0.05} weight='medium'   textAlignment={'center'}>{this.state.currentHumidity}% Humidity</Text>
          </GridLayout>
        <ScrollView 
          scrollBarVisibility="always" 
          scrollBounds={aabb} 
          localPosition={[0, -0.3, 0]} 
          scrollDirection="horizontal">
          <ScrollBar 
            width={0.4} 
            thumbSize={0.04} 
            orientation="horizontal"/>
          <LinearLayout
            localPosition={[-0.3, -0.2, 0]}
            defaultItemAlignment="center-center"
            defaultItemPadding={[0.02, 0.06, 0.04, 0.06]}
            orientation="horizontal"
          >
             {this.state.timeOfDay.map((data, index) => (
               <LinearLayout>
                  <Text localPosition={[0, 0.1, 0]} textSize={0.04} key={index}>{Math.floor(data.temp)}</Text>
                  <Text
                    textSize={0.07}
                    key={index}
                    text={`${data.time}`}
                  />
               </LinearLayout>
            ))}
          </LinearLayout>
        </ScrollView>
      </View>
    );
  }
}