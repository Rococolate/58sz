async function fetchGet(url) {
  await fetch(url, {
    method: 'GET', 
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => fn(response));
}
const url = '/localData';
fetchGet(url)
  

function fn(response){
  console.log('Success:',response);
  const data = response.localData.filter(item=>filter(item)).sort((a,b)=>{
    return Number(b.size) - Number(a.size);
  });
  console.log(data);
  const _html = data.map(item=>html(item));
  _html.forEach((item) => {
    const div = document.createElement('div');
    div.innerHTML = item;
    document.body.appendChild(div);
  })
}

function filter(data){
  return data.size >= 30 && parseInt(data.value) >= 2000 && parseInt(data.value) < 4000 && title(data.title)
}

function title(t){
  return t.indexOf('同乐') === -1 && t.indexOf('上川') === -1;
}

function html(item){
  const {title,url,size,add,avatar,value,timestamp,id} = item;
  return `
    <h3><a target="_blank" href="${url}">${title}</a><img style="height:100px;width:auto;" src="${avatar}" alt="" /></h3>
    <p><span>size:${size}</span></p>
    <p><span>value:${value}</span></p>
    <p><span>add:${add}</span></p>
  `;
}

