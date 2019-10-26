//
import React from "react";
import Data from "./data.js";
import RealData from "./realData.js";
import { View, Text, Model, ScrollView, ScrollBar, LinearLayout, Button } from "magic-script-components";

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);

    let fakeData = new Data();

    this.state = {
      currentTemp:          fakeData.temperature.Friday,
      currentCity:          fakeData.city,
      currentCondition:     fakeData.conditions.Sunny,
      currentTime:          fakeData.hours[0],
      currentDay:           fakeData.days[5]
    };
  }

  render() {

    const aabb = {
      min: [-0.45, -0.15, -0.1],
      max: [0.45, 0.15, 0.1]
    };
    const realData = (<RealData/>);
    const time = ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12pm'];

    return (
      <View name="main-view">
        <Text textSize={0.15}   localPosition={[0, 0.2, 0]} weight='bold'   textAlignment={'center'}>{this.state.currentTemp}</Text>
        <Text textSize={0.03}   localPosition={[0.2, 0.285, 0]} weight='medium' textAlignment={'center'}>{this.state.currentCity}</Text>
        <Text textSize={0.03}   localPosition={[0.2, 0.225, 0]} weight='medium' textAlignment={'center'}>{this.state.currentCondition}</Text>
        <Text textSize={0.13}   localPosition={[-0.250, -0.150, 0]} weight='medium' textAlignment={'center'}>{this.state.currentDay}</Text>
        <Button>Get Weather</Button>
        <Model
          modelPath={"res/Clouds.fbx"}
          localScale={[0.0020, 0.0020, 0.0020]}
          localPosition={[-0.180, 0.050, 0]}
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
        {realData}
      </View>
    );
  }
}
