import { Laurent } from './LaurentClass';

const laurent = new Laurent('http://192.168.0.101');

async function evening() {
  await laurent.setOut(12, 'onOff');
  await laurent.sleep(30000);
  await laurent.setOut(4, true);
}

async function morning(dilay: number) {
  await laurent.setOut(4, false);
  await laurent.sleep(dilay);
  await laurent.setOut(11, 'onOff');
  await laurent.sleep(dilay);
  await laurent.setOut(6, false);
  await laurent.sleep(dilay);
  await laurent.setOut(9, false);
  await laurent.sleep(dilay);
  await laurent.setOut(7, false);
}

async function relax(dilay: number) {
  await laurent.setOut(4, false);
  await laurent.sleep(dilay);
  await laurent.setOut(7, true);
  await laurent.sleep(dilay);
  await laurent.setOut(9, true);
}

evening();
//morning(100);
//relax(100);