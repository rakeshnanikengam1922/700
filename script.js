alert("SCRIPT STARTED ✅");

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();
    initializeCelebration();
    initializeGallery();
    initializeFullscreenGallery();
    initializeSurprise();
    initializePuzzle();
    initializeJournal();

});


/* =====================================================
   NAVIGATION
===================================================== */

function initializeNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

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
   CELEBRATION BUTTON
===================================================== */

function initializeCelebration() {

    const celebrateBtn =
        document.getElementById("celebrateBtn");

    if (!celebrateBtn) {
        return;
    }

    celebrateBtn.addEventListener("click", () => {

        createConfetti(120);

        const cake =
            document.getElementById("cakeEmoji");

        if (cake) {

            cake.classList.add("cake-pop");

            setTimeout(() => {
                cake.classList.remove("cake-pop");
            }, 700);

        }

        celebrateBtn.textContent =
            "🎉 Celebration Started! 🎉";

        setTimeout(() => {

            celebrateBtn.textContent =
                "🎉 Celebrate";

        }, 2000);

    });

}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti(amount = 50) {

    const container =
        document.createElement("div");

    container.className =
        "confetti-container";

    document.body.appendChild(container);


    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("span");

        piece.className =
            "confetti-piece";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.animationDelay =
            Math.random() * 0.5 + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        container.appendChild(piece);

    }


    setTimeout(() => {
        container.remove();
    }, 4000);

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

    const gridViewBtn =
        document.getElementById("gridViewBtn");

    const slideshowViewBtn =
        document.getElementById("slideshowViewBtn");

    const galleryGrid =
        document.getElementById("galleryGrid");

    const gallerySlideshow =
        document.getElementById("gallerySlideshow");


    if (!gridViewBtn || !slideshowViewBtn) {
        return;
    }


    gridViewBtn.addEventListener("click", () => {

        if (galleryGrid) {
            galleryGrid.style.display = "grid";
        }

        if (gallerySlideshow) {
            gallerySlideshow.style.display = "none";
        }

        gridViewBtn.classList.add("active");
        slideshowViewBtn.classList.remove("active");

    });


    slideshowViewBtn.addEventListener("click", () => {

        if (galleryGrid) {
            galleryGrid.style.display = "none";
        }

        if (gallerySlideshow) {
            gallerySlideshow.style.display = "block";
        }

        slideshowViewBtn.classList.add("active");
        gridViewBtn.classList.remove("active");

    });

}


/* =====================================================
   FULLSCREEN GALLERY
===================================================== */

let lightboxIndex = 0;


function initializeFullscreenGallery() {

    const galleryLightbox =
        document.getElementById("galleryLightbox");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");


    if (!galleryLightbox) {
        return;
    }


    document
        .querySelectorAll(".gallery-item")
        .forEach((item, index) => {

            item.addEventListener("click", () => {
                openLightbox(index);
            });

        });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            () => {
                changeLightboxImage(-1);
            }
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            () => {
                changeLightboxImage(1);
            }
        );

    }


    galleryLightbox.addEventListener("click", (e) => {

        if (e.target === galleryLightbox) {
            closeLightbox();
        }

    });


    document.addEventListener("keydown", (e) => {

        if (
            galleryLightbox.getAttribute("aria-hidden") ===
            "true"
        ) {
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

    document.body.style.overflow =
        "hidden";

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
            `./${galleryImages[lightboxIndex]}`;

        image.alt =
            `Memory ${lightboxIndex + 1}`;

    }


    if (caption) {

        caption.textContent =
            galleryCaptions[lightboxIndex];

    }


    if (counter) {

        counter.textContent =
            `${lightboxIndex + 1} / ${galleryImages.length}`;

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

    document.body.style.overflow =
        "";

}


/* =====================================================
   SURPRISE MODAL
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


    if (surpriseBtn && surpriseModal) {

        surpriseBtn.addEventListener("click", () => {

            surpriseModal.classList.add("active");

            surpriseModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

            createConfetti(80);

        });

    }


    if (surpriseClose) {

        surpriseClose.addEventListener(
            "click",
            closeSurprise
        );

    }


    if (surpriseCelebrate) {

        surpriseCelebrate.addEventListener(
            "click",
            () => {

                closeSurprise();

                createConfetti(120);

            }
        );

    }


    if (surpriseModal) {

        surpriseModal.addEventListener("click", (e) => {

            if (e.target === surpriseModal) {
                closeSurprise();
            }

        });

    }

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

    document.body.style.overflow =
        "";

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


let puzzleImage =
    puzzleImages[0];

let puzzleSize = 4;

let puzzleTiles = [];

let emptyIndex = 0;

let moves = 0;

let timerSeconds = 0;

let timerInterval = null;

let puzzleStarted = false;


/* =====================================================
   INITIALIZE PUZZLE
===================================================== */

function initializePuzzle() {

    const puzzleContainer =
        document.getElementById(
            "puzzleContainer"
        );

    const difficulty =
        document.getElementById(
            "difficulty"
        );

    const newGameBtn =
        document.getElementById(
            "newGameBtn"
        );

    const showSolutionBtn =
        document.getElementById(
            "showSolutionBtn"
        );

    const playAgainBtn =
        document.getElementById(
            "playAgainBtn"
        );

    const completionClose =
        document.getElementById(
            "completionClose"
        );


    if (!puzzleContainer) {
        return;
    }


    if (difficulty) {

        puzzleSize =
            parseInt(
                difficulty.value || "4"
            );


        difficulty.addEventListener(
            "change",
            () => {

                puzzleSize =
                    parseInt(
                        difficulty.value || "4"
                    );

                startNewGame();

            }
        );

    }


    if (newGameBtn) {

        newGameBtn.addEventListener(
            "click",
            startNewGame
        );

    }


    if (playAgainBtn) {

        playAgainBtn.addEventListener(
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


    if (completionClose) {

        completionClose.addEventListener(
            "click",
            closeCompletion
        );

    }


    startNewGame();

}


/* =====================================================
   START NEW GAME
===================================================== */

function startNewGame() {

    stopPuzzleTimer();

    moves = 0;

    timerSeconds = 0;

    puzzleStarted = false;


    selectPuzzleImage();

    createPuzzle();

    updatePuzzleStats();

}


/* =====================================================
   SELECT RANDOM IMAGE
===================================================== */

function selectPuzzleImage() {

    if (puzzleImages.length === 0) {
        return;
    }


    if (puzzleImages.length === 1) {

        puzzleImage =
            puzzleImages[0];

        return;

    }


    let newImage;


    do {

        newImage =
            puzzleImages[
                Math.floor(
                    Math.random() *
                    puzzleImages.length
                )
            ];

    } while (
        newImage === puzzleImage
    );


    puzzleImage =
        newImage;

}


/* =====================================================
   CREATE PUZZLE
===================================================== */

function createPuzzle() {

    const puzzleContainer =
        document.getElementById(
            "puzzleContainer"
        );


    if (!puzzleContainer) {
        return;
    }


    const total =
        puzzleSize * puzzleSize;


    puzzleTiles =
        Array.from(
            { length: total },
            (_, index) => index
        );


    puzzleTiles[total - 1] =
        null;


    emptyIndex =
        total - 1;


    /*
       Shuffle using legal moves only.
       Therefore puzzle will always be solvable.
    */

    for (let i = 0; i < 300; i++) {

        const possibleMoves = [];


        for (
            let j = 0;
            j < total;
            j++
        ) {

            if (
                puzzleTiles[j] !== null &&
                isAdjacent(j, emptyIndex)
            ) {

                possibleMoves.push(j);

            }

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
        createPuzzle();
        return;
    }


    renderPuzzle();


    const solutionImage =
        document.getElementById(
            "solutionImage"
        );


    if (solutionImage) {

        solutionImage.src =
            `./${puzzleImage}`;

        solutionImage.alt =
            "Puzzle solution";

    }


    const solutionPreview =
        document.getElementById(
            "solutionPreview"
        );


    if (solutionPreview) {

        solutionPreview.style.display =
            "none";

    }

}


/* =====================================================
   RENDER PUZZLE
===================================================== */

function renderPuzzle() {

    const puzzleContainer =
        document.getElementById(
            "puzzleContainer"
        );


    if (!puzzleContainer) {
        return;
    }


    puzzleContainer.innerHTML =
        "";


    puzzleContainer.style.gridTemplateColumns =
        `repeat(${puzzleSize}, 1fr)`;


    puzzleTiles.forEach(
        (tileValue, index) => {

            const tile =
                document.createElement(
                    "button"
                );


            tile.type =
                "button";


            tile.className =
                "puzzle-tile";


            /*
               EMPTY BOX
            */

            if (tileValue === null) {

                tile.classList.add(
                    "empty"
                );

            }


            /*
               PHOTO TILE
            */

            else {

                const row =
                    Math.floor(
                        tileValue /
                        puzzleSize
                    );


                const col =
                    tileValue %
                    puzzleSize;


                /*
                   IMPORTANT:
                   Image is loaded from the
                   same root folder as index.html.
                */

                tile.style.backgroundImage =
                    `url("./${puzzleImage}")`;


                tile.style.backgroundRepeat =
                    "no-repeat";


                tile.style.backgroundSize =
                    `${puzzleSize * 100}% ${puzzleSize * 100}%`;


                if (puzzleSize > 1) {

                    tile.style.backgroundPosition =
                        `${(col * 100) / (puzzleSize - 1)}% ${(row * 100) / (puzzleSize - 1)}%`;

                }


                tile.setAttribute(
                    "aria-label",
                    `Puzzle piece ${tileValue + 1}`
                );


                tile.addEventListener(
                    "click",
                    () => {

                        movePuzzleTile(index);

                    }
                );

            }


            puzzleContainer.appendChild(
                tile
            );

        }
    );

}


/* =====================================================
   MOVE PUZZLE TILE
===================================================== */

function movePuzzleTile(index) {

    if (
        !isAdjacent(
            index,
            emptyIndex
        )
    ) {

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


/* =====================================================
   CHECK ADJACENT
===================================================== */

function isAdjacent(index1, index2) {

    const row1 =
        Math.floor(
            index1 / puzzleSize
        );


    const col1 =
        index1 %
        puzzleSize;


    const row2 =
        Math.floor(
            index2 / puzzleSize
        );


    const col2 =
        index2 %
        puzzleSize;


    return (
        Math.abs(row1 - row2) +
        Math.abs(col1 - col2)
    ) === 1;

}


/* =====================================================
   CHECK SOLVED
===================================================== */

function isPuzzleSolved() {

    const last =
        puzzleTiles.length - 1;


    for (
        let i = 0;
        i < last;
        i++
    ) {

        if (
            puzzleTiles[i] !== i
        ) {

            return false;

        }

    }


    return (
        puzzleTiles[last] === null
    );

}


/* =====================================================
   PUZZLE TIMER
===================================================== */

function startPuzzleTimer() {

    stopPuzzleTimer();


    timerInterval =
        setInterval(
            () => {

                timerSeconds++;

                updatePuzzleStats();

            },
            1000
        );

}


function stopPuzzleTimer() {

    if (timerInterval) {

        clearInterval(
            timerInterval
        );

        timerInterval =
            null;

    }

}


/* =====================================================
   UPDATE PUZZLE STATS
===================================================== */

function updatePuzzleStats() {

    const timer =
        document.getElementById(
            "timer"
        );


    const movesDisplay =
        document.getElementById(
            "moves"
        );


    if (movesDisplay) {

        movesDisplay.textContent =
            moves;

    }


    if (timer) {

        const minutes =
            Math.floor(
                timerSeconds / 60
            );


        const seconds =
            timerSeconds % 60;


        timer.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    }

}


/* =====================================================
   SHOW SOLUTION
===================================================== */

function showSolution() {

    const solutionPreview =
        document.getElementById(
            "solutionPreview"
        );


    if (!solutionPreview) {
        return;
    }


    if (
        solutionPreview.style.display ===
        "block"
    ) {

        solutionPreview.style.display =
            "none";

    } else {

        solutionPreview.style.display =
            "block";

    }

}


/* =====================================================
   PUZZLE COMPLETION
===================================================== */

function showPuzzleCompletion() {

    createConfetti(100);


    const completionModal =
        document.getElementById(
            "completionModal"
        );


    if (completionModal) {

        completionModal.classList.add(
            "active"
        );


        completionModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }

}


function closeCompletion() {

    const completionModal =
        document.getElementById(
            "completionModal"
        );


    if (!completionModal) {
        return;
    }


    completionModal.classList.remove(
        "active"
    );


    completionModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =====================================================
   BIRTHDAY JOURNAL
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


/* =====================================================
   INITIALIZE JOURNAL
===================================================== */

function initializeJournal() {

    const nextQuestionBtn =
        document.getElementById(
            "nextQuestionBtn"
        );


    const addAnswerBtn =
        document.getElementById(
            "addAnswerBtn"
        );


    const sendJournalBtn =
        document.getElementById(
            "sendJournalBtn"
        );


    if (
        !nextQuestionBtn ||
        !addAnswerBtn ||
        !sendJournalBtn
    ) {

        return;

    }


    showRandomQuestion();


    nextQuestionBtn.addEventListener(
        "click",
        showRandomQuestion
    );


    addAnswerBtn.addEventListener(
        "click",
        addCurrentAnswer
    );


    sendJournalBtn.addEventListener(
        "click",
        sendJournalAnswers
    );

}


/* =====================================================
   RANDOM QUESTION
===================================================== */

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
        document.getElementById(
            "questionText"
        );


    const questionNumber =
        document.getElementById(
            "questionNumber"
        );


    const answerBox =
        document.getElementById(
            "questionAnswer"
        );


    if (questionText) {

        questionText.textContent =
            journalQuestions[
                currentQuestionIndex
            ];

    }


    if (questionNumber) {

        questionNumber.textContent =
            `Question ${currentQuestionIndex + 1}`;

    }


    if (answerBox) {

        answerBox.value =
            "";

        answerBox.focus();

    }

}


/* =====================================================
   ADD CURRENT ANSWER
===================================================== */

async function addCurrentAnswer() {

    const answerBox =
        document.getElementById(
            "questionAnswer"
        );


    const addButton =
        document.getElementById(
            "addAnswerBtn"
        );


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
        journalQuestions[
            currentQuestionIndex
        ];


    if (addButton) {

        addButton.disabled =
            true;

        addButton.textContent =
            "📨 Sending...";

    }


    showJournalStatus(
        "📨 Sending your answer...",
        "success"
    );


    const sent =
        await sendSingleJournalAnswer(
            question,
            answer
        );


    if (sent) {

        journalAnswers.push({

            question:
                question,

            answer:
                answer

        });


        renderJournalAnswers();


        answerBox.value =
            "";


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


    if (addButton) {

        addButton.disabled =
            false;

        addButton.textContent =
            "➕ Add This Answer";

    }

}


/* =====================================================
   RENDER JOURNAL ANSWERS
===================================================== */

function renderJournalAnswers() {

    const answerList =
        document.getElementById(
            "answerList"
        );


    if (!answerList) {
        return;
    }


    answerList.innerHTML =
        "";


    if (
        journalAnswers.length === 0
    ) {

        const empty =
            document.createElement(
                "p"
            );


        empty.className =
            "empty-answer";


        empty.textContent =
            "Your answers will appear here...";


        answerList.appendChild(
            empty
        );


        return;

    }


    journalAnswers.forEach(
        (item, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "answer-card";


            const question =
                document.createElement(
                    "div"
                );


            question.className =
                "answer-question";


            question.textContent =
                item.question;


            const answer =
                document.createElement(
                    "div"
                );


            answer.className =
                "answer-value";


            answer.textContent =
                item.answer;


            const removeButton =
                document.createElement(
                    "button"
                );


            removeButton.type =
                "button";


            removeButton.className =
                "remove-answer";


            removeButton.textContent =
                "✕ Remove";


            removeButton.addEventListener(
                "click",
                () => {

                    journalAnswers.splice(
                        index,
                        1
                    );

                    renderJournalAnswers();

                }
            );


            card.appendChild(
                question
            );


            card.appendChild(
                answer
            );


            card.appendChild(
                removeButton
            );


            answerList.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   SEND SINGLE ANSWER
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
                `https://formsubmit.co/ajax/${receiverEmail}`,
                {
                    method: "POST",

                    body: formData,

                    headers: {
                        "Accept":
                            "application/json"
                    }

                }
            );


        if (!response.ok) {

            throw new Error(
                "Email sending failed"
            );

        }


        return true;


    } catch (error) {

        console.error(
            "Email sending error:",
            error
        );


        return false;

    }

}


/* =====================================================
   SEND COMPLETE JOURNAL
===================================================== */

async function sendJournalAnswers() {

    const sendButton =
        document.getElementById(
            "sendJournalBtn"
        );


    const journalMessage =
        document.getElementById(
            "journalMessage"
        );


    const receiverEmail =
        "rakeshnanikengam1922@gmail.com";


    const personalMessage =
        journalMessage
            ? journalMessage.value.trim()
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


    if (sendButton) {

        sendButton.disabled =
            true;

        sendButton.textContent =
            "📨 Sending...";

    }


    showJournalStatus(
        "📨 Sending your journal...",
        "success"
    );


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
        (item, index) => {

            formData.append(
                `Question ${index + 1}`,
                item.question
            );


            formData.append(
                `Answer ${index + 1}`,
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
                `https://formsubmit.co/ajax/${receiverEmail}`,
                {
                    method: "POST",

                    body: formData,

                    headers: {
                        "Accept":
                            "application/json"
                    }

                }
            );


        if (!response.ok) {

            throw new Error(
                "Journal sending failed"
            );

        }


        showJournalStatus(
            "💌 Your journal was sent successfully!",
            "success"
        );


        createConfetti(50);


    } catch (error) {

        console.error(
            "Journal send error:",
            error
        );


        showJournalStatus(
            "⚠️ Unable to send journal. Please try again.",
            "error"
        );

    }


    if (sendButton) {

        sendButton.disabled =
            false;

        sendButton.textContent =
            "💌 Send My Answers";

    }

}


/* =====================================================
   JOURNAL STATUS
===================================================== */

function showJournalStatus(
    message,
    type = "success"
) {

    const status =
        document.getElementById(
            "journalStatus"
        );


    if (!status) {
        return;
    }


    status.textContent =
        message;


    status.className =
        `journal-status ${type}`;


    clearTimeout(
        showJournalStatus.timer
    );


    showJournalStatus.timer =
        setTimeout(() => {

            status.textContent =
                "";

            status.className =
                "journal-status";

        }, 5000);

}
