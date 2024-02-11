import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';

import { LaurentHomebridgePlatform } from '../platform';


export class Window {
  private service: Service;

  private exampleStates = {
    On: false,
    Brightness: 50,
  };
  
  constructor(
    private readonly platform: LaurentHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
    private readonly laurent: any,
    private readonly out: number
  ) {
    this.laurent = laurent;
    this.out = out;
    this.exampleStates.On = +this.laurent.status.outTable[this.out - 1] ? true : false;

    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    this.service = this.accessory.getService(this.platform.Service.WindowCovering) || this.accessory.addService(this.platform.Service.WindowCovering);

    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.displayName);

    // each service must implement at-minimum the "required characteristics" for the given service type
    // see https://developers.homebridge.io/#/service/Lightbulb

    // create handlers for required characteristics
  this.service.getCharacteristic(this.platform.Characteristic.CurrentPosition)
    .onGet(this.handleCurrentPositionGet.bind(this));

  // this.service.getCharacteristic(this.platform.Characteristic.PositionState)
  //   .onGet(this.handlePositionStateGet.bind(this));

  this.service.getCharacteristic(this.platform.Characteristic.TargetPosition)
    .onGet(this.handleTargetPositionGet.bind(this))
    .onSet(this.handleTargetPositionSet.bind(this));  
  }
/**
   * Handle requests to get the current value of the "Current Position" characteristic
   */
  handleCurrentPositionGet() {
    this.platform.log.debug('Triggered GET CurrentPosition');

    // set this to a valid value for CurrentPosition
    const currentValue = this.exampleStates.Brightness;

    return currentValue;
  }


  /**
   * Handle requests to get the current value of the "Position State" characteristic
   */
//   handlePositionStateGet() {
//     if (this.exampleStates.Brightness > 40 && this.exampleStates.Brightness < 60) {
//       this.platform.log.debug('Triggered SET TargetPosition:', this.exampleStates.Brightness);
//       this.platform.log.debug('Triggered SET TargetPosition:', 'stop');
//       this.exampleStates.Brightness = this.platform.Characteristic.PositionState.STOPPED;
// 
//       return this.exampleStates.Brightness;
//     }
// 
//     if (this.exampleStates.Brightness > 70) {
//       this.platform.log.debug('Triggered SET TargetPosition:', this.exampleStates.Brightness);
//       this.platform.log.debug('Triggered SET TargetPosition:', 'open');
//       this.exampleStates.Brightness = this.platform.Characteristic.PositionState.INCREASING;
//     
//       return this.exampleStates.Brightness;
//     }
// 
//     if (this.exampleStates.Brightness < 30) {
//       this.platform.log.debug('Triggered SET TargetPosition:', this.exampleStates.Brightness);
//       this.platform.log.debug('Triggered SET TargetPosition:', 'close');
//       this.exampleStates.Brightness = this.platform.Characteristic.PositionState.DECREASING;
//    
//       return this.exampleStates.Brightness;
//     }
//     
//   }


  /**
   * Handle requests to get the current value of the "Target Position" characteristic
   */
  handleTargetPositionGet() {
    this.platform.log.debug('Triggered GET TargetPosition');

    // set this to a valid value for TargetPosition
    const currentValue = this.exampleStates.Brightness;

    return currentValue;
  }

  /**
   * Handle requests to set the "Target Position" characteristic
   */
  handleTargetPositionSet(value: any) {
    if (value > 40 && value < 60) {
      this.platform.log.debug('Triggered SET TargetPosition:', value);
      this.platform.log.debug('Triggered SET TargetPosition:', 'stop');
      this.exampleStates.Brightness = 50;
    }

    if (value > 70) {
      this.platform.log.debug('Triggered SET TargetPosition:', value);
      this.platform.log.debug('Triggered SET TargetPosition:', 'open');
      this.exampleStates.Brightness = 100;
    }

    if (value < 30) {
      this.platform.log.debug('Triggered SET TargetPosition:', value);
      this.platform.log.debug('Triggered SET TargetPosition:', 'close');
      this.exampleStates.Brightness = 0;
    }
  }

}
