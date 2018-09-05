const Sequelize = require('sequelize');
const {database,username,password,host,port} = require('../_s/index.js');

console.log(database,username,password,host,port)

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
  size:Sequelize.NUMBER(255),
  other:Sequelize.STRING(256),
  avatar:Sequelize.STRING(256),
  value:Sequelize.NUMBER(255),
  catch_time:Sequelize.STRING(256),
  type:Sequelize.STRING(256),
  area:Sequelize.STRING(256),
},{
  freezeTableName:true
})

module.exports = ZF;


