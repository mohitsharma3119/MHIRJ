import React from 'react';
import moment from 'moment';

export const DateConverter = (date) => {
  var t = moment(date);
  var formatted = t.format('l');
  return formatted;
}

const Helper = () => {

}

export default Helper;