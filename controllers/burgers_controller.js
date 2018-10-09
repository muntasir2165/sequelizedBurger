var db = require("../models");
var Filter = require('bad-words');
var filter = new Filter();

module.exports = function(app) {

  // Load index page
  app.get("/", function (req, res) {
    db.Burger.findAll({
      include: [db.Customer],
      order: [
            ["name", "ASC"]
        ]
    }).then(function(dbBurger){
      // console.log(dbBurger);
      res.render("index", {
        burgers: dbBurger
      });
    });
  });

  app.post("/burgers", function (req, res) {
    db.Burger.create({
      name: filter.clean(req.body.burgerName)
    }).then(function(results) {
      res.status(200).end();
    });
  });

  app.put("/burgers/devour/:burgerId", function(req,res){
    // console.log("req.body.customerName: " + req.body.customerName);
    if (req.body.customerName) {
      db.Customer.create({
        name: filter.clean(req.body.customerName)
      })
      .then(function(newCustomer){
        // console.log("burger new customer results object: " + results + "\n" + JSON.stringify(results));
          db.Burger.update({
          devoured: true,
          CustomerId: newCustomer.id
        },{
          where: {
            id: req.params.burgerId
          }
        }).then(function(results){
          res.status(200).end();
        });
      });
    } else {
      db.Burger.update({
        devoured: true
      },{
        where: {
          id: req.params.burgerId
        }
      }).then(function(results){
        res.status(200).end();
      });
    }
  });

  app.put("/burgers/undo-devour/:burgerId", function(req,res){
    db.Burger.update({
      devoured: false,
      CustomerId: null
    },{
      where: {
        id: req.params.burgerId
      }
    }).then(function(results){
      res.status(200).end();
    });
  });

  app.delete("/burgers/:burgerId", function (req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.burgerId
      }
    }).then(function(results) {
      console.log(results); // => the number of deleted rows (in this case, results = 1)
      res.status(200).end();
    });
  });

};
