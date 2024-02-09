import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';

import { LaurentHomebridgePlatform } from '../platform';


export class Window {
  private service: Service;

  private exampleStates = {
    On: false,
    Brightness: 100,
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

    this.service = this.accessory.getService(this.platform.Service.Window) || this.accessory.addService(this.platform.Service.Window);

    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.DisplayName);

    // each service must implement at-minimum the "required characteristics" for the given service type
    // see https://developers.homebridge.io/#/service/Lightbulb

    //create handlers for required characteristics
  this.service.getCharacteristic(this.platform.Characteristic.CurrentPosition)
    .onGet(this.handleCurrentPositionGet.bind(this));

  this.service.getCharacteristic(this.platform.Characteristic.PositionState)
    .onGet(this.handlePositionStateGet.bind(this));

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
    const currentValue = 50;

    return currentValue;
  }


  /**
   * Handle requests to get the current value of the "Position State" characteristic
   */
  handlePositionStateGet() {
    this.platform.log.debug('Triggered GET PositionState');

    // set this to a valid value for PositionState
    const currentValue = this.platform.Characteristic.PositionState.DECREASING;

    return currentValue;
  }


  /**
   * Handle requests to get the current value of the "Target Position" characteristic
   */
  handleTargetPositionGet() {
    this.platform.log.debug('Triggered GET TargetPosition');

    // set this to a valid value for TargetPosition
    const currentValue = 1;

    return currentValue;
  }

  /**
   * Handle requests to set the "Target Position" characteristic
   */
  handleTargetPositionSet(value: any) {
    this.platform.log.debug('Triggered SET TargetPosition:', value);
  }

}
