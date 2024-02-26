import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';

import { LaurentHomebridgePlatform } from '../platform';
import { config } from 'process';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class LaurentOuts {
  private service: Service;
  private out: number;
  private mode: any;
  private outType: string;
  private outInv: boolean;
  private type: any;

  /**
   * These are just used to create a working example
   * You should implement your own code to track the state of your accessory
   */
  private exampleStates = {
    On: false,
    push: false
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
    this.type = this.props.accessory;

    this.platform.log.debug('Запуск коструктора -> ', this.exampleStates.On);
    this.platform.log.debug('Запуск коструктора accsissories -> ', this.type);
    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    // get the LightBulb service if it exists, otherwise create a new LightBulb service
    // you can create multiple services for each accessory
    this.service = this.accessory.getService(this.platform.Service[this.type])
    || this.accessory.addService(this.platform.Service[this.type]);
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
    this.platform.log.debug('установка значения выхода-> ', `${this.outType} - ${this.out} ${value}`);
    this.exampleStates.push = true;
    // implement your own code to turn your device on/off
    if (this.outInv && this.mode !== 'onOff') {
      value = !value;
    }

    this.exampleStates.On = value as boolean;
    
    if (this.outType === 'out') {
      if (this.mode === 'true') {
        this.laurent.setOut(this.out, value).then((res: any) => {
          res = this.outInv ? !res : res;
          this.exampleStates.On = res as boolean;
          this.service.updateCharacteristic(this.platform.Characteristic.On, res);
        });
      } else if (this.mode === 'onOff') {
        this.laurent.setOut(this.out, 'onOff').then((res: any) => {
          this.exampleStates.On = res as boolean;
          this.service.updateCharacteristic(this.platform.Characteristic.On, res);
        });
      } else if (this.mode === 'toggle') {
        this.laurent.setOut(this.out, 'toggle').then((res: any) => {
          res = this.outInv ? !res : res;
          this.exampleStates.On = res as boolean;
          this.service.updateCharacteristic(this.platform.Characteristic.On, res);
        });
      }
    }

    if (this.outType === 'rel') {
      if (this.mode === 'true') {
        this.laurent.setRelle(this.out, value).then((res: any) => {
          res = this.outInv ? !res : res;
          this.exampleStates.On = res as boolean;
          this.service.updateCharacteristic(this.platform.Characteristic.On, res);
        });
      } else if (this.mode === 'onOff') {
        this.laurent.setRelle(this.out, 'onOff').then((res: any) => {
          this.exampleStates.On = res as boolean;
          this.service.updateCharacteristic(this.platform.Characteristic.On, res);
        });
      } else if (this.mode === 'toggle') {
        this.laurent.setRelle(this.out, 'toggle').then((res: any) => {
          res = this.outInv ? !res : res;
          this.exampleStates.On = res as boolean;
          this.service.updateCharacteristic(this.platform.Characteristic.On, res);
        });
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
    if (this.exampleStates.push) {
      this.exampleStates.push = false;
      await this.laurent.sleep(1000);

      return this.exampleStates.On;
    }

    this.platform.log.debug('Счетчик -> ' + this.laurent.counter);
    if (this.mode === 'onOff') {
      await this.laurent.sleep(2000);
      const res = await this.getStat(this.out, this.outType, false);

      if (+res[1] === -270) throw new Error('Нет ответа');
      return res[0];
    }

    const res = await this.getStat(this.out, this.outType, this.outInv);

    if (+res[1] === -270) throw false //new Error('Нет ответа');
    return res[0];
  }

  async getStat(out = 1, type = 'out', rev = false): Promise<any> {
    const getOut = async (out: number, rev: boolean) => {
      const res = await this.laurent.getDelayedStatus();
      if (rev) {
        return [+res.outTable[out - 1] ? false : true, res.temper];
      } else {
        return [+res.outTable[out - 1] ? true : false, res.temper];
      }
    }

    const getRel = async (out: number, rev: boolean) => {
      const res = await this.laurent.getDelayedStatus();
      if (rev) {
        return [+res.releTable[out - 1] ? false : true, res.temper];
      } else {
        return [+res.releTable[out - 1] ? true : false, res.temper];
      }
    }

    if (type === 'out') {
      return await getOut(out, rev);
    }

    if (type === 'rel') {
      return await getRel(out, rev);
    }
  }
}
