let scores = [0, 0];
let roundscore = 0;
let activePlayer = 0;

init();

const nextPlayer = () =>{
    // diceDom.style.display = 'none';
    // diceDom2.style.display = 'none';

    //set current score to 0;
    roundscore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = 0;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(`.player-0`).classList.toggle('active');
    document.querySelector(`.player-1`).classList.toggle('active');
};

document.querySelector('.btn-roll').addEventListener('click', function(){
    let dice1 = Math.floor((Math.random()*6) + 1);
    let dice2 = Math.floor((Math.random()*6) + 1);

    diceDom.style.display = 'none';
    diceDom2.style.display = 'none';
    document.querySelector('.test').style.display = 'block';

    setTimeout(()=>{
        const dice = dice1 + dice2;

    document.querySelector('.test').style.display = 'none';
    diceDom.src = `./img/dice-${dice1}.png`;
    diceDom.style.display = 'block';

    diceDom2.src = `./img/dice-${dice2}.png`;
    diceDom2.style.display = 'block';
    if(dice1 !== 1 && dice2 !== 1){
     roundscore += dice;
     document.getElementById(`current-${activePlayer}`).textContent = roundscore;
    } else{
        diceDom.src = `./img/dice-${dice1}.png`;
        diceDom.style.display = 'block';
    
        diceDom2.src = `./img/dice-${dice2}.png`;
        diceDom2.style.display = 'block';
        nextPlayer();
    }

    }, 2500 );

    
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    //update the global score of the active player
    scores[activePlayer] += roundscore;

    //Update the score in the dom
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    //Check if the player wins
    const finalScore = document.querySelector('.final').value;
    let final;
    if(finalScore){
        final = parseInt(finalScore, 10) ;
    }else{
        final = 100;
    }
    console.log(final);
    if(scores[activePlayer] >= final){
        const winner = document.getElementById(`name-${activePlayer}`);
        winner.textContent = 'WINNER!';
        winner.classList.add('winner');
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
        diceDom.style.display = 'none';
        diceDom2.style.display = 'none';

        console.log('winner');
    }else{
        //Next Player
        nextPlayer();
    }

});
function init(){
    scores = [0, 0];
    roundscore = 0
    activePlayer = 0;
    diceDom = document.querySelector('.dice');
    diceDom.style.display = 'none';

    diceDom2 = document.querySelector('.dice2');
    diceDom2.style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';

    document.getElementById(`name-${activePlayer}`).classList.remove('winner');
    document.getElementById(`name-0`).textContent = 'PLAYER 1';
    document.getElementById(`name-1`).textContent = 'PLAYER 2';


    document.querySelector(`.player-1`).classList.remove('active');
    document.querySelector(`.player-0`).classList.add('active');

    document.querySelector('.final').value = '';
}

document.querySelector('.btn-new').addEventListener('click', init);

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/