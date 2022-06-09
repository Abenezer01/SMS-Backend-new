'use strict';
module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define('messages', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    phone: DataTypes.STRING,
    full_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    content: DataTypes.STRING
    
  }, {});
  messages.associate = function(models) {
    // associations can be defined here
  };
  return messages;
};