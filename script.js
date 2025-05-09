let grid = document.querySelector('#grid');
let popup = document.querySelector('#popup');
let playAgain = document.querySelector('#playAgain');
let scoreDisplay = document.querySelector('#scoreDisplay');

let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keyup', control);
  playAgain.addEventListener('click', replay);  
  createBoard();
  startGame();
});

function createBoard() {
  popup.style.display = 'none';
  for (let i = 0; i < 100; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
  }
}

function startGame() {
  let squares = document.querySelectorAll('#grid div');
  randomApple(squares);
  direction = 1;
  score = 0;
  scoreDisplay.innerHTML = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentIndex = 0;

  currentSnake.forEach(index => squares[index].classList.add('snake'));
  interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
  let squares = document.querySelectorAll('#grid div');
  if (checkForHits(squares)) {
    popup.style.display = 'flex';
    return clearInterval(interval);
  } else {
    moveSnake(squares);
  }
}

function moveSnake(squares) {
  let tail = currentSnake.pop();
  squares[tail].classList.remove('snake');
  currentSnake.unshift(currentSnake[0] + direction);
  eatApple(squares, tail);
  squares[currentSnake[0]].classList.add('snake');
}

function checkForHits(squares) {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  ) {
    return true;
  }
  return false;
}

function eatApple(squares, tail) {
  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple');
    squares[tail].classList.add('snake');
    currentSnake.push(tail);
    randomApple(squares);
    score++;
    scoreDisplay.textContent = score;

    clearInterval(interval);
    intervalTime *= speed;
    interval = setInterval(moveOutcome, intervalTime);
  }
}

function randomApple(squares) {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}

function control(e) {
  if (e.key === "ArrowRight" && direction !== -1) {
    direction = 1;
  } else if (e.key === "ArrowUp" && direction !== width) {
    direction = -width;
  } else if (e.key === "ArrowLeft" && direction !== 1) {
    direction = -1;
  } else if (e.key === "ArrowDown" && direction !== -width) {
    direction = +width;
  }
}

function replay() {
  grid.innerHTML = '';
  createBoard();
  startGame();
  popup.style.display = 'none';
}

// //🧱 Variabel Awal:
// grid, popup, playAgain, scoreDisplay: ambil elemen HTML-nya buat dikontrol di JS.

// width: ukuran grid (10x10).

// currentSnake: array berisi posisi awal ular (index dari kotak).

// direction: arah gerak ular (1 = kanan).

// interval, intervalTime: buat ngatur kecepatan game.

// score, speed: buat poin & mempercepat game tiap makan apel.

// 📌 DOMContentLoaded
// Saat halaman selesai diload:

// Dengarkan tombol keyboard (untuk kontrol ular).

// Dengarkan klik tombol "main ulang".

// Buat papan/grid.

// Mulai gamenya.

// 📦 createBoard()
// Bikin 100 div di dalam #grid (10x10 kotak).

// Sembunyikan popup game over.

// 🚀 startGame()
// Reset game ke awal.

// Set posisi awal ular, arah gerak, dan skor ke 0.

// Tempelkan class snake ke index yang dipakai.

// Mulai interval bergerak (setInterval).

// 🏁 moveOutcome()
// Cek apakah ular nabrak (pakai checkForHits()).

// Kalau iya: munculin popup game over dan stop game.

// Kalau belum: lanjut gerakin ular (panggil moveSnake()).

// 🐍 moveSnake()
// Hapus bagian ekor ular (paling belakang).

// Tambah bagian kepala ke depan sesuai arah.

// Cek apakah makan apel (panggil eatApple()).

// Tambah class snake ke posisi baru kepala.

// 💥 checkForHits()
// Cek tabrakan ke tembok (atas/bawah/kiri/kanan).

// Cek apakah ular nabrak badannya sendiri (class snake).

// Return true kalau nabrak, false kalau aman.

// 🍎 eatApple()
// Kalau posisi kepala sekarang ada class apple:

// Hapus apelnya.

// Tambah panjang ular.

// Tambah skor.

// Percepat ular (kurangi interval waktu).

// Panggil randomApple() buat munculin apel baru.

// 🔄 randomApple()
// Pilih posisi acak di grid yang belum ada ular.

// Tambahkan class apple.

// 🎮 control()
// Dengarkan tombol panah.

// Ganti arah ular, tapi dicek biar gak bisa langsung balik arah (misal: dari kanan langsung ke kiri = gak boleh).

// 🔁 replay()
// Reset grid, panggil createBoard() & startGame() lagi.

// Sembunyikan popup game over.

