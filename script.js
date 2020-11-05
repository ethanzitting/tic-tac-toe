

// Game board module.
var gameBoard = (function() {
	'use strict';
	const board = ["", "", "", "", "", "", "", "", ""];
	const cells = Array.from(document.querySelectorAll(".cell"));
	let winner = false;
	let player1Score = 0;
	let player2Score = 0;

	// Establish an event listener on the cells that will set the clicked
	// cell to X or O alternatingly.


	function setCell(cellID, value) {
		cells.forEach(cell => {
			cell.addEventListener('click', () => {
				cell.textContent = "X"
			});
		});

		board[cellID] = value;
		checkForWin();
	}


	setCell(0, "X");
	setCell(1, "X");
	setCell(2, "O");
	

	function checkForWin() {
		function compareCells(cell1, cell2, cell3) {
			if (cell1 == "X" || cell1 == "O") {
				if (cell1 == cell2 && cell2 == cell3) {
					console.log("declareWinner activated");
					declareWinner(cell1);
					return true;
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
	}


	function declareWinner(roundWinner) {
		const xScore = document.querySelector("#xScore");
		const oScore = document.querySelector("#oScore");
		const outcome = document.querySelector("#gameOutcome");
		// Write to DOM winner Wins!
		if (roundWinner == "X") {
			winner = "Player 1";
			outcome.textContent = `Player 1 wins!`;
			player1Score++;
		} else if (roundWinner == "O") {
			winner = "Player 0";
			outcome.textContent = `Player 2 wins!`;
			player2Score++;
		} else {
			winner = "Tie"
			outcome.textContent = "It was a tie!";
		}
		// Clear X's and O's from Board array and DOM
		cells.forEach(cell => cell.textContent = "");
		for (let i in board) board[i] = "";
	}


	return {
		board: board,
		setCell: setCell,
		winner: winner,
		checkForWin: checkForWin
	}
})();


/*
  //DOM Manipulation with a Module
  const Formatter = (function(doc) {
	const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
  
	const makeUppercase = (text) => {
	  log("Making uppercase");
	  return text.toUpperCase();
	};
  
	const writeToDOM = (selector, message) => {
	  if (!!doc && "querySelector" in doc) {
		doc.querySelector(selector).innerHTML = message;
	  }
	}
  
	return {
	  makeUppercase,
	  writeToDOM,
	}
  })(document);
  
  Formatter.writeToDOM("#target", "Hi there");
  */