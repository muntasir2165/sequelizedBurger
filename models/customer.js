module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    // Giving the Customer model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Customer.associate = function(models) {
    // Associating Customer with Burgers
    // When a Customer is deleted, also delete any associated Burgers
    Customer.hasMany(models.Burger, {
      onDelete: "cascade"
    });
  };

  return Customer;
};
