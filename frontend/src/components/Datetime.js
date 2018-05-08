import React from 'react';

export default function Datetime ({ timestamp }) {
  const dateNumber = new Date(Number(timestamp));

  return (
    <small className='item-date'>
      <span className='time-date'>
        {new Date(Number(timestamp)).getFullYear()}-
        {("0" + dateNumber.getMonth()).substr(-2)}-
        {("0" + dateNumber.getDay()).substr(-2)}
      </span>
      <span className='time-date'>
        {("0" + dateNumber.getHours()).substr(-2)}:
        {("0" + dateNumber.getMinutes()).substr(-2)}:
        {("0" + dateNumber.getSeconds()).substr(-2)}
      </span>
    </small>
  )
}