//
import React from "react";
import Data from "./data.js";
import FakeData from "./fakeData.js";

import { View, Text, Model, ScrollView, ScrollBar, LinearLayout, Toggle, GridLayout, Button, Audio } from "magic-script-components";
import { vec3, quat } from "gl-matrix";

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);

    this.data = new Data();
    const fakeData = new FakeData();

    this.state = {
      currentTemp:          "undefined",
      currentCity:          "undefined",
      currentCondition:     "undefined",
      currentHumidity:      "undefined",
      currentMinTemp:       "undefined",
      currentMaxTemp:       "undefined",
      currentTime:          fakeData.hours[0],
      useMetricUnits:       false,
      modelPath:            undefined,
      audioPath:            undefined,
      timeIntervalFinished: false
    };
  }

  getTempUnits = () => this.state.useMetricUnits ? 'metric' : 'imperial'

  getCity = () => '4168782'

  getAppData = async (cityId, units) => { 

    const data = await this.data.getData(cityId, units);
    return {
      currentTemp:          data.temperature,
      currentCity:          data.city,
      currentCondition:     data.condition,
      currentHumidity:      data.humidity,
      currentMinTemp:       data.temp_min,
      currentMaxTemp:       data.temp_max,
    };
  }

  componentDidMount = async () => {

    // Plantation: 4168782
    // debugger;
    const newState = await this.getAppData(this.getCity(), this.getTempUnits());

    print("componentDidMount works", JSON.stringify(newState));
    this.setState( newState );
    this.timeOutForModel();
  }

  timeOutForModel = () => {

    setTimeout(() => {
      
      print("this.state.currentCondition before condition: " + this.state.currentCondition);

      if ((this.state.currentCondition === 'scattered clouds') || (this.state.currentCondition === 'broken clouds')) {
        this.setState({
          timeIntervalFinished: true,
          modelPath: 'res/cloudy_plantation.glb',
          audioPath: 'res/ES_Wind Storm Forest 1 - SFX Producer.mp3'
          
        })


      } else if ((this.state.currentCondition === 'few clouds') || (this.state.currentCondition === 'clear sky')) {
        this.setState({
          timeIntervalFinished: true,
          modelPath: 'res/sunny_plantation.glb',
          audioPath: 'res/ES_Sunny Field With Birds - Organic Nature Sounds.mp3'
          
        })

      } else if ((this.state.currentCondition === 'shower rain') || (this.state.currentCondition === 'rain') || (this.state.currentCondition === 'thunderstorm') || (this.state.currentCondition === 'mist') || (this.state.currentCondition === 'light rain')) {
        this.setState({
          timeIntervalFinished: true,
          modelPath: 'res/rainy_plantation.glb',
          audioPath: 'res/ES_Rain Heavy 4 - SFX Producer.mp3'
        })

      } else {
        print("There is no snow in Florida");
    
      }
      print("this.state.currentCondition after condition: " + this.state.currentCondition);
    }, 2000);
  }

  onToggleChangedHandler = async () => {

    const tempUnit = this.state.useMetricUnits ? 'imperial' : 'metric';
    const newState = await this.getAppData(this.getCity(), tempUnit);

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

  // calcRotation = () => {
  //   const tempArr = new Array(4);

  //   const rot = quat.fromEuler([], 0, 180, 0);
  //   tempArr[0] = rot[0];
  //   tempArr[1] = rot[1];
  //   tempArr[2] = rot[2];
  //   tempArr[3] = rot[3];

  //   print(tempArr + rot);

  //   return tempArr;
  // }
  
  render() {

    // const aabb = {
    //   min: [-0.45, -0.15, -0.1],
    //   max: [0.45, 0.15, 0.1]
    // };

    // const time = ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12pm'];

    let flooredTemp = Math.floor(this.state.currentTemp);
    print('Model path = ' + this.state.modelPath);
    return (
      <View name="main-view">
        <GridLayout
          name="content-grid"
          rows={2}
          defaultItemPadding={[0, 0, 0.1, 0.5]}
          localPosition={[-1.05, 0.4, 0]}
          defaultItemAlignment="center-center">
          <GridLayout
            name="model-grid"
            defaultItemAlignment="center-center"
            >
              { 
                this.state.modelPath !== undefined ? 
                <View>
                  <Model
                    modelPath={this.state.modelPath}
                    importScale={20}
                    localScale={[0.0020, 0.0020, 0.0020]}
                  ></Model>
                  <Audio
                    fileName={this.state.audioPath}
                    loadFile={true}
                    action="start"
                  ></Audio>
                  <Model
                    localRotation={[0, 1, 0, 0]}
                    modelPath='res/panels.fbx'
                    importScale={3}
                    localScale={[0.0010, 0.0010, 0.0010]}
                  ></Model>
                </View> : null 
              }
            </GridLayout>
          <GridLayout
            name="content-grid"
            rows={2}
            columns={3}
            defaultItemAlignment="center-left"
            defaultItemPadding={[0, 0.005, 0, 0.1]} 
          >
            <Text textSize={0.05} weight='medium'   textAlignment={'center'}>{this.getCurrentDay()}</Text>
            <Text textSize={0.2}  weight='bold'     textAlignment={'center'}>{flooredTemp}</Text>
            <Text textSize={0.05} weight='medium'   textAlignment={'center'}>{this.state.currentCondition}</Text>
            <Text textSize={0.05} weight='medium'   textAlignment={'center'}>{this.getCurrentMonthAndDay()}</Text>
            <Toggle textSize={0.03} text="F / °C"   onToggleChanged={this.onToggleChangedHandler}></Toggle>
              {/* <Text textSize={0.05} weight='medium' textAlignment={'center'}>{this.state.currentCity}</Text> */}
            <Text textSize={0.05} weight='medium'   textAlignment={'center'}>{this.state.currentHumidity}% Humidity</Text>
          </GridLayout>
        </GridLayout>
        
        {/* <ScrollView scrollBarVisibility="always" scrollBounds={aabb} localPosition={[0, -0.3, 0]} scrollDirection="horizontal">
          <ScrollBar width={0.4} thumbSize={0.04} orientation="horizontal"/>
          <LinearLayout
            defaultItemAlignment="center-center"
            defaultItemPadding={[0.02, 0.07, 0.02, 0.07]}
            orientation="horizontal"
          >
             {time.map((hour, index) => (
              <Text
                textSize={0.07}
                key={index}
                text={`${hour}`}
              />
            ))}
          </LinearLayout>
        </ScrollView> */}
      </View>
    );
  }
}
