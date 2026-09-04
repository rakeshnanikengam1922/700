alert("SCRIPT STARTED ✅");

document.addEventListener("DOMContentLoaded", function () {

    console.log("DOM LOADED");

    initializeNavigation();
    initializeCelebration();
    initializeGallery();
    initializeFullscreenGallery();
    initializeSurprise();
    initializePuzzle();
    initializeJournal();

    console.log("ALL FEATURES INITIALIZED ✅");

});


/* =====================================================
   NAVIGATION
===================================================== */

function initializeNavigation() {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                if (navLinks) {
                    navLinks.classList.remove("active");
                }

            }

        });

    });

}


/* =====================================================
   CELEBRATE
===================================================== */

function initializeCelebration() {

    const button = document.getElementById("celebrateBtn");

    if (!button) {
        console.error("Celebrate button NOT FOUND");
        return;
    }

    console.log("Celebrate initialized");

    button.addEventListener("click", function () {

        console.log("CELEBRATE CLICKED 🎉");

        createConfetti(120);

        const cake = document.getElementById("cakeEmoji");

        if (cake) {

            cake.classList.add("cake-pop");

            setTimeout(function () {
                cake.classList.remove("cake-pop");
            }, 700);

        }

        button.textContent = "🎉 Celebration Started! 🎉";

        setTimeout(function () {
            button.textContent = "🎉 Celebrate";
        }, 2000);

    });

}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti(amount) {

    amount = amount || 60;

    const container = document.createElement("div");

    container.className = "confetti-container";

    document.body.appendChild(container);

    const symbols = [
        "🎉",
        "🎊",
        "✨",
        "💖",
        "🌸",
        "🥳",
        "❤️"
    ];

    for (let i = 0; i < amount; i++) {

        const piece = document.createElement("span");

        piece.className = "confetti-piece";

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.animationDelay =
            Math.random() * 0.6 + "s";

        piece.style.fontSize =
            (16 + Math.random() * 18) + "px";

        container.appendChild(piece);

    }

    setTimeout(function () {

        if (container) {
            container.remove();
        }

    }, 4500);

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

    const gridButton =
        document.getElementById("gridViewBtn");

    const slideshowButton =
        document.getElementById("slideshowViewBtn");

    const grid =
        document.getElementById("galleryGrid");

    const slideshow =
        document.getElementById("gallerySlideshow");

    if (!gridButton || !slideshowButton) {
        return;
    }


    gridButton.addEventListener("click", function () {

        if (grid) {
            grid.style.display = "grid";
        }

        if (slideshow) {
            slideshow.style.display = "none";
        }

        gridButton.classList.add("active");
        slideshowButton.classList.remove("active");

    });


    slideshowButton.addEventListener("click", function () {

        if (grid) {
            grid.style.display = "none";
        }

        if (slideshow) {
            slideshow.style.display = "block";
        }

        slideshowButton.classList.add("active");
        gridButton.classList.remove("active");

    });


    initializeSlideshow();

}


/* =====================================================
   SLIDESHOW
===================================================== */

let currentSlide = 0;


function initializeSlideshow() {

    const slides =
        document.querySelectorAll(".slide");

    const indicators =
        document.querySelectorAll(".indicator");

    const previous =
        document.getElementById("prevSlide");

    const next =
        document.getElementById("nextSlide");


    function showSlide(index) {

        if (!slides.length) {
            return;
        }

        currentSlide =
            (index + slides.length) % slides.length;


        slides.forEach(function (slide, i) {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        indicators.forEach(function (indicator, i) {

            indicator.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    if (previous) {

        previous.addEventListener("click", function () {
            showSlide(currentSlide - 1);
        });

    }


    if (next) {

        next.addEventListener("click", function () {
            showSlide(currentSlide + 1);
        });

    }


    indicators.forEach(function (indicator, index) {

        indicator.addEventListener("click", function () {
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

    const close =
        document.getElementById("lightboxClose");

    const previous =
        document.getElementById("lightboxPrev");

    const next =
        document.getElementById("lightboxNext");


    document.querySelectorAll(".gallery-item")
        .forEach(function (item, index) {

            item.addEventListener("click", function () {
                openLightbox(index);
            });

        });


    if (close) {

        close.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (previous) {

        previous.addEventListener("click", function () {
            changeLightboxImage(-1);
        });

    }


    if (next) {

        next.addEventListener("click", function () {
            changeLightboxImage(1);
        });

    }


    if (lightbox) {

        lightbox.addEventListener("click", function (e) {

            if (e.target === lightbox) {
                closeLightbox();
            }

        });

    }


    document.addEventListener("keydown", function (e) {

        if (!lightbox) {
            return;
        }

        if (lightbox.getAttribute("aria-hidden") === "true") {
            return;
        }

        if (e.key === "Escape") {
            closeLightbox();
        }

        if (e.key === "ArrowLeft") {
            changeLightboxImage(-1);
        }

        if (e.key === "ArrowRight") {
            changeLightboxImage(1);
        }

    });

}


function openLightbox(index) {

    lightboxIndex = index;

    updateLightbox();

    const lightbox =
        document.getElementById("galleryLightbox");

    if (!lightbox) {
        return;
    }

    lightbox.classList.add("active");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

}


function updateLightbox() {

    const image =
        document.getElementById("lightboxImage");

    const caption =
        document.getElementById("lightboxCaption");

    const counter =
        document.getElementById("lightboxCounter");


    if (image) {

        image.src =
            "./" + galleryImages[lightboxIndex];

        image.alt =
            "Memory " + (lightboxIndex + 1);

    }


    if (caption) {

        caption.textContent =
            galleryCaptions[lightboxIndex];

    }


    if (counter) {

        counter.textContent =
            (lightboxIndex + 1) +
            " / " +
            galleryImages.length;

    }

}


function changeLightboxImage(direction) {

    lightboxIndex =
        (
            lightboxIndex +
            direction +
            galleryImages.length
        ) %
        galleryImages.length;

    updateLightbox();

}


function closeLightbox() {

    const lightbox =
        document.getElementById("galleryLightbox");

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("active");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* =====================================================
   SURPRISE / SECRET MESSAGE
===================================================== */

function initializeSurprise() {

    const button =
        document.getElementById("surpriseBtn");

    const modal =
        document.getElementById("surpriseModal");

    const close =
        document.getElementById("surpriseClose");

    const celebrate =
        document.getElementById("surpriseCelebrate");


    if (!button || !modal) {
        console.error("Surprise elements NOT FOUND");
        return;
    }


    console.log("Surprise initialized");


    button.addEventListener("click", function () {

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

        createConfetti(80);

    });


    if (close) {

        close.addEventListener(
            "click",
            closeSurprise
        );

    }


    if (celebrate) {

        celebrate.addEventListener("click", function () {

            closeSurprise();

            createConfetti(120);

        });

    }


    modal.addEventListener("click", function (e) {

        if (e.target === modal) {
            closeSurprise();
        }

    });

}


function closeSurprise() {

    const modal =
        document.getElementById("surpriseModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    modal.setAttribute(
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

    const container =
        document.getElementById("puzzleContainer");

    const difficulty =
        document.getElementById("difficulty");

    const newGame =
        document.getElementById("newGameBtn");

    const solution =
        document.getElementById("showSolutionBtn");

    const playAgain =
        document.getElementById("playAgainBtn");

    const completionClose =
        document.getElementById("completionClose");


    if (!container) {
        console.error("Puzzle container NOT FOUND");
        return;
    }


    console.log("Puzzle initialized");


    if (difficulty) {

        puzzleSize =
            parseInt(difficulty.value, 10) || 4;

        difficulty.addEventListener(
            "change",
            function () {

                puzzleSize =
                    parseInt(difficulty.value, 10) || 4;

                startNewGame();

            }
        );

    }


    if (newGame) {
        newGame.addEventListener(
            "click",
            startNewGame
        );
    }


    if (playAgain) {
        playAgain.addEventListener(
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


    if (completionClose) {
        completionClose.addEventListener(
            "click",
            closeCompletion
        );
    }


    startNewGame();

}


function startNewGame() {

    stopPuzzleTimer();

    moves = 0;
    timerSeconds = 0;
    puzzleStarted = false;

    selectPuzzleImage();

    createPuzzle();

    updatePuzzleStats();

}


function selectPuzzleImage() {

    if (puzzleImages.length === 0) {
        return;
    }

    if (puzzleImages.length === 1) {
        puzzleImage = puzzleImages[0];
        return;
    }

    let selected;

    do {

        selected =
            puzzleImages[
                Math.floor(
                    Math.random() *
                    puzzleImages.length
                )
            ];

    } while (
        selected === puzzleImage
    );

    puzzleImage = selected;

}


function createPuzzle() {

    const container =
        document.getElementById("puzzleContainer");

    if (!container) {
        return;
    }


    const total =
        puzzleSize * puzzleSize;


    puzzleTiles =
        Array.from(
            { length: total },
            function (_, index) {
                return index;
            }
        );


    puzzleTiles[total - 1] = null;

    emptyIndex = total - 1;


    /*
       Shuffle by making legal moves.
       This guarantees the puzzle is solvable.
    */

    for (let i = 0; i < 250; i++) {

        const possibleMoves = [];


        for (let j = 0; j < total; j++) {

            if (
                puzzleTiles[j] !== null &&
                isAdjacent(j, emptyIndex)
            ) {

                possibleMoves.push(j);

            }

        }


        if (!possibleMoves.length) {
            break;
        }


        const randomIndex =
            possibleMoves[
                Math.floor(
                    Math.random() *
                    possibleMoves.length
                )
            ];


        puzzleTiles[emptyIndex] =
            puzzleTiles[randomIndex];

        puzzleTiles[randomIndex] =
            null;

        emptyIndex =
            randomIndex;

    }


    /*
       Make sure it isn't already solved.
    */

    if (isPuzzleSolved()) {

        const possibleMoves = [];

        for (let j = 0; j < total; j++) {

            if (
                puzzleTiles[j] !== null &&
                isAdjacent(j, emptyIndex)
            ) {

                possibleMoves.push(j);

            }

        }


        if (possibleMoves.length) {

            const randomIndex =
                possibleMoves[
                    Math.floor(
                        Math.random() *
                        possibleMoves.length
                    )
                ];


            puzzleTiles[emptyIndex] =
                puzzleTiles[randomIndex];

            puzzleTiles[randomIndex] =
                null;

            emptyIndex =
                randomIndex;

        }

    }


    renderPuzzle();


    const solutionImage =
        document.getElementById("solutionImage");

    if (solutionImage) {

        solutionImage.src =
            "./" + puzzleImage;

        solutionImage.alt =
            "Puzzle solution";

    }


    const preview =
        document.getElementById("solutionPreview");

    if (preview) {
        preview.style.display = "none";
    }

}


function renderPuzzle() {

    const container =
        document.getElementById("puzzleContainer");

    if (!container) {
        return;
    }


    container.innerHTML = "";

    container.style.gridTemplateColumns =
        "repeat(" + puzzleSize + ", 1fr)";


    puzzleTiles.forEach(
        function (tileValue, index) {

            const tile =
                document.createElement("button");

            tile.type = "button";

            tile.className = "puzzle-tile";


            if (tileValue === null) {

                tile.classList.add("empty");

            } else {

                const row =
                    Math.floor(
                        tileValue / puzzleSize
                    );

                const col =
                    tileValue % puzzleSize;


                /*
                   IMPORTANT:
                   Images are in the repository root.
                */

                tile.style.backgroundImage =
                    'url("./' + puzzleImage + '")';

                tile.style.backgroundRepeat =
                    "no-repeat";

                tile.style.backgroundSize =
                    (puzzleSize * 100) +
                    "% " +
                    (puzzleSize * 100) +
                    "%";


                if (puzzleSize > 1) {

                    tile.style.backgroundPosition =
                        (
                            (col * 100) /
                            (puzzleSize - 1)
                        ) +
                        "% " +
                        (
                            (row * 100) /
                            (puzzleSize - 1)
                        ) +
                        "%";

                }


                tile.setAttribute(
                    "aria-label",
                    "Puzzle piece " +
                    (tileValue + 1)
                );


                tile.addEventListener(
                    "click",
                    function () {
                        movePuzzleTile(index);
                    }
                );

            }


            container.appendChild(tile);

        }
    );

}


function movePuzzleTile(index) {

    if (!isAdjacent(index, emptyIndex)) {
        return;
    }


    if (!puzzleStarted) {

        puzzleStarted = true;

        startPuzzleTimer();

    }


    puzzleTiles[emptyIndex] =
        puzzleTiles[index];

    puzzleTiles[index] =
        null;

    emptyIndex =
        index;

    moves++;

    updatePuzzleStats();

    renderPuzzle();


    if (isPuzzleSolved()) {

        stopPuzzleTimer();

        showPuzzleCompletion();

    }

}


function isAdjacent(index1, index2) {

    const row1 =
        Math.floor(index1 / puzzleSize);

    const col1 =
        index1 % puzzleSize;

    const row2 =
        Math.floor(index2 / puzzleSize);

    const col2 =
        index2 % puzzleSize;


    return (
        Math.abs(row1 - row2) +
        Math.abs(col1 - col2)
    ) === 1;

}


function isPuzzleSolved() {

    const last =
        puzzleTiles.length - 1;


    for (let i = 0; i < last; i++) {

        if (puzzleTiles[i] !== i) {
            return false;
        }

    }


    return puzzleTiles[last] === null;

}


function startPuzzleTimer() {

    stopPuzzleTimer();

    timerInterval =
        setInterval(function () {

            timerSeconds++;

            updatePuzzleStats();

        }, 1000);

}


function stopPuzzleTimer() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;

    }

}


function updatePuzzleStats() {

    const timer =
        document.getElementById("timer");

    const movesDisplay =
        document.getElementById("moves");


    if (movesDisplay) {
        movesDisplay.textContent = moves;
    }


    if (timer) {

        const minutes =
            Math.floor(timerSeconds / 60);

        const seconds =
            timerSeconds % 60;


        timer.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

    }

}


function showSolution() {

    const preview =
        document.getElementById("solutionPreview");

    if (!preview) {
        return;
    }


    if (preview.style.display === "block") {
        preview.style.display = "none";
    } else {
        preview.style.display = "block";
    }

}


function showPuzzleCompletion() {

    createConfetti(100);

    const modal =
        document.getElementById("completionModal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeCompletion() {

    const modal =
        document.getElementById("completionModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =====================================================
   JOURNAL
===================================================== */

const journalQuestions = [

    "What is one memory you never want to forget? 💭",

    "What is one thing that always makes you smile? 😊",

    "What is one place you would love to visit someday? ✈️",

    "What is one thing you want to achieve this year? 🎯",

    "What would make this birthday really special for you? 🎂",

    "What is something you are looking forward to? ✨",

    "If you could make one wish for the coming year, what would it be? 🌟",

    "What is one thing you are grateful for today? 🌸",

    "Write a small message to your future self. 💌",

    "What is one moment from this year that made you really happy? 🥰",

    "What is something new you would like to try? 🎉",

    "Describe your perfect happy day. ☀️"

];


let currentQuestionIndex = 0;
let journalAnswers = [];


function initializeJournal() {

    const nextButton =
        document.getElementById("nextQuestionBtn");

    const addButton =
        document.getElementById("addAnswerBtn");

    const sendButton =
        document.getElementById("sendJournalBtn");


    if (!nextButton || !addButton || !sendButton) {
        return;
    }


    showInitialQuestion();


    nextButton.addEventListener(
        "click",
        showRandomQuestion
    );


    addButton.addEventListener(
        "click",
        addCurrentAnswer
    );


    sendButton.addEventListener(
        "click",
        sendJournalAnswers
    );

}


function showInitialQuestion() {

    const questionText =
        document.getElementById("questionText");

    const questionNumber =
        document.getElementById("questionNumber");


    if (questionText) {

        questionText.textContent =
            journalQuestions[currentQuestionIndex];

    }


    if (questionNumber) {

        questionNumber.textContent =
            "Question " +
            (currentQuestionIndex + 1);

    }

}


function showRandomQuestion() {

    let newIndex;


    do {

        newIndex =
            Math.floor(
                Math.random() *
                journalQuestions.length
            );

    } while (
        journalQuestions.length > 1 &&
        newIndex === currentQuestionIndex
    );


    currentQuestionIndex =
        newIndex;


    const questionText =
        document.getElementById("questionText");

    const questionNumber =
        document.getElementById("questionNumber");

    const answerBox =
        document.getElementById("questionAnswer");


    if (questionText) {

        questionText.textContent =
            journalQuestions[currentQuestionIndex];

    }


    if (questionNumber) {

        questionNumber.textContent =
            "Question " +
            (currentQuestionIndex + 1);

    }


    if (answerBox) {

        answerBox.value = "";

        answerBox.focus();

    }

}


/* =====================================================
   ADD ANSWER + EMAIL
===================================================== */

async function addCurrentAnswer() {

    const answerBox =
        document.getElementById("questionAnswer");

    const button =
        document.getElementById("addAnswerBtn");


    if (!answerBox) {
        return;
    }


    const answer =
        answerBox.value.trim();


    if (!answer) {

        showJournalStatus(
            "Please write an answer first ✍️",
            "error"
        );

        answerBox.focus();

        return;

    }


    const question =
        journalQuestions[currentQuestionIndex];


    if (button) {

        button.disabled = true;

        button.textContent =
            "📨 Sending...";

    }


    const sent =
        await sendSingleJournalAnswer(
            question,
            answer
        );


    if (sent) {

        journalAnswers.push({
            question: question,
            answer: answer
        });


        renderJournalAnswers();

        answerBox.value = "";


        showJournalStatus(
            "💖 Answer added and sent successfully!",
            "success"
        );


        createConfetti(20);

        showRandomQuestion();

    } else {

        showJournalStatus(
            "⚠️ Email sending failed. Please try again.",
            "error"
        );

    }


    if (button) {

        button.disabled = false;

        button.textContent =
            "➕ Add This Answer";

    }

}


function renderJournalAnswers() {

    const list =
        document.getElementById("answerList");

    if (!list) {
        return;
    }


    list.innerHTML = "";


    if (journalAnswers.length === 0) {

        const empty =
            document.createElement("p");

        empty.className =
            "empty-answer";

        empty.textContent =
            "Your answers will appear here...";

        list.appendChild(empty);

        return;

    }


    journalAnswers.forEach(
        function (item, index) {

            const card =
                document.createElement("div");

            card.className =
                "answer-card";


            const question =
                document.createElement("div");

            question.className =
                "answer-question";

            question.textContent =
                item.question;


            const answer =
                document.createElement("div");

            answer.className =
                "answer-value";

            answer.textContent =
                item.answer;


            const remove =
                document.createElement("button");

            remove.type = "button";

            remove.className =
                "remove-answer";

            remove.textContent =
                "✕ Remove";


            remove.addEventListener(
                "click",
                function () {

                    journalAnswers.splice(index, 1);

                    renderJournalAnswers();

                }
            );


            card.appendChild(question);
            card.appendChild(answer);
            card.appendChild(remove);

            list.appendChild(card);

        }
    );

}


/* =====================================================
   FORM SUBMIT
===================================================== */

async function sendSingleJournalAnswer(
    question,
    answer
) {

    const receiverEmail =
        "rakeshnanikengam1922@gmail.com";


    const formData =
        new FormData();


    formData.append(
        "_subject",
        "💖 BUJJI Birthday Journal - New Answer"
    );

    formData.append(
        "_captcha",
        "false"
    );

    formData.append(
        "_template",
        "table"
    );

    formData.append(
        "Question",
        question
    );

    formData.append(
        "Answer",
        answer
    );


    try {

        const response =
            await fetch(
                "https://formsubmit.co/ajax/" +
                receiverEmail,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        return response.ok;

    } catch (error) {

        console.error(
            "Email error:",
            error
        );

        return false;

    }

}


async function sendJournalAnswers() {

    const button =
        document.getElementById("sendJournalBtn");

    const messageBox =
        document.getElementById("journalMessage");


    const receiverEmail =
        "rakeshnanikengam1922@gmail.com";


    const personalMessage =
        messageBox
            ? messageBox.value.trim()
            : "";


    if (
        journalAnswers.length === 0 &&
        !personalMessage
    ) {

        showJournalStatus(
            "Please write something first ✍️",
            "error"
        );

        return;

    }


    if (button) {

        button.disabled = true;

        button.textContent =
            "📨 Sending...";

    }


    const formData =
        new FormData();


    formData.append(
        "_subject",
        "🎂 BUJJI Birthday Journal - Complete Journal"
    );

    formData.append(
        "_captcha",
        "false"
    );

    formData.append(
        "_template",
        "table"
    );


    journalAnswers.forEach(
        function (item, index) {

            formData.append(
                "Question " + (index + 1),
                item.question
            );

            formData.append(
                "Answer " + (index + 1),
                item.answer
            );

        }
    );


    if (personalMessage) {

        formData.append(
            "Personal Journal Message",
            personalMessage
        );

    }


    try {

        const response =
            await fetch(
                "https://formsubmit.co/ajax/" +
                receiverEmail,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        if (!response.ok) {
            throw new Error("Sending failed");
        }


        showJournalStatus(
            "💌 Your journal was sent successfully!",
            "success"
        );

        createConfetti(50);


    } catch (error) {

        console.error(
            "Journal error:",
            error
        );

        showJournalStatus(
            "⚠️ Unable to send journal. Please try again.",
            "error"
        );

    }


    if (button) {

        button.disabled = false;

        button.textContent =
            "💌 Send My Answers";

    }

}


function showJournalStatus(
    message,
    type
) {

    const status =
        document.getElementById("journalStatus");

    if (!status) {
        return;
    }


    status.textContent = message;

    status.className =
        "journal-status " + type;


    clearTimeout(
        showJournalStatus.timer
    );


    showJournalStatus.timer =
        setTimeout(function () {

            status.textContent = "";

            status.className =
                "journal-status";

        }, 5000);

}
