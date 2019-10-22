//
import React from "react";
import Data from "./data.js";
import { View, Text } from "magic-script-components";

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTemp: 89,
      currentCity: 'Plantation',
      currentCondition: 'Sunny'
    };
  }

  render() {
    return (
      <View name="main-view">
        <Text textSize={0.13}   localPosition={[0.1, 0.4, 0]} weight='bold' textAlignment={'center'}>{this.state.currentTemp}</Text>
        <Text textSize={0.06}   localPosition={[0.1, 0.3, 0]} weight='medium' textAlignment={'center'}>{this.state.currentCity}</Text>
        <Text textSize={0.06}   localPosition={[0.1, 0.2, 0]} weight='medium' textAlignment={'center'}>{this.state.currentCondition}</Text>
      </View>
    );
  }
}
