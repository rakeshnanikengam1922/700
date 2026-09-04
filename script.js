```javascript
// =====================================================
// BUJJI BIRTHDAY WEBSITE - script.js
// =====================================================

let currentSlide = 0;
let puzzleSize = 3;
let puzzleTiles = [];
let puzzleImage = "IMG-20240822-WA0003.jpg";

let gameTimerInterval = null;
let gameStartTime = null;
let gameSeconds = 0;
let moves = 0;

const galleryImages = [
    "IMG-20240822-WA0003.jpg",
    "IMG-20240904-WA0003.jpg",
    "IMG_2647.jpg",
    "NPTL3186.JPG",
    "OLSB4991.JPG",
    "Snapchat-1779683539.jpg",
    "Snapchat-2018150645.jpg"
];

const galleryCaptions = [
    "Happy Birthday, my love ❤️ You make every day brighter!",
    "Wishing you a day filled with smiles, happiness and beautiful memories 🎂",
    "Happy Birthday to a very special person ✨",
    "May your year ahead be full of happiness and beautiful moments 🌸",
    "Keep smiling and keep shining ✨",
    "Another beautiful memory to remember forever 💖",
    "Wishing you endless happiness and smiles 🥰"
];


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();
    initializeBackgroundAnimations();
    initializeGallery();
    initializeSlideshow();
    initializePuzzleGame();
    initializeCountdown();
    initializeEventListeners();
    initializeImageErrors();

});


// =====================================================
// NAVIGATION
// =====================================================

function initializeNavigation() {

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {

        navToggle.addEventListener("click", () => {

            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");

        });

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navToggle.classList.remove("active");
                navMenu.classList.remove("active");

            });

        });
    }

    document.querySelectorAll("a[href^='#']").forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

}


// =====================================================
// BACKGROUND
// =====================================================

function initializeBackgroundAnimations() {

    const particles = document.getElementById("particles");

    if (!particles) return;

    particles.innerHTML = "";

    for (let i = 0; i < 35; i++) {

        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * 5 + "s";

        particles.appendChild(particle);

    }

}


// =====================================================
// CELEBRATION
// =====================================================

function celebrate() {

    createConfetti();

}

function createConfetti() {

    const container =
        document.getElementById("confettiContainer");

    if (!container) return;

    container.innerHTML = "";

    const symbols = [
        "🎉",
        "🎊",
        "✨",
        "💖",
        "⭐",
        "🎈",
        "❤️"
    ];

    for (let i = 0; i < 80; i++) {

        const item = document.createElement("span");

        item.className = "confetti";

        item.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        item.style.left =
            Math.random() * 100 + "%";

        item.style.animationDelay =
            Math.random() * 2 + "s";

        item.style.animationDuration =
            2 + Math.random() * 3 + "s";

        container.appendChild(item);

    }

    setTimeout(() => {
        container.innerHTML = "";
    }, 6000);

}


// =====================================================
// GALLERY
// =====================================================

function initializeGallery() {

    const gallery =
        document.getElementById("galleryGrid");

    if (!gallery) return;

    // Keep the HTML captions.
    // Do NOT overwrite the gallery here.

    const items =
        gallery.querySelectorAll(".gallery-item");

    items.forEach((item, index) => {

        const img = item.querySelector("img");

        if (img && galleryImages[index]) {
            img.src = galleryImages[index];
        }

        const caption =
            item.querySelector(".gallery-overlay p");

        if (caption && galleryCaptions[index]) {
            caption.textContent =
                galleryCaptions[index];
        }

    });

    const gridButton =
        document.getElementById("gridViewBtn");

    const slideshowButton =
        document.getElementById("slideshowViewBtn");

    const grid =
        document.getElementById("galleryGrid");

    const slideshow =
        document.getElementById("gallerySlideshow");

    if (gridButton) {

        gridButton.addEventListener("click", () => {

            grid.style.display = "grid";
            slideshow.style.display = "none";

        });

    }

    if (slideshowButton) {

        slideshowButton.addEventListener("click", () => {

            grid.style.display = "none";
            slideshow.style.display = "block";

            showSlide(currentSlide);

        });

    }

}


// =====================================================
// SLIDESHOW
// =====================================================

function initializeSlideshow() {

    const slides =
        document.querySelectorAll(".slide");

    const indicators =
        document.querySelectorAll(".indicator");

    if (!slides.length) return;

    showSlide(0);

    indicators.forEach((indicator, index) => {

        indicator.addEventListener("click", () => {

            showSlide(index);

        });

    });

}


function showSlide(index) {

    const slides =
        document.querySelectorAll(".slide");

    const indicators =
        document.querySelectorAll(".indicator");

    if (!slides.length) return;

    if (index >= slides.length) {
        index = 0;
    }

    if (index < 0) {
        index = slides.length - 1;
    }

    currentSlide = index;

    slides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === currentSlide
        );

    });

    indicators.forEach((indicator, i) => {

        indicator.classList.toggle(
            "active",
            i === currentSlide
        );

    });

}


function nextSlide() {

    showSlide(currentSlide + 1);

}


function previousSlide() {

    showSlide(currentSlide - 1);

}


// =====================================================
// PUZZLE GAME
// =====================================================

function initializePuzzleGame() {

    const difficulty =
        document.getElementById("difficultySelect");

    const newGame =
        document.getElementById("newGameBtn");

    const solution =
        document.getElementById("showSolutionBtn");

    const playAgain =
        document.getElementById("playAgainBtn");

    if (difficulty) {

        difficulty.addEventListener("change", () => {

            if (difficulty.value === "easy") {
                puzzleSize = 3;
            }

            if (difficulty.value === "medium") {
                puzzleSize = 4;
            }

            if (difficulty.value === "hard") {
                puzzleSize = 5;
            }

            startNewGame();

        });

    }

    if (newGame) {
        newGame.addEventListener(
            "click",
            startNewGame
        );
    }

    if (solution) {

        solution.addEventListener(
            "click",
            showSolution
        );

    }

    if (playAgain) {

        playAgain.addEventListener(
            "click",
            startNewGame
        );

    }

    startNewGame();

}


// =====================================================
// START NEW GAME
// =====================================================

function startNewGame() {

    stopGameTimer();

    moves = 0;
    gameSeconds = 0;

    updateGameStats();

    const completion =
        document.getElementById("gameCompletion");

    if (completion) {
        completion.style.display = "none";
    }

    const solution =
        document.getElementById("solutionPreview");

    if (solution) {
        solution.style.display = "block";
    }

    const solutionImage =
        document.getElementById("solutionImage");

    if (solutionImage) {

        solutionImage.src =
            puzzleImage;

    }

    createPuzzle();

}


// =====================================================
// CREATE IMAGE PUZZLE
// =====================================================

function createPuzzle() {

    const board =
        document.getElementById("puzzleBoard");

    if (!board) return;

    board.innerHTML = "";

    board.style.gridTemplateColumns =
        `repeat(${puzzleSize}, 1fr)`;

    puzzleTiles = [];

    const total =
        puzzleSize * puzzleSize;

    for (let i = 0; i < total; i++) {
        puzzleTiles.push(i);
    }

    // Shuffle until not solved
    do {
        shuffleArray(puzzleTiles);
    } while (isSolved());

    puzzleTiles.forEach((tileNumber, position) => {

        const tile =
            document.createElement("div");

        tile.className = "puzzle-piece";

        tile.dataset.position = position;
        tile.dataset.tile = tileNumber;

        const row =
            Math.floor(tileNumber / puzzleSize);

        const col =
            tileNumber % puzzleSize;

        tile.style.backgroundImage =
            `url("${puzzleImage}")`;

        tile.style.backgroundSize =
            `${puzzleSize * 100}% ${puzzleSize * 100}%`;

        tile.style.backgroundPosition =
            `${(col * 100) / (puzzleSize - 1)}% ` +
            `${(row * 100) / (puzzleSize - 1)}%`;

        tile.addEventListener(
            "click",
            () => moveTile(position)
        );

        board.appendChild(tile);

    });

    startGameTimer();

}


// =====================================================
// MOVE PUZZLE TILE
// =====================================================

function moveTile(position) {

    if (!puzzleTiles.length) return;

    // Simple swap puzzle
    const targetPosition =
        findBestSwap(position);

    if (targetPosition === -1) return;

    [
        puzzleTiles[position],
        puzzleTiles[targetPosition]
    ] = [
        puzzleTiles[targetPosition],
        puzzleTiles[position]
    ];

    moves++;

    updatePuzzle();

    updateGameStats();

    if (isSolved()) {
        completeGame();
    }

}


function findBestSwap(position) {

    const current =
        puzzleTiles[position];

    // Move tile toward its correct position.
    const correctPosition =
        current;

    if (
        correctPosition >= 0 &&
        correctPosition < puzzleTiles.length &&
        correctPosition !== position
    ) {

        return correctPosition;

    }

    return -1;

}


// =====================================================
// UPDATE PUZZLE
// =====================================================

function updatePuzzle() {

    const tiles =
        document.querySelectorAll(".puzzle-piece");

    tiles.forEach((tile, position) => {

        const tileNumber =
            puzzleTiles[position];

        const row =
            Math.floor(tileNumber / puzzleSize);

        const col =
            tileNumber % puzzleSize;

        tile.dataset.position = position;
        tile.dataset.tile = tileNumber;

        tile.style.backgroundImage =
            `url("${puzzleImage}")`;

        tile.style.backgroundSize =
            `${puzzleSize * 100}% ${puzzleSize * 100}%`;

        tile.style.backgroundPosition =
            `${(col * 100) / (puzzleSize - 1)}% ` +
            `${(row * 100) / (puzzleSize - 1)}%`;

    });

}


// =====================================================
// CHECK SOLVED
// =====================================================

function isSolved() {

    return puzzleTiles.every(
        (value, index) =>
            value === index
    );

}


// =====================================================
// COMPLETE GAME
// =====================================================

function completeGame() {

    stopGameTimer();

    const completion =
        document.getElementById("gameCompletion");

    const finalTime =
        document.getElementById("finalTime");

    const finalMoves =
        document.getElementById("finalMoves");

    if (finalTime) {
        finalTime.textContent =
            formatGameTime(gameSeconds);
    }

    if (finalMoves) {
        finalMoves.textContent =
            moves;
    }

    if (completion) {
        completion.style.display = "flex";
    }

    createConfetti();

}


// =====================================================
// SOLUTION
// =====================================================

function showSolution() {

    const preview =
        document.getElementById("solutionPreview");

    const image =
        document.getElementById("solutionImage");

    if (!preview || !image) return;

    image.src = puzzleImage;

    preview.style.display = "block";

}


// =====================================================
// GAME TIMER
// =====================================================

function startGameTimer() {

    stopGameTimer();

    gameStartTime = Date.now();

    gameTimerInterval =
        setInterval(() => {

            gameSeconds =
                Math.floor(
                    (Date.now() - gameStartTime) / 1000
                );

            updateGameStats();

        }, 1000);

}


function stopGameTimer() {

    if (gameTimerInterval) {

        clearInterval(gameTimerInterval);

        gameTimerInterval = null;

    }

}


function formatGameTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        seconds % 60;

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0")
    );

}


function updateGameStats() {

    const timer =
        document.getElementById("gameTimer");

    const moveCounter =
        document.getElementById("moveCounter");

    if (timer) {
        timer.textContent =
            formatGameTime(gameSeconds);
    }

    if (moveCounter) {
        moveCounter.textContent =
            moves;
    }

}


// =====================================================
// SHUFFLE
// =====================================================

function shuffleArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

}


// =====================================================
// COUNTDOWN
// =====================================================

// 🎂 BUJJI Birthday
// 05 September 2027 - 12:00 AM

let birthdayDate =
    new Date("2027-09-05T00:00:00");


function initializeCountdown() {

    const input =
        document.getElementById("birthdayDate");

    // Show the selected birthday in the input
    if (input) {

        input.value =
            "2027-09-05T00:00";

        input.addEventListener(
            "change",
            () => {

                if (!input.value) return;

                birthdayDate =
                    new Date(input.value);

                updateCountdown();

            }
        );

    }

    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

}


function updateCountdown() {

    const now =
        new Date();

    let difference =
        birthdayDate.getTime() -
        now.getTime();

    if (difference <= 0) {

        birthdayDate =
            new Date(
                `${birthdayDate.getFullYear() + 1}-09-05T00:00:00`
            );

        difference =
            birthdayDate.getTime() -
            now.getTime();

    }

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );

    setCountdownValue(
        "days",
        days
    );

    setCountdownValue(
        "hours",
        hours
    );

    setCountdownValue(
        "minutes",
        minutes
    );

    setCountdownValue(
        "seconds",
        seconds
    );

}


function setCountdownValue(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.textContent =
        String(value).padStart(2, "0");

}


// =====================================================
// EVENT LISTENERS
// =====================================================

function initializeEventListeners() {

    const celebrateButton =
        document.getElementById("celebrateBtn");

    if (celebrateButton) {

        celebrateButton.addEventListener(
            "click",
            celebrate
        );

    }

    const nextButton =
        document.getElementById("nextSlideBtn");

    const previousButton =
        document.getElementById("prevSlideBtn");

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextSlide
        );

    }

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousSlide
        );

    }

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "ArrowRight") {
                nextSlide();
            }

            if (event.key === "ArrowLeft") {
                previousSlide();
            }

        }
    );

}


// =====================================================
// IMAGE ERROR HANDLING
// =====================================================

function initializeImageErrors() {

    document.addEventListener(
        "error",
        event => {

            if (
                event.target &&
                event.target.tagName === "IMG"
            ) {

                console.log(
                    "Image failed:",
                    event.target.src
                );

            }

        },
        true
    );

}


// =====================================================
// MOBILE SWIPE
// =====================================================

let touchStartX = 0;

document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    event => {

        const touchEndX =
            event.changedTouches[0].screenX;

        const difference =
            touchStartX - touchEndX;

        if (Math.abs(difference) < 50) {
            return;
        }

        if (difference > 0) {
            nextSlide();
        } else {
            previousSlide();
        }

    },
    { passive: true }
);
```
