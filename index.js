const CDP = require('chrome-remote-interface');
const url = `https://sz.58.com/baoanzhongxinquba/zufang/0/j1/`; //  宝安中心区-整租-个人房源-一居
const expression = `
  async function sleep(time){
    await new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  async function fetchData(url,data) {
    await fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  

  ;(async()=>{
    const serverUrl = 'http://localhost:3000/data';
    console.log(window.location.href);
    sleep(2000);
    let roomList = [...document.querySelectorAll('ul.listUl > li:not(#bottom_ad_li)')];
    let roomListData = roomList.map((roomDom)=>fnRoomDom(roomDom));
    await fetchData(serverUrl,roomListData);
    function fnRoomDom(roomDom) {
      const title = roomDom.querySelector('.des > h2 > a').innerText;
      const url = roomDom.querySelector('.des > h2 > a').href;
      const size = roomDom.querySelector('.des .room').innerText.match(/\\d+㎡/i)[0].replace('㎡','');
      const add = roomDom.querySelector('.des .add').innerText;
      const avatar = roomDom.querySelector('.img_list > a > img').getAttribute('lazy_src').split('?')[0].replace('/small','');
      console.log(title);
      console.log(url);
      console.log(size);
      console.log(add);
      console.log(avatar);
      return {title,url,size,add,avatar}
    }
  })()
`;

async function sleep(time){
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function run() {
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

run();