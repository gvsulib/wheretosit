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

function scrollToNext(nextID) {
  document.getElementById(nextID).scrollIntoView({behavior: "smooth"});
}

function answerQuestions(choice) {
  if(choice.dataset.questionId === 'one') {
    changeImage(choice, 0, 7);
    addAnswers(choice);
    scrollToNext('two');
  } else if(choice.dataset.questionId === 'two') {
    changeImage(choice, 7, 15);
    addAnswers(choice);
    scrollToNext('three');
  } else if(choice.dataset.questionId === 'three') {
    changeImage(choice, 15, 23);
    addAnswers(choice);
    scrollToNext('four');
  } else if(choice.dataset.questionId === 'four') {
    changeImage(choice, 23, 31);
    addAnswers(choice);
    scrollToNext('five');
  } else if(choice.dataset.questionId === 'five') {
    changeImage(choice, 31, 39);
    addAnswers(choice);
    scrollToNext('six');
  } else if(choice.dataset.questionId === 'six') {
    changeImage(choice, 39, 47);
    addAnswers(choice);
    scrollToNext('seven');
  } else if(choice.dataset.questionId === 'seven') {
    changeImage(choice, 47, 55);
    addAnswers(choice);
    scrollToNext('eight');
   } else if(choice.dataset.questionId === 'eight') {
    changeImage(choice, 55, 63);
    addAnswers(choice);
    scrollToNext('nine');
   } else if(choice.dataset.questionId === 'nine') {
    changeImage(choice, 63, 71);
    addAnswers(choice);
    scrollToNext('ten');
  } else {
    changeImage(choice, 71, 79);
    addAnswers(choice);
  }
}

function selectItem(event) {
  answerQuestions(event.currentTarget);
  if(answers.length === 10) {
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

function getText(title, body, result, letter, key) {
  title.textContent = "You got:" + ' ' + RESULTS_MAP[key]['title'];
  body.textContent = RESULTS_MAP[key]['contents'];
  result.src = 'images/' + letter + '.jpg';

  document.getElementById('tweetlink').href = 'http://twitter.com/home/?status=I%20got:%20' +  encodeURIComponent(RESULTS_MAP[key]['title']) + '!!%2520What%2520Library%2520Term%2520are%2520you%3F%2520https%3A%2F%2Fgvsu.edu%2Flibrary%2Flearntheterms';
  resultContainer.classList.remove("hidden");
  scrollToNext('end');
}

function displayResults() {
  //console.log(finalPicks);
  const title = document.querySelector('#title');
  const body = document.querySelector('#bodytext p');
  const result = document.querySelector('#result_img');

  // Find the answer with the most elements
  var counts = {};
  finalPicks.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
  //console.log(counts);

  var keys = keys = Object.keys(counts);
  var highest = keys.sort(function(a,b){return counts[b]-counts[a]});
  var winner = highest[0];

  console.log('The letter ' + highest[0] + ' had the most answers, so the recommended study area is ' + RESULTS_MAP[winner]['title']);

  getText(title, body, result, highest[0], winner)


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
  scrollToNext('body_start');
}



let restartQuiz = document.querySelector('#result');
restartQuiz.addEventListener('click', refresh);

let answerChoices = document.querySelectorAll('.choice-grid div');
for(let i = 0; i<answerChoices.length; i++) {
  let element = answerChoices[i];
	element.addEventListener('click', selectItem);
}
