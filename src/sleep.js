async function sleep(time){
  await new Promise((a,b)=>{
    setTimeout(a, time);
  });
}

module.exports = sleep;