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
      currentCondition:     "undefined",
      isConditionChanged:   true,
      currentHumidity:      "undefined",
      currentMinTemp:       "undefined",
      currentMaxTemp:       "undefined",
      timeOfDay:            [],
      useMetricUnits:       false,
      weatherMeasureType:   "imperial",
      modelPath:            undefined,
      audioPath:            undefined,
      timeIntervalFinished: false,
      cityZipCode:          "33313"
      // rainnyAnim:           {
      //                         resourceId: 1,
      //                         name: "rain",
      //                         paused: false,
      //                         loops: 20
      //                       }
      // rainnyAnimTexture:    {
      //                         textureId: 1,
      //                         textureSlot: "slot",
      //                         materialName: ""
      //                       }
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
    this.setState({
      cityZipCode: '73301'
    })
  }

  getLosAngelesZip = () => {
    this.setState({
      cityZipCode: '90001'
    })
  }

  getPlantationZip = () => {
    this.setState({
      cityZipCode: '33313'
    })
  }

  getSunnyvaleZip = () => {
    this.setState({
      cityZipCode: '94043'
    })
  }
  
  getTorontoZip = () => {
    this.setState({
      cityZipCode: '94043'
    })
  }

  getAppData = async (cityByZipId, units) => { 

    const data = await this.data.getData(cityByZipId, units);

    return {
      currentTemp:          data.temperature,
      currentCityByZip:     data.cityByZipId,
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
    const newState = await this.getAppData(this.state.cityZipCode, this.state.weatherMeasureType);
    this.setState( newState );
    this.timeOutForModel();
  }

  timeOutForModel = () => {
    setTimeout(() => {
      if ((this.state.currentCondition === 'few clouds') || (this.state.currentCondition === 'clear sky')) {
        this.setState({
          timeIntervalFinished: true,
          modelPath: 'res/sunny_new.fbx',
          audioPath: 'res/ES_Sunny Field With Birds - Organic Nature Sounds.mp3'
          
        })

      } else if ((this.state.currentCondition === 'scattered clouds') || (this.state.currentCondition === 'broken clouds')) {
        this.setState({
          timeIntervalFinished: true,
          modelPath: 'res/Partly_cloudy_test.fbx',
          audioPath: 'res/ES_Wind Storm Forest 1 - SFX Producer.mp3'
          
        })

      } else if ((this.state.currentCondition === 'shower rain') || (this.state.currentCondition === 'rain') || (this.state.currentCondition === 'thunderstorm') || (this.state.currentCondition === 'mist') || (this.state.currentCondition === 'light rain')) {
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

  onToggleChangedHandler = async () => {
    const tempUnit = this.state.useMetricUnits ? 'imperial' : 'metric';
    this.changeWeatherMetrics();
    const newState = await this.getAppData(this.state.cityZipCode, tempUnit);
    this.setState( state => ({...newState, useMetricUnits: !state.useMetricUnits}));
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
    this.getAustinZip();
    const newState = await this.getAppData(this.state.cityZipCode, this.state.weatherMeasureType);
    print("this.state.weatherMeasureType ", this.state.weatherMeasureType);
    this.setState( state => ({...newState}));
   }

   getLosAngelesWeatherHandler = async () => {
    this.getLosAngelesZip();
    const newState = await this.getAppData(this.state.cityZipCode, this.state.weatherMeasureType);
    print("this.state.weatherMeasureType ", this.state.weatherMeasureType);
    this.setState( state => ({...newState}));
   }

   getPlantationWeatherHandler = async () => {
    this.getPlantationZip();
    const newState = await this.getAppData(this.state.cityZipCode, this.state.weatherMeasureType);
    print("this.state.weatherMeasureType ", this.state.weatherMeasureType);
    this.setState( state => ({...newState}));
   }

   getSunnyvalWeatherHandler = async () => {
    this.getSunnyvaleZip();
    const newState = await this.getAppData(this.state.cityZipCode, this.state.weatherMeasureType);
    print("this.state.weatherMeasureType ", this.state.weatherMeasureType);
    this.setState( state => ({...newState}));
   }

   getTorontoWeatherHandler = async () => {
    this.getAustinZip();
    const newState = await this.getAppData(this.state.cityZipCode, this.state.weatherMeasureType);
    print("this.state.weatherMeasureType ", this.state.weatherMeasureType);
    this.setState( state => ({...newState}));
   }

  // onSelection = eventData => { print("Selected items:", eventData.SelectedItems); };

  render() {
    const aabb = {
      min: [-0.45, -0.15, -0.1],
      max: [0.45, 0.15, 0.1]
    };

    let flooredTemp = Math.floor(this.state.currentTemp);

    const cities = [
      "Austin, TX",
      "Boulder, CO",
      "Culver City, CA",
      "Dallas, TX",
      "Guadalajara, Mexico",
      "Haifa, Israel",
      "Hong Kong, Chine",
      "Lausanne, Switzerland",
      "Los Angeles, CA",
      "New York, NY",
      "Plantation, FL(HQ)",
      "San Francisco, CA, Israel",
      "Seattle, WA",
      "Sunnyvale, CA",
      "Tel Aviv, Israel",
      "Tokyo, Japan",
      "Wellington, New Zealand",
      "Zurich, Switzerland"
    ];

    return (
      <View name="main-view">
         
        {/* <DropdownList
            text="Select Moon"
            onSelectionChanged={this.onSelection}
          >
            {cities.map((city, index) => (
              <DropdownListItem id={index} label={city} />
            ))}
        </DropdownList> */}
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
            localPosition={[-0.150, 0.5, 0]}
            >
              { 
                this.state.modelPath !== undefined ? 
                <View>
                  <Model
                    modelPath={this.state.modelPath}
                    importScale={1}
                    animationPauseState={false}
                    animationTime={10}
                    animation={{ name: "Take 001", loops: 100 }}
                    animationPlaybackSpeed={1}
                    localScale={[0.0003, 0.0003, 0.0003]}
                  ></Model>
                  <Audio
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