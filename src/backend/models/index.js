const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user.model')(sequelize, DataTypes);
db.Subscription = require('./subscription.model')(sequelize, DataTypes);
db.Hotel = require('./hotel.model')(sequelize, DataTypes);

// Associations
db.User.hasOne(db.Subscription, { foreignKey: 'userId', as: 'subscription' });
db.Subscription.belongsTo(db.User, { foreignKey: 'userId' });

db.User.hasMany(db.Hotel, { foreignKey: 'userId', as: 'hotels' });
db.Hotel.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
