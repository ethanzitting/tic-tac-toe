// Game board module.
var gameBoard = (function() {
	// 'use strict' for bugproofing.
	'use strict';

	// board for tracking game board inside program.
	const board = ["", "", "", "", "", "", "", "", ""];

	// cells for tracking game board in DOM
	const cells = Array.from(document.querySelectorAll(".cell"));

	// variables for use throughout program
	let winner = false;
	let player1Score = 0;
	let player2Score = 0;
	let turnCounter = 0;
	const turnDisplay = document.querySelector("#turnDisplay");
	const outcome = document.querySelector("#gameOutcome");


	// Turns the cell divs into buttons and provides most of the game functionality
	cells.forEach(cell => {
		cell.addEventListener('click', () => {
			// Checks if turnCounter is even to keep track of who's turn it is.
			// Sets cell and turnDisplay in DOM
			if (cell.textContent == "X" || cell.textContent == "O") {
				return;
			}

			if (winner !== false) {
				return;
			}
			
			if (turnCounter % 2 === 0) {
				cell.textContent = "X";
				turnDisplay.textContent = "Player Two's Turn";
			} else {
				cell.textContent = "O";
				turnDisplay.textContent = "Player One's Turn";
			}

			turnCounter++;

			// Sets cell in program
			setCell(cell.dataset.index, cell.textContent);
		});
	});


	// Sets cell in program and runs checkForWin after every move.
	function setCell(cellID, value) {
		board[cellID] = value;
		checkForWin();
	}


	// Checks for all possible win combinations. If found, runs declareWinner.
	function checkForWin() {
		function compareCells(cell1, cell2, cell3) {
			if (cell1 == "X" || cell1 == "O") {
				if (cell1 == cell2 && cell2 == cell3) {
					turnCounter = 0;
					turnDisplay.textContent = "Game Over";
					declareWinner(cell1);
					return;
				}
			}
		}
		compareCells(board[0], board[1], board[2]);
		compareCells(board[3], board[4], board[5]);
		compareCells(board[6], board[7], board[8]);
		compareCells(board[0], board[3], board[6]);
		compareCells(board[1], board[4], board[7]);
		compareCells(board[2], board[5], board[8]);
		compareCells(board[0], board[4], board[8]);
		compareCells(board[2], board[4], board[6]);

		if (turnCounter == 9 && turnDisplay.textContent !== "Game Over") {
			turnDisplay.textContent = "Game Over";
			outcome.textContent = "It's a tie!";
			winner = "tie";
			turnCounter = 0;
		}
	}


	// Runs after win condition found. Provides user with flair and spectacle
	// to signify end of game. Also resets board in DOM and program.
	function declareWinner(roundWinner) {
		const xScore = document.querySelector("#xScore");
		const oScore = document.querySelector("#oScore");

		// Write to DOM winner Wins!
		if (roundWinner == "X") {
			winner = "Player 1";
			outcome.textContent = `Player 1 wins!`;
			player1Score++;
			xScore.textContent = `Player One Score: ${player1Score}`;

		} else if (roundWinner == "O") {
			winner = "Player 2";
			outcome.textContent = `Player 2 wins!`;
			player2Score++;
			oScore.textContent = `Player Two Score: ${player2Score}`;
		}
	}


	const resetBtn = document.querySelector("#resetBtn");
	resetBtn.addEventListener('click', () => {
		// Clear X's and O's from Board array and DOM
		cells.forEach(cell => cell.textContent = "");
		for (let i in board) board[i] = "";
		winner = false;
		outcome.textContent = "";
		turnDisplay.textContent = "Player One's Turn";
	});


	return {
		board: board,
		setCell: setCell,
		winner: winner,
		checkForWin: checkForWin
	}
})();