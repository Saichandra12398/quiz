var score = 0;
// pos is position of where the user in the test or which question they're up to
var pos = 0, wrong = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0;
// this is a multidimensional array with 4 inner array elements with 5 elements inside them
var questions = null;
var ourRequest = new XMLHttpRequest();
var testing = localStorage.getItem("link");
// alert(testing);
ourRequest.open('GET', testing);
ourRequest.onload = function () {
    questions = JSON.parse(ourRequest.responseText);
    // console.log(questions[0]);
};
ourRequest.send();
// this get function is short for the getElementById function  
function get(x) {
    return document.getElementById(x);
}
// this function renders a question for display on the page
var count = 60;
var interval = setInterval(function () {
    document.getElementById('count').innerHTML = 'Remaining Time (Secs) :' + count;
    count--;
    if (count === 0) {
        clearInterval(interval);
        document.getElementById('count').innerHTML = 'Done';
        // or...
        alert("You're out of time!");
        pos = questions.length;
        renderQuestion();
    }
}, 1000);

function renderQuestion() {

    test = get("test");
    if (pos >= questions.length) {
        // test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct</h2>";
        score = correct
        register();
        clearInterval(interval);
        document.getElementById('count').innerHTML = 'Done';
        get("test_status").innerHTML = "Test completed";
        test.innerHTML = '<center><a class="button" href="final.html" role="button"><b>Click here for Results</b></a></center>';
        // test.innerHTML = "<center><button type='submit'> <a href='quiz.html'>view results</a></button></center>";
        // resets the variable to allow users to restart the test
        pos = 0;
        correct = 0;
        // stops rest of renderQuestion function running when test is completed
        return false;
    }
    get("test_status").innerHTML = "Question " + (pos + 1) + " of " + questions.length;

    question = questions[pos].question;
    chA = questions[pos].a;
    chB = questions[pos].b;
    chC = questions[pos].c;
    // display the question
    test.innerHTML = "<h3>" + question + "</h3>";
    // display the answer options
    // the += appends to the data we started on the line above
    test.innerHTML += "<label> <input type='radio' name='choices' value='A'> " + chA + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='B'> " + chB + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='C'> " + chC + "</label><br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}
function checkAnswer() {
    // use getElementsByName because we have an array which it will loop through
    var getSelectedValue = document.querySelector('input[name="choices"]:checked');
    if (getSelectedValue != null) {
        // alert("Radio button is selected" + getSelectedValue);
        choices = document.getElementsByName("choices");
        for (var i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
                choice = choices[i].value;
            }
        }
        // checks if answer matches the correct choice
        if (choice == questions[pos].answer) {
            //each time there is a correct answer this value increases
            correct++;
        }
        else {
            wrong++;
        }
        if (localStorage) {
            localStorage.setItem(pos, choice);
            // alert(localStorage.getItem(pos));
        }
        // changes position of which character user is on
        pos++;
        // clearInterval(interval);
        // count = 15;
        // then the renderQuestion function runs again to go to next question
        renderQuestion();
    }
    else {
        alert("Please select an option to continue");
    }

}
// Add event listener to call renderQuestion on page load event
window.addEventListener("load", renderQuestion);
function register() {
    if (localStorage) {
        localStorage.setItem("score", score);
        localStorage.setItem("totalques", questions.length);
        localStorage.setItem("wrong", wrong);
        // var y=localStorage.getItem("totalques");
        // alert(y);
    }
}
