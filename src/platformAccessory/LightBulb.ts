import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';

import { LaurentHomebridgePlatform } from '../platform';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class LightBulb {
  private service: Service;
  private out: number;
  private mode: any;
  private outType: string;
  private outInv: boolean;

  /**
   * These are just used to create a working example
   * You should implement your own code to track the state of your accessory
   */
  private exampleStates = {
    On: false
  };
 
  constructor(
    private readonly platform: LaurentHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
    private readonly laurent: any,
    private readonly props: any
  ) {
    this.laurent = laurent;
    this.out = this.props.out;
    this.mode = this.props.mode;
    this.outType = this.props.outType;
    this.outInv = this.props.outInv;

    if (this.outType === 'out') {
      if (this.outInv) {
        this.exampleStates.On = +this.laurent.status.outTable[this.out - 1] ? false : true;
      } else {
        this.exampleStates.On = +this.laurent.status.outTable[this.out - 1] ? true : false;
      }
    }

    if (this.outType === 'rel') {
      if (this.outInv) {
        this.exampleStates.On = +this.laurent.status.releTable[this.out - 1] ? false : true;
      } else {
        this.exampleStates.On = +this.laurent.status.releTable[this.out - 1] ? true : false;
      }
    }
    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    // get the LightBulb service if it exists, otherwise create a new LightBulb service
    // you can create multiple services for each accessory
    this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);

    // set the service name, this is what is displayed as the default name on the Home app
    // in this example we are using the name we stored in the `accessory.context` in the `discoverDevices` method.
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.displayName);

    // each service must implement at-minimum the "required characteristics" for the given service type
    // see https://developers.homebridge.io/#/service/Lightbulb

    // register handlers for the On/Off Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below
  }

  /**
   * Handle "SET" requests from HomeKit
   * These are sent when the user changes the state of an accessory, for example, turning on a Light bulb.
   */
  setOn(value: CharacteristicValue) {
    // implement your own code to turn your device on/off
    this.platform.log.debug('Значение value на входе  ->', value);
    if (this.outInv) {
      value = !value;
    }

    this.exampleStates.On = value as boolean;
    
    if (this.outType === 'out') {
      if (this.mode === 'true') {
        this.laurent.setOut(this.out, value);
      } else if (this.mode === 'onOff') {
        this.laurent.setOut(this.out, 'onOff');
        setTimeout(() => {
          this.service.updateCharacteristic(this.platform.Characteristic.On, false);
        }, 1000);
      } else if (this.mode === 'toggle') {
        this.laurent.setOut(this.out, 'toggle');
      }
    }

    if (this.outType === 'rel') {
      if (this.mode === 'true') {
        this.laurent.setRelle(this.out, value);
      } else if (this.mode === 'onOff') {
        this.laurent.setRelle(this.out, 'onOff');
        setTimeout(() => {
          this.service.updateCharacteristic(this.platform.Characteristic.On, false);
        }, 1000);
      } else if (this.mode === 'toggle') {
        this.laurent.setRelle(this.out, 'toggle');
      }
    }
    
    this.platform.log.debug('Set Characteristic On ->', value);
    this.platform.log.debug('инвертирование ->', this.outInv);
  }

  /**
   * Handle the "GET" requests from HomeKit
   * These are sent when HomeKit wants to know the current state of the accessory, for example, checking if a Light bulb is on.
   *
   * GET requests should return as fast as possbile. A long delay here will result in
   * HomeKit being unresponsive and a bad user experience in general.
   *
   * If your device takes time to respond you should update the status of your device
   * asynchronously instead using the `updateCharacteristic` method instead.

   * @example
   * this.service.updateCharacteristic(this.platform.Characteristic.On, true)
   */
  async getOn(): Promise<CharacteristicValue> {
    if (this.outType === 'out') {
      if (this.props.mode === 'onOff') {
        await this.laurent.sleep(1500);
        const res = await this.laurent.getDelayedStatus(1000);
        
        if (this.outInv) {
          const isOn = +res.outTable[this.out - 1] ? false : true;
          this.platform.log.debug('Запрос состояния -> ' + this.out + ' ', isOn);
          return isOn;
        } else {
          const isOn = +res.outTable[this.out - 1] ? true : false;
          this.platform.log.debug('Запрос состояния -> ' + this.out + ' ', isOn);
          return isOn;
        } 
      } else {
        const res = await this.laurent.getDelayedStatus(1000);

        if (this.outInv) {
          const isOn = +res.outTable[this.out - 1] ? false : true;
          this.platform.log.debug('Запрос состояния -> ' + this.out + ' ', isOn);
          return isOn;
        } else {
          const isOn = +res.outTable[this.out - 1] ? true : false;
          this.platform.log.debug('Запрос состояния -> ' + this.out + ' ', isOn);
          return isOn;
        }
      }
    }

    if (this.outType === 'rel') {
      if (this.props.mode === 'onOff') {
        await this.laurent.sleep(1500);
        const res = await this.laurent.getDelayedStatus(1000);
        
        if (this.outInv) {
          const isOn = +res.releTable[this.out - 1] ? false : true;
          this.platform.log.debug('Запрос состояния -> ' + this.out + ' ', isOn);
          return isOn;
        } else {
          const isOn = +res.releTable[this.out - 1] ? true : false;
          this.platform.log.debug('Запрос состояния -> ' + this.out + ' ', isOn);
          return isOn;
        } 
      } else {
        const res = await this.laurent.getDelayedStatus(1000);

        if (this.outInv) {
          const isOn = +res.releTable[this.out - 1] ? false : true;
          this.platform.log.debug('Запрос состояния -> ' + this.out + ' ', isOn);
          return isOn;
        } else {
          const isOn = +res.releTable[this.out - 1] ? true : false;
          this.platform.log.debug('Запрос состояния -> ' + this.out + ' ', isOn);
          return isOn;
        }
      }
    }
    return false;
  }
}
