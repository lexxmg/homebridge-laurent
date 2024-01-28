import { Laurent } from "./LaurentClass.mjs";

const laurent = new Laurent('http://192.168.0.101');

async function evening() {
  await laurent.setOut(12, 'onOff');
  await laurent.sleep(30000);
  await laurent.setOut(4, true);
}

async function morning() {
  await laurent.setOut(4, false);
  await laurent.sleep(500);
  await laurent.setOut(11, 'onOff');
  await laurent.sleep(500);
  await laurent.setOut(6, false);
  await laurent.sleep(500);
  await laurent.setOut(9, false);
  await laurent.sleep(500);
  await laurent.setOut(7, false);
}

evening();
//morning();