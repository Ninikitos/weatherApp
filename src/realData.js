import React from 'react';
import { ui } from "lumin";


const API_KEY = '0f4670104e656aa457f158cbe7631c18';
const Plantation_City_code = 4168782;

async function getData() {
    let api_call = await fetch(`api.openweathermap.org/data/2.5/weather?q=${Plantation_City_code},US&appid=${API_KEY}`);
    // if (!api_call.ok) {
    //     throw new Error("HTTP error, status = " + api_call.status);
    // }
    let json = await api_call.json();
    print(JSON.stringify(json));

//   let string = "basicFetch - Success:\n";
//   string += JSON.stringify(json);
}

export default getData;