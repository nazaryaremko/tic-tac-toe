
const gameBoard = (() => {
    const playerFactory = (name, turn, marker, boxes) => {
        return {name, turn, marker, boxes};
    };

    const player1 = playerFactory('Player1', true, 'X', [])
    const player2 = playerFactory('Player2', false, 'O', [])
    
    getUserName = () => {
        var firstName = document.getElementById('nameField1').value;
        player1.name = firstName
        var secondName = document.getElementById('nameField2').value;
        player2.name = secondName
        updateScoreboard()
            return {firstName, secondName}
        
    }
 
    const winningCombinations = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ]

    refreshBoard = () => {
        const box = document.querySelectorAll('.box')
        box.forEach(box => box.innerHTML = '')
        player1.boxes = []
        player2.boxes = []
    }

    var subButton = document.getElementById('subButton');
    subButton.addEventListener('click', getUserName, false);
    subButton.addEventListener('click', refreshBoard);
    

    checkWinner = () => {
        const box = document.querySelectorAll('.box')
        player1.boxes.sort(function(a, b) {
            return a - b;
        });
        let checker = (arr, target) => target.every(v => arr.includes(v));
        for (i=0; i<winningCombinations.length;i++){
            if (checker(player1.boxes, winningCombinations[i]) == true) {
                return (player1.name)
            } else if (checker(player2.boxes, winningCombinations[i]) == true) {
                return (player2.name)
            }
        }
    };
    
    const playRound = (function() {
        const box = document.querySelectorAll('.box')
        box.forEach(
            box => {
                box.addEventListener('click', function(event) {
                    if (event.target.innerHTML == '' && player1.turn == true){
                        event.target.innerHTML = player1.marker
                        player1.boxes.push(Number(event.target.id))
                        player1.turn = false
                        player2.turn = true
                    } else if (event.target.innerHTML == '' && player2.turn == true){
                        event.target.innerHTML = player2.marker
                        player2.boxes.push(Number(event.target.id))
                        player2.turn = false
                        player1.turn = true
                    }
                    checkWinner()
                    updateScoreboard()
                })
            })
        return {box, player1, player2};
    })();

    const refreshBtn = document.getElementById('refresh-btn');
    refreshBtn.addEventListener('click', refreshBoard)
    
    updateScoreboard = () => {
        const results = document.getElementById('result-section')
        if (player1.turn == true) {
            results.innerText = 'Currently it is ' + player1.name + "'s turn"
        } else {
            results.innerText = 'Currently it is ' + player2.name + "'s turn"
        }
        var winner = checkWinner()
        if (winner != undefined) {
            results.innerText = 'The winner is ' + winner
        }
    }

    return (player1, player2, playRound)

    
})();







        
