import React from "react";
import { View, Text } from "magic-script-components";

export default class Data extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render () {

        const data = {
            temperature: 89,
            city: 'Plantation', 
            conditions: 'Sunny'
        }

        return (

        );
    }


}