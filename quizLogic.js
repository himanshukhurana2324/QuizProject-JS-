const orgFacts = [
  {
    statement: "JavaScript was invented in 1995",
    answer: "true",
    explanation:
      "Brendan Eich created JS at Netscape in 1995. The initial version of the language was written in just 10 days.",
  },
  {
    statement: "Strings in JS are editable values",
    answer: "false",
    explanation:
      "In JavaScript strings are immutable values, meaning they cannot be edited; however, they can replaced with new, different strings.",
  },
  {
    statement: "1 + 1 === 2",
    answer: "true",
    explanation: "The plus operator gives the sum of two numbers.",
  },
  {
    statement: "'1' + '1' === '2'",
    answer: "false",
    explanation:
      "The plus operator concatenates (joins together) strings, so '1' + '1' === '11'.",
  },
  {
    statement: "typeof ['J', 'S'] === 'array'",
    answer: "false",
    explanation:
      "Arrays have the type 'object'. In JS, everything is either a primitive data type (e.g. 'string', 'number') or an object. Arrays are a kind of object with some special properties.  ",
  },
];
let facts = [...orgFacts];
function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

const disable = (button) => {
  button.setAttribute("disabled", "true");
};

const enable = (button) => {
  button.removeAttribute("disabled");
};

function start() {
  //console.log("working");

  hide(beginContent[0]);
  show(mainContent);
  show(headerContent);
  getNextFact();
}

function endPage() {
  document.getElementById("corAns").textContent = correct;
  document.getElementById("comAns").textContent = completed;
  hide(mainContent);
  hide(headerContent);
  show(endContent);
}

const stat = document.getElementById("statement");
const opt = document.querySelector("#options").children;
const exp = document.getElementById("explanation");
const next = document.getElementById("nextQuestion");
const fireBtn = document.getElementById("fire");
const beginContent = document.getElementsByClassName("begin");
const mainContent = document.getElementById("main");
const headerContent = document.getElementById("header");
const endContent = document.getElementById("endContent");
const resBtn = document.getElementById("resBtn");
const restartBtn = document.getElementById("restart");
let correct = 0;
let completed = 0;
let fact;

//CREATING A FUNCTION TO FIRE THE NEXT BUTTON AND SET THE PAGE ACCORDINGLY
function getNextFact() {
  fact = facts.shift();

  stat.textContent = fact.statement;
  hide(exp);

  for (let option of opt) {
    option.classList.remove("correct");
    option.classList.remove("incorrect");
    enable(option);
  }
  disable(next);
}

next.addEventListener("click", getNextFact);

for (let btn of opt) {
  const action = (e) => {
    for (let eachBtn of opt) {
      disable(eachBtn);
    }

    if (facts.length > 0) {
      enable(next);
    } else {
      next.textContent = "No More Questions !";
      show(resBtn);
      resBtn.addEventListener("click", endPage);
    }

    const guess = e.target.value;

    if (guess === fact.answer) {
      e.target.classList.add("correct");
      correct += 1;
    } else {
      e.target.classList.add("incorrect");
    }

    exp.textContent = fact.explanation;
    show(exp);
    completed += 1;

    document.getElementById("correct").textContent = correct;
    document.getElementById("completed").textContent = completed;
  };
  btn.addEventListener("click", action);
}

fireBtn.addEventListener("click", start);
restartBtn.addEventListener("click", (event) => {
  correct = 0;
  completed = 0;

  document.getElementById("correct").textContent = correct;
  document.getElementById("completed").textContent = completed;
  next.textContent = "Next Question";
  hide(resBtn);
  hide(endContent);
  facts = [...orgFacts];
  start();
});
