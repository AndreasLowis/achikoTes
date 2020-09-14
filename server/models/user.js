'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(5)

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
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format must be "name@mail.com"'
        }, notEmpty : {
          msg: 'Please fill the email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4,10],
          msg: 'Password must be 4 to 10 characters'
        }, notEmpty : {
          msg: 'Please fill the password'
        }
      }
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill the name'
        }, notEmpty : {
          msg: 'Please fill the name'
        }
      }
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill the address'
        }, notEmpty : {
          msg: 'Please fill the address'
        }
      }
    }
  }, {hooks: {
    beforeCreate: (user, options) => {
      console.log(user.dataValues.password, "ini user");
      console.log(options, "ini options");
      console.log(user.password, "ini options");
      user.password = bcrypt.hashSync(user.password, salt)
    }
  },sequelize,
    modelName: 'User',
  });
  return User;
};