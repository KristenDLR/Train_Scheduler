// Initialize Firebase
var config = {
  apiKey: "AIzaSyASUy83d40o1hxmUHvvfcj0Bc1XdbzGZQU",
  authDomain: "trainscheduler-302b2.firebaseapp.com",
  databaseURL: "https://trainscheduler-302b2.firebaseio.com",
  projectId: "trainscheduler-302b2",
  storageBucket: "trainscheduler-302b2.appspot.com",
  messagingSenderId: "951496334865"
};
firebase.initializeApp(config);

var trainName = "";
var destination = "";
var frequency;
var arrival;
var minAway;
var firstTimeConverted = "";

var database = firebase.database();


$(".submit").on("click", function() {
  trainName = $("#data-name").val().trim();
  destination = $("#data-dest").val().trim();
  frequency = $("#data-freq").val().trim();
  arrival = $("#data-time").val().trim();
  firstTimeConverted = moment($("#data-time").val().trim(), "hh:mm").subtract(1, "years").format("X");
  $("<tr>").appendTo("#train-view");


  database.ref().push({
      tName: trainName,
      dest: destination,
      arrive: firstTimeConverted,
      freq: frequency,
      mAway: firebase.database.ServerValue.TIMESTAMP
  })
})

database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());


  var trainName = childSnapshot.val().tName;
  var destination = childSnapshot.val().dest;
  var frequency = childSnapshot.val().freq;
  var firstTime = childSnapshot.val().arrive;
  var mAway = childSnapshot.val().mAway;





    console.log(firstTimeConverted);



    var currentTime =   moment();
    console.log("111: " +currentTime);
    console.log("Current Time: " + moment(currentTime).format("HH:mm"));
    // Difference between the times
    console.log(currentTime);
    console.log(firstTime);
   // var diffTime = moment(currentTime).diff(moment(firstTime).format("HH:mm"));
   var diffTime = moment().diff(moment.unix(firstTimeConverted),"minutes");
    console.log("Difference in Time: " + diffTime);
    // Time apart (remainder)
    var tRemainder = moment().diff(moment.unix(firstTime),"minutes") % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "m").format("hh:mm  A");
    console.log("ARRIVAL TIME: " + nextTrain);


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
  );

  $("#train-table").append(newRow);



}, function(errorObject) {

  console.log("Errors handled: " + errorObject.code);


});
