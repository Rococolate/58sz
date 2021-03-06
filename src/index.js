const sleep = require('./sleep.js');
const serverUrl = require('../config.js').serverUrl;
const url = require('../config.js').url;


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


function fnRoomDom(roomDom) {
  const title = roomDom.querySelector('.des > h2 > a').innerText;
  const url = roomDom.querySelector('.des > h2 > a').href;
  const size = roomDom.querySelector('.des .room').innerText.match(/\d+㎡/i)[0].replace('㎡','');
  const other = roomDom.querySelector('.des .add').innerText;
  const value = roomDom.querySelector('.listliright .money').innerText;
  const avatar = 'http:'+roomDom.querySelector('.img_list > a > img').getAttribute('lazy_src').split('?')[0].replace('/small','');
  const catch_time = Date.now();
  const uid = url.match(/\d+x\.shtml/i)[0].replace('.shtml','');
  const type = '一房';
  const area = '宝安中心区';
  return {title,url,size,other,avatar,value,catch_time,uid,type,area}
}

async function run(url){
  console.log(window.location.href);
  sleep(2000);
  let roomList = [...document.querySelectorAll('ul.listUl > li:not(#bottom_ad_li)')];
  let roomListData = roomList.map((roomDom)=>fnRoomDom(roomDom));
  const nextUrl = document.querySelector('.pager > a.next') ? document.querySelector('.pager > a.next').href : undefined;
  await fetchData(serverUrl,{roomListData,nextUrl});
}
  

run(url);