document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();
    initializeCelebration();
    initializeGallery();
    initializePuzzle();
    initializeCountdown();
    initializeFullscreenGallery();
    initializeSurprise();

});


/* =====================================================
   NAVIGATION
===================================================== */

function initializeNavigation() {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });

    });

}


/* =====================================================
   CELEBRATION
===================================================== */

function initializeCelebration() {

    const celebrateBtn = document.getElementById("celebrateBtn");

    if (!celebrateBtn) return;

    celebrateBtn.addEventListener("click", () => {

        createConfetti(80);

        const cake = document.getElementById("cakeEmoji");

        if (cake) {

            cake.animate(
                [
                    {
                        transform: "scale(1)"
                    },
                    {
                        transform: "scale(1.3) rotate(-8deg)"
                    },
                    {
                        transform: "scale(1.15) rotate(8deg)"
                    },
                    {
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 900,
                    easing: "ease-out"
                }
            );

        }

    });

}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti(amount = 60) {

    const emojis = [
        "🎉",
        "✨",
        "🎊",
        "💖",
        "⭐",
        "🌸",
        "🥳"
    ];

    for (let i = 0; i < amount; i++) {

        const item = document.createElement("div");

        item.className = "confetti-piece";

        item.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        item.style.left =
            Math.random() * 100 + "vw";

        item.style.animationDelay =
            Math.random() * 1.5 + "s";

        item.style.fontSize =
            14 + Math.random() * 16 + "px";

        document.body.appendChild(item);

        setTimeout(() => {
            item.remove();
        }, 4500);

    }

}


/* =====================================================
   GALLERY
===================================================== */

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
    "A beautiful birthday memory ✨",
    "A special moment to remember 💖",
    "Sweet memories 🥰",
    "A precious moment 🌸",
    "An amazing memory 💫",
    "A fun memory 📸",
    "A memory to keep forever ❤️"
];


function initializeGallery() {

    const gridBtn = document.getElementById("gridViewBtn");
    const slideshowBtn = document.getElementById("slideshowViewBtn");

    const grid = document.getElementById("galleryGrid");
    const slideshow = document.getElementById("gallerySlideshow");

    if (!gridBtn || !slideshowBtn || !grid || !slideshow) return;


    gridBtn.addEventListener("click", () => {

        grid.style.display = "grid";
        slideshow.style.display = "none";

        gridBtn.classList.add("active");
        slideshowBtn.classList.remove("active");

    });


    slideshowBtn.addEventListener("click", () => {

        grid.style.display = "none";
        slideshow.style.display = "block";

        slideshowBtn.classList.add("active");
        gridBtn.classList.remove("active");

    });


    initializeSlideshow();

}


let currentSlide = 0;


function initializeSlideshow() {

    const slides =
        document.querySelectorAll(".slide");

    const indicators =
        document.querySelectorAll(".indicator");

    const prev =
        document.getElementById("prevSlide");

    const next =
        document.getElementById("nextSlide");

    if (!slides.length) return;


    function showSlide(index) {

        currentSlide =
            (index + slides.length) % slides.length;


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


    if (prev) {

        prev.addEventListener("click", () => {
            showSlide(currentSlide - 1);
        });

    }


    if (next) {

        next.addEventListener("click", () => {
            showSlide(currentSlide + 1);
        });

    }


    indicators.forEach((indicator, index) => {

        indicator.addEventListener("click", () => {
            showSlide(index);
        });

    });

}


/* =====================================================
   FULLSCREEN GALLERY
===================================================== */

let lightboxIndex = 0;


function initializeFullscreenGallery() {

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxNext =
        document.getElementById("lightboxNext");

    const lightboxPrev =
        document.getElementById("lightboxPrev");


    if (!lightbox) return;


    const images = document.querySelectorAll(
        ".gallery-item img, .slide img"
    );


    images.forEach((image, index) => {

        image.addEventListener("click", () => {

            let realIndex =
                galleryImages.indexOf(
                    image.getAttribute("src")
                );

            if (realIndex === -1) {
                realIndex = index % galleryImages.length;
            }

            openLightbox(realIndex);

        });

    });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener("click", () => {
            changeLightboxImage(1);
        });

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener("click", () => {
            changeLightboxImage(-1);
        });

    }


    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            changeLightboxImage(1);
        }

        if (event.key === "ArrowLeft") {
            changeLightboxImage(-1);
        }

    });

}


function openLightbox(index) {

    const lightbox =
        document.getElementById("galleryLightbox");

    lightboxIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


function updateLightbox() {

    const image =
        document.getElementById("lightboxImage");

    const caption =
        document.getElementById("lightboxCaption");

    const counter =
        document.getElementById("lightboxCounter");


    if (!image) return;


    image.src = galleryImages[lightboxIndex];

    caption.textContent =
        galleryCaptions[lightboxIndex];

    counter.textContent =
        `${lightboxIndex + 1} / ${galleryImages.length}`;

}


function changeLightboxImage(direction) {

    lightboxIndex =
        (lightboxIndex + direction + galleryImages.length)
        % galleryImages.length;

    updateLightbox();

}


function closeLightbox() {

    const lightbox =
        document.getElementById("galleryLightbox");

    if (!lightbox) return;

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


/* =====================================================
   SURPRISE
===================================================== */

function initializeSurprise() {

    const surpriseBtn =
        document.getElementById("surpriseBtn");

    const surpriseModal =
        document.getElementById("surpriseModal");

    const surpriseClose =
        document.getElementById("surpriseClose");

    const surpriseCelebrate =
        document.getElementById("surpriseCelebrate");


    if (!surpriseBtn || !surpriseModal) return;


    surpriseBtn.addEventListener("click", () => {

        surpriseModal.classList.add("active");

        surpriseModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

        createConfetti(45);

    });


    if (surpriseClose) {

        surpriseClose.addEventListener(
            "click",
            closeSurprise
        );

    }


    if (surpriseCelebrate) {

        surpriseCelebrate.addEventListener("click", () => {

            createConfetti(100);

            setTimeout(() => {
                closeSurprise();
            }, 500);

        });

    }


    surpriseModal.addEventListener("click", event => {

        if (event.target === surpriseModal) {
            closeSurprise();
        }

    });


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            surpriseModal.classList.contains("active")
        ) {
            closeSurprise();
        }

    });

}


function closeSurprise() {

    const surpriseModal =
        document.getElementById("surpriseModal");

    if (!surpriseModal) return;

    surpriseModal.classList.remove("active");

    surpriseModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* =====================================================
   PUZZLE
===================================================== */

const puzzleImages = [
    "IMG-20240822-WA0003.jpg",
    "IMG-20240904-WA0003.jpg",
    "IMG_2647.jpg",
    "NPTL3186.JPG",
    "OLSB4991.JPG",
    "Snapchat-1779683539.jpg",
    "Snapchat-2018150645.jpg"
];


let puzzleImage = puzzleImages[0];

let puzzleSize = 4;

let puzzleTiles = [];

let emptyIndex = 0;

let moves = 0;

let timerSeconds = 0;

let timerInterval = null;

let puzzleStarted = false;


function initializePuzzle() {

    const difficulty =
        document.getElementById("difficulty");

    const newGameBtn =
        document.getElementById("newGameBtn");

    const showSolutionBtn =
        document.getElementById("showSolutionBtn");

    const playAgainBtn =
        document.getElementById("playAgainBtn");

    const completionClose =
        document.getElementById("completionClose");


    if (!difficulty) return;


    difficulty.addEventListener("change", () => {

        puzzleSize =
            parseInt(difficulty.value);

        startNewGame();

    });


    if (newGameBtn) {

        newGameBtn.addEventListener(
            "click",
            startNewGame
        );

    }


    if (showSolutionBtn) {

        showSolutionBtn.addEventListener(
            "click",
            showSolution
        );

    }


    if (playAgainBtn) {

        playAgainBtn.addEventListener(
            "click",
            startNewGame
        );

    }


    if (completionClose) {

        completionClose.addEventListener(
            "click",
            closeCompletionModal
        );

    }


    startNewGame();

}


function selectNewPuzzleImage() {

    if (puzzleImages.length <= 1) {

        puzzleImage = puzzleImages[0];

        return;

    }


    const oldImage = puzzleImage;

    let newImage;


    do {

        newImage =
            puzzleImages[
                Math.floor(
                    Math.random() *
                    puzzleImages.length
                )
            ];

    } while (newImage === oldImage);


    puzzleImage = newImage;

}


function startNewGame() {

    selectNewPuzzleImage();

    stopTimer();

    moves = 0;

    timerSeconds = 0;

    puzzleStarted = false;

    updateMoves();

    updateTimer();

    hideSolution();

    closeCompletionModal();

    const solutionImage =
        document.getElementById("solutionImage");

    if (solutionImage) {
        solutionImage.src = puzzleImage;
    }

    createPuzzle();

}


function createPuzzle() {

    const container =
        document.getElementById("puzzleContainer");

    if (!container) return;


    container.innerHTML = "";

    container.style.gridTemplateColumns =
        `repeat(${puzzleSize}, 1fr)`;


    puzzleTiles = [];


    const totalTiles =
        puzzleSize * puzzleSize;


    for (let i = 0; i < totalTiles; i++) {

        puzzleTiles.push(i);

    }


    emptyIndex = totalTiles - 1;


    shufflePuzzle();


    renderPuzzle();

}


function shufflePuzzle() {

    for (let i = 0; i < 200; i++) {

        const neighbors =
            getNeighbors(emptyIndex);

        const randomNeighbor =
            neighbors[
                Math.floor(
                    Math.random() *
                    neighbors.length
                )
            ];


        [
            puzzleTiles[emptyIndex],
            puzzleTiles[randomNeighbor]
        ] = [
            puzzleTiles[randomNeighbor],
            puzzleTiles[emptyIndex]
        ];


        emptyIndex = randomNeighbor;

    }


    if (isSolved()) {

        shufflePuzzle();

    }

}


function getNeighbors(index) {

    const neighbors = [];

    const row =
        Math.floor(index / puzzleSize);

    const col =
        index % puzzleSize;


    if (row > 0) {
        neighbors.push(index - puzzleSize);
    }

    if (row < puzzleSize - 1) {
        neighbors.push(index + puzzleSize);
    }

    if (col > 0) {
        neighbors.push(index - 1);
    }

    if (col < puzzleSize - 1) {
        neighbors.push(index + 1);
    }


    return neighbors;

}


function renderPuzzle() {

    const container =
        document.getElementById("puzzleContainer");

    if (!container) return;


    container.innerHTML = "";


    puzzleTiles.forEach((tileValue, index) => {

        const tile =
            document.createElement("div");


        tile.className = "puzzle-tile";


        if (tileValue === puzzleSize * puzzleSize - 1) {

            tile.style.visibility = "hidden";

        } else {

            const row =
                Math.floor(
                    tileValue / puzzleSize
                );

            const col =
                tileValue % puzzleSize;


            tile.style.backgroundImage =
                `url("${puzzleImage}")`;


            tile.style.backgroundSize =
                `${puzzleSize * 100}% ${puzzleSize * 100}%`;


            tile.style.backgroundPosition =
                `${(col * 100) / (puzzleSize - 1)}% ` +
                `${(row * 100) / (puzzleSize - 1)}%`;


            tile.addEventListener("click", () => {

                moveTile(index);

            });

        }


        container.appendChild(tile);

    });

}


function moveTile(index) {

    if (!getNeighbors(emptyIndex).includes(index)) {
        return;
    }


    if (!puzzleStarted) {

        puzzleStarted = true;

        startTimer();

    }


    [
        puzzleTiles[emptyIndex],
        puzzleTiles[index]
    ] = [
        puzzleTiles[index],
        puzzleTiles[emptyIndex]
    ];


    emptyIndex = index;

    moves++;

    updateMoves();

    renderPuzzle();


    if (isSolved()) {

        stopTimer();

        setTimeout(() => {

            showCompletionModal();

            createConfetti(100);

        }, 300);

    }

}


function isSolved() {

    for (let i = 0; i < puzzleTiles.length; i++) {

        if (puzzleTiles[i] !== i) {
            return false;
        }

    }

    return true;

}


function startTimer() {

    stopTimer();

    timerInterval =
        setInterval(() => {

            timerSeconds++;

            updateTimer();

        }, 1000);

}


function stopTimer() {

    if (timerInterval) {

        clearInterval(timerInterval);

        timerInterval = null;

    }

}


function updateTimer() {

    const timer =
        document.getElementById("timer");

    if (!timer) return;


    const minutes =
        Math.floor(timerSeconds / 60);

    const seconds =
        timerSeconds % 60;


    timer.textContent =
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;

}


function updateMoves() {

    const movesElement =
        document.getElementById("moves");

    if (movesElement) {
        movesElement.textContent = moves;
    }

}


function showSolution() {

    const preview =
        document.getElementById("solutionPreview");

    if (!preview) return;

    preview.style.display = "block";

}


function hideSolution() {

    const preview =
        document.getElementById("solutionPreview");

    if (!preview) return;

    preview.style.display = "none";

}


function showCompletionModal() {

    const modal =
        document.getElementById("completionModal");

    if (!modal) return;

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeCompletionModal() {

    const modal =
        document.getElementById("completionModal");

    if (!modal) return;

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =====================================================
   COUNTDOWN
===================================================== */

let countdownInterval = null;


function initializeCountdown() {

    const input =
        document.getElementById("birthdayDate");

    if (!input) return;


    const savedDate =
        localStorage.getItem("birthdayCountdownDate");


    if (savedDate) {

        input.value = savedDate;

    } else {

        const future =
            new Date();

        future.setDate(
            future.getDate() + 1
        );

        future.setHours(
            0,
            0,
            0,
            0
        );


        input.value =
            formatDateForInput(future);

    }


    input.addEventListener("change", () => {

        localStorage.setItem(
            "birthdayCountdownDate",
            input.value
        );

        startCountdown();

    });


    startCountdown();

}


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


    return `${year}-${month}-${day}T${hours}:${minutes}`;

}


function startCountdown() {

    if (countdownInterval) {

        clearInterval(countdownInterval);

    }


    updateCountdown();


    countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );

}


function updateCountdown() {

    const input =
        document.getElementById("birthdayDate");

    if (!input || !input.value) return;


    const target =
        new Date(input.value).getTime();

    const now =
        Date.now();


    let difference =
        target - now;


    if (difference < 0) {
        difference = 0;
    }


    const second =
        1000;

    const minute =
        second * 60;

    const hour =
        minute * 60;

    const day =
        hour * 24;


    const days =
        Math.floor(
            difference / day
        );

    difference %= day;


    const hours =
        Math.floor(
            difference / hour
        );

    difference %= hour;


    const minutes =
        Math.floor(
            difference / minute
        );

    difference %= minute;


    const seconds =
        Math.floor(
            difference / second
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


function setCountdownValue(id, value) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.textContent =
        String(value).padStart(2, "0");

}
