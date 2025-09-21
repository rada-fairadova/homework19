import './styles.css';
import gnomeImage from './assets/gnome.png';

class WhackAGnome {
    constructor() {
        this.boardSize = 4;
        this.currentPosition = null;
        this.intervalId = null;
        this.score = 0;
        this.init();
    }

    init() {
        this.createGameBoard();
        this.placeGnomeRandomly();
        this.startGame();
        this.setupEventListeners();
    }

    createGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';

        for (let i = 0; i < this.boardSize * this.boardSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            gameBoard.appendChild(cell);
        }
    }

    placeGnomeRandomly() {
        if (this.currentPosition !== null) {
            const currentCell = document.querySelector(`.cell[data-index="${this.currentPosition}"]`);
            currentCell.classList.remove('active');
            const gnome = currentCell.querySelector('.gnome');
            if (gnome) {
                currentCell.removeChild(gnome);
            }
        }

        let newPosition;
        do {
            newPosition = Math.floor(Math.random() * this.boardSize * this.boardSize);
        } while (newPosition === this.currentPosition);

        this.currentPosition = newPosition;

        const newCell = document.querySelector(`.cell[data-index="${this.currentPosition}"]`);
        const gnome = document.createElement('img');
        gnome.src = gnomeImage;
        gnome.className = 'gnome';
        gnome.alt = 'Gnome';
        
        newCell.appendChild(gnome);
        newCell.classList.add('active');
    }

    startGame() {
        this.intervalId = setInterval(() => {
            this.placeGnomeRandomly();
        }, 1500);
    }

    setupEventListeners() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (cell) {
                const index = parseInt(cell.dataset.index);
                if (index === this.currentPosition) {
                    this.score++;
                    document.getElementById('score').textContent = this.score;
                    this.placeGnomeRandomly();
                }
            }
        });
    }

    stopGame() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WhackAGnome();
});

export default WhackAGnome;
