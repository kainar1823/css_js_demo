const grid = document.querySelector('.grid');
const statusInfo = document.querySelector('.status-info');
const resultDiv = document.querySelector('.result');
const resultIconCnt = document.querySelector('.result .icon-container');
const resultTextCnt = document.querySelector('.result span');
const restartBtn = document.querySelector('#btn-restart');

// utilities
function getIconHtml(xo) {
	return `<i class='icon icon-${xo}'></i>`;
}

function getScoreBox(xo) {
	return document.querySelector('#score-' + xo);
}

function getCurrentPlayerSymbol() {
	return CURRENT_PLAYER == PLAYERS.P1 ? PLAYER_ONE_SIMBOL : PLAYER_TWO_SIMBOL;
}

function isArrValuesAllEqual(array) {
	if (array.length > 0) {
		return !array.some(function (value, index) {
			return value !== array[0];
		});
	} else {
		return true;
	}
}

// draw out cells in grid
const GRID_ARR = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];
const drawGrid = () => {
	GRID_ARR.forEach((row, r) => {
		row.forEach((cell, c) => {
			let cellDiv = document.createElement('div');
			grid.appendChild(cellDiv);
			cellDiv.classList.add('cell');
			cellDiv.setAttribute('data-r', r);
			cellDiv.setAttribute('data-c', c);

			cellDiv.addEventListener('click', (e) => {
				putSymbol(e.currentTarget);
			});
		});
	});
};

// Global variables
// game
const GAME_STATUS_ENUM = {
	INIT: 'init',
	PLAYING: 'playing',
	OVER: 'over',
};
let GAME_STATUS = '';
let GAME_WIN_SYMBOL = '';
let SCORE_X = 0;
let SCORE_O = 0;
// player
const PLAYERS = {
	P1: 'player 1',
	P2: 'player 2',
};
let PLAYER_ONE_SIMBOL = 'x';
let PLAYER_TWO_SIMBOL = 'o';
let CURRENT_PLAYER = PLAYERS.P1;

// event listener initialize
const eventListenerInit = () => {
	resultDiv.addEventListener('click', gameInit);
	restartBtn.addEventListener('click', gameInit);
};
// game initialize
const gameInit = () => {
	// clear out all values in GRID_ARR
	GRID_ARR.forEach((row) => {
		row.fill('');
	});

	// clear out all html in every cell
	let cells = document.querySelectorAll('.cell');
	cells.forEach((cell) => {
		cell.innerHTML = '';
	});

	// initialize values back to default
	GAME_STATUS = GAME_STATUS_ENUM.INIT;
	CURRENT_PLAYER = PLAYERS.P1;
	GAME_WIN_SYMBOL = '';

	// hide result div from game screen
	resultDiv.classList.remove('show');

	// update status info
	updateStatusInfo();

	document.querySelector(
		'.player-btn-' + getCurrentPlayerSymbol() + ' input'
	).checked = true;
};

// put syboal in cell when it's been clicked
const putSymbol = (cell) => {
	if (GAME_STATUS == GAME_STATUS_ENUM.INIT) {
		GAME_STATUS = GAME_STATUS_ENUM.PLAYING;
	} else if (GAME_STATUS == GAME_STATUS_ENUM.OVER) {
		return;
	}

	let r = cell.getAttribute('data-r');
	let c = cell.getAttribute('data-c');
	let s = getCurrentPlayerSymbol();

	if (GRID_ARR[r][c] != '') return;
	else {
		GRID_ARR[r][c] = s;
		cell.innerHTML = getIconHtml(s);
	}

	checkResult();
};

const checkResult = () => {
	// all lines for checking if there is a winner
	let lines = [
		// horizontal
		[GRID_ARR[0][0], GRID_ARR[0][1], GRID_ARR[0][2]],
		[GRID_ARR[1][0], GRID_ARR[1][1], GRID_ARR[1][2]],
		[GRID_ARR[2][0], GRID_ARR[2][1], GRID_ARR[2][2]],
		//vertical
		[GRID_ARR[0][0], GRID_ARR[1][0], GRID_ARR[2][0]],
		[GRID_ARR[0][1], GRID_ARR[1][1], GRID_ARR[2][1]],
		[GRID_ARR[0][2], GRID_ARR[1][2], GRID_ARR[2][2]],
		//cross
		[GRID_ARR[0][0], GRID_ARR[1][1], GRID_ARR[2][2]],
		[GRID_ARR[0][2], GRID_ARR[1][1], GRID_ARR[2][0]],
	];

	var counter = 0;
	lines.forEach((line) => {
		if (!line.includes('')) {
			counter++;
			if (isArrValuesAllEqual(line)) {
				// bingo, we got a winner
				GAME_WIN_SYMBOL = line[0];
				GAME_STATUS = GAME_STATUS_ENUM.OVER;
				return;
			} else {
				if (counter == lines.length) {
					// all lines have been checked
					// it's a draw game
					GAME_STATUS = GAME_STATUS_ENUM.OVER;
				}
			}
		}
	});

	if (GAME_STATUS == GAME_STATUS_ENUM.OVER) {
		console.log(GRID_ARR);
		showResult();
	} else if (GAME_STATUS == GAME_STATUS_ENUM.PLAYING) {
		switchCurrentPlayer();
	}

	updateStatusInfo();
};

const showResult = () => {
	if (GAME_WIN_SYMBOL != '') {
		// when we got a winner
		GAME_WIN_SYMBOL == 'x' ? SCORE_X++ : SCORE_O++;
		getScoreBox('x').innerHTML = SCORE_X;
		getScoreBox('o').innerHTML = SCORE_O;

		resultIconCnt.innerHTML = getIconHtml(GAME_WIN_SYMBOL);
		resultTextCnt.innerHTML = 'WINNER!';
	} else {
		// when it's a draw game
		resultIconCnt.innerHTML = getIconHtml('x') + getIconHtml('o');
		resultTextCnt.innerHTML = 'DRAW GAME';
	}
	resultDiv.classList.add('show');
};

// if game is not over, then switch player to continue
const switchCurrentPlayer = () => {
	CURRENT_PLAYER = CURRENT_PLAYER == PLAYERS.P1 ? PLAYERS.P2 : PLAYERS.P1;
	document.querySelector(
		'.player-btn-' + getCurrentPlayerSymbol() + ' input'
	).checked = true;
};

const updateStatusInfo = () => {
	if (GAME_STATUS == GAME_STATUS_ENUM.INIT) {
		statusInfo.innerHTML = 'Start game, ' + getIconHtml('x') + ' Turn.';
	} else if (GAME_STATUS == GAME_STATUS_ENUM.PLAYING) {
		statusInfo.innerHTML = getIconHtml(getCurrentPlayerSymbol()) + ' Turn';
	} else if (GAME_STATUS == GAME_STATUS_ENUM.OVER) {
		statusInfo.innerHTML = 'Game over';
	}
};

// initialize application
const appInit = () => {
	drawGrid();
	eventListenerInit();
	gameInit();
};
appInit();
