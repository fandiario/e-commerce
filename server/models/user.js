'use strict';
const bcrypt = require ("bcryptjs")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany (models.Product, {through: models.Cart})
    }
  };
  User.init({
    // email: {
    //   type: DataTypes.STRING,
    //   validate: {
    //     isEmail: {
    //       args: true
    //     }
    //   }
    // },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        const salt = bcrypt.genSaltSync (10)
        const hash = bcrypt.hashSync (user.password, salt)
        user.password = hash
      }      
    }
  });
  return User;
};