import React from 'react';
import moment from 'moment'

export const DateConverter = (date) => {
  var t = moment(date);
  var formatted = t.format('LLL');
  return formatted;
}

export const DateConverterCorrelation = (date) => {
  var t = moment(date);
  var formatted = t.format('LL');
  return formatted;
}


const Helper = () => {

}

export default Helper;