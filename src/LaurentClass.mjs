import got from 'got';

export class Laurent {
  constructor(url = 'http://192.168.0.101') {
    this.url = url;
    this.status = {
      systime: '00000',
      inTable: '000000',
      outTable: '000000000000',
      releTable: '0000',
      adc0: '0.000',
      adc1: '0.000',
      temper: '0.000',
      count0: '00',
      count1: '00',
      count2: '00',
      count3: '00',
      pwm: '0',
      sistemTime: 0
    }
    this.getDelayedStatus();
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

        this.getDelayedStatus();
        return await this.getOut(out);
      }

      if (typeof options === 'string') {
        const outStat = await this.getOut(out);

        if (options === 'onOff') {
          if (!outStat) {
            response = await got(this.url + '/server.cgi?data=OUT,' + out).text();
            await this.sleep(1000);
            response = await got(this.url + '/server.cgi?data=OUT,' + out).text();

            this.getDelayedStatus();
            return await this.getOut(out);
          } else {
            this.getDelayedStatus();
            return await this.setOut(out, false);
          }
        }

        if (options === 'toggle') {
          response = await got(this.url + '/server.cgi?data=OUT,' + out).text();

          this.getDelayedStatus();
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

        this.getDelayedStatus();
        return await this.getRelle(rel);
      }

      if (typeof options === 'string') {
        const outStat = await this.getRelle(rel);

        if (options === 'onOff') {
          if (!outStat) {
            response = await got(this.url + '/server.cgi?data=REL,' + rel).text();
            await this.sleep(1000);
            response = await got(this.url + '/server.cgi?data=REL,' + rel).text();

            this.getDelayedStatus();
            return await this.getRelle(rel);
          } else {
            this.getDelayedStatus();
            return await this.setRelle(rel, false);
          }
        }

        if (options === 'toggle') {
          response = await got(this.url + '/server.cgi?data=REL,' + rel).text();

          this.getDelayedStatus();
          return await this.getRelle(rel);
        }
      }
    } catch (error) {
      console.log('какая то ошибка ' + error);
      console.log(response);
    }
  }

  /**
   * 
   * @param {1-100} pwm 
   * @returns promise int
   */
  async setPwm(pwm = 0) {
    let response;
    try {
      response = await got(this.url + '/server.cgi?data=PWM,' + pwm).text();

      this.getDelayedStatus();
      return await this.getPWM();
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
   * @param {1-4} rel 
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
   * @returns promise float
   */
  async getTemer() {
    const status = await this.getStatus();
    
    return +JSON.parse(status).temper;
  }

  
  /**
   * Получить значение АЦП
   * @param {*} abc 
   * @returns promise float
   * 
   * laurent.getABC(1).then(res => console.log(res)); АЦП-1
   * laurent.getABC(2).then(res => console.log(res)); АЦП-2
   */
  async getABC(abc = 1) {
    const status = await this.getStatus();

    return +JSON.parse(status)['adc' + (abc - 1)];
  }

  /**
   * Получить значение Сцетчиков
   * @param {*}  counter
   * @returns promise int
   * 
   * laurent.getCounter(1).then(res => console.log(res)); счетчик-1
   * laurent.getCounter(2).then(res => console.log(res)); счетчик-2
   * laurent.getCounter(3).then(res => console.log(res)); счетчик-3
   * laurent.getCounter(4).then(res => console.log(res)); счетчик-4
   */
  async getCounter(counter = 1) {
    const status = await this.getStatus();

    return +JSON.parse(status)['count' + (counter - 1)];
  }

  /**
   * Получить значение ШИМ
   * @returns promise int
   * 
   * laurent.setPwm(69).then(res => console.log('PWM ' + res)); установить значение 69
   */
  async getPWM() {
    const status = await this.getStatus();
    
    return +JSON.parse(status).pwm;
  }

  /**
   * Получить сoстояние входов
   * @param {1-6} input 
   * @returns promise boolean
   * 
   * getIn(2).then(res => console.log(res));
   */
  async getIn(input) {
    const status = await this.getStatus();
    
    return !!+JSON.parse(status).inTable[input-1];
  }

  /**
   * Получает статус с задержкой, что позволяет обращаться к
   * Laurent при частых запросах реже, сокращя их временем
   * заданным в этой функции
   * 
   * например запросы идут с частотой 20 ms
   * при обращении через эту фенкчию запросы увеличаться до 1 секунды
   * getDelayedStatus(1000)
   * 
   * пример:
   * не смотря на то что функция вызывается каждые 100 ms
   * обращение к Laurent будет происходить каждые 5 секунд
   * setInterval( () =>  console.log( laurent.getDelayedStatus(5000) ), 100 ); 
   * 
   * @param {*} delay
   * @returns object 
   */
  getDelayedStatus(delay = 0) {
    const newDate = new Date().getTime();
    const oldDate = this.status.sistemTime + delay;

    if (oldDate < newDate) {
        this.getStatus().then(res => {
        const status = JSON.parse(res);
        status.sistemTime = newDate;
        this.status = status;
      });
    }
    
    return this.status;
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




const laurent = new Laurent();

//laurent.getStatus().then(res => console.log( res));
//laurent.getStatus().then(res => console.log(JSON.parse(res).releTable));
//laurent.getOut(9).then(res => console.log(res));
laurent.setOut(7, false).then(res => console.log('OUT-8 ' + res));
// laurent.setOut(12, 'onOff').then(res => console.log('OUT-12 ' + res));
//laurent.setOut(9, 'toggle').then(res => console.log('OUT-9 ' + res));

//laurent.setPwm(0).then(res => console.log('PWM ' + res));

//laurent.getRelle(2).then(res => console.log('REL-2 ' + res));
// laurent.setRelle(2, false).then(res => console.log('REL-2 ' + res));
//laurent.setRelle(3, 'onOff').then(res => console.log('REL-3 ' + res));
//laurent.setRelle(4, 'toggle').then(res => console.log('REL-4 ' + res));

//laurent.getIn(2).then(res => console.log(res));
//laurent.getTemer().then(res => console.log(res));

//laurent.getPWM().then(res => console.log(res));

//laurent.getABC(1).then(res => console.log(res));
//laurent.getABC(2).then(res => console.log(res));

// laurent.getCounter(1).then(res => console.log(res));
// laurent.getCounter(2).then(res => console.log(res));
// laurent.getCounter(3).then(res => console.log(res));
// laurent.getCounter(4).then(res => console.log(res));


//console.log( laurent.getDelayedStatus() );
//setInterval( () =>  console.log( laurent.getDelayedStatus(5000) ), 100 );
//setTimeout( () =>  console.log( laurent.getDelayedStatus() ), 1000 );
//setTimeout( () => console.log( laurent.status), 1000 );
//console.log(laurent.status);