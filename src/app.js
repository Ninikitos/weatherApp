import React from "react";
import Data from "./data.js";

import { View, Text, Model, ScrollView, ScrollBar, LinearLayout, Toggle, GridLayout, Button, Audio, DropdownList, DropdownListItem } from "magic-script-components";


export default class MyApp extends React.Component {
  constructor(props) {
    super(props);

    this.data = new Data();

    this.state = {
      currentTemp:          "undefined",
      currentCityById:      "undefined",
      modelPath:            undefined,
      audioPath:            undefined,
      currentCondition:     "undefined",
      isConditionChanged:   true,
      currentHumidity:      "undefined",
      currentMinTemp:       "undefined",
      currentMaxTemp:       "undefined",
      timeOfDay:            [],
      useMetricUnits:       false,
      weatherMeasureType:   "imperial",
      timeIntervalFinished: false,
      currentCityId:        "4168783",
      cityName:             "Fort Lauderdale",
      volumeIcon:           "volume", 
      soundMute:            false
    };
  }

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

  getAustinId = () => {
    return '4671654';
  }

  getLosAngelesId = () => {
    return '5368361';
  }

  getPlantationId = () => {
    return '4168783';
  }

  getSunnyvaleId = () => {
    return '5400075';
  }
  
  getTorontoCityId = () => {
    return "6167865";
  }

  getAppData = async (cityId, units) => { 

    const data = await this.data.getData(cityId, units);
    print("getAppData called");
    print("-----------------");
    return {
      currentTemp:          data.temperature,
      currentCityById:      data.cityId,
      currentCondition:     data.condition,
      currentHumidity:      data.humidity,
      currentMinTemp:       data.temp_min,
      currentMaxTemp:       data.temp_max,
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
    const newState = await this.getAppData(this.state.currentCityId, this.state.weatherMeasureType);
    this.setState( newState );
    this.timeOutForModel();
  }

  timeOutForModel = () => {
    print("didMount: " + this.state.currentCondition);
    print("----------------------------------------");
    setTimeout(() => {
      if ((this.state.currentCondition === 'few clouds') || 
          (this.state.currentCondition === 'clear sky')) {
          
        this.setState({
          timeIntervalFinished: true,
          modelPath: 'res/Sunny_01.fbx',
          audioPath: 'res/ES_Sunny Field With Birds - Organic Nature Sounds.mp3'
        })

      } else if ((this.state.currentCondition === 'scattered clouds') || 
                (this.state.currentCondition === 'broken clouds') || 
                (this.state.currentCondition === 'overcast clouds')) {

        this.setState({
          timeIntervalFinished: true,
          modelPath: 'res/cloudy_01.fbx',
          audioPath: 'res/ES_Wind Storm Forest 1 - SFX Producer.mp3'
       
        })

      } else if ((this.state.currentCondition === 'shower rain') || 
                 (this.state.currentCondition === 'rain') || 
                 (this.state.currentCondition === 'thunderstorm') || 
                 (this.state.currentCondition === 'mist') || 
                 (this.state.currentCondition === 'light rain')) {
                  
        this.setState({
          timeIntervalFinished: true,
          modelPath: 'res/Rainy_01.fbx',
          audioPath: 'res/ES_Rain Heavy 4 - SFX Producer.mp3'

        })

      } else {
        print("There is no snow in Florida");
      }
    }, 2000);
  }

  setModelAndAudio = (state) => {
    const data = {...state};
    if ((data.currentCondition === 'few clouds') || 
        (data.currentCondition === 'clear sky')) {
      data.modelPath = 'res/Sunny_01.fbx';
      data.audioPath = 'res/ES_Sunny Field With Birds - Organic Nature Sounds.mp3';

    } else if ((data.currentCondition === 'scattered clouds') || 
               (data.currentCondition === 'broken clouds') || 
               (data.currentCondition === 'overcast clouds')) {
      data.modelPath = 'res/cloudy_01.fbx';
      data.audioPath = 'res/ES_Wind Storm Forest 1 - SFX Producer.mp3';

    } else if ((data.currentCondition === 'shower rain') || 
               (data.currentCondition === 'rain') || 
               (data.currentCondition === 'thunderstorm') || 
               (data.currentCondition === 'mist') || 
               (data.currentCondition === 'light rain')) {
      data.modelPath = 'res/Rainy_01.fbx';
      data.audioPath = 'res/ES_Rain Heavy 4 - SFX Producer.mp3';

    } else {
      print("There is no snow in Florida");
    }
    return data;
  }

  onToggleChangedHandler = async () => {
    const tempUnit = this.state.useMetricUnits ? 'imperial' : 'metric';
    print("Toggle switches metrics: " + this.state.useMetricUnits);
    const newState = await this.getAppData(this.state.currentCityById, tempUnit);

    this.setState( state => ({...newState, useMetricUnits: !state.useMetricUnits, weatherMeasureType: tempUnit}));
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
    const newState = await this.getAppData(this.getAustinId(), this.state.weatherMeasureType);
    this.setState({...this.setModelAndAudio(newState), cityName: "Austin"});
   }

  getLosAngelesWeatherHandler = async () => {
    const newState = await this.getAppData(this.getLosAngelesId(), this.state.weatherMeasureType);
    this.setState({...this.setModelAndAudio(newState), cityName: "Los Angeles"});
   }

  getPlantationWeatherHandler = async () => {
    const newState = await this.getAppData(this.getPlantationId(), this.state.weatherMeasureType);
    this.setState({...this.setModelAndAudio(newState), cityName: "Plantation"});
   }

  getSunnyvalWeatherHandler = async () => {
    const newState = await this.getAppData(this.getSunnyvaleId(), this.state.weatherMeasureType);
    this.setState({...this.setModelAndAudio(newState), cityName: "Sunnyvale"});
   }

  getTorontoWeatherHandler = async () => {
    const newState = await this.getAppData(this.getTorontoCityId(), this.state.weatherMeasureType);
    this.setState({...this.setModelAndAudio(newState), cityName: "Toronto"});
   }
  volumeHandler = () => {
    
    if(this.state.soundMute === false) {
      this.setState({
        volumeIcon: "volume-mute",
        soundMute: true
      });
    } else {
      this.setState({
        volumeIcon: "volume",
        soundMute: false
      });
    }
    print(this.state.volumeIcon);
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
    //   "San Francisco, CA",
    //   "Seattle, WA",
    //   "Sunnyvale, CA",
    //   "Tel Aviv, Israel",
    //   "Tokyo, Japan",
    //   "Wellington, New Zealand",
    //   "Zurich, Switzerland"
    // ];

    return (
      <View name="main-view">
        <Button 
            localPosition={[0.6, 0.4, 0]} 
            iconType={this.state.volumeIcon} 
            type="icon"
            height={0.1} 
            visible={true} 
            onClick={this.volumeHandler}
          ></Button>
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
            >Cities</Text>
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
              >Fort Lauderdale, FL</Button>
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
            localPosition={[-0.13, 0.46, 0]}
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
                    localScale={[0.0003, 0.0003, 0.0003]}
                  ></Model>
                  <Audio
                    key={this.state.audioPath}
                    fileName={this.state.audioPath}
                    loadFile={true}
                    action="start"
                    soundLooping={true}
                    spatialSoundEnable={true}
                    soundMute={this.state.soundMute}
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
        <LinearLayout
          localPosition={[-0.44, -0.4, 0]}>
          <Text 
            textSize={0.1}
            weight='bold'
            textAlignment={'center'}
          >{this.state.cityName}</Text>
        </LinearLayout>
      </View>
    );
  }
}