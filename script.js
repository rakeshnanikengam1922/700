/* =====================================================
   BIRTHDAY WEBSITE - COMPLETE SCRIPT
===================================================== */

alert("SCRIPT STARTED ✅");

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

            const confetti =
                document.createElement("div");

            confetti.textContent =
                emojis[
                    Math.floor(
                        Math.random() *
                        emojis.length
                    )
                ];

            confetti.style.position = "fixed";

            /*
               Random horizontal position
            */
            confetti.style.left =
                Math.random() * 100 + "vw";

            /*
               Different starting heights
               so emojis don't appear in one line
            */
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

            document.body.appendChild(
                confetti
            );

            const fallDistance =
                window.innerHeight + 150;

            const rotation =
                (Math.random() - 0.5) * 720;

            const duration =
                2200 + Math.random() * 1800;

            const startTime =
                performance.now();

            /*
               Give every emoji a slightly
               different side-to-side movement
            */
            const driftAmount =
                20 + Math.random() * 40;

            const driftSpeed =
                2 + Math.random() * 3;

            function animateConfetti(
                currentTime
            ) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );

                const y =
                    fallDistance *
                    progress;

                const rotate =
                    rotation *
                    progress;

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

                /*
                   Fade out near the end
                */
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


    let currentGalleryIndex =
        0;


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


        /*
           Slideshow image opens lightbox
        */

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
       PUZZLE — ONLY 3 × 3
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


    const puzzleSize = 3;


    let puzzleTiles = [];

    let emptyIndex = 8;

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
            "Puzzle initialized — 3x3"
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


    function createPuzzle() {

        const container =
            get("puzzleContainer");


        if (!container) {
            return;
        }


        const total =
            puzzleSize *
            puzzleSize;


        puzzleTiles =
            Array.from(
                {
                    length: total
                },
                function (_, index) {

                    return index;

                }
            );


        puzzleTiles[
            total - 1
        ] = null;


        emptyIndex =
            total - 1;


        /*
           Shuffle with legal moves.
           Puzzle always remains solvable.
        */

        for (
            let i = 0;
            i < 150;
            i++
        ) {

            const possibleMoves = [];


            for (
                let j = 0;
                j < total;
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
           Make sure puzzle isn't already solved.
        */

        if (isPuzzleSolved()) {

            const possibleMoves = [];


            for (
                let j = 0;
                j < total;
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
                   EMPTY TILE
                   Shows matching part of same image.
                */

                if (
                    tileValue === null
                ) {

                    tile.classList.add(
                        "empty"
                    );


                    const emptyRow =
                        Math.floor(
                            emptyIndex /
                            puzzleSize
                        );


                    const emptyCol =
                        emptyIndex %
                        puzzleSize;


                    tile.style.backgroundImage =
                        'url("./' +
                        puzzleImage +
                        '")';


                    tile.style.backgroundRepeat =
                        "no-repeat";


                    tile.style.backgroundSize =
                        (puzzleSize * 100) +
                        "% " +
                        (puzzleSize * 100) +
                        "%";


                    tile.style.backgroundPosition =
                        (
                            (emptyCol * 100) /
                            (puzzleSize - 1)
                        ) +
                        "% " +
                        (
                            (emptyRow * 100) /
                            (puzzleSize - 1)
                        ) +
                        "%";


                    tile.setAttribute(
                        "aria-label",
                        "Empty puzzle space"
                    );

                }


                /*
                   NORMAL TILE
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


                    tile.style.backgroundImage =
                        'url("./' +
                        puzzleImage +
                        '")';


                    tile.style.backgroundRepeat =
                        "no-repeat";


                    tile.style.backgroundSize =
                        (puzzleSize * 100) +
                        "% " +
                        (puzzleSize * 100) +
                        "%";


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


                    tile.setAttribute(
                        "aria-label",
                        "Puzzle piece " +
                        (tileValue + 1)
                    );


                    tile.addEventListener(
                        "click",
                        function () {

                            movePuzzleTile(
                                index
                            );

                        }
                    );

                }


                container.appendChild(
                    tile
                );

            }
        );

    }


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


    function isAdjacent(
        index1,
        index2
    ) {

        const row1 =
            Math.floor(
                index1 /
                puzzleSize
            );


        const col1 =
            index1 %
            puzzleSize;


        const row2 =
            Math.floor(
                index2 /
                puzzleSize
            );


        const col2 =
            index2 %
            puzzleSize;


        return (
            Math.abs(row1 - row2) +
            Math.abs(col1 - col2)
        ) === 1;

    }


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


        /*
           Show answer immediately
        */

        addSavedAnswer(
            question,
            answer
        );


        /*
           Send email immediately
        */

        sendSingleJournalAnswer(
            question,
            answer
        );


        if (journalStatus) {

            journalStatus.textContent =
                "Sending your answer... 💌";

        }


        /*
           Show another question
        */

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
       REMOVE DIFFICULTY OPTION IF IT EXISTS
       Puzzle is always 3 × 3
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
