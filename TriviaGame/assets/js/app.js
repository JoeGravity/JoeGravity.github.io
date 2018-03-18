
// $(document).ready(function () {

$("#quizBox").hide();
$("#scorebox").hide();

//  Set our number counter to 10 sec.
var number = 11;
//  Variable that will hold our interval ID when we execute the "run" function
var intervalId;

//  The run function sets an interval that runs the decrement function once a second.
//  *****BUG FIX******** 
//  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    // hide button
    $("#start").hide();
    // show quiz
    $("#quizBox").show();
    //start timer
}

//  The decrement function.
function decrement() {
    //  Decrease number by one.
    number--;
    //  Show the number in the #show-number tag.
    $("#timeLeft").html(number);

    //  Once number hits zero...
    if (number === 0) {
        //  ...run the stop function.
        stop();
        //  Alert the user that time is up.
        mssg = "Time’s Up!";
        // call score tally ƒ)
        tally();
    }
}

//  The stop function
function stop() {
    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
}

//--------------------------------------------------------------------

// set initial score
var correct = 0;
var incorrect = 0;
var missing = 0;
var mssg = "Your Score:"

$("form").on("submit", function (e) {
    // infinite loop bug fix
    e.preventDefault();
    // stop timer (if still running)
    stop();
    tally();
});

function tally() {
    // add up scores
    $questions = $(".question");
    $questions.each(function () {
        var answer = $(this).find("input:checked"),
            key = answer.attr("name"),
            val = answer.attr("value");
        console.log(key, val, answers[key], answer.length);

        if (answer.length === 0) {
            // add to total
            missing++;
        } else if (answers[key] !== val) {
            // add to total
            incorrect++;
        } else {
            // add to total
            correct++;
            // show scores (ƒ)
        }
    }); scoring();

};

// answer key
var answers = {
    "q1": "a",
    "q2": "a",
    "q3": "c",
    "q4": "d"
}

// show scores(ƒ)
function scoring() {
    $('#doneBtn').hide();
    $("#scorebox").show();
    $("#annc").text(mssg);
    $('#wahr').text(correct);
    $('#falsch').text(incorrect);
    $('#missed').text(missing);
    $('#scorebox').append('<input type="button">&#160; Try again</button>');
};

//  When the Try Again button gets clicked, 
$("#scorebox").on("click", function () {
    // reload the page
    location.reload();
});

//  When the Start button gets clicked, execute the run function.
$("#start").on("click", run);

    // });