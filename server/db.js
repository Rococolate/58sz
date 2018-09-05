const Sequelize = require('sequelize');
const {database,username,password,host,port} = require('../_s/index.js');

var sequelize = new Sequelize(database, username, password, {
  host: host,
  port:port,
  dialect: 'mysql',
  pool: {
      max: 5,
      min: 0,
      idle: 30000
  },
  timestamps: false
  //最好关掉timestamps , 框架自动帮你添加时间到UpdatedAt上边
});

sequelize
  .authenticate()
  .then(() => {
      console.log('Connection has been established successfully.');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });

const ZF = sequelize.define('zf_58',{
  uid:{
    type:Sequelize.STRING(256),
    primaryKey: true
  },
  title:Sequelize.STRING(256),
  url:Sequelize.STRING(256),
  size:Sequelize.STRING(256),
  other:Sequelize.STRING(256),
  avatar:Sequelize.STRING(256),
  value:Sequelize.STRING(256),
  catch_time:Sequelize.STRING(256),
  type:Sequelize.STRING(256),
  area:Sequelize.STRING(256),
},{
  freezeTableName:true
})


async function findAll(query){
  const res = await ZF.findAll(query);
  return res;
}

async function create(data){
  const res = await ZF.create(data);
  return res;
}

async function destroy(queryRes){
  const res1 = await Promise.all(queryRes.map((item) => {
    return item.destroy();
  }));
  return res1;
}

async function save(queryRes,updateDate){
  const res1 = await Promise.all(queryRes.map((item) =>{
    for(let name in updateDate){
      item[name] = updateDate[name];
    }
    return item.save();
  }));
  return res1;
}

;(async()=>{
  const res = await findAll({where:{uid:4}});
  console.log(res);
  if (res.length === 0) {
    const res1 = await create({uid:4,title:1});
    console.log(res1);
  } else {
    // const res2 = await save(res,{uid:4,title:2});
    const res2 = await destroy(res);
  }
})()
// ZF.findAll({
//   where:{
//     uid:3
//   }
// }).then(res => console.log(res[0].dataValues));
// ZF.findAll().then(zfs => {
//   console.log(zfs)
//   return ZF.create({
//     uid:3,
//     title:1,
//   }).then(msg=>{
//     console.log(msg);
//   })
// })




