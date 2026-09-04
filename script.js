/* =====================================================
   BIRTHDAY WEBSITE - COMPLETE SCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Birthday website script loaded successfully");


    /* =====================================================
       GENERAL HELPERS
    ===================================================== */

    function get(id) {
        return document.getElementById(id);
    }


    /* =====================================================
       CELEBRATION / CONFETTI
    ===================================================== */

    function createConfetti(count = 120) {

        const emojis = [
            "🎉",
            "🎂",
            "🥳",
            "❤️",
            "✨",
            "🎈",
            "💖",
            "🌸",
            "⭐",
            "🎁"
        ];

        for (let i = 0; i < count; i++) {

            const confetti = document.createElement("div");

            confetti.textContent =
                emojis[
                    Math.floor(
                        Math.random() * emojis.length
                    )
                ];

            confetti.style.position = "fixed";

            confetti.style.left =
                Math.random() * 100 + "vw";

            confetti.style.top =
                (-10 - Math.random() * 80) + "vh";

            confetti.style.fontSize =
                (18 + Math.random() * 22) + "px";

            confetti.style.zIndex =
                "99999";

            confetti.style.pointerEvents =
                "none";

            confetti.style.opacity =
                "1";

            confetti.style.willChange =
                "transform, opacity";

            document.body.appendChild(confetti);

            const fallDistance =
                window.innerHeight + 150;

            const rotation =
                (Math.random() - 0.5) * 720;

            const duration =
                2200 + Math.random() * 1800;

            const startTime =
                performance.now();

            const driftAmount =
                20 + Math.random() * 40;

            const driftSpeed =
                2 + Math.random() * 3;

            function animateConfetti(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );

                const y =
                    fallDistance * progress;

                const rotate =
                    rotation * progress;

                const drift =
                    Math.sin(
                        progress *
                        Math.PI *
                        driftSpeed
                    ) *
                    driftAmount;

                confetti.style.transform =
                    "translate(" +
                    drift +
                    "px, " +
                    y +
                    "px) rotate(" +
                    rotate +
                    "deg)";

                if (progress > 0.75) {

                    confetti.style.opacity =
                        String(
                            1 -
                            (
                                (progress - 0.75) /
                                0.25
                            )
                        );

                }

                if (progress < 1) {

                    requestAnimationFrame(
                        animateConfetti
                    );

                } else {

                    confetti.remove();

                }

            }

            requestAnimationFrame(
                animateConfetti
            );
        }
    }


    window.createConfetti =
        createConfetti;


    /* =====================================================
       CELEBRATE BUTTON
    ===================================================== */

    const celebrateBtn =
        get("celebrateBtn");

    if (celebrateBtn) {

        celebrateBtn.addEventListener(
            "click",
            function () {

                createConfetti(120);

                const cake =
                    document.querySelector(
                        ".birthday-cake"
                    );

                if (cake) {

                    cake.classList.remove(
                        "cake-pop"
                    );

                    void cake.offsetWidth;

                    cake.classList.add(
                        "cake-pop"
                    );

                }

            }
        );

    }


    /* =====================================================
       GALLERY
    ===================================================== */

    const galleryCaptions = [

        "A beautiful birthday memory ✨",

        "A special moment to remember 💖",

        "Sweet memories 🥰",

        "A precious moment 🌸",

        "An amazing memory 💫",

        "A fun memory 📸",

        "A memory to keep forever ❤️"

    ];


    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );

    const galleryLightbox =
        get("galleryLightbox");

    const lightboxImage =
        get("lightboxImage");

    const lightboxCaption =
        get("lightboxCaption");

    const lightboxClose =
        get("lightboxClose");

    const lightboxPrev =
        get("lightboxPrev");

    const lightboxNext =
        get("lightboxNext");

    let currentGalleryIndex = 0;


    function openLightbox(index) {

        if (!galleryItems.length) {
            return;
        }

        currentGalleryIndex =
            index;

        const item =
            galleryItems[
                currentGalleryIndex
            ];

        const image =
            item.querySelector("img");

        if (!image) {
            return;
        }

        if (lightboxImage) {

            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt ||
                "Birthday memory";

        }

        if (lightboxCaption) {

            lightboxCaption.textContent =
                galleryCaptions[
                    currentGalleryIndex
                ] ||
                "A beautiful memory ✨";

        }

        if (galleryLightbox) {

            galleryLightbox.classList.add(
                "active"
            );

            galleryLightbox.setAttribute(
                "aria-hidden",
                "false"
            );

        }

    }


    function closeLightbox() {

        if (!galleryLightbox) {
            return;
        }

        galleryLightbox.classList.remove(
            "active"
        );

        galleryLightbox.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    function showPreviousGalleryImage() {

        if (!galleryItems.length) {
            return;
        }

        currentGalleryIndex--;

        if (currentGalleryIndex < 0) {

            currentGalleryIndex =
                galleryItems.length - 1;

        }

        openLightbox(
            currentGalleryIndex
        );

    }


    function showNextGalleryImage() {

        if (!galleryItems.length) {
            return;
        }

        currentGalleryIndex++;

        if (
            currentGalleryIndex >=
            galleryItems.length
        ) {

            currentGalleryIndex = 0;

        }

        openLightbox(
            currentGalleryIndex
        );

    }


    galleryItems.forEach(
        function (item, index) {

            item.addEventListener(
                "click",
                function () {

                    openLightbox(index);

                }
            );

        }
    );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            showPreviousGalleryImage
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            showNextGalleryImage
        );

    }


    if (galleryLightbox) {

        galleryLightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    galleryLightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !galleryLightbox ||
                !galleryLightbox.classList.contains(
                    "active"
                )
            ) {

                return;

            }

            if (event.key === "Escape") {

                closeLightbox();

            }

            if (event.key === "ArrowLeft") {

                showPreviousGalleryImage();

            }

            if (event.key === "ArrowRight") {

                showNextGalleryImage();

            }

        }
    );


    /* =====================================================
       GALLERY SLIDESHOW
    ===================================================== */

    const slideshow =
        document.querySelector(
            ".gallery-slideshow"
        );


    if (slideshow) {

        const slides =
            slideshow.querySelectorAll(
                "img"
            );

        const prev =
            slideshow.querySelector(
                ".prev"
            );

        const next =
            slideshow.querySelector(
                ".next"
            );

        const indicators =
            slideshow.querySelector(
                ".slide-indicators"
            );

        let slideIndex = 0;


        function showSlide(index) {

            if (!slides.length) {
                return;
            }

            slideIndex = index;

            if (slideIndex < 0) {

                slideIndex =
                    slides.length - 1;

            }

            if (
                slideIndex >=
                slides.length
            ) {

                slideIndex = 0;

            }

            slides.forEach(
                function (slide, i) {

                    slide.style.display =
                        i === slideIndex
                            ? "block"
                            : "none";

                }
            );


            if (indicators) {

                const dots =
                    indicators.querySelectorAll(
                        "button"
                    );

                dots.forEach(
                    function (dot, i) {

                        dot.classList.toggle(
                            "active",
                            i === slideIndex
                        );

                    }
                );

            }

        }


        if (prev) {

            prev.addEventListener(
                "click",
                function () {

                    showSlide(
                        slideIndex - 1
                    );

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                function () {

                    showSlide(
                        slideIndex + 1
                    );

                }
            );

        }


        if (indicators) {

            indicators.innerHTML = "";

            slides.forEach(
                function (_, index) {

                    const dot =
                        document.createElement(
                            "button"
                        );

                    dot.type =
                        "button";

                    dot.setAttribute(
                        "aria-label",
                        "Show image " +
                        (index + 1)
                    );

                    dot.addEventListener(
                        "click",
                        function () {

                            showSlide(index);

                        }
                    );

                    indicators.appendChild(
                        dot
                    );

                }
            );

        }


        showSlide(0);


        slides.forEach(
            function (slide, index) {

                slide.style.cursor =
                    "pointer";

                slide.addEventListener(
                    "click",
                    function () {

                        if (lightboxImage) {

                            lightboxImage.src =
                                slide.src;

                            lightboxImage.alt =
                                slide.alt ||
                                "Birthday memory";

                        }

                        if (lightboxCaption) {

                            lightboxCaption.textContent =
                                galleryCaptions[index] ||
                                "A beautiful memory ✨";

                        }

                        if (galleryLightbox) {

                            galleryLightbox.classList.add(
                                "active"
                            );

                            galleryLightbox.setAttribute(
                                "aria-hidden",
                                "false"
                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       SURPRISE MODAL
    ===================================================== */

    const surpriseBtn =
        get("surpriseBtn");

    const surpriseModal =
        get("surpriseModal");

    const surpriseClose =
        get("surpriseClose");


    if (surpriseBtn) {

        surpriseBtn.addEventListener(
            "click",
            function () {

                if (surpriseModal) {

                    surpriseModal.classList.add(
                        "active"
                    );

                    surpriseModal.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                }

                createConfetti(80);

            }
        );

    }


    if (surpriseClose) {

        surpriseClose.addEventListener(
            "click",
            function () {

                if (surpriseModal) {

                    surpriseModal.classList.remove(
                        "active"
                    );

                    surpriseModal.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            }
        );

    }


    if (surpriseModal) {

        surpriseModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    surpriseModal
                ) {

                    surpriseModal.classList.remove(
                        "active"
                    );

                    surpriseModal.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            }
        );

    }


    /* =====================================================
       PUZZLE — 3 × 3 IMAGE TILE SWAP
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


    const puzzleSize = 3;

    const totalPuzzleTiles =
        puzzleSize * puzzleSize;


    let puzzleImage =
        puzzleImages[0];

    /*
       Example:

       [ 0 ][ 1 ][ 2 ]
       [ 3 ][ 4 ][ 5 ]
       [ 6 ][ 7 ][ 8 ]

       puzzleTiles contains the
       current positions.

       No empty tile.
    */

    let puzzleTiles = [];

    let selectedTileIndex = null;

    let moves = 0;

    let timerSeconds = 0;

    let timerInterval = null;

    let puzzleStarted = false;


    function initializePuzzle() {

        const container =
            get("puzzleContainer");

        const newGame =
            get("newGameBtn");

        const solution =
            get("showSolutionBtn");

        const playAgain =
            get("playAgainBtn");

        const completionClose =
            get("completionClose");


        if (!container) {

            console.error(
                "Puzzle container NOT FOUND"
            );

            return;

        }


        console.log(
            "Puzzle initialized — 3x3 tile swap"
        );


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


    /* =====================================================
       START NEW PUZZLE
    ===================================================== */

    function startNewGame() {

        stopPuzzleTimer();


        moves = 0;

        timerSeconds = 0;

        puzzleStarted = false;

        selectedTileIndex = null;


        selectPuzzleImage();


        createPuzzle();


        updatePuzzleStats();

    }


    /* =====================================================
       SELECT RANDOM IMAGE
    ===================================================== */

    function selectPuzzleImage() {

        if (!puzzleImages.length) {
            return;
        }


        if (puzzleImages.length === 1) {

            puzzleImage =
                puzzleImages[0];

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


        puzzleImage =
            selected;

    }


    /* =====================================================
       CREATE RANDOM 3 × 3 PUZZLE
    ===================================================== */

    function createPuzzle() {

        const container =
            get("puzzleContainer");

        if (!container) {
            return;
        }


        /*
           Start with:

           0 1 2
           3 4 5
           6 7 8
        */

        puzzleTiles =
            Array.from(
                {
                    length:
                        totalPuzzleTiles
                },
                function (_, index) {

                    return index;

                }
            );


        /*
           Fisher-Yates shuffle
           Randomly mixes all 9 tiles.
        */

        do {

            for (
                let i =
                    puzzleTiles.length - 1;
                i > 0;
                i--
            ) {

                const randomIndex =
                    Math.floor(
                        Math.random() *
                        (i + 1)
                    );


                const temp =
                    puzzleTiles[i];


                puzzleTiles[i] =
                    puzzleTiles[randomIndex];


                puzzleTiles[randomIndex] =
                    temp;

            }

        } while (
            isPuzzleSolved()
        );


        selectedTileIndex = null;


        renderPuzzle();


        /*
           Solution image
        */

        const solutionImage =
            get("solutionImage");


        if (solutionImage) {

            solutionImage.src =
                "./" + puzzleImage;

            solutionImage.alt =
                "Puzzle solution";

        }


        const preview =
            get("solutionPreview");


        if (preview) {

            preview.style.display =
                "none";

        }

    }


    /* =====================================================
       RENDER 9 IMAGE TILES
    ===================================================== */

    function renderPuzzle() {

        const container =
            get("puzzleContainer");

        if (!container) {
            return;
        }


        container.innerHTML =
            "";


        container.style.gridTemplateColumns =
            "repeat(3, 1fr)";


        puzzleTiles.forEach(
            function (
                tileValue,
                index
            ) {

                const tile =
                    document.createElement(
                        "button"
                    );


                tile.type =
                    "button";


                tile.className =
                    "puzzle-tile";


                /*
                   Find which part of original
                   image this tile belongs to.
                */

                const row =
                    Math.floor(
                        tileValue /
                        puzzleSize
                    );


                const col =
                    tileValue %
                    puzzleSize;


                /*
                   Use the SAME image for
                   all 9 pieces.
                */

                tile.style.backgroundImage =
                    'url("./' +
                    puzzleImage +
                    '")';


                tile.style.backgroundRepeat =
                    "no-repeat";


                tile.style.backgroundSize =
                    "300% 300%";


                /*
                   Position the correct
                   image portion.
                */

                tile.style.backgroundPosition =
                    (
                        (col / 2) * 100
                    ) +
                    "% " +
                    (
                        (row / 2) * 100
                    ) +
                    "%";


                tile.setAttribute(
                    "aria-label",
                    "Puzzle tile " +
                    (tileValue + 1)
                );


                /*
                   Selected tile highlight
                */

                if (
                    selectedTileIndex ===
                    index
                ) {

                    tile.style.outline =
                        "4px solid #ffffff";

                    tile.style.outlineOffset =
                        "-4px";

                    tile.style.transform =
                        "scale(0.94)";

                    tile.style.filter =
                        "brightness(1.2)";

                }


                tile.addEventListener(
                    "click",
                    function () {

                        selectPuzzleTile(
                            index
                        );

                    }
                );


                container.appendChild(
                    tile
                );

            }
        );

    }


    /* =====================================================
       SELECT / SWAP TILES
    ===================================================== */

    function selectPuzzleTile(index) {

        /*
           First click
        */

        if (
            selectedTileIndex === null
        ) {

            selectedTileIndex =
                index;


            if (!puzzleStarted) {

                puzzleStarted = true;

                startPuzzleTimer();

            }


            renderPuzzle();

            return;

        }


        /*
           Clicking same tile again
           cancels selection.
        */

        if (
            selectedTileIndex ===
            index
        ) {

            selectedTileIndex =
                null;

            renderPuzzle();

            return;

        }


        /*
           Second tile selected.
           SWAP BOTH TILES.
        */

        const firstIndex =
            selectedTileIndex;


        const secondIndex =
            index;


        const temp =
            puzzleTiles[firstIndex];


        puzzleTiles[firstIndex] =
            puzzleTiles[secondIndex];


        puzzleTiles[secondIndex] =
            temp;


        /*
           One swap = one move
        */

        moves++;


        selectedTileIndex =
            null;


        updatePuzzleStats();


        renderPuzzle();


        /*
           Check if image is complete.
        */

        if (isPuzzleSolved()) {

            stopPuzzleTimer();

            showPuzzleCompletion();

        }

    }


    /* =====================================================
       CHECK PUZZLE SOLVED
    ===================================================== */

    function isPuzzleSolved() {

        for (
            let i = 0;
            i < totalPuzzleTiles;
            i++
        ) {

            if (
                puzzleTiles[i] !== i
            ) {

                return false;

            }

        }


        return true;

    }


    /* =====================================================
       PUZZLE TIMER
    ===================================================== */

    function startPuzzleTimer() {

        stopPuzzleTimer();


        timerInterval =
            setInterval(
                function () {

                    timerSeconds++;

                    updatePuzzleStats();

                },
                1000
            );

    }


    function stopPuzzleTimer() {

        if (
            timerInterval !== null
        ) {

            clearInterval(
                timerInterval
            );

            timerInterval =
                null;

        }

    }


    /* =====================================================
       PUZZLE STATS
    ===================================================== */

    function updatePuzzleStats() {

        const timer =
            get("timer");

        const movesDisplay =
            get("moves");


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
                String(minutes)
                    .padStart(2, "0") +
                ":" +
                String(seconds)
                    .padStart(2, "0");

        }

    }


    /* =====================================================
       SHOW SOLUTION
    ===================================================== */

    function showSolution() {

        const preview =
            get("solutionPreview");


        if (!preview) {
            return;
        }


        if (
            preview.style.display ===
            "block"
        ) {

            preview.style.display =
                "none";

        } else {

            preview.style.display =
                "block";

        }

    }


    /* =====================================================
       PUZZLE COMPLETION
    ===================================================== */

    function showPuzzleCompletion() {

        createConfetti(100);


        const modal =
            get("completionModal");


        if (!modal) {
            return;
        }


        modal.classList.add(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeCompletion() {

        const modal =
            get("completionModal");


        if (!modal) {
            return;
        }


        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    window.initializePuzzle =
        initializePuzzle;


    /* =====================================================
       BIRTHDAY JOURNAL
    ===================================================== */

    const journalQuestions = [

        "What is one happy memory you will always remember? 💖",

        "What is something that always makes you smile? 😊",

        "What is one thing you are grateful for today? 🌸",

        "What is a dream you would love to achieve someday? ✨",

        "What is one special moment from this year? 🎂",

        "What makes a day feel special to you? 💫",

        "What is something you would like to remember forever? ❤️"

    ];


    let currentQuestionIndex = 0;


    const journalQuestion =
        get("journalQuestion");

    const journalAnswer =
        get("journalAnswer");

    const addAnswerBtn =
        get("addAnswerBtn");

    const savedAnswers =
        get("savedAnswers");

    const freeJournal =
        get("freeJournal");

    const sendJournalBtn =
        get("sendJournalBtn");

    const journalStatus =
        get("journalStatus");


    function showRandomQuestion() {

        if (!journalQuestion) {
            return;
        }


        currentQuestionIndex =
            Math.floor(
                Math.random() *
                journalQuestions.length
            );


        journalQuestion.textContent =
            journalQuestions[
                currentQuestionIndex
            ];


        if (journalAnswer) {

            journalAnswer.value =
                "";

        }

    }


    function addSavedAnswer(
        question,
        answer
    ) {

        if (!savedAnswers) {
            return;
        }


        const answerBox =
            document.createElement(
                "div"
            );


        answerBox.className =
            "saved-answer";


        const questionText =
            document.createElement(
                "strong"
            );


        questionText.textContent =
            question;


        const answerText =
            document.createElement(
                "p"
            );


        answerText.textContent =
            answer;


        answerBox.appendChild(
            questionText
        );


        answerBox.appendChild(
            answerText
        );


        savedAnswers.appendChild(
            answerBox
        );

    }


    async function sendSingleJournalAnswer(
        question,
        answer
    ) {

        try {

            const formData =
                new FormData();


            formData.append(
                "_subject",
                "Birthday Journal Answer 💖"
            );


            formData.append(
                "Question",
                question
            );


            formData.append(
                "Answer",
                answer
            );


            formData.append(
                "Website",
                "Birthday Website"
            );


            const response =
                await fetch(
                    "https://formsubmit.co/ajax/rakeshnanikengam1922@gmail.com",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            Accept:
                                "application/json"
                        }
                    }
                );


            if (
                response.ok
            ) {

                console.log(
                    "Journal answer sent successfully"
                );


                if (journalStatus) {

                    journalStatus.textContent =
                        "Answer sent successfully 💖";

                }

            } else {

                console.error(
                    "Could not send journal answer"
                );


                if (journalStatus) {

                    journalStatus.textContent =
                        "Answer saved, but email could not be sent.";

                }

            }

        } catch (error) {

            console.error(
                "Journal email error:",
                error
            );


            if (journalStatus) {

                journalStatus.textContent =
                    "Answer saved locally. Email could not be sent.";

            }

        }

    }


    function addCurrentAnswer() {

        if (!journalAnswer) {
            return;
        }


        const answer =
            journalAnswer.value.trim();


        if (!answer) {

            if (journalStatus) {

                journalStatus.textContent =
                    "Please write an answer first ✨";

            }


            return;

        }


        const question =
            journalQuestion
                ? journalQuestion.textContent
                : "Birthday Journal";


        addSavedAnswer(
            question,
            answer
        );


        sendSingleJournalAnswer(
            question,
            answer
        );


        if (journalStatus) {

            journalStatus.textContent =
                "Sending your answer... 💌";

        }


        setTimeout(
            function () {

                showRandomQuestion();

            },
            300
        );

    }


    if (addAnswerBtn) {

        addAnswerBtn.addEventListener(
            "click",
            addCurrentAnswer
        );

    }


    async function sendFreeJournal() {

        if (!freeJournal) {
            return;
        }


        const text =
            freeJournal.value.trim();


        if (!text) {

            if (journalStatus) {

                journalStatus.textContent =
                    "Please write something first ✨";

            }


            return;

        }


        try {

            const formData =
                new FormData();


            formData.append(
                "_subject",
                "Birthday Free Journal 💖"
            );


            formData.append(
                "Journal",
                text
            );


            formData.append(
                "Website",
                "Birthday Website"
            );


            const response =
                await fetch(
                    "https://formsubmit.co/ajax/rakeshnanikengam1922@gmail.com",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            Accept:
                                "application/json"
                        }
                    }
                );


            if (response.ok) {

                if (journalStatus) {

                    journalStatus.textContent =
                        "Your journal was sent successfully 💖";

                }

            } else {

                if (journalStatus) {

                    journalStatus.textContent =
                        "Could not send the journal.";

                }

            }

        } catch (error) {

            console.error(
                "Free journal error:",
                error
            );


            if (journalStatus) {

                journalStatus.textContent =
                    "Could not send the journal.";

            }

        }

    }


    if (sendJournalBtn) {

        sendJournalBtn.addEventListener(
            "click",
            sendFreeJournal
        );

    }


    showRandomQuestion();


    /* =====================================================
       REMOVE DIFFICULTY OPTION
       PUZZLE IS ALWAYS 3 × 3
    ===================================================== */

    const difficulty =
        get("difficulty");


    if (difficulty) {

        difficulty.style.display =
            "none";

    }


    /* =====================================================
       START PUZZLE
    ===================================================== */

    initializePuzzle();


    console.log(
        "All birthday website features initialized ✅"
    );

});
