const game = document.querySelector('.game-field');
const resetButton = document.querySelector('.reset-button');
const fields = document.querySelectorAll('.field');
const cancelButton = document.querySelector('.cancel-turn');
let res = document.querySelector('.result');

const circle = `<svg id="circle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="150px" height="150px" viewBox="0 0 32 32">
                <g>
                    <path d="M15.712,3.132c6.937,0,12.581,5.644,12.581,12.58c0,6.938-5.645,12.581-12.581,12.581c-6.937,0-12.58-5.645-12.58-12.581   C3.132,8.775,8.775,3.132,15.712,3.132 M15.712,0C7.035,0,0,7.034,0,15.712c0,8.679,7.035,15.713,15.712,15.713   c8.677,0,15.712-7.034,15.712-15.713C31.425,7.034,24.389,0,15.712,0L15.712,0z"/>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
            </svg>`;


const cross = `<svg id="cross" width="150px" height="150px" viewBox="0 0 15 15" version="1.1"  xmlns="http://www.w3.org/2000/svg">
                <path d="M2.64,1.27L7.5,6.13l4.84-4.84C12.5114,1.1076,12.7497,1.0029,13,1c0.5523,0,1,0.4477,1,1&#xA;&#9;c0.0047,0.2478-0.093,0.4866-0.27,0.66L8.84,7.5l4.89,4.89c0.1648,0.1612,0.2615,0.3796,0.27,0.61c0,0.5523-0.4477,1-1,1&#xA;&#9;c-0.2577,0.0107-0.508-0.0873-0.69-0.27L7.5,8.87l-4.85,4.85C2.4793,13.8963,2.2453,13.9971,2,14c-0.5523,0-1-0.4477-1-1&#xA;&#9;c-0.0047-0.2478,0.093-0.4866,0.27-0.66L6.16,7.5L1.27,2.61C1.1052,2.4488,1.0085,2.2304,1,2c0-0.5523,0.4477-1,1-1&#xA;&#9;C2.2404,1.0029,2.4701,1.0998,2.64,1.27z"/>
            </svg>`;

const crossClass = 'x';
const circleClass = 'o';

const playerOne = {name: 'Первый Игрок', symbol: 'x'};
const playerTwo = {name: 'Второй Игрок', symbol: 'o'};

let step = false;
let	counter = 0;
let currentField = null;

function drawCross(target) {
		target.innerHTML = cross;
		target.classList.add(crossClass);
		counter++;
}

function drawZero(target) {
		target.innerHTML = circle;
		target.classList.add(circleClass);
		counter++;
}



function makeMove(e) {

	if (e.target.innerHTML || !e.target.classList.contains('field') ) return;

	currentField = e.target;
	cancelButton.removeAttribute('disabled');

	if (!step) {
		drawCross(e.target);
	}
	else drawZero(e.target);

	step = !step;


	checkWinner();

}

function cancelMove() {
	cancelButton.setAttribute('disabled', '');
	step = !step;
	counter--;
	currentField.innerHTML = '';
	currentField.classList.remove('x', 'o');

}

function resetGame() {
	counter = 0;
	res.innerText = '';
	fields.forEach(item => {
		item.innerHTML = '';
		item.classList.remove('x', 'o', 'active');
	});
	step = false;
	game.addEventListener('click', makeMove);
	cancelButton.addEventListener('click', cancelMove);
}

function checkWinner() {
	let winPositions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],

	];

	for (let i = 0; i < winPositions.length; i++) {

		if (fields[winPositions[i][0]].classList.contains('x') &&
			fields[winPositions[i][1]].classList.contains('x') &&
			fields[winPositions[i][2]].classList.contains('x')) {

			fields[winPositions[i][0]].classList.add('active');
			fields[winPositions[i][1]].classList.add('active');
			fields[winPositions[i][2]].classList.add('active');

			game.removeEventListener('click', makeMove);
			cancelButton.removeEventListener('click', cancelMove);
			res.innerText = `Выиграл ${playerOne.name} ${playerOne.symbol}`;


		}

		else if (fields[winPositions[i][0]].classList.contains('o') &&
			fields[winPositions[i][1]].classList.contains('o') &&
			fields[winPositions[i][2]].classList.contains('o')) {

			fields[winPositions[i][0]].classList.add('active');
			fields[winPositions[i][1]].classList.add('active');
			fields[winPositions[i][2]].classList.add('active');

			game.removeEventListener('click', makeMove);
			cancelButton.removeEventListener('click', cancelMove);
			res.innerText = `Выиграл ${playerTwo.name} ${playerTwo.symbol}`;

		}

	}

	if (counter == 9) {
		if (!res.innerText) res.innerText = 'Ничья';

		game.removeEventListener('click', makeMove);
		cancelButton.removeEventListener('click', cancelMove);
		return;
	}

}

resetButton.addEventListener('click', resetGame);
game.addEventListener('click', makeMove);
cancelButton.addEventListener('click', cancelMove);
