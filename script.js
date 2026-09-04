// =====================================================
// NOOR BIRTHDAY WEBSITE - SCRIPT
// =====================================================

// -----------------------------
// GLOBAL VARIABLES
// -----------------------------

let currentSlideIndex = 0;
let currentTrack = 0;

let gameTimer = null;
let gameStartTime = null;
let moveCount = 0;
let currentDifficulty = "easy";

let countdownInterval = null;
let targetBirthday = null;

let slideshowTimer = null;

let selectedPuzzlePiece = null;
let puzzleOrder = [];


// =====================================================
// LOCAL IMAGES FROM GITHUB REPOSITORY ROOT
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


// =====================================================
// AUDIO TRACKS
// =====================================================
// If you upload audio files later, keep them inside
// an "audio" folder in your GitHub repository.
//
// Example:
// audio/noor.mp3
// audio/23.mp3
// audio/24.mp3

const audioTracks = [
    {
        title: "Noor",
        artist: "Your Favorite Song",
        src: "audio/noor.mp3"
    },
    {
        title: "CNoor",
        artist: "Your Favorite Song",
        src: "audio/23.mp3"
    },
    {
        title: "Noor",
        artist: "Your Favorite Song",
        src: "audio/24.mp3"
    }
];


// =====================================================
// DOM ELEMENTS
// =====================================================

const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progress");
const progressContainer = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const volumeSlider = document.getElementById("volumeSlider");
const vinylRecord = document.getElementById("vinylRecord");


// =====================================================
// PAGE INITIALIZATION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    initializeNavigation();
    initializeBackgroundAnimations();
    initializeGallery();
    initializeMusicPlayer();
    initializePuzzleGame();
    initializeCountdown();
    initializeEventListeners();
    initializeScrollAnimations();
    initializeImageErrors();

});


// =====================================================
// EVENT LISTENERS
// =====================================================

function initializeEventListeners() {

    // Celebration button
    const celebrateBtn = document.getElementById("celebrateBtn");

    if (celebrateBtn) {
        celebrateBtn.addEventListener("click", celebrateNow);
    }


    // Gallery buttons
    const gridViewBtn = document.getElementById("gridViewBtn");
    const slideshowViewBtn = document.getElementById("slideshowViewBtn");

    if (gridViewBtn) {
        gridViewBtn.addEventListener("click", function () {
            changeView("grid");
        });
    }

    if (slideshowViewBtn) {
        slideshowViewBtn.addEventListener("click", function () {
            changeView("slideshow");
        });
    }


    // Slideshow buttons
    const prevSlideBtn = document.getElementById("prevSlideBtn");
    const nextSlideBtn = document.getElementById("nextSlideBtn");

    if (prevSlideBtn) {
        prevSlideBtn.addEventListener("click", function () {
            changeSlide(-1);
        });
    }

    if (nextSlideBtn) {
        nextSlideBtn.addEventListener("click", function () {
            changeSlide(1);
        });
    }


    // Music controls
    const prevTrackBtn = document.getElementById("prevTrackBtn");
    const nextTrackBtn = document.getElementById("nextTrackBtn");

    if (playPauseBtn) {
        playPauseBtn.addEventListener("click", togglePlay);
    }

    if (prevTrackBtn) {
        prevTrackBtn.addEventListener("click", previousTrack);
    }

    if (nextTrackBtn) {
        nextTrackBtn.addEventListener("click", nextTrack);
    }


    // Volume
    if (volumeSlider) {
        volumeSlider.addEventListener("input", changeVolume);
    }


    // Playlist
    const playlistItems = document.querySelectorAll(".playlist-item");

    playlistItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const index = parseInt(item.dataset.track);

            if (!isNaN(index)) {
                selectTrack(index);
            }

        });

    });


    // Game controls
    const difficultySelect = document.getElementById("difficultySelect");
    const newGameBtn = document.getElementById("newGameBtn");
    const showSolutionBtn = document.getElementById("showSolutionBtn");
    const playAgainBtn = document.getElementById("playAgainBtn");

    if (difficultySelect) {
        difficultySelect.addEventListener("change", changeDifficulty);
    }

    if (newGameBtn) {
        newGameBtn.addEventListener("click", startNewGame);
    }

    if (showSolutionBtn) {
        showSolutionBtn.addEventListener("click", showSolution);
    }

    if (playAgainBtn) {
        playAgainBtn.addEventListener("click", startNewGame);
    }


    // Countdown
    const birthdayInput = document.getElementById("birthdayDate");

    if (birthdayInput) {
        birthdayInput.addEventListener("change", updateCountdown);
    }


    // Slideshow indicators
    const indicators = document.querySelectorAll(".indicator");

    indicators.forEach(function (indicator, index) {

        indicator.addEventListener("click", function () {
            jumpToSlide(index);
        });

    });

}


// =====================================================
// NAVIGATION
// =====================================================

function initializeNavigation() {

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggle && navMenu) {

        navToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");
            navToggle.classList.toggle("active");

        });

    }


    navLinks.forEach(function (link) {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                const offsetTop = targetSection.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });

            }

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (navToggle) {
                navToggle.classList.remove("active");
            }

        });

    });


    window.addEventListener("scroll", function () {

        const navbar = document.getElementById("navbar");

        if (!navbar) return;

        if (window.scrollY > 100) {

            navbar.style.background = "rgba(255, 255, 255, 0.98)";
            navbar.style.backdropFilter = "blur(20px)";

        } else {

            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.backdropFilter = "blur(10px)";

        }

    });

}


// =====================================================
// BACKGROUND ANIMATIONS
// =====================================================

function initializeBackgroundAnimations() {

    createConfetti();
    createParticles();

    setInterval(createConfetti, 10000);
    setInterval(createParticles, 15000);

}


function createConfetti() {

    const container = document.getElementById("confettiContainer");

    if (!container) return;

    container.innerHTML = "";

    const colors = [
        "#ff6b9d",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#ffeaa7",
        "#fd79a8",
        "#00cec9"
    ];

    for (let i = 0; i < 50; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left = Math.random() * 100 + "%";

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.animationDelay =
            Math.random() * 3 + "s";

        confetti.style.animationDuration =
            Math.random() * 3 + 2 + "s";

        container.appendChild(confetti);

    }

}


function createParticles() {

    const container = document.getElementById("particles");

    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < 30; i++) {

        const particle = document.createElement("div");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * 8 + "s";

        particle.style.animationDuration =
            Math.random() * 4 + 6 + "s";

        container.appendChild(particle);

    }

}


// =====================================================
// CELEBRATION
// =====================================================

function celebrateNow() {

    triggerConfettiExplosion();

    showCelebrationMessage();

    const gallerySection =
        document.getElementById("gallery");

    if (gallerySection) {

        const offsetTop =
            gallerySection.offsetTop - 80;

        setTimeout(function () {

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });

        }, 500);

    }

}


function triggerConfettiExplosion() {

    const container =
        document.getElementById("confettiContainer");

    if (!container) return;

    const colors = [
        "#ff6b9d",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#ffeaa7",
        "#fd79a8",
        "#00cec9"
    ];

    for (let i = 0; i < 100; i++) {

        const confetti =
            document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left =
            Math.random() * 100 + "%";

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.animationDuration =
            Math.random() * 2 + 1 + "s";

        container.appendChild(confetti);

        setTimeout(function () {

            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }

        }, 3000);

    }

}


function showCelebrationMessage() {

    const message =
        document.createElement("div");

    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b9d, #4ecdc4);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 2000;
        text-align: center;
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    `;

    message.innerHTML =
        "🎉 Let the celebration begin! 🎉";

    document.body.appendChild(message);

    setTimeout(function () {

        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }

    }, 2500);

}


// =====================================================
// GALLERY
// =====================================================

function initializeGallery() {

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const observer =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        }, {
            threshold: 0.1
        });


    galleryItems.forEach(function (item) {

        item.style.opacity = "0";

        item.style.transform =
            "translateY(20px)";

        item.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(item);

    });

}


function changeView(viewType) {

    const gridView =
        document.getElementById("galleryGrid");

    const slideshowView =
        document.getElementById("gallerySlideshow");

    if (!gridView || !slideshowView) return;


    if (viewType === "grid") {

        gridView.style.display = "grid";
        slideshowView.style.display = "none";

        stopSlideshow();

    } else {

        gridView.style.display = "none";
        slideshowView.style.display = "block";

        startSlideshow();

    }

}


function changeSlide(direction) {

    const slides =
        document.querySelectorAll(".slide");

    const indicators =
        document.querySelectorAll(".indicator");

    if (!slides.length) return;


    slides[currentSlideIndex]
        .classList.remove("active");

    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex]
            .classList.remove("active");
    }


    currentSlideIndex += direction;


    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }

    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }


    slides[currentSlideIndex]
        .classList.add("active");

    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex]
            .classList.add("active");
    }

}


function jumpToSlide(slideIndex) {

    const slides =
        document.querySelectorAll(".slide");

    const indicators =
        document.querySelectorAll(".indicator");

    if (!slides.length) return;

    if (slideIndex < 0 || slideIndex >= slides.length) {
        return;
    }


    slides[currentSlideIndex]
        .classList.remove("active");

    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex]
            .classList.remove("active");
    }


    currentSlideIndex = slideIndex;


    slides[currentSlideIndex]
        .classList.add("active");

    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex]
            .classList.add("active");
    }

}


function startSlideshow() {

    stopSlideshow();

    slideshowTimer = setInterval(function () {

        changeSlide(1);

    }, 5000);

}


function stopSlideshow() {

    if (slideshowTimer) {

        clearInterval(slideshowTimer);

        slideshowTimer = null;

    }

}


// =====================================================
// MUSIC PLAYER
// =====================================================

function initializeMusicPlayer() {

    if (!audioPlayer) return;

    audioPlayer.volume = 0.5;

    loadTrack(currentTrack);


    if (progressContainer) {

        progressContainer.addEventListener(
            "click",
            seek
        );

    }


    audioPlayer.addEventListener(
        "loadedmetadata",
        function () {

            if (isFinite(audioPlayer.duration)) {

                durationDisplay.textContent =
                    formatTime(audioPlayer.duration);

            }

        }
    );


    audioPlayer.addEventListener(
        "timeupdate",
        updateAudioProgress
    );


    audioPlayer.addEventListener(
        "play",
        function () {

            isPlaying = true;

            if (playPauseBtn) {
                playPauseBtn.textContent = "⏸️";
            }

            if (vinylRecord) {
                vinylRecord.classList.add("playing");
            }

        }
    );


    audioPlayer.addEventListener(
        "pause",
        function () {

            isPlaying = false;

            if (playPauseBtn) {
                playPauseBtn.textContent = "▶️";
            }

            if (vinylRecord) {
                vinylRecord.classList.remove("playing");
            }

        }
    );


    audioPlayer.addEventListener(
        "ended",
        nextTrack
    );

}


function loadTrack(index) {

    if (!audioPlayer) return;

    const track = audioTracks[index];

    if (!track) return;


    audioPlayer.src = track.src;

    audioPlayer.load();

    updateTrackDisplay();


    if (progressBar) {
        progressBar.style.width = "0%";
    }

    if (currentTimeDisplay) {
        currentTimeDisplay.textContent = "0:00";
    }

    if (durationDisplay) {
        durationDisplay.textContent = "--:--";
    }

}


function togglePlay() {

    if (!audioPlayer) return;


    if (audioPlayer.paused) {

        audioPlayer.play()
            .catch(function () {

                showAudioMessage();

            });

    } else {

        audioPlayer.pause();

    }

}


function previousTrack() {

    currentTrack--;

    if (currentTrack < 0) {
        currentTrack = audioTracks.length - 1;
    }

    loadTrack(currentTrack);

    updatePlaylist();


    if (isPlaying) {

        audioPlayer.play()
            .catch(function () {});

    }

}


function nextTrack() {

    currentTrack++;

    if (currentTrack >= audioTracks.length) {
        currentTrack = 0;
    }

    loadTrack(currentTrack);

    updatePlaylist();


    if (isPlaying) {

        audioPlayer.play()
            .catch(function () {});

    }

}


function selectTrack(trackIndex) {

    if (
        trackIndex < 0 ||
        trackIndex >= audioTracks.length
    ) {
        return;
    }


    currentTrack = trackIndex;

    loadTrack(currentTrack);

    updatePlaylist();


    if (isPlaying) {

        audioPlayer.play()
            .catch(function () {});

    }

}


function updatePlaylist() {

    const playlistItems =
        document.querySelectorAll(".playlist-item");

    playlistItems.forEach(function (item, index) {

        item.classList.toggle(
            "active",
            index === currentTrack
        );

    });

}


function updateTrackDisplay() {

    const track = audioTracks[currentTrack];

    if (!track) return;

    const trackTitle =
        document.getElementById("trackTitle");

    const trackArtist =
        document.getElementById("trackArtist");


    if (trackTitle) {
        trackTitle.textContent = track.title;
    }

    if (trackArtist) {
        trackArtist.textContent = track.artist;
    }

}


function changeVolume() {

    if (!audioPlayer || !volumeSlider) return;

    audioPlayer.volume =
        Number(volumeSlider.value) / 100;

}


function seek(e) {

    if (
        !audioPlayer ||
        !isFinite(audioPlayer.duration) ||
        audioPlayer.duration <= 0
    ) {
        return;
    }


    const rect =
        progressContainer.getBoundingClientRect();

    const clickX =
        e.clientX - rect.left;

    const percentage =
        Math.max(
            0,
            Math.min(
                1,
                clickX / rect.width
            )
        );


    audioPlayer.currentTime =
        percentage * audioPlayer.duration;

}


function updateAudioProgress() {

    if (!audioPlayer || !isFinite(audioPlayer.duration)) {
        return;
    }


    const percentage =
        (audioPlayer.currentTime /
            audioPlayer.duration) * 100;


    if (progressBar) {
        progressBar.style.width =
            percentage + "%";
    }


    if (currentTimeDisplay) {

        currentTimeDisplay.textContent =
            formatTime(audioPlayer.currentTime);

    }

}


function formatTime(seconds) {

    if (!isFinite(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        secs.toString().padStart(2, "0")
    );

}


function showAudioMessage() {

    const message =
        document.createElement("div");

    message.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #222;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 3000;
        font-size: 14px;
        text-align: center;
    `;

    message.textContent =
        "🎵 Audio file not uploaded yet.";

    document.body.appendChild(message);

    setTimeout(function () {

        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }

    }, 3000);

}


// =====================================================
// PUZZLE GAME
// =====================================================

function initializePuzzleGame() {

    changeDifficulty();

    startNewGame();

}


function getGridSize() {

    if (currentDifficulty === "medium") {
        return 4;
    }

    if (currentDifficulty === "hard") {
        return 5;
    }

    return 3;

}


function changeDifficulty() {

    const select =
        document.getElementById("difficultySelect");

    if (select) {
        currentDifficulty = select.value;
    }


    const puzzleBoard =
        document.getElementById("puzzleBoard");

    if (!puzzleBoard) return;


    const gridSize = getGridSize();


    puzzleBoard.style.gridTemplateColumns =
        `repeat(${gridSize}, 1fr)`;

    puzzleBoard.style.gridTemplateRows =
        `repeat(${gridSize}, 1fr)`;

}


function startNewGame() {

    clearInterval(gameTimer);

    gameStartTime = Date.now();

    moveCount = 0;

    selectedPuzzlePiece = null;

    updateGameStats();

    const completion =
        document.getElementById("gameCompletion");

    if (completion) {
        completion.style.display = "none";
    }


    generatePuzzle();

    shufflePuzzle();

    startGameTimer();

}


function generatePuzzle() {

    const puzzleBoard =
        document.getElementById("puzzleBoard");

    if (!puzzleBoard) return;


    const gridSize = getGridSize();

    const totalPieces =
        gridSize * gridSize;


    puzzleBoard.innerHTML = "";

    puzzleOrder = [];


    const imageUrl =
        galleryImages[
            Math.floor(
                Math.random() *
                galleryImages.length
            )
        ];


    const solutionImage =
        document.getElementById("solutionImage");

    if (solutionImage) {
        solutionImage.src = imageUrl;
    }


    for (let i = 0; i < totalPieces; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "puzzle-piece";

        piece.dataset.correctPosition = i;

        piece.dataset.index = i;


        const row =
            Math.floor(i / gridSize);

        const col =
            i % gridSize;


        const x =
            gridSize === 1
                ? 0
                : (col / (gridSize - 1)) * 100;

        const y =
            gridSize === 1
                ? 0
                : (row / (gridSize - 1)) * 100;


        piece.style.backgroundImage =
            `url("${imageUrl}")`;

        piece.style.backgroundPosition =
            `${x}% ${y}%`;

        piece.style.backgroundSize =
            `${gridSize * 100}% ${gridSize * 100}%`;


        // Drag support
        piece.draggable = true;

        piece.addEventListener(
            "dragstart",
            handleDragStart
        );

        piece.addEventListener(
            "dragover",
            handleDragOver
        );

        piece.addEventListener(
            "drop",
            handleDrop
        );

        piece.addEventListener(
            "dragend",
            handleDragEnd
        );


        // Click support - works better on mobile
        piece.addEventListener(
            "click",
            handlePuzzleClick
        );


        puzzleBoard.appendChild(piece);

        puzzleOrder.push(i);

    }


    changeDifficulty();

}


function shufflePuzzle() {

    // Shuffle using swaps
    for (let i = puzzleOrder.length - 1; i > 0; i--) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            puzzleOrder[i],
            puzzleOrder[j]
        ] =
        [
            puzzleOrder[j],
            puzzleOrder[i]
        ];

    }


    // Make sure it isn't already solved
    if (
        puzzleOrder.every(
            (value, index) =>
                value === index
        )
    ) {

        [
            puzzleOrder[0],
            puzzleOrder[1]
        ] =
        [
            puzzleOrder[1],
            puzzleOrder[0]
        ];

    }


    renderPuzzle();

}


function renderPuzzle() {

    const puzzleBoard =
        document.getElementById("puzzleBoard");

    if (!puzzleBoard) return;


    puzzleOrder.forEach(function (pieceIndex, position) {

        const piece =
            puzzleBoard.querySelector(
                `[data-index="${pieceIndex}"]`
            );

        if (piece) {

            piece.dataset.position =
                position;

            puzzleBoard.appendChild(piece);

        }

    });

}


function handlePuzzleClick(e) {

    const piece = e.currentTarget;


    if (!selectedPuzzlePiece) {

        selectedPuzzlePiece = piece;

        piece.classList.add("selected");

        return;

    }


    if (selectedPuzzlePiece === piece) {

        piece.classList.remove("selected");

        selectedPuzzlePiece = null;

        return;

    }


    swapPuzzlePieces(
        selectedPuzzlePiece,
        piece
    );


    selectedPuzzlePiece.classList.remove(
        "selected"
    );

    selectedPuzzlePiece = null;

}


function swapPuzzlePieces(piece1, piece2) {

    const pos1 =
        parseInt(piece1.dataset.position);

    const pos2 =
        parseInt(piece2.dataset.position);


    if (
        isNaN(pos1) ||
        isNaN(pos2)
    ) {
        return;
    }


    [
        puzzleOrder[pos1],
        puzzleOrder[pos2]
    ] =
    [
        puzzleOrder[pos2],
        puzzleOrder[pos1]
    ];


    moveCount++;

    renderPuzzle();

    updateGameStats();

    checkPuzzleCompletion();

}


let draggedElement = null;


function handleDragStart(e) {

    draggedElement =
        e.currentTarget;

    draggedElement.classList.add(
        "dragging"
    );

}


function handleDragOver(e) {

    e.preventDefault();

}


function handleDrop(e) {

    e.preventDefault();

    const target =
        e.currentTarget;


    if (
        draggedElement &&
        target &&
        draggedElement !== target
    ) {

        swapPuzzlePieces(
            draggedElement,
            target
        );

    }

}


function handleDragEnd() {

    if (draggedElement) {

        draggedElement.classList.remove(
            "dragging"
        );

    }

    draggedElement = null;

}


function checkPuzzleCompletion() {

    const isComplete =
        puzzleOrder.every(
            function (value, index) {
                return value === index;
            }
        );


    if (isComplete) {

        clearInterval(gameTimer);

        showCompletionMessage();

        triggerConfettiExplosion();

    }

}


function showCompletionMessage() {

    const completionDiv =
        document.getElementById(
            "gameCompletion"
        );

    const finalTime =
        document.getElementById(
            "finalTime"
        );

    const finalMoves =
        document.getElementById(
            "finalMoves"
        );


    if (
        !completionDiv ||
        !finalTime ||
        !finalMoves
    ) {
        return;
    }


    const elapsed =
        Math.floor(
            (Date.now() - gameStartTime) / 1000
        );


    const minutes =
        Math.floor(elapsed / 60);

    const seconds =
        elapsed % 60;


    finalTime.textContent =
        `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;


    finalMoves.textContent =
        moveCount;


    completionDiv.style.display =
        "flex";

}


function showSolution() {

    puzzleOrder.sort(
        function (a, b) {
            return a - b;
        }
    );


    renderPuzzle();

    clearInterval(gameTimer);

    checkPuzzleCompletion();

}


function startGameTimer() {

    gameTimer =
        setInterval(function () {

            const elapsed =
                Math.floor(
                    (Date.now() - gameStartTime) / 1000
                );


            const minutes =
                Math.floor(elapsed / 60);

            const seconds =
                elapsed % 60;


            const timer =
                document.getElementById(
                    "gameTimer"
                );


            if (timer) {

                timer.textContent =
                    `${minutes}:${seconds
                        .toString()
                        .padStart(2, "0")}`;

            }

        }, 1000);

}


function updateGameStats() {

    const moveCounter =
        document.getElementById(
            "moveCounter"
        );

    if (moveCounter) {

        moveCounter.textContent =
            moveCount;

    }

}


// =====================================================
// COUNTDOWN
// =====================================================

function initializeCountdown() {

    const birthdayInput =
        document.getElementById(
            "birthdayDate"
        );

    if (!birthdayInput) return;


    // Default: next August 13
    const now = new Date();

    let year =
        now.getFullYear();

    let birthday =
        new Date(
            year,
            7,
            13,
            0,
            0,
            0
        );


    // If this year's birthday passed,
    // use next year
    if (birthday <= now) {

        birthday =
            new Date(
                year + 1,
                7,
                13,
                0,
                0,
                0
            );

    }


    birthdayInput.value =
        toDateTimeLocal(birthday);


    updateCountdown();

}


function toDateTimeLocal(date) {

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


function updateCountdown() {

    const birthdayInput =
        document.getElementById(
            "birthdayDate"
        );

    if (!birthdayInput) return;


    if (!birthdayInput.value) {

        return;

    }


    targetBirthday =
        new Date(
            birthdayInput.value
        );


    if (
        isNaN(
            targetBirthday.getTime()
        )
    ) {

        return;

    }


    clearInterval(
        countdownInterval
    );


    countdownInterval =
        setInterval(
            calculateTimeRemaining,
            1000
        );


    calculateTimeRemaining();

}


function calculateTimeRemaining() {

    if (!targetBirthday) return;


    const now =
        Date.now();

    let difference =
        targetBirthday.getTime() -
        now;


    // If selected birthday has passed,
    // automatically move to next year
    if (difference <= 0) {

        const nextBirthday =
            new Date(
                targetBirthday
            );

        nextBirthday.setFullYear(
            nextBirthday.getFullYear() + 1
        );

        targetBirthday =
            nextBirthday;

        const birthdayInput =
            document.getElementById(
                "birthdayDate"
            );

        if (birthdayInput) {

            birthdayInput.value =
                toDateTimeLocal(
                    targetBirthday
                );

        }

        difference =
            targetBirthday.getTime() -
            now;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");

    const messageDiv =
        document.getElementById(
            "countdownMessage"
        );


    if (daysElement) {
        daysElement.textContent =
            String(days).padStart(2, "0");
    }

    if (hoursElement) {
        hoursElement.textContent =
            String(hours).padStart(2, "0");
    }

    if (minutesElement) {
        minutesElement.textContent =
            String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
        secondsElement.textContent =
            String(seconds).padStart(2, "0");
    }


    if (messageDiv) {

        messageDiv.innerHTML =
            "<p>🎂 Counting down to NOOR's Birthday! 🎉</p>";

    }

}


// =====================================================
// SCROLL ANIMATIONS
// =====================================================

function initializeScrollAnimations() {

    if (!("IntersectionObserver" in window)) {
        return;
    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "fade-in-up"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.1,
                rootMargin:
                    "0px 0px -100px 0px"
            }
        );


    document
        .querySelectorAll("section")
        .forEach(function (section) {

            observer.observe(section);

        });

}


// =====================================================
// IMAGE ERROR HANDLING
// =====================================================

function initializeImageErrors() {

    document
        .querySelectorAll("img")
        .forEach(function (img) {

            img.addEventListener(
                "error",
                function () {

                    console.log(
                        "Image not found:",
                        this.src
                    );

                    this.style.opacity = "0.3";

                }
            );

        });

}


// =====================================================
// KEYBOARD CONTROLS
// =====================================================

document.addEventListener(
    "keydown",
    function (e) {

        const slideshowView =
            document.getElementById(
                "gallerySlideshow"
            );


        if (
            slideshowView &&
            slideshowView.style.display !== "none"
        ) {

            if (e.key === "ArrowLeft") {

                changeSlide(-1);

            }

            if (e.key === "ArrowRight") {

                changeSlide(1);

            }

        }


        // Space = Music play/pause
        if (
            e.key === " " &&
            e.target.tagName !== "INPUT" &&
            e.target.tagName !== "TEXTAREA" &&
            e.target.tagName !== "BUTTON"
        ) {

            e.preventDefault();

            togglePlay();

        }


        // Ctrl + N = New puzzle
        if (
            e.key.toLowerCase() === "n" &&
            e.ctrlKey
        ) {

            e.preventDefault();

            startNewGame();

        }

    }
);


// =====================================================
// MOBILE SWIPE FOR SLIDESHOW
// =====================================================

let touchStartX = 0;
let touchEndX = 0;


document.addEventListener(
    "touchstart",
    function (e) {

        touchStartX =
            e.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    function (e) {

        touchEndX =
            e.changedTouches[0].screenX;

        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    if (Math.abs(difference) < 50) {
        return;
    }


    const slideshowView =
        document.getElementById(
            "gallerySlideshow"
        );


    if (
        slideshowView &&
        slideshowView.style.display !== "none"
    ) {

        if (difference > 0) {

            changeSlide(1);

        } else {

            changeSlide(-1);

        }

    }

}


// =====================================================
// PAGE VISIBILITY
// =====================================================

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden &&
            audioPlayer &&
            !audioPlayer.paused
        ) {

            audioPlayer.pause();

        }

    }
);


// =====================================================
// RESIZE
// =====================================================

window.addEventListener(
    "resize",
    function () {

        changeDifficulty();

    }
);
