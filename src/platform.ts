import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';

import { PLATFORM_NAME, PLUGIN_NAME, URL_LAURENT } from './settings';

import { Window } from './platformAccessory/window';
import { Laurent } from './LaurentClass';
import { LaurentOuts } from './platformAccessory/LaurentOuts';

const laurent = new Laurent(URL_LAURENT);

/**
 * HomebridgePlatform
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
export class LaurentHomebridgePlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

  // this is used to track restored cached accessories
  public readonly accessories: PlatformAccessory[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.log.debug('Finished initializing platform:', this.config.name);

    this.api.on('didFinishLaunching', () => {
      log.debug('Executed didFinishLaunching callback');
     
      this.discoverDevices(this.config.accessories);
    });
  }

  /**
   * This function is invoked when homebridge restores cached accessories from disk at startup.
   * It should be used to setup event handlers for characteristics and update respective values.
   */
  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);

    this.accessories.push(accessory);
  }

 
  discoverDevices(accessories: any) {
    for (const device of accessories) {
      if (device.outType === 'out' || device.outType === 'rel') {
        this.cteateAccessory(device, LaurentOuts);
      }

      if (device.type === 'Window') {
        this.cteateAccessory(device, Window);
      }
    }
  }

  cteateAccessory(device: any, obg: any) {
    const uuid = this.api.hap.uuid.generate(device.uniqueId);
    const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

    if (existingAccessory) {
      this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);

      new obg(this, existingAccessory, laurent, device);
    } else {
      this.log.info('Adding new accessory:', device.DisplayName);

      const accessory = new this.api.platformAccessory(device.displayName, uuid);

      accessory.context.device = device;

      new obg(this, accessory, laurent, device);

      this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
    }
  }
}
