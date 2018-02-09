$(document).ready(function() { 

  var config = {
    apiKey: "AIzaSyCfE2OM768fZ9OHXC9aOy74wu0xiqiBgBc",
    authDomain: "something-new-3946b.firebaseapp.com",
    databaseURL: "https://something-new-3946b.firebaseio.com",
    projectId: "something-new-3946b",
    storageBucket: "something-new-3946b.appspot.com",
    messagingSenderId: "755824100285"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();
  var tName = "";
  var destination = "";
  var trainTimeInput = "";
  var frequency = "";

  // Capture Button Click
  $("#addTrain").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();

    tName = $("#tNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    trainTimeInput = moment($("#trainTimeInput").val().trim(), "hh:mm").subtract(1, "day").format("X");
    frequency = $("#frequencyInput").val().trim();
    $("#tNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");
    database.ref().push({
      dbName: tName,
      dbDestination: destination,
      dbTrainTimeInput: trainTimeInput,
      dbFrequency: frequency
    });
  });
  database.ref().on("child_added", function(snapshot) {

    // Change the HTML to reflect

    var nameDisplay = snapshot.val().dbName;
    var destinationDisplay = snapshot.val().dbDestination;
    var trainTimeInputDisplay = snapshot.val().dbTrainTimeInput;
    var frequencyDisplay = snapshot.val().dbFrequency;

    var diffTime = moment().diff(moment.unix(trainTimeInputDisplay), "minutes");
    var timeRemainder = moment().diff(moment.unix(trainTimeInputDisplay), "minutes") % frequencyDisplay;
    var minutes = frequencyDisplay - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm");

    $("#trainDisplay").append(
      "<tr><td>" + nameDisplay + "</td><td>"
      + destinationDisplay + "</td><td>"
      + frequencyDisplay + " mins" + "</td><td>"
      + nextTrainArrival + "</td><td>"
      + minutes + "</td></tr>");

  }, function(errorObject) { 
    console.log("Errors handled: " + errorObject.code);
  });
});
