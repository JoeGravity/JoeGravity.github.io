/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between Arrival and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase

var config = {
  apiKey: "AIzaSyC7djNB9aG1c7H02liDg6YLMMdg6DLf5KM",
  authDomain: "train-times-6b252.firebaseapp.com",
  databaseURL: "https://train-times-6b252.firebaseio.com",
  projectId: "train-times-6b252",
  storageBucket: "train-times-6b252.appspot.com",
  messagingSenderId: "151844275960"
};
firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var trnDest = $("#dest-input").val().trim();
  var trnArr = moment($("#arrival-input").val().trim(), "HH:mm").format("X");
  var trnFreq = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrn = {
    name: trnName,
    dest: trnDest,
    arrival: trnArr,
    freq: trnFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrn);

  // Logs everything to console
  console.log(newTrn.name);
  console.log(newTrn.dest);
  console.log(newTrn.arrival);
  console.log(newTrn.freq);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#arrival-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trnDest = childSnapshot.val().dest;
  var trnArr = childSnapshot.val().arrival;
  var trnFreq = childSnapshot.val().freq;

  // train Info
  console.log(trnName);
  console.log(trnDest);
  console.log(trnArr);
  console.log(trnFreq);

  // Prettify the train arrival
  var nextArr = moment.unix(trnArr).format("HH:mm");
  console.log(trnArr);

  // Calculate minutes until next train

  // // First Time (pushed back 1 year to make sure it comes before current time)
  // var trnArrConverted = moment(trnArr, "HH:mm").subtract(1, "years");
  // console.log(trnArrConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment.unix(trnArr), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = Math.abs(diffTime) % trnFreq;
  console.log(tRemainder);

  // Minute Until Train
  var minAway = trnFreq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minAway);

  // Add each train's data into the table
  // $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" + trnFreq + "</td><td>" + nextArr + "</td></tr>");


  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" + trnFreq + "</td><td>" + nextArr + "</td><td>" + minAway + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume train arrival date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case

/* 
    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = Math.abs(diffTime) % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm")); */
