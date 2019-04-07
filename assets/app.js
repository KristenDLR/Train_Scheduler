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

var database = firebase.database();


$(".submit").on("click", function() {
  trainName = $("#data-name").val().trim();
  destination = $("#data-dest").val().trim();
  frequency = $("#data-freq").val().trim();
  arrival = $("#data-time").val().trim();
  $("<tr>").appendTo("#train-view");


  database.ref().push({
      tName: trainName,
      dest: destination,
      arrive: arrival,
      freq: frequency,
      mAway: firebase.database.ServerValue.TIMESTAMP
  })
})

database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());


  var trainName = childSnapshot.val().tName;
  var destination = childSnapshot.val().dest;
  var frequency = childSnapshot.val().freq;
  var arrive = childSnapshot.val().arrive;
  var mAway = childSnapshot.val().mAway;


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(arrive),
    $("<td>").text(minAway),

  );

  $("#train-table").append(newRow);

  var tFrequency = frequency;
    // Time is 3:30 AM
    var firstTime = arrive;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment(currentTime).diff(moment(firstTimeConverted).format ("minutes"));
    console.log("Difference in Time: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // var timeConverted = moment($("#data-time").val().trim(),“HH:mm”).subtract(1, “years”).format(“X”);
  // var timeConverted = moment(arrive, “HH:mm”).subtract(1, “years”);
  // console.log(firstTimeConverted);

  // var currentTime = moment();
  // console.log("Current time:" + moment(currentTime).format("hh:mm"))

}, function(errorObject) {

  console.log("Errors handled: " + errorObject.code);


});
