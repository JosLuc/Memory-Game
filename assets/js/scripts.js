const cards = document.querySelectorAll('.card');
const spanPlayer = document.querySelector('.player');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;


//virar o card
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//check card
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

//desabilitar o card
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//desvirar o card
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

//reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//embaralhar os cards
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 20);
        card.style.order = ramdomPosition;
    })
})();

//evento de click
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

//nickname
(window.pl4yer = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
})();
