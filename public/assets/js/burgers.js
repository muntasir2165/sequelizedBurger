// // Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {
  newBurgerToEat();
  devourBurger();
  undoDevourBurger();
  deleteBurger();
    // show the tooltip when the cursor hovers over the burger devouring / undo
    // and delete buttons
    $('[data-toggle="tooltip"]').tooltip();
    customerEatsBurger();
  });

function customerEatsBurger() {
  $(document).on("click", ".customer_devour_burger", function() {
    event.preventDefault();
    var customerName = $(this).prev(".customerName").val().trim();
    if (customerName) {
      var burgerId = $(this).attr("data-id");
      updateDevourBurgerToDb(burgerId, customerName);
    } else {
      alert("ERROR: Please enter a customer name before trying to order the burger.");
    }
  });
}

function newBurgerToEat() {
  $("#submit_burger").on("click", function(event) {
    event.preventDefault();
    if ($("#burgerName").val()) {
      var burgerName = $("#burgerName").val().trim();
      addNewBurgerToEatToDb({"burgerName": burgerName, "devoured": false})
    } else {
      alert("ERROR: Please enter a burger name before submitting the form.");
    }
  });
}

function addNewBurgerToEatToDb(newBurger) {
  console.log(JSON.stringify(newBurger));
  $.ajax({
    url: "/burgers",
    type: "POST",
    data: newBurger,
    success: function(result) {
      console.log("Created a new burger to eat.");
      // Reload the page to get the updated listing of burgers
      location.reload();
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Sorry, invalid request.");
            console.log("textStatus: " + textStatus + " errorThrown: " + errorThrown);
          }
        });
}

function devourBurger() {
  $(document).on("click", ".devour_burger", function() {
    var burgerId = $(this).attr("data-id");
      updateDevourBurgerToDb(burgerId, null);
    });
}

function updateDevourBurgerToDb(burgerId, customerName) {
  console.log(burgerId, customerName);
  $.ajax({
    url: "/burgers/devour/" + burgerId,
    type: "PUT",
    data: {"customerName": customerName},
    success: function(result) {
      console.log("Updated the status of the burger with id: " + burgerId + " to devoured");
      // Reload the page to get the updated listing of burgers
      location.reload();
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Sorry, invalid request.");
      console.log("textStatus: " + textStatus + " errorThrown: " + errorThrown);
    }
  });
}

function undoDevourBurger() {
  $(document).on("click", ".undo_devour_burger", function() {
    var burgerId = $(this).attr("data-id");
      updateUndoDevourBurgerToDb(burgerId);
    });
}

function updateUndoDevourBurgerToDb(burgerId) {
  $.ajax({
    url: "/burgers/undo-devour/" + burgerId,
    type: "PUT",
    success: function(result) {
      console.log("Updated the status of the burger with id: " + burgerId + " to undevoured");
      // Reload the page to get the updated listing of burgers
      location.reload();
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Sorry, invalid request.");
      console.log("textStatus: " + textStatus + " errorThrown: " + errorThrown);
    }
  });
}

function deleteBurger() {
  $(document).on("click", ".delete_burger", function() {
    var burgerId = $(this).attr("data-id");
    deleteBurgerInDb(burgerId);
  });
}

function deleteBurgerInDb(burgerId) {
  $.ajax({
    url: "/burgers/" + burgerId,
    type: "DELETE",
    success: function(result) {
      console.log("Deleted the burger with id: " + burgerId + ".");
      // Reload the page to get the updated listing of burgers
      location.reload();
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Sorry, invalid request.");
      console.log("textStatus: " + textStatus + " errorThrown: " + errorThrown);
    }
  });
}
