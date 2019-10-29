//
import React from "react";
import Data from "./data.js";
import FakeData from "./fakeData.js";

import { View, Text, Model, ScrollView, ScrollBar, LinearLayout, Toggle } from "magic-script-components";

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
      useMetricUnits:       false
    };
  }

  getTempUnits = () => this.state.useMetricUnits ? 'metric' : 'imperial'

  getAppData = async (cityId, units) => { 

    const data = await this.data.getData(cityId, units);
    return {
      currentTemp:          data.temperature,
      currentCity:          data.city,
      currentCondition:     data.condition,
      currentHumidity:      data.humidity,
      currentMinTemp:       data.temp_min,
      currentMaxTemp:       data.temp_max
    };
  }

  getCity = () => '4168782'

  componentDidMount = async () => {

    // Plantation: 4168782

    const newState = await this.getAppData(this.getCity(), this.getTempUnits());

    print("componentDidMount works", JSON.stringify(newState));
    this.setState( newState );
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

  render() {

    const aabb = {
      min: [-0.45, -0.15, -0.1],
      max: [0.45, 0.15, 0.1]
    };

    const time = ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12pm'];

    let flooredTemp = Math.floor(this.state.currentTemp);

    return (
      <View name="main-view">
        <Text   textSize={0.15}   localPosition={[0, 0.2, 0]}           weight='bold'     textAlignment={'center'}>{flooredTemp}</Text>
        <Text   textSize={0.05}   localPosition={[0.2, 0.285, 0]}       weight='medium'   textAlignment={'center'}>{this.state.currentCity}</Text>
        <Text   textSize={0.05}   localPosition={[0.2, 0.225, 0]}       weight='medium'   textAlignment={'center'}>{this.state.currentCondition}</Text>
        <Text   textSize={0.05}   localPosition={[0.2, 0.165, 0]}       weight='medium'   textAlignment={'center'}>{this.state.currentHumidity}% Humidity</Text>
        <Text   textSize={0.1}    localPosition={[-0.050, -0.050, 0]}   weight='medium'   textAlignment={'center'}>{this.getCurrentDay()}</Text>
        <Text   textSize={0.05}   localPosition={[-0.020, -0.1250, 0]}  weight='medium'   textAlignment={'center'}>{this.getCurrentMonthAndDay()}</Text>
        <Toggle textSize={0.03}   localPosition={[0.13, 0.165, 0]}      text="F / °C"     onToggleChanged={this.onToggleChangedHandler}></Toggle>
        <Model
          modelPath={'res/sunny_plantation.glb'}
          importScale={12}
          localScale={[0.0020, 0.0020, 0.0020]}
          localPosition={[-0.3, 0.250, 0]}
        ></Model>
        <ScrollView scrollBarVisibility="always" scrollBounds={aabb} localPosition={[0, -0.3, 0]} scrollDirection="horizontal">
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
        </ScrollView>
      </View>
    );
  }
}
