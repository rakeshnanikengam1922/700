// ===============================
// Birthday Website - script.js
// Music Removed
// ===============================

let currentSlide = 0;
let puzzleTiles = [];
let puzzleSize = 3;
let countdownInterval;

// ===============================
// Gallery Images
// ===============================

const galleryImages = [
    "IMG-20240822-WA0003.jpg",
    "IMG-20240904-WA0003.jpg",
    "IMG_2647.jpg",
    "NPTL3186.JPG",
    "OLSB4991.JPG",
    "Snapchat-1779683539.jpg",
    "Snapchat-2018150645.jpg"
];

// ===============================
// DOM Loaded
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializeBackgroundAnimations();
    initializeGallery();
    initializePuzzleGame();
    initializeCountdown();
    initializeEventListeners();
    initializeScrollAnimations();
    initializeImageErrors();
});

// ===============================
// Navigation
// ===============================

function initializeNavigation() {
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (href && href.startsWith("#")) {
                e.preventDefault();

                const section = document.querySelector(href);

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}

// ===============================
// Background Animations
// ===============================

function initializeBackgroundAnimations() {
    createBalloons();
    createParticles();
}

function createBalloons() {
    const container = document.querySelector(".balloons");

    if (!container) return;

    const emojis = ["🎈", "🎈", "🎈", "🎈", "🎈"];

    emojis.forEach((emoji, index) => {
        const balloon = document.createElement("div");

        balloon.className = "balloon";
        balloon.textContent = emoji;

        balloon.style.left = `${10 + index * 20}%`;
        balloon.style.animationDelay = `${index * 1.5}s`;

        container.appendChild(balloon);
    });
}

function createParticles() {
    const container = document.getElementById("particles");

    if (!container) return;

    for (let i = 0; i < 35; i++) {
        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(particle);
    }
}

// ===============================
// Celebration Button
// ===============================

function celebrate() {
    createConfetti();

    const message = document.querySelector(".celebration-message");

    if (message) {
        message.classList.add("show");

        setTimeout(() => {
            message.classList.remove("show");
        }, 4000);
    }
}

function createConfetti() {
    const container = document.getElementById("confettiContainer");

    if (!container) return;

    container.innerHTML = "";

    const confettiSymbols = ["🎉", "✨", "🎊", "💖", "⭐", "🎈"];

    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement("span");

        confetti.className = "confetti";
        confetti.textContent =
            confettiSymbols[Math.floor(Math.random() * confettiSymbols.length)];

        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.animationDuration = `${2 + Math.random() * 3}s`;

        container.appendChild(confetti);
    }

    setTimeout(() => {
        container.innerHTML = "";
    }, 6000);
}

// ===============================
// Gallery
// ===============================

function initializeGallery() {
    const gallery = document.querySelector(".gallery-grid");

    if (!gallery) return;

    gallery.innerHTML = "";

    galleryImages.forEach((image, index) => {
        const item = document.createElement("div");

        item.className = "gallery-item";

        item.innerHTML = `
            <img src="${image}" alt="Birthday Memory ${index + 1}">
            <div class="gallery-caption">
                Memory ${index + 1} ❤️
            </div>
        `;

        gallery.appendChild(item);
    });

    initializeSlideshow();
}

// ===============================
// Slideshow
// ===============================

function initializeSlideshow() {
    const slideshowImage = document.querySelector(".slideshow img");
    const indicators = document.querySelector(".slide-indicators");

    if (!slideshowImage) return;

    if (indicators) {
        indicators.innerHTML = "";

        galleryImages.forEach((_, index) => {
            const indicator = document.createElement("button");

            indicator.className =
                index === 0 ? "indicator active" : "indicator";

            indicator.addEventListener("click", () => {
                currentSlide = index;
                updateSlide();
            });

            indicators.appendChild(indicator);
        });
    }

    updateSlide();
}

function updateSlide() {
    const slideshowImage = document.querySelector(".slideshow img");

    if (!slideshowImage) return;

    slideshowImage.src = galleryImages[currentSlide];

    const indicators = document.querySelectorAll(".indicator");

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle(
            "active",
            index === currentSlide
        );
    });
}

function nextSlide() {
    currentSlide++;

    if (currentSlide >= galleryImages.length) {
        currentSlide = 0;
    }

    updateSlide();
}

function previousSlide() {
    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = galleryImages.length - 1;
    }

    updateSlide();
}

// ===============================
// Puzzle Game
// ===============================

function initializePuzzleGame() {
    const puzzleBoard = document.querySelector(".puzzle-board");

    if (!puzzleBoard) return;

    startNewGame();
}

function startNewGame() {
    const board = document.querySelector(".puzzle-board");

    if (!board) return;

    puzzleTiles = [];

    const totalTiles = puzzleSize * puzzleSize;

    for (let i = 0; i < totalTiles; i++) {
        puzzleTiles.push(i);
    }

    shuffleArray(puzzleTiles);

    board.innerHTML = "";

    board.style.gridTemplateColumns =
        `repeat(${puzzleSize}, 1fr)`;

    puzzleTiles.forEach((tile, index) => {
        const tileElement = document.createElement("div");

        tileElement.className = "puzzle-tile";
        tileElement.textContent = tile + 1;

        tileElement.dataset.position = index;
        tileElement.dataset.value = tile;

        tileElement.addEventListener("click", () => {
            handleTileClick(index);
        });

        board.appendChild(tileElement);
    });
}

function handleTileClick(index) {
    const tiles = document.querySelectorAll(".puzzle-tile");

    if (!tiles.length) return;

    const clickedValue = puzzleTiles[index];

    let targetIndex = puzzleTiles.indexOf(
        clickedValue === 0
            ? puzzleTiles.length - 1
            : clickedValue - 1
    );

    if (targetIndex === -1) {
        targetIndex = 0;
    }

    [puzzleTiles[index], puzzleTiles[targetIndex]] =
        [puzzleTiles[targetIndex], puzzleTiles[index]];

    updatePuzzleBoard();

    checkPuzzleComplete();
}

function updatePuzzleBoard() {
    const tiles = document.querySelectorAll(".puzzle-tile");

    tiles.forEach((tile, index) => {
        tile.textContent = puzzleTiles[index] + 1;
        tile.dataset.position = index;
        tile.dataset.value = puzzleTiles[index];
    });
}

function checkPuzzleComplete() {
    const solved = puzzleTiles.every(
        (value, index) => value === index
    );

    if (solved) {
        setTimeout(() => {
            alert("🎉 Puzzle Completed! 🎂❤️");
            createConfetti();
        }, 200);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
            [array[j], array[i]];
    }
}

// ===============================
// Puzzle Difficulty
// ===============================

function setPuzzleDifficulty(size) {
    puzzleSize = size;
    startNewGame();
}

// ===============================
// COUNTDOWN
// ===============================

// 🎂 NOOR Birthday
// 05 September 2027 - 12:00 AM

const birthdayDate =
    new Date("2027-09-05T00:00:00");

function initializeCountdown() {
    updateCountdown();

    countdownInterval = setInterval(
        updateCountdown,
        1000
    );
}

function updateCountdown() {
    const now = new Date();

    let difference =
        birthdayDate.getTime() - now.getTime();

    // If the date has passed, automatically move
    // to the next year
    if (difference <= 0) {
        birthdayDate.setFullYear(
            birthdayDate.getFullYear() + 1
        );

        difference =
            birthdayDate.getTime() - now.getTime();
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    updateCountdownElement("days", days);
    updateCountdownElement("hours", hours);
    updateCountdownElement("minutes", minutes);
    updateCountdownElement("seconds", seconds);
}

function updateCountdownElement(id, value) {
    const element = document.getElementById(id);

    if (!element) return;

    element.textContent =
        String(value).padStart(2, "0");
}

// ===============================
// Event Listeners
// ===============================

function initializeEventListeners() {

    const celebrateButton =
        document.querySelector(".celebrate-btn");

    if (celebrateButton) {
        celebrateButton.addEventListener(
            "click",
            celebrate
        );
    }

    const nextButton =
        document.querySelector(".next-slide");

    const previousButton =
        document.querySelector(".prev-slide");

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

    const newGameButton =
        document.querySelector(".new-game");

    if (newGameButton) {
        newGameButton.addEventListener(
            "click",
            startNewGame
        );
    }

    const easyButton =
        document.querySelector(".easy");

    const mediumButton =
        document.querySelector(".medium");

    const hardButton =
        document.querySelector(".hard");

    if (easyButton) {
        easyButton.addEventListener(
            "click",
            () => setPuzzleDifficulty(3)
        );
    }

    if (mediumButton) {
        mediumButton.addEventListener(
            "click",
            () => setPuzzleDifficulty(4)
        );
    }

    if (hardButton) {
        hardButton.addEventListener(
            "click",
            () => setPuzzleDifficulty(5)
        );
    }

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "ArrowRight") {
                nextSlide();
            }

            if (event.key === "ArrowLeft") {
                previousSlide();
            }

            if (
                event.ctrlKey &&
                event.key.toLowerCase() === "n"
            ) {
                event.preventDefault();
                startNewGame();
            }
        }
    );
}

// ===============================
// Scroll Animations
// ===============================

function initializeScrollAnimations() {
    const elements =
        document.querySelectorAll(
            ".gallery-item, .puzzle-section, .countdown-section"
        );

    if (!elements.length) return;

    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "visible"
                        );
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

    elements.forEach(element => {
        observer.observe(element);
    });
}

// ===============================
// Image Error Handling
// ===============================

function initializeImageErrors() {
    document.addEventListener(
        "error",
        function (event) {

            if (
                event.target &&
                event.target.tagName === "IMG"
            ) {
                event.target.style.display = "none";
            }

        },
        true
    );
}

// ===============================
// Touch Swipe
// ===============================

let touchStartX = 0;
let touchEndX = 0;

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

        touchEndX =
            event.changedTouches[0].screenX;

        const difference =
            touchStartX - touchEndX;

        if (Math.abs(difference) < 50) return;

        if (difference > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    },
    { passive: true }
);

// ===============================
// Window Resize
// ===============================

window.addEventListener(
    "resize",
    () => {
        updateSlide();
    }
);
