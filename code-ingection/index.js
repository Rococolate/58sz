const CDP = require('chrome-remote-interface');
// const fs = require('fs');
const sleep = require('sleep-promise');
// const PATH = require('path');
// const url = require('./config.js').url;
// const expression = fs.readFileSync(PATH.resolve(__dirname, 'dist/bundle.js'), "utf8");

async function codeIngection(url,expression) {
  let client
  try{
    client = await CDP();
    const {DOM, Emulation, Network, Page, Runtime} = client;
    await Network.enable();
    await Page.enable();
    await DOM.enable();
    await Network.setCacheDisabled({cacheDisabled: true});
    client.on('error', (err) => {
      console.log(err);
    });
    await Page.navigate({url});
    await Page.loadEventFired();
    await sleep(1000);
    await Runtime.evaluate({expression: expression});
  } catch (err) {
    console.log(err);
  } finally{
    if (client) {
      await client.close();
    }
  }
}

module.exports = codeIngection;