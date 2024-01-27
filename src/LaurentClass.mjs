import got from 'got';

const url = 'http://192.168.0.101';

export class Laurent {
  constructor(url) {
    this.url = url
  }

  async setOut(out) {
    try {
      const response = await got(this.url + '/server.cgi?data=OUT,' + out).text();
      await this.sleep(1000);
      //await got(this.url + '/server.cgi?data=OUT,' + out).text();
      const status = await this.getOut(out);

      return status;
    } catch (error) {
      
    }
  }

  async getOut(out) {
    const status = await this.getStatus();
    
    return !!+JSON.parse(status).outTable[out-1];
  }

  async getStatus() {
    const response = await got(`${this.url}/status.xml`).text();
  
    return JSON.stringify(
      { 
        systime: /<systime0>([^<]+)/.exec(response)[1], 
        inTable: /<in_table0>([^<]+)/.exec(response)[1],
        outTable: /<out_table0>([^<]+)/.exec(response)[1],
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


const laurent = new Laurent(url);

//laurent.getStatus().then(res => console.log(res));
//laurent.getOut(9).then(res => console.log(res));
laurent.setOut(9).then(res => console.log(res));