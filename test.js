"use strict";

const arr = [
  {
    "ip": "192.168.0.101",
    "uniqueId": "fhsr",
    "displayName": "релле-1",
    "outType": "rel",
    "out": 1,
    "outInv": true,
    "mode": "true",
    "accessory": "Switch"
  },
  {
    "ip": "192.168.0.102",
    "uniqueId": "fhsr",
    "displayName": "релле-1",
    "outType": "rel",
    "out": 1,
    "outInv": true,
    "mode": "true",
    "accessory": "Switch"
  },
  {
    "ip": "192.168.0.101",
    "uniqueId": "fhsr",
    "displayName": "релле-1",
    "outType": "rel",
    "out": 1,
    "outInv": true,
    "mode": "true",
    "accessory": "Switch"
  }
];


const arrIpsort = {};


arr.forEach(item => {
  arrIpsort[item.ip] = `laurent(${item.ip})`;
});

console.log(arrIpsort['192.168.0.102']);
//console.log( [...new Set(arr)] );