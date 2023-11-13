class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards(cards) {
    // ... write your code here
    if (this.cards) {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap array[i] and array[j]
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
      return cards;
    }
  }

  checkIfPair(card1, card2) {
    // ... write your code here
    this.pairsClicked++;

    console.log(`Checking if pair`);

    if (card1 === card2) {
      this.pairsGuessed++;
      console.log(`Inside method is true`);
      return true;
    } else {
      console.log(`Inside method is false`);
      return false;
    }
  }

  checkIfFinished() {
    // ... write your code here
    const totalPairs = this.cards.length / 2;

    return totalPairs === this.pairsGuessed;
  }

  updatePairsClicked() {
    document.getElementById('pairs-clicked').innerText = this.pairsClicked;
  }

  updatePairsGuessed() {
    document.getElementById('pairs-guessed').innerText = this.pairsGuessed;
  }
}
