let mainContainer = document.getElementById('main-container');

let images = ['birthday-cake', 'christmas-tree', 'mother-christmas',
                'deer', 'father-christmas', 'snowman', 'wrapped-present',
              'snowflake', 'birthday-cake', 'christmas-tree',
              'mother-christmas', 'deer', 'father-christmas', 'snowman',
              'wrapped-present', 'snowflake'];

let resetButton = document.getElementsByClassName('restart-button')[0];

resetButton.addEventListener('click', function(event) {
  resetGame();
})

let currentCards = [];
let documentFragment = document.createDocumentFragment();
let intervalId;
let count = 0;
let moves = 0;
let time = 0;
let modal = document.getElementById('modalId');
let close = document.getElementsByClassName('close')[0];
close.addEventListener('click', function() {
  modal.style.display = 'none';
});

let timerInterval = setInterval(function() {
  time++;
  document.getElementById('timer').innerText = 'Seconds: ' + time;
}, 1000);



shuffle(images);

for (let img of images)
{
  let movesParagraph = document.getElementById('moves');
  movesParagraph.innerText = 'Moves: ' + moves;


  let newDiv = document.createElement('div');
  newDiv.className = 'card';
  newDiv.addEventListener('click', function(event) {
    flipCard(event);
  });

  let childImg = document.createElement("img");
  childImg.src = 'img/' + img + '.png';
  childImg.className = 'hide-img';
  newDiv.appendChild(childImg);
  documentFragment.appendChild(newDiv);
}

mainContainer.appendChild(documentFragment);

// Fisher-Yates shuffle
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function flipCard(event) {
  var div = event.target;
  if (div.className == 'card')
  {
    updateMoves();
    flipAnimation(div);
    currentCards.push(div);

    if (currentCards.length == 2)
    {
      if (currentCards[0].firstChild.src ==
      currentCards[1].firstChild.src)
      {
        count++;
        successAnimation(currentCards);
        if (count == 8)
        {
          showModalView();
        }
      } else {
        failAnimation(currentCards);
      }
      currentCards = [];
    }
  }
}

function flipAnimation(div)
{
  div.firstChild.className = 'show-img';
  div.animate(
    [
      {transform: 'scale(1)', background: 'blue'},
      {transform: 'scale(0.5)', background: 'green'},
      {transform: 'scale(1)', background: 'blue'},
    ],
    {
      duration: 1000,
      easing: 'ease-in-out',
      delay: 0,
      iterations: 1,
      direction: 'alternate',
      fill: 'forwards'
    }
  );
}

function successAnimation(cards)
{
  cards[0].animate(
    [
      {transform: 'rotate(0deg)', background: 'green'},
      {transform: 'rotate(360deg)', background: 'green'},
    ],
    {
      duration: 1000,
      easing: 'ease-in-out',
      delay: 0,
      iterations: 1,
      direction: 'alternate',
      fill: 'forwards'
    }
  );
  cards[1].animate(
    [
      {transform: 'rotate(0deg)', background: 'green'},
      {transform: 'rotate(360deg)', background: 'green'},
    ],
    {
      duration: 1000,
      easing: 'ease-in-out',
      delay: 0,
      iterations: 1,
      direction: 'alternate',
      fill: 'forwards'
    }
  );
}

function failAnimation(cards)
{
  cards[0].animate(
    [
      {transform: 'rotate(0deg)', background: 'red', offet: 0},
      {transform: 'rotate(45deg)', background: 'red', offset: 0.1},
      {transform: 'rotate(-45deg)', background: 'red', offset: 0.9},
      {transform: 'rotate(0deg)', background: '#000066', offset: 1},
    ],
    {
      duration: 500,
      easing: 'ease-in-out',
      delay: 0,
      iterations: 1,
      direction: 'alternate',
      fill: 'forwards'
    }
  );
  cards[1].animate(
    [
      {transform: 'rotate(0deg)', background: 'red', offet: 0},
      {transform: 'rotate(45deg)', background: 'red', offset: 0.1},
      {transform: 'rotate(-45deg)', background: 'red', offset: 0.9},
      {transform: 'rotate(0deg)', background: '#000066', offset: 1},
    ],
    {
      duration: 500,
      easing: 'ease-in-out',
      delay: 0,
      iterations: 1,
      direction: 'alternate',
      fill: 'forwards'
    }
  );
  setTimeout(function() {
    for (card of cards)
    {
      card.firstChild.className = 'hide-img';
    }
  }, 500);
}

function updateMoves()
{
  moves++;
  let movesParagraph = document.getElementById('moves');
  movesParagraph.innerText = 'Moves: ' + moves;

  let starsContainer = document.getElementById('stars-container');
  let stars = starsContainer.getElementsByTagName('img');

  if (moves > 19)
  {
    stars[1].style = 'display: none';
  } else if (moves > 14)
  {
    stars[1].src = 'img/star-half.png';
  } else if (moves > 9)
  {
    stars[2].style = 'display: none';
  } else if (moves > 4)
  {
    stars[2].src = 'img/star-half.png';
  }
}

function showModalView() {
  let starsContainer = document.getElementById('stars-container');
  let starsFinishedContainer = starsContainer.cloneNode(true);
  starsFinishedContainer.className = 'stars-finished';

  let stars = starsFinishedContainer.getElementsByTagName('img');

  for (star of stars)
  {
    star.width = '100';
    star.height = '100';
  }

  let modalContent = document.getElementById('modalContentId');
  checkIfExistsAndRemove(modalContent);
  modalContent.appendChild(starsFinishedContainer);

  let modalParagraph = document.getElementsByClassName('game-finished')[0];

  modalParagraph.getElementsByTagName('p')[0].innerText = 'Game finished in ' + moves +
  ' moves and ' + (time/60) + ' minutes';

  modal.style.display = 'flex';
  clearInterval(timerInterval);
}

function checkIfExistsAndRemove(modalContent)
{
  let starsContainer = modalContent.querySelector('#stars-container');
  if (starsContainer != null)
  {
    modalContent.removeChild(starsContainer);
  }
}

function resetGame() {
  location.reload();
}
