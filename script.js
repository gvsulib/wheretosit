// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

const unchecked_image = "images/unchecked.png"
const checked_image = "images/checked.png"

let answers =[];
let finalPicks = new Map();

function showObject(obj) {
  var result = "";
  for (var p in obj) {
    if( obj.hasOwnProperty(p) ) {
      result += p + " , " + obj[p] + "\n";
    } 
  }              
  return result;
}

function changeImage(choice, start, end) {
  const image = choice.querySelector('.checkbox');

  if(choice.style.backgroundColor !== '#cfe3ff') {
    if(choice.style.opacity === '0.6') {
      choice.style.opacity = '1.0';
    }

    choice.style.backgroundColor = '#cfe3ff';
    image.src = checked_image;
    for(let i = start; i<end; i++) {
      let other = answerChoices[i];
      if(other!==choice) {
        other.style.opacity='0.6';
        other.style.backgroundColor = '#f4f4f4';
        other.querySelector('.checkbox').src = unchecked_image;
      }
    }
  }
}

function addAnswers(choice) {
  if(!answers.includes(choice.dataset.questionId)) {
    answers.push(choice.dataset.questionId);
  }
}

function answerQuestions(choice) {
  if(choice.dataset.questionId === 'one') {
    changeImage(choice, 0, 8);
    addAnswers(choice);
  } else if(choice.dataset.questionId === 'two') {
    changeImage(choice, 8, 16);
    addAnswers(choice);
  } else if(choice.dataset.questionId === 'three') {
    changeImage(choice, 16, 24);
    addAnswers(choice);
  } else if(choice.dataset.questionId === 'four') {
    changeImage(choice, 24, 32);
    addAnswers(choice);
  } else {
    changeImage(choice, 32, 40);
    addAnswers(choice);
  }
}

function selectItem(event) {
  answerQuestions(event.currentTarget);
  if(answers.length === 5) {
    getResults();
    displayResults();
  }
}

function getResults() {
  for(let i = 0; i<answerChoices.length; i++) {
    let element = answerChoices[i];
    if(element.style.backgroundColor === 'rgb(207, 227, 255)') {
      finalPicks.set(element.dataset.questionId, element.dataset.choiceId);
    }
  }
}

const resultContainer = document.querySelector('#result');

function getText(title, body, key) {
  title.textContent = "You got:" + ' ' + RESULTS_MAP[key]['title'];
  body.textContent = RESULTS_MAP[key]['contents'];

  document.getElementById('tweetlink').href = 'http://twitter.com/home/?status=I%20got:%20' +  encodeURIComponent(RESULTS_MAP[key]['title']) + '!!%2520What%2520Library%2520Term%2520are%2520you%3F%2520https%3A%2F%2Fgvsu.edu%2Flibrary%2Flearntheterms';
  resultContainer.classList.remove("hidden");
}

function displayResults() {
  console.log(finalPicks);
  const title = document.querySelector('#title');
  const body = document.querySelector('#body');

  // Choose one answer at random as the winner.  ¯\_(ツ)_/¯
  var myArray = ["one","two","three","four","five"];
  var rand = myArray[Math.floor(Math.random() * myArray.length)];

  getText(title, body, finalPicks.get(rand))

  for(const option of answerChoices) {
    option.removeEventListener('click', selectItem);
  }
}

function refresh() {
  resultContainer.classList.add("hidden");
  for(let i = 0; i<answerChoices.length; i++) {
    let element = answerChoices[i];
    const image = element.querySelector('.checkbox');
    element.addEventListener('click', selectItem);
    element.style.opacity = '1.0';
    element.style.backgroundColor = '#f4f4f4';
    image.src = unchecked_image;
  }

  answers = [];
  finalPicks.clear();
}



let restartQuiz = document.querySelector('#result');
restartQuiz.addEventListener('click', refresh);

let answerChoices = document.querySelectorAll('.choice-grid div');
for(let i = 0; i<answerChoices.length; i++) {
  let element = answerChoices[i];
	element.addEventListener('click', selectItem);
}
