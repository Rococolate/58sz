var express = require('express');
var router = express.Router();
const fs = require('fs');
const PATH = require('path');
const codeIngection = require('../../code-ingection/index.js');
const firstUrl = require('../../config.js').url;
const expression = fs.readFileSync(PATH.resolve(__dirname, '../../dist/bundle.js'), "utf8");
console.log(expression);
const store = require('../../store/index.js');
const localData = require('../../data/index.js');

const zf = require('../model/zf.js');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};


router.use(allowCrossDomain);

async function findAll(query){
  await zf.findAll(query);
}

async function create(data){
  await zf.create(data);
}

/* GET home page. */
router.get('/serch',async function(req, res, next) {
  await codeIngection(firstUrl,expression);
  res.render('index', { title: 'Express' });
});

router.post('/data',async function(req, res, next) {
  console.log(req.body);
  const nextUrl = req.body.nextUrl;
  const roomListData = req.body.roomListData;
  roomListData.forEach(item=>store.push(item));

  res.json({status:'0000'});
  if (nextUrl !== undefined ) {
    await codeIngection(nextUrl,expression);
  } else {
    const data = `
      module.exports = ${JSON.stringify(store)}
    `;
    fs.writeFile(PATH.resolve(__dirname, '../../data/index.js'),data,(err)=>{
      console.log(err);
    })
  }
});

router.get('/',function(req, res, next) {
  res.render('index', { store });
});

router.get('/localData',function(req, res, next) {
  res.json({status:'0000',localData});
});

router.get('/local',function(req, res, next) {
  res.render('data', { title:'data' });
});

module.exports = router;
