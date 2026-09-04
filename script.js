/* =====================================================
   BIRTHDAY WEBSITE - SCRIPT.JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVIGATION
    ===================================================== */

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item =>
                item.classList.remove("active")
            );

            link.classList.add("active");

        });

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const galleryLightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCaption =
        document.getElementById("lightboxCaption");

    const closeLightbox =
        document.getElementById("closeLightbox");

    const galleryCaptions = [

        "A beautiful birthday memory ✨",

        "A special moment to remember 💖",

        "Sweet memories 🥰",

        "A precious moment 🌸",

        "An amazing memory 💫",

        "A fun memory 📸",

        "A memory to keep forever ❤️"

    ];


    galleryItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            const image =
                item.querySelector("img");

            if (!image || !galleryLightbox) return;

            lightboxImage.src = image.src;

            lightboxCaption.textContent =
                galleryCaptions[index] ||
                "A beautiful birthday memory ✨";

            galleryLightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    function closeGallery() {

        if (!galleryLightbox) return;

        galleryLightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closeGallery
        );

    }


    if (galleryLightbox) {

        galleryLightbox.addEventListener(
            "click",
            (e) => {

                if (e.target === galleryLightbox) {

                    closeGallery();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        (e) => {

            if (e.key === "Escape") {

                closeGallery();

            }

        }
    );


    /* =====================================================
       SURPRISE MODAL
    ===================================================== */

    const surpriseBtn =
        document.getElementById("surpriseBtn");

    const surpriseModal =
        document.getElementById("surpriseModal");

    const closeSurprise =
        document.getElementById("closeSurprise");


    if (surpriseBtn && surpriseModal) {

        surpriseBtn.addEventListener(
            "click",
            () => {

                surpriseModal.classList.add(
                    "active"
                );

                document.body.style.overflow =
                    "hidden";

                createConfetti(80);

            }
        );

    }


    if (closeSurprise) {

        closeSurprise.addEventListener(
            "click",
            () => {

                surpriseModal.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }
        );

    }


    if (surpriseModal) {

        surpriseModal.addEventListener(
            "click",
            (e) => {

                if (e.target === surpriseModal) {

                    surpriseModal.classList.remove(
                        "active"
                    );

                    document.body.style.overflow =
                        "";

                }

            }
        );

    }


    /* =====================================================
       CAKE ANIMATION
    ===================================================== */

    const cake =
        document.querySelector(".birthday-cake");

    if (cake) {

        cake.addEventListener("click", () => {

            cake.classList.add("cake-pop");

            createConfetti(35);

            setTimeout(() => {

                cake.classList.remove(
                    "cake-pop"
                );

            }, 700);

        });

    }


    /* =====================================================
       CONFETTI
    ===================================================== */

    window.createConfetti = function (amount = 40) {

        const confettiContainer =
            document.createElement("div");

        confettiContainer.className =
            "confetti-container";

        document.body.appendChild(
            confettiContainer
        );


        for (let i = 0; i < amount; i++) {

            const confetti =
                document.createElement("span");

            confetti.className =
                "confetti-piece";

            confetti.style.left =
                Math.random() * 100 + "%";

            confetti.style.animationDelay =
                Math.random() * 0.5 + "s";

            confetti.style.transform =
                `rotate(${Math.random() * 360}deg)`;

            confettiContainer.appendChild(
                confetti
            );

        }


        setTimeout(() => {

            confettiContainer.remove();

        }, 3500);

    };


    /* =====================================================
       PUZZLE GAME
    ===================================================== */

    const puzzleBoard =
        document.getElementById("puzzleBoard");

    const difficultySelect =
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

    const solutionPreview =
        document.getElementById(
            "solutionPreview"
        );

    const solutionImage =
        document.getElementById(
            "solutionImage"
        );

    const movesDisplay =
        document.getElementById(
            "moves"
        );

    const timerDisplay =
        document.getElementById(
            "timer"
        );


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

    let puzzleSize = 3;

    let puzzleTiles = [];

    let emptyIndex = 0;

    let moves = 0;

    let seconds = 0;

    let timerInterval = null;

    let puzzleStarted = false;


    function selectNewPuzzleImage() {

        if (puzzleImages.length <= 1) {

            puzzleImage =
                puzzleImages[0];

            return;

        }


        const oldImage =
            puzzleImage;

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
            newImage === oldImage
        );


        puzzleImage =
            newImage;

    }


    function updatePuzzleInfo() {

        if (movesDisplay) {

            movesDisplay.textContent =
                moves;

        }


        if (timerDisplay) {

            const minutes =
                Math.floor(seconds / 60);

            const secs =
                seconds % 60;

            timerDisplay.textContent =
                `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

        }

    }


    function startTimer() {

        stopTimer();

        seconds = 0;

        updatePuzzleInfo();


        timerInterval =
            setInterval(() => {

                seconds++;

                updatePuzzleInfo();

            }, 1000);

    }


    function stopTimer() {

        if (timerInterval) {

            clearInterval(
                timerInterval
            );

            timerInterval = null;

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


    function isSolved() {

        for (
            let i = 0;
            i < puzzleTiles.length - 1;
            i++
        ) {

            if (
                puzzleTiles[i] !== i
            ) {

                return false;

            }

        }


        return (
            puzzleTiles[
                puzzleTiles.length - 1
            ] === null
        );

    }


    function shufflePuzzle() {

        puzzleTiles =
            Array.from(
                {
                    length:
                        puzzleSize *
                        puzzleSize
                },
                (_, i) => i
            );


        puzzleTiles[
            puzzleTiles.length - 1
        ] = null;


        emptyIndex =
            puzzleTiles.length - 1;


        for (
            let i = 0;
            i < 250;
            i++
        ) {

            const possibleMoves = [];


            for (
                let j = 0;
                j < puzzleTiles.length;
                j++
            ) {

                if (
                    puzzleTiles[j] !== null &&
                    isAdjacent(
                        j,
                        emptyIndex
                    )
                ) {

                    possibleMoves.push(j);

                }

            }


            const randomMove =
                possibleMoves[
                    Math.floor(
                        Math.random() *
                        possibleMoves.length
                    )
                ];


            puzzleTiles[
                emptyIndex
            ] =
                puzzleTiles[
                    randomMove
                ];

            puzzleTiles[
                randomMove
            ] = null;


            emptyIndex =
                randomMove;

        }


        if (isSolved()) {

            shufflePuzzle();

        }

    }


    function renderPuzzle() {

        if (!puzzleBoard) return;

        puzzleBoard.innerHTML = "";


        const totalTiles =
            puzzleSize *
            puzzleSize;


        puzzleBoard.style.gridTemplateColumns =
            `repeat(${puzzleSize}, 1fr)`;


        for (
            let i = 0;
            i < totalTiles;
            i++
        ) {

            const tileValue =
                puzzleTiles[i];


            const tile =
                document.createElement("button");


            tile.type = "button";

            tile.className =
                "puzzle-tile";


            if (tileValue === null) {

                tile.classList.add(
                    "empty"
                );

            } else {

                const row =
                    Math.floor(
                        tileValue /
                        puzzleSize
                    );

                const col =
                    tileValue %
                    puzzleSize;


                tile.style.backgroundImage =
                    `url("${puzzleImage}")`;


                tile.style.backgroundSize =
                    `${puzzleSize * 100}% ${puzzleSize * 100}%`;


                tile.style.backgroundPosition =
                    `${(col * 100) / (puzzleSize - 1)}% ${(
                        row * 100
                    ) / (puzzleSize - 1)}%`;


                tile.addEventListener(
                    "click",
                    () => {

                        moveTile(i);

                    }
                );

            }


            puzzleBoard.appendChild(
                tile
            );

        }

    }


    function moveTile(index) {

        if (
            !isAdjacent(
                index,
                emptyIndex
            )
        ) {

            return;

        }


        puzzleTiles[
            emptyIndex
        ] =
            puzzleTiles[index];


        puzzleTiles[index] =
            null;


        emptyIndex =
            index;


        moves++;

        puzzleStarted = true;

        updatePuzzleInfo();

        renderPuzzle();


        if (isSolved()) {

            puzzleCompleted();

        }

    }


    function puzzleCompleted() {

        stopTimer();

        createConfetti(70);

        setTimeout(() => {

            alert(
                `🎉 Puzzle Completed!\n\nMoves: ${moves}\nTime: ${formatTime(seconds)}`
            );

        }, 200);

    }


    function formatTime(totalSeconds) {

        const minutes =
            Math.floor(
                totalSeconds / 60
            );

        const secs =
            totalSeconds % 60;


        return `${minutes}m ${secs}s`;

    }


    function createPuzzle() {

        if (!puzzleBoard) return;


        puzzleSize =
            parseInt(
                difficultySelect?.value ||
                "3"
            );


        moves = 0;

        seconds = 0;

        puzzleStarted = false;


        shufflePuzzle();

        renderPuzzle();

        updatePuzzleInfo();

        startTimer();


        if (solutionPreview) {

            solutionPreview.style.display =
                "none";

        }


        if (solutionImage) {

            solutionImage.src =
                puzzleImage;

        }

    }


    function startNewGame() {

        selectNewPuzzleImage();

        createPuzzle();

        createConfetti(20);

    }


    if (difficultySelect) {

        difficultySelect.addEventListener(
            "change",
            createPuzzle
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
            () => {

                if (!solutionPreview) return;


                solutionPreview.style.display =
                    solutionPreview.style.display ===
                    "none"
                        ? "block"
                        : "none";


                if (solutionImage) {

                    solutionImage.src =
                        puzzleImage;

                }

            }
        );

    }


    if (puzzleBoard) {

        createPuzzle();

    }


    /* =====================================================
       BIRTHDAY QUIZ
    ===================================================== */

    const quizQuestions = [

        {
            question:
                "What is the best birthday vibe? 🎂",

            options: [
                "Party 🎉",
                "Chill & Relax 😌",
                "Travel ✈️",
                "Food & Fun 🍕"
            ]
        },

        {
            question:
                "Pick your perfect birthday activity ✨",

            options: [
                "Movie Night 🎬",
                "Shopping 🛍️",
                "Trip 🌍",
                "Game Night 🎮"
            ]
        },

        {
            question:
                "Choose your birthday cake 🍰",

            options: [
                "Chocolate 🍫",
                "Vanilla 🤍",
                "Red Velvet ❤️",
                "Butterscotch 💛"
            ]
        },

        {
            question:
                "Which birthday gift sounds best? 🎁",

            options: [
                "Something Useful 🎀",
                "Something Cute 🥰",
                "A Surprise 🎉",
                "A Memory ❤️"
            ]
        }

    ];


    let quizIndex = 0;

    let quizScore = 0;


    const quizQuestion =
        document.getElementById(
            "quizQuestion"
        );

    const quizOptions =
        document.getElementById(
            "quizOptions"
        );

    const nextQuizBtn =
        document.getElementById(
            "nextQuizBtn"
        );

    const quizResult =
        document.getElementById(
            "quizResult"
        );


    function renderQuiz() {

        if (
            !quizQuestion ||
            !quizOptions
        ) {

            return;

        }


        const current =
            quizQuestions[
                quizIndex
            ];


        quizQuestion.textContent =
            current.question;


        quizOptions.innerHTML = "";


        current.options.forEach(
            (option) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type = "button";

                button.className =
                    "quiz-option";

                button.textContent =
                    option;


                button.addEventListener(
                    "click",
                    () => {

                        quizScore++;

                        document
                            .querySelectorAll(
                                ".quiz-option"
                            )
                            .forEach(
                                item => {

                                    item.disabled =
                                        true;

                                    item.classList.add(
                                        "selected"
                                    );

                                }
                            );

                    }
                );


                quizOptions.appendChild(
                    button
                );

            }
        );

    }


    if (nextQuizBtn) {

        nextQuizBtn.addEventListener(
            "click",
            () => {

                if (
                    quizIndex <
                    quizQuestions.length - 1
                ) {

                    quizIndex++;

                    renderQuiz();

                } else {

                    if (quizResult) {

                        quizResult.textContent =
                            "🎉 Quiz Complete! Hope you had fun 💖";

                    }

                    createConfetti(35);

                    quizIndex = 0;

                    quizScore = 0;

                    setTimeout(
                        renderQuiz,
                        1200
                    );

                }

            }
        );

    }


    if (quizQuestion) {

        renderQuiz();

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


    const questionNumber =
        document.getElementById(
            "questionNumber"
        );

    const questionText =
        document.getElementById(
            "questionText"
        );

    const questionAnswer =
        document.getElementById(
            "questionAnswer"
        );

    const nextQuestionBtn =
        document.getElementById(
            "nextQuestionBtn"
        );

    const addAnswerBtn =
        document.getElementById(
            "addAnswerBtn"
        );

    const answerList =
        document.getElementById(
            "answerList"
        );

    const journalMessage =
        document.getElementById(
            "journalMessage"
        );

    const sendJournalBtn =
        document.getElementById(
            "sendJournalBtn"
        );

    const journalStatus =
        document.getElementById(
            "journalStatus"
        );


    function showJournalStatus(
        message,
        type = "success"
    ) {

        if (!journalStatus) return;


        journalStatus.textContent =
            message;


        journalStatus.className =
            "journal-status " + type;


        setTimeout(() => {

            if (journalStatus) {

                journalStatus.textContent =
                    "";

            }

        }, 4000);

    }


    function showRandomQuestion() {

        if (!questionText) return;


        let newIndex;


        if (
            journalQuestions.length <= 1
        ) {

            newIndex = 0;

        } else {

            do {

                newIndex =
                    Math.floor(
                        Math.random() *
                        journalQuestions.length
                    );

            } while (
                newIndex ===
                currentQuestionIndex
            );

        }


        currentQuestionIndex =
            newIndex;


        questionText.textContent =
            journalQuestions[
                currentQuestionIndex
            ];


        if (questionNumber) {

            questionNumber.textContent =
                `Question ${currentQuestionIndex + 1}`;

        }


        if (questionAnswer) {

            questionAnswer.value = "";

        }

    }


    function renderJournalAnswers() {

        if (!answerList) return;


        if (
            journalAnswers.length === 0
        ) {

            answerList.innerHTML =
                `<p class="empty-answer">Your answers will appear here...</p>`;

            return;

        }


        answerList.innerHTML = "";


        journalAnswers.forEach(
            (item, index) => {

                const answerItem =
                    document.createElement(
                        "div"
                    );


                answerItem.className =
                    "answer-item";


                answerItem.innerHTML = `

                    <div class="answer-number">
                        ${index + 1}
                    </div>

                    <div class="answer-content">

                        <div class="answer-question">
                            ${escapeHtml(item.question)}
                        </div>

                        <div class="answer-text">
                            ${escapeHtml(item.answer)}
                        </div>

                    </div>

                `;


                answerList.appendChild(
                    answerItem
                );

            }
        );

    }


    function escapeHtml(text) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent =
            text;

        return div.innerHTML;

    }


    /* =====================================================
       AUTO SEND EACH ANSWER TO EMAIL
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
                    "Unable to send answer"
                );

            }


            console.log(
                "Journal answer sent successfully"
            );


            return true;

        } catch (error) {

            console.error(
                "Auto send error:",
                error
            );


            return false;

        }

    }


    /* =====================================================
       ADD ANSWER
    ===================================================== */

    async function addCurrentAnswer() {

        if (!questionAnswer) return;


        const answer =
            questionAnswer.value.trim();


        if (!answer) {

            showJournalStatus(
                "Please write an answer first ✍️",
                "error"
            );


            questionAnswer.focus();

            return;

        }


        const question =
            journalQuestions[
                currentQuestionIndex
            ];


        journalAnswers.push({

            question:
                question,

            answer:
                answer

        });


        renderJournalAnswers();


        questionAnswer.value = "";


        /* SEND EMAIL IMMEDIATELY */

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

            showJournalStatus(
                "💖 Answer added and sent!",
                "success"
            );

        } else {

            showJournalStatus(
                "⚠️ Answer saved, but email sending failed.",
                "error"
            );

        }


        createConfetti(20);


        showRandomQuestion();

    }


    if (addAnswerBtn) {

        addAnswerBtn.addEventListener(
            "click",
            addCurrentAnswer
        );

    }


    if (nextQuestionBtn) {

        nextQuestionBtn.addEventListener(
            "click",
            showRandomQuestion
        );

    }


    /* =====================================================
       SEND FINAL JOURNAL MESSAGE
    ===================================================== */

    async function sendJournalAnswers() {

        const receiverEmail =
            "rakeshnanikengam1922@gmail.com";


        if (
            journalAnswers.length === 0 &&
            (!journalMessage ||
                !journalMessage.value.trim())
        ) {

            showJournalStatus(
                "Please add at least one answer ✍️",
                "error"
            );

            return;

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


        if (
            journalMessage &&
            journalMessage.value.trim()
        ) {

            formData.append(
                "Personal Journal Message",
                journalMessage.value.trim()
            );

        }


        try {

            showJournalStatus(
                "📨 Sending your journal...",
                "success"
            );


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

    }


    if (sendJournalBtn) {

        sendJournalBtn.addEventListener(
            "click",
            sendJournalAnswers
        );

    }


    /* =====================================================
       INITIAL JOURNAL QUESTION
    ===================================================== */

    if (questionText) {

        showRandomQuestion();

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .feature-card, .gallery-item, .journal-card"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       PAGE LOAD CONFETTI
    ===================================================== */

    setTimeout(() => {

        createConfetti(25);

    }, 1000);


});
