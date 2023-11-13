const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
];

let firstCard = null;
let secondCard = null;
let isTurned = false;
let isPair = false;

const memoryGame = new MemoryGame(cards);

//memoryGame.shuffleCards(this.cards);

window.addEventListener('load', event => {
  let html = '';
  memoryGame.cards.forEach(pic => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      // TODO: write some code here
      if (isTurned) return;

      if (!firstCard) {
        card.classList.toggle('turned');
        firstCard = card;
        console.log(`First Card clicked: ${firstCard}`);
      } else {
        card.classList.toggle('turned');
        secondCard = card;
        console.log(`Second Card clicked: ${secondCard}`);
        isPair = memoryGame.checkIfPair(
          firstCard.dataset.cardName,
          secondCard.dataset.cardName
        );

        if (isPair) {
          console.log(`isPair? ${isPair}`);
          //remove from cards array
          const firstCardIndex = memoryGame.cards.indexOf(
            firstCard.dataset.cardName
          );
          const secondCardIndex = memoryGame.cards.indexOf(
            secondCard.dataset.cardName
          );
          memoryGame.cards.splice(firstCardIndex, 1);
          memoryGame.cards.splice(secondCardIndex, 1);
          //add to picked cards array
          memoryGame.pickedCards.push(firstCard);
          memoryGame.pickedCards.push(secondCard);

          // Update pairs guessed and clicked
          memoryGame.updatePairsGuessed();
          memoryGame.updatePairsClicked();

          if (memoryGame.checkIfFinished()) {
            // Game has ended, flip all cards back
            document.querySelectorAll('.card').forEach(card => {
              card.classList.remove('turned');
            });
          }

          resetCards();
        } else {
          console.log(`isPair? ${isPair}`);
          isTurned = true;
          memoryGame.updatePairsClicked(); //update pairs clicked only

          setTimeout(() => {
            firstCard.classList.remove('turned');
            secondCard.classList.remove('turned');
            resetCards();
          }, 1000); // Wait for 1 second, then reset
        }
      }
    });
  });

  function resetCards() {
    firstCard = null;
    secondCard = null;
    isTurned = false;
  }
});
