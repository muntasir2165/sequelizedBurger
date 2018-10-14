module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Burger.associate = function(models) {
    // We're saying that a Burger should belong to a Customer
    // However, in this case a Burger can be created without a Customer due to the foreign key constraint having the property-value pair (allowNull: true)
    Burger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Burger;
};
