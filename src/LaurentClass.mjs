import got from 'got';

const url = 'http://192.168.0.101';

export class Laurent {
  constructor(url) {
    this.url = url
  }
/**
 * Устанавливает состояние выхода OUT
 * @param {1-12} out 
 * @param {boolean || 'onOff' || 'toggle'} options 
 * @returns promise boolean
 * 
 * setOut(8, false).then(res => console.log('OUT-8 ' + res)); включает или выключает
 * setOut(9, 'onOff').then(res => console.log('OUT-9 ' + res)); включает на время
 * setOut(4, 'toggle').then(res => console.log('OUT-4 ' + res)); изменяет состояние
 */
  async setOut(out, options) {
    let response;

    try {
      if (typeof options === 'boolean') {
        const outStat = await this.getOut(out);

        if (options === true) {
          if (outStat === false) {
            response = await got(this.url + '/server.cgi?data=OUT,' + out).text();
          }
        } else {
          if (outStat === true) {
            response = await got(this.url + '/server.cgi?data=OUT,' + out).text();
          }
        }

        return await this.getOut(out);
      }

      if (typeof options === 'string') {
        const outStat = await this.getOut(out);

        if (options === 'onOff') {
          if (!outStat) {
            response = await got(this.url + '/server.cgi?data=OUT,' + out).text();
            await this.sleep(1000);
            response = await got(this.url + '/server.cgi?data=OUT,' + out).text();

            return await this.getOut(out);
          } else {
            return await this.setOut(out, false);
          }
        }

        if (options === 'toggle') {
          response = await got(this.url + '/server.cgi?data=OUT,' + out).text();

          return await this.getOut(out);
        }
      }
    } catch (error) {
      console.log('какая то ошибка ' + error);
      console.log(response);
    }
  }

/**
 * Устанавливает состояние выхода релле
 * @param {1-4} rel 
 * @param {boolean || 'onOff' || 'toggle'} options 
 * @returns promise boolean
 * 
 * setRelle(2, false).then(res => console.log('REL-2 ' + res)); включает или выключает
 * setRelle(3, 'onOff').then(res => console.log('REL-3 ' + res)); включает на время
 * setRelle(4, 'toggle').then(res => console.log('REL-4 ' + res)); изменяет состояние
 */  
  async setRelle(rel, options) {
    let response;

    try {
      if (typeof options === 'boolean') {
        const outStat = await this.getRelle(rel);

        if (options === true) {
          if (outStat === false) {
            response = await got(this.url + '/server.cgi?data=REL,' + rel).text();
          }
        } else {
          if (outStat === true) {
            response = await got(this.url + '/server.cgi?data=REL,' + rel).text();
          }
        }

        return await this.getRelle(rel);
      }

      if (typeof options === 'string') {
        const outStat = await this.getRelle(rel);

        if (options === 'onOff') {
          if (!outStat) {
            response = await got(this.url + '/server.cgi?data=REL,' + rel).text();
            await this.sleep(1000);
            response = await got(this.url + '/server.cgi?data=REL,' + rel).text();

            return await this.getRelle(rel);
          } else {
            return await this.setRelle(rel, false);
          }
        }

        if (options === 'toggle') {
          response = await got(this.url + '/server.cgi?data=REL,' + rel).text();

          return await this.getRelle(rel);
        }
      }
    } catch (error) {
      console.log('какая то ошибка ' + error);
      console.log(response);
    }
  }

  /**
   * Получить сщстояние выхода OUT
   * @param {1-12} out 
   * @returns promise boolean
   * 
   * getOut(9).then(res => console.log(res));
   */
  async getOut(out) {
    const status = await this.getStatus();
    
    return !!+JSON.parse(status).outTable[out-1];
  }

  /**
   * Получить сщстояние выхода релле
   * @param {1-4} out 
   * @returns promise boolean
   * 
   * getRelle(2).then(res => console.log(res));
   */
  async getRelle(rel) {
    const status = await this.getStatus();
    
    return !!+JSON.parse(status).releTable[rel-1];
  }

  /**
   * Получить значение темпиратуры
   * @returns promise num
   */
  async getTemer() {
    const status = await this.getStatus();
    
    return +JSON.parse(status).temper;
  }

  /**
   * Получить общее состояния в JSON
   * @returns promise JSON
   * 
   * getStatus().then(res => console.log(res));
   * getStatus().then(res => console.log(JSON.parse(res).releTable));
   */
  async getStatus() {
    const response = await got(`${this.url}/status.xml`).text();
  
    return JSON.stringify(
      { 
        systime: /<systime0>([^<]+)/.exec(response)[1], 
        inTable: /<in_table0>([^<]+)/.exec(response)[1],
        outTable: /<out_table0>([^<]+)/.exec(response)[1],
        releTable: /<rele_table0>([^<]+)/.exec(response)[1],
        adc0: /<adc0>([^<]+)/.exec(response)[1], 
        adc1: /<adc1>([^<]+)/.exec(response)[1],
        temper: /<temper0>([^<]+)/.exec(response)[1],
        count0: /<count0>([^<]+)/.exec(response)[1],
        count1: /<count1>([^<]+)/.exec(response)[1],
        count2: /<count2>([^<]+)/.exec(response)[1],
        count3: /<count3>([^<]+)/.exec(response)[1],
        pwm: /<pwm0>([^<]+)/.exec(response)[1]
      }
    );
  }

  async sleep(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), time);
    })
  }
}


//const laurent = new Laurent(url);

//laurent.getStatus().then(res => console.log(JSON.parse(res).releTable));
//laurent.getOut(9).then(res => console.log(res));
// laurent.setOut(8, false).then(res => console.log('OUT-8 ' + res));
// laurent.setOut(12, 'onOff').then(res => console.log('OUT-12 ' + res));
//laurent.setOut(9, 'toggle').then(res => console.log('OUT-9 ' + res));

//laurent.getRelle(2).then(res => console.log('REL-2 ' + res));
// laurent.setRelle(2, false).then(res => console.log('REL-2 ' + res));
//laurent.setRelle(3, 'onOff').then(res => console.log('REL-3 ' + res));
// laurent.setRelle(4, 'toggle').then(res => console.log('REL-4 ' + res));

//laurent.getTemer().then(res => console.log(res));