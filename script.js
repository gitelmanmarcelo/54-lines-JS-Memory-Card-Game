const handleClick = (e) => {
    if (cards[e.currentTarget.id] === 0)  // clicks on already opened card
        return;
    e.target.querySelector('img').classList.remove('hidden');
    switch (state) {
        case BEGIN:
            opened = [e];
            state = OPEN_SECOND;
            return;    
        case NOT_PAIR:
            opened[0].target.querySelector('img').classList.add('hidden');
            opened[1].target.querySelector('img').classList.add('hidden');
            opened = [e];
            state = OPEN_SECOND;
            return;    
        case FOUND_PAIR:
            opened = [e];
            state = OPEN_SECOND;
            return;    
        case OPEN_SECOND:
            opened.push(e);
            if (opened[0].target.querySelector('img').src === opened[1].target.querySelector('img').src) {
                state = FOUND_PAIR;
                cards[opened[0].target.id] = 0;
                cards[opened[1].target.id] = 0;
                opened[0].target.classList.add('pair');
                opened[1].target.classList.add('pair');
                if (cards.filter(card => card !== 0).length === 0) {
                    alert('Congrats - you won!');
                    document.querySelectorAll('div').forEach(div => {
                        document.querySelector('main').removeChild(div);
                    })
                    startGame();
                }
            } else {
                state = NOT_PAIR;
            }
    }
}

const BEGIN = 'BEGIN', OPEN_SECOND = 'OPEN_SECOND', NOT_PAIR = 'NOT_PAIR', FOUND_PAIR = 'FOUND_PAIR'
let cards, opened, state;

const startGame = () => {

    cards = [];
    opened = [];
    state = BEGIN;

    for (let i = 1; i<=15; i++) {   // add cards
        cards.push(i);
        cards.push(i);
    }
    for (let i = cards.length - 1; i > 0; i--) {   // shuffle cards
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    cards.forEach((card,index) => {
        const div = document.createElement('div');
        div.id = index;
        div.classList.add('card');
        const img = document.createElement('img');
        img.classList.add('hidden');
        img.src = './img/robotImg'+card+'.png';
        div.appendChild(img);
        div.addEventListener('click',handleClick);
        document.querySelector('main').appendChild(div);
    })
}
startGame();