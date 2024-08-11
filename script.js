function playGame() {
    const gameboard = (function() {
        squares = ['', '', '', '' , '', '', '', '', ''];
        
        function set(index, value) {
            squares[index] = value; 
        }

        function get(index) {
            return squares[index]; 
        }

        function checkWinner(value) {
            for (let i = 0; i < 3; i++) {
                if (squares[3 * i] == squares[3 * i + 1] && squares[3 * i + 1] == squares[3 * i + 2] && squares[3 * i] == value) {
                    return true; 
                }
                if (squares[i] == squares[i + 3] && squares[i + 3] == squares[i + 6] && squares[i] == value) {
                    return true; 
                }
            }
            if (squares[0] == squares[4] && squares[0] == squares[8] && squares[0] == value) {
                return true;
            }
            if (squares[2] == squares[4] && squares[2] == squares[6] && squares[2] == value) {
                return true;
            }
            return false; 
        }

        function checkTie() {
            for (let i = 0; i < 9; i++) {
                if (squares[i] === '') {
                    return false; 
                }
            }
            return !(checkWinner('x') || checkWinner('o')); 
        }

        function reset() {
            squares = ['', '', '', '' , '', '', '', '', ''];
        }

        return {set, get, checkWinner, reset, checkTie};
    })();

    let turn = 'x';

    const displayController = (function() {

        const squares = document.querySelectorAll(".square");

        function display(board) {
            for (let i = 0; i < 9; i++) {
                squares[i].textContent = board.get(i); 
            }
        }

        return {display}; 

    })();

    const clickHandler = (function() {
        const resetButton = document.querySelector("#reset");
        const results = document.querySelector(".results"); 
        const squares = document.querySelectorAll(".square"); 
        for (let i = 0; i < 9; i++) {
            squares[i].addEventListener("click", () => {
                if (gameboard.get(i) === '' && !gameboard.checkWinner('o') && !gameboard.checkWinner('x') && !gameboard.checkTie()) {
                    gameboard.set(i, turn); 
                    if (gameboard.checkWinner(turn)) {
                        resetButton.classList.remove("hidden");
                        results.textContent = turn + " wins!";
                    }
                    if (gameboard.checkTie()) {
                        resetButton.classList.remove("hidden");
                        results.textContent = "Tie!"; 
                    }
                    if (turn === 'x') {
                        turn = 'o';
                    } else {
                        turn = 'x';
                    }
                    displayController.display(gameboard);
                }
            });
        }

        resetButton.addEventListener("click", () => {
            gameboard.reset();
            displayController.display(gameboard);
            turn = 'x';
            results.textContent = "";
            resetButton.classList.add("hidden");
        });

    })();
    
}

playGame();