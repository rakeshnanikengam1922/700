// =====================================================
// BUJJI BIRTHDAY WEBSITE - FINAL script.js
// =====================================================

let currentSlide = 0;

let puzzleSize = 3;
let puzzleTiles = [];
let puzzleImage = "IMG-20240822-WA0003.jpg";

let selectedPosition = null;

let gameTimerInterval = null;
let gameStartTime = null;
let gameSeconds = 0;
let moves = 0;

let birthdayDate = new Date(2027, 8, 5, 0, 0, 0);


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

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navToggle.classList.remove("active");
                navMenu.classList.remove("active");

            });

        });

    }


    document.querySelectorAll("a[href^='#']").forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

}


// =====================================================
// BACKGROUND ANIMATIONS
// =====================================================

function initializeBackgroundAnimations() {

    const particles =
        document.getElementById("particles");

    if (!particles) return;

    particles.innerHTML = "";

    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("span");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * 5 + "s";

        particle.style.animationDuration =
            3 + Math.random() * 5 + "s";

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
        "❤️",
        "🥳"
    ];

    for (let i = 0; i < 80; i++) {

        const item =
            document.createElement("span");

        item.className = "confetti";

        item.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

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


function initializeGallery() {

    const gallery =
        document.getElementById("galleryGrid");

    if (!gallery) return;

    const items =
        gallery.querySelectorAll(".gallery-item");

    items.forEach((item, index) => {

        const image =
            item.querySelector("img");

        const caption =
            item.querySelector(".gallery-overlay p");

        if (image && galleryImages[index]) {

            image.src =
                galleryImages[index];

        }

        if (caption && galleryCaptions[index]) {

            caption.textContent =
                galleryCaptions[index];

        }

    });


    const gridButton =
        document.getElementById("gridViewBtn");

    const slideshowButton =
        document.getElementById("slideshowViewBtn");

    const slideshow =
        document.getElementById("gallerySlideshow");


    if (gridButton) {

        gridButton.addEventListener("click", () => {

            gallery.style.display = "grid";

            if (slideshow) {
                slideshow.style.display = "none";
            }

            gridButton.classList.add("active");

            if (slideshowButton) {
                slideshowButton.classList.remove("active");
            }

        });

    }


    if (slideshowButton) {

        slideshowButton.addEventListener("click", () => {

            gallery.style.display = "none";

            if (slideshow) {
                slideshow.style.display = "block";
            }

            slideshowButton.classList.add("active");

            if (gridButton) {
                gridButton.classList.remove("active");
            }

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

            puzzleSize =
                parseInt(
                    difficulty.value,
                    10
                ) || 3;

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

    selectedPosition = null;

    updateGameStats();


    const completion =
        document.getElementById("gameCompletion");

    if (completion) {

        completion.style.display = "none";

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
// CREATE PUZZLE
// =====================================================

function createPuzzle() {

    const board =
        document.getElementById("puzzleBoard");

    if (!board) return;


    board.innerHTML = "";

    board.style.gridTemplateColumns =
        `repeat(${puzzleSize}, 1fr)`;

    board.style.gridTemplateRows =
        `repeat(${puzzleSize}, 1fr)`;


    const total =
        puzzleSize * puzzleSize;


    puzzleTiles =
        Array.from(
            { length: total },
            (_, index) => index
        );


    // Shuffle
    do {

        shuffleArray(puzzleTiles);

    } while (
        isSolved() ||
        puzzleTiles[0] === 0
    );


    renderPuzzle();

    startGameTimer();

}


// =====================================================
// RENDER PUZZLE
// =====================================================

function renderPuzzle() {

    const board =
        document.getElementById("puzzleBoard");

    if (!board) return;


    board.innerHTML = "";


    puzzleTiles.forEach(
        (tileNumber, position) => {

            const tile =
                document.createElement("div");

            tile.className =
                "puzzle-tile";


            tile.dataset.position =
                position;

            tile.dataset.tile =
                tileNumber;


            const row =
                Math.floor(
                    tileNumber / puzzleSize
                );

            const col =
                tileNumber % puzzleSize;


            tile.style.backgroundImage =
                `url("${puzzleImage}")`;


            tile.style.backgroundSize =
                `${puzzleSize * 100}% ${puzzleSize * 100}%`;


            const x =
                puzzleSize === 1
                    ? 0
                    : (col * 100) /
                      (puzzleSize - 1);


            const y =
                puzzleSize === 1
                    ? 0
                    : (row * 100) /
                      (puzzleSize - 1);


            tile.style.backgroundPosition =
                `${x}% ${y}%`;


            tile.addEventListener(
                "click",
                () => selectPuzzleTile(position)
            );


            board.appendChild(tile);

        }
    );

}


// =====================================================
// SELECT / SWAP PUZZLE TILES
// =====================================================

function selectPuzzleTile(position) {

    const tiles =
        document.querySelectorAll(".puzzle-tile");


    if (selectedPosition === null) {

        selectedPosition = position;

        if (tiles[position]) {

            tiles[position]
                .classList.add("selected");

        }

        return;

    }


    if (selectedPosition === position) {

        if (tiles[position]) {

            tiles[position]
                .classList.remove("selected");

        }

        selectedPosition = null;

        return;

    }


    // Swap
    [
        puzzleTiles[selectedPosition],
        puzzleTiles[position]
    ] = [
        puzzleTiles[position],
        puzzleTiles[selectedPosition]
    ];


    moves++;


    selectedPosition = null;


    renderPuzzle();

    updateGameStats();


    if (isSolved()) {

        completeGame();

    }

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

        completion.style.display =
            "flex";

    }


    createConfetti();

}


// =====================================================
// SHOW SOLUTION
// =====================================================

function showSolution() {

    const image =
        document.getElementById("solutionImage");

    const preview =
        document.querySelector(".solution-preview");


    if (!image || !preview) return;


    image.src =
        puzzleImage;


    preview.style.display =
        "block";

}


// =====================================================
// GAME TIMER
// =====================================================

function startGameTimer() {

    stopGameTimer();


    gameStartTime =
        Date.now();


    gameTimerInterval =
        setInterval(() => {

            gameSeconds =
                Math.floor(
                    (Date.now() -
                        gameStartTime) /
                    1000
                );


            updateGameStats();

        }, 1000);

}


function stopGameTimer() {

    if (gameTimerInterval) {

        clearInterval(
            gameTimerInterval
        );

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
            Math.floor(
                Math.random() * (i + 1)
            );


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

function initializeCountdown() {

    const input =
        document.getElementById("birthdayDate");


    if (input) {

        input.value =
            formatDateForInput(
                birthdayDate
            );


        input.addEventListener(
            "change",
            () => {

                if (!input.value) {
                    return;
                }


                const selected =
                    new Date(input.value);


                if (
                    !isNaN(
                        selected.getTime()
                    )
                ) {

                    birthdayDate =
                        selected;

                    updateCountdown();

                }

            }
        );

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );

}


// =====================================================
// FORMAT DATE FOR INPUT
// =====================================================

function formatDateForInput(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    const hours =
        String(
            date.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            date.getMinutes()
        ).padStart(2, "0");


    return (
        `${year}-${month}-${day}` +
        `T${hours}:${minutes}`
    );

}


// =====================================================
// UPDATE COUNTDOWN
// =====================================================

function updateCountdown() {

    const now =
        new Date();


    // If selected date has passed,
    // automatically move to next year.
    if (birthdayDate <= now) {

        birthdayDate =
            new Date(
                birthdayDate.getFullYear() + 1,
                8,
                5,
                0,
                0,
                0
            );


        const input =
            document.getElementById(
                "birthdayDate"
            );


        if (input) {

            input.value =
                formatDateForInput(
                    birthdayDate
                );

        }

    }


    const difference =
        birthdayDate.getTime() -
        now.getTime();


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                difference /
                (1000 * 60)
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
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


    updateCountdownMessage();

}


// =====================================================
// COUNTDOWN MESSAGE
// =====================================================

function updateCountdownMessage() {

    const message =
        document.getElementById(
            "countdownMessage"
        );


    if (!message) return;


    const day =
        String(
            birthdayDate.getDate()
        ).padStart(2, "0");


    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    const month =
        monthNames[
            birthdayDate.getMonth()
        ];


    const year =
        birthdayDate.getFullYear();


    let hours =
        birthdayDate.getHours();

    const minutes =
        String(
            birthdayDate.getMinutes()
        ).padStart(2, "0");


    const ampm =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    message.textContent =
        `🎂 Next Birthday: ${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;

}


// =====================================================
// COUNTDOWN VALUE
// =====================================================

function setCountdownValue(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (!element) return;


    element.textContent =
        String(
            Math.max(0, value)
        ).padStart(2, "0");

}


// =====================================================
// EVENT LISTENERS
// =====================================================

function initializeEventListeners() {

    const celebrateButton =
        document.getElementById(
            "celebrateBtn"
        );


    if (celebrateButton) {

        celebrateButton.addEventListener(
            "click",
            celebrate
        );

    }


    const nextButton =
        document.getElementById(
            "nextSlideBtn"
        );

    const previousButton =
        document.getElementById(
            "prevSlideBtn"
        );


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

            const slideshow =
                document.getElementById(
                    "gallerySlideshow"
                );


            if (
                slideshow &&
                slideshow.style.display !== "none"
            ) {

                if (
                    event.key === "ArrowRight"
                ) {

                    nextSlide();

                }


                if (
                    event.key === "ArrowLeft"
                ) {

                    previousSlide();

                }

            }

        }
    );


    // Swipe only inside slideshow
    const slideshowContainer =
        document.querySelector(
            ".slideshow-container"
        );


    if (slideshowContainer) {

        let touchStartX = 0;


        slideshowContainer.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            { passive: true }
        );


        slideshowContainer.addEventListener(
            "touchend",
            event => {

                const touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const difference =
                    touchStartX -
                    touchEndX;


                if (
                    Math.abs(difference) < 50
                ) {
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

    }

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

                console.warn(
                    "Image failed to load:",
                    event.target.src
                );

            }

        },
        true
    );

}
