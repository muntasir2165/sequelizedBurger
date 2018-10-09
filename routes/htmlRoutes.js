var db = require("../models");
var auth = require("../utility/facebook");
var path = require("path");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/profile", function (req, res) {
    auth(req.cookies.FBToken, function (response) {
      if (response.is_valid === true) {
        db.User.findOne({
          where: { userId: response.user_id }
        }).then(function (userData) {
          res.render("profile", {
            userData: userData
          });
        });
      } else {
        res.render("index");
      }
    });
  });

  app.get("/feed", function (req, res) {
    auth(req.cookies.FBToken, function (response) {
      if (response.is_valid === true) {
        db.Product.findAll({}).then(function (dbProduct) {
          db.Category.findAll({}).then(function (dbCategory) {
            console.log(JSON.stringify(dbCategory))
            res.render("feed", {
              product: dbProduct,
              authToken: req.params.token,
              category: dbCategory
            })

          });
        });
      } else {
        res.render("index");
      }
    });

  });


  app.get("/category/:categoryid", function (req, res) {
    auth(req.cookies.FBToken, function (response) {
      if (response.is_valid === true) {
        // console.log(req.params.categoryid)
        db.Product.findAll({
          where: {
            CategoryId: req.params.categoryid
          }
        }).then(function (dbProduct) {
          db.Category.findAll({}).then(function (dbCategory) {
            res.render("category", {
              product: dbProduct,
              authToken: req.params.token,
              category: dbCategory
            })
          });
        })
      } else {
          res.render("index");
      }
    }) 
  });

  //HTML Wishlist Route
  app.get("/wishlist", function (req, res) {
    auth(req.cookies.FBToken, function (response) {
      if (response.is_valid === true) {
        var userId = req.cookies.userId;
        db.User.findOne({
          where: { id: userId }
        }
        ).then(function (dbUser) {
          var wishList = JSON.parse(dbUser.wishList);
          db.Product.findAll({
            where: {
              id: {
                [db.Sequelize.Op.in]: wishList
              }
            }
          }).then(function (dbWishlist) {
            console.log(JSON.stringify(dbWishlist));
            res.render("wishlist", {
              wishlist: dbWishlist
            });
          });
        });
      } else {
        res.render("index");
      }
    })
  });

  //HTML My Listings Route
  app.get("/listings", function (req, res) {
    auth(req.cookies.FBToken, function (response) {
      if (response.is_valid === true) {
        db.Product.findAll({
          where: { userId: req.cookies.userId },
          include: [db.Category]
        }).then(function (dbListings) {
          // console.log(dbListings);
          console.log(JSON.stringify(dbListings));
          res.render("listings", {
            listings: dbListings

          });
        });
      } else {
        res.render("index");
      }
    })
  });

  app.get("/message/:UserId/:otherUserId/:productId", function (req, res) {
    auth(req.cookies.FBToken, function (response) {
      if (response.is_valid === true) {
        console.log(req.body)
        db.Message.findAll({
          where: {
            UserId: req.params.UserId,
            otherUserId: req.params.otherUserId,
            productId: req.params.productId
          },
          order: [
            ["createdAt", "ASC"]
          ]
        }
        ).then(function (dbMessageFromUser) {
          db.Message.findAll({
            where: {
              otherUserId: req.params.UserId,
              UserId: req.params.otherUserId,
              productId: req.params.productId
            },
            order: [
              ["createdAt", "ASC"]
            ]
          }
          ).then(function (dbMessageFromOtherUser) {
            db.Product.findOne({
              where: {
                id: req.params.productId
              }
            }).then(function (dbProduct) {
              res.render("message", {
                messageFromUser: dbMessageFromUser,
                dbMessageFromOtherUser: dbMessageFromOtherUser,
                product: dbProduct,
                totalNumberOfMessages: dbMessageFromUser.length + dbMessageFromOtherUser.length
              });
            });
          });
        });
      } else {
        res.render("index");
      }
    })
  });

  app.get("/searchProduct/:userId/:searchProduct", function (req, res) {
    auth(req.cookies.FBToken, function (response) {
      if (response.is_valid === true) {
        var searchProduct = req.params.searchProduct;
        db.Product.findAll({
          where: {
            name: {
              $like: "%" + searchProduct + "%"
            }
          }
        }).then(function (dbProduct) {
          console.log(JSON.stringify(dbProduct));
          res.render("searchProduct", {
            product: dbProduct
          });
        });
      } else {
        res.render("index");
      }
    })
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
