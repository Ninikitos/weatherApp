import React from '../node_modules/react/index.js';
import { View } from 'lumin';
import { asyncToGenerator as _asyncToGenerator } from '../_virtual/_rollupPluginBabelHelpers.js';

var data =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var API_KEY, Plantation_City_code, api_call, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API_KEY = '0f4670104e656aa457f158cbe7631c18';
            Plantation_City_code = 'Plantation';
            _context.next = 4;
            return fetch("api.openweathermap.org/data/2.5/weather?q=".concat(Plantation_City_code, ",US&appid=").concat(API_KEY));

          case 4:
            api_call = _context.sent;

            if (api_call.ok) {
              _context.next = 7;
              break;
            }

            throw new Error("HTTP error, status = " + api_call.status);

          case 7:
            _context.next = 9;
            return api_call.json();

          case 9:
            json = _context.sent;
            return _context.abrupt("return", React.createElement(View, {
              name: "data-view"
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function data() {
    return _ref.apply(this, arguments);
  };
}();
// const Plantation_City_code = 4168782;
// // async function getData() {
// //     let api_call = await fetch(`api.openweathermap.org/data/2.5/weather?q=${Plantation_City_code},US&appid=${API_KEY}`);
// //     // if (!api_call.ok) {
// //     //     throw new Error("HTTP error, status = " + api_call.status);
// //     // }
// //     let json = await api_call.json();
// //     print(JSON.stringify(json));
// // //   let string = "basicFetch - Success:\n";
// // //   string += JSON.stringify(json);
// // }
// const data = () => {
// }
// onButtonClick = async () => {
//     let api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Plantation,US&appid=0f4670104e656aa457f158cbe7631c18`);
//       if (!api_call.ok) {
//           throw new Error("HTTP error, status = " + api_call.status);
//       }
//     let json = await api_call.json();
//     print(JSON.stringify(json));
//   }

export default data;
