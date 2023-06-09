const handleClick = (e) => {
    e.target.querySelector('img').classList.remove('hidden');
    switch (opened.length) {
        case 0:  // game starts
            opened = [e];
            return;    
        case 2:
            if (opened[0].target.querySelector('img').src !== opened[1].target.querySelector('img').src) {
                    opened[0].target.querySelector('img').classList.add('hidden');
                    opened[1].target.querySelector('img').classList.add('hidden');
            }
            opened = [e];
            return;            
        case 1:
            opened.push(e);
            if (opened[0].target.querySelector('img').src === opened[1].target.querySelector('img').src) {
                cards[opened[0].target.id] = 0;
                cards[opened[1].target.id] = 0;
                opened[0].target.classList.add('pair');
                opened[1].target.classList.add('pair');
                opened[0].target.removeEventListener('click',handleClick);
                opened[1].target.removeEventListener('click',handleClick);
                if (cards.filter(card => card !== 0).length === 0) {
                    alert('Congrats - you won!');
                    document.querySelectorAll('div').forEach(div => {
                        document.querySelector('main').removeChild(div);
                    })
                    startGame();
                }
            }
    }
}

const startGame = () => {

    cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15], opened = [];

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