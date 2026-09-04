document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // HELPER
    // =========================================================

    function get(id) {
        return document.getElementById(id);
    }


    // =========================================================
    // CONFETTI
    // =========================================================

    function createConfetti(count = 120) {

        const emojis = [
            "🎉", "🎂", "🥳", "❤️", "✨",
            "🎈", "💖", "🌸", "⭐", "🎁"
        ];

        for (let i = 0; i < count; i++) {

            const confetti = document.createElement("div");

            confetti.textContent =
                emojis[Math.floor(Math.random() * emojis.length)];

            confetti.style.position = "fixed";
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.top = (-10 - Math.random() * 80) + "vh";
            confetti.style.fontSize =
                (18 + Math.random() * 22) + "px";

            confetti.style.zIndex = "99999";
            confetti.style.pointerEvents = "none";
            confetti.style.opacity = "1";
            confetti.style.willChange = "transform, opacity";

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
                    Math.min(elapsed / duration, 1);

                const y =
                    fallDistance * progress;

                const rotate =
                    rotation * progress;

                const drift =
                    Math.sin(
                        progress *
                        Math.PI *
                        driftSpeed
                    ) * driftAmount;


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
                            ((progress - 0.75) / 0.25)
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


    window.createConfetti = createConfetti;


    // =========================================================
    // CELEBRATE BUTTON
    // =========================================================

    const celebrateBtn =
        get("celebrateBtn");

    if (celebrateBtn) {

        celebrateBtn.addEventListener(
            "click",
            function () {

                createConfetti(150);

            }
        );
    }


    // =========================================================
    // GALLERY
    // =========================================================

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item img"
        );

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


    // =========================================================
    // GALLERY LIGHTBOX
    // =========================================================

    const lightbox =
        get("galleryLightbox");

    const lightboxImage =
        get("lightboxImage");

    const lightboxCaption =
        get("lightboxCaption");

    const lightboxCounter =
        get("lightboxCounter");

    const lightboxClose =
        get("lightboxClose");

    const lightboxPrev =
        get("lightboxPrev");

    const lightboxNext =
        get("lightboxNext");

    let currentGalleryIndex = 0;


    function updateLightbox() {

        if (!lightboxImage) return;

        lightboxImage.src =
            "./" +
            galleryImages[currentGalleryIndex];

        lightboxImage.alt =
            "Memory " +
            (currentGalleryIndex + 1);


        if (lightboxCaption) {

            lightboxCaption.textContent =
                galleryCaptions[
                    currentGalleryIndex
                ];
        }


        if (lightboxCounter) {

            lightboxCounter.textContent =
                (currentGalleryIndex + 1) +
                " / " +
                galleryImages.length;
        }
    }


    function openLightbox(index) {

        currentGalleryIndex = index;

        updateLightbox();

        if (lightbox) {

            lightbox.classList.add("active");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";
        }
    }


    function closeLightbox() {

        if (lightbox) {

            lightbox.classList.remove("active");

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow =
                "";
        }
    }


    galleryItems.forEach(
        function (img, index) {

            img.addEventListener(
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
            function () {

                currentGalleryIndex--;

                if (currentGalleryIndex < 0) {

                    currentGalleryIndex =
                        galleryImages.length - 1;
                }

                updateLightbox();

            }
        );
    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            function () {

                currentGalleryIndex++;

                if (
                    currentGalleryIndex >=
                    galleryImages.length
                ) {

                    currentGalleryIndex = 0;
                }

                updateLightbox();

            }
        );
    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {

                    closeLightbox();

                }
            }
        );
    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowLeft") {

                if (lightboxPrev) {
                    lightboxPrev.click();
                }

            }


            if (event.key === "ArrowRight") {

                if (lightboxNext) {
                    lightboxNext.click();
                }

            }
        }
    );


    // =========================================================
    // GALLERY SLIDESHOW
    // =========================================================

    const gridViewBtn =
        get("gridViewBtn");

    const slideshowViewBtn =
        get("slideshowViewBtn");

    const galleryGrid =
        get("galleryGrid");

    const gallerySlideshow =
        get("gallerySlideshow");

    const slides =
        document.querySelectorAll(".slide");

    const indicators =
        document.querySelectorAll(".indicator");

    const prevSlide =
        get("prevSlide");

    const nextSlide =
        get("nextSlide");

    let currentSlide = 0;


    function showSlide(index) {

        if (!slides.length) return;

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }

        currentSlide = index;


        slides.forEach(
            function (slide, i) {

                slide.classList.toggle(
                    "active",
                    i === currentSlide
                );

            }
        );


        indicators.forEach(
            function (indicator, i) {

                indicator.classList.toggle(
                    "active",
                    i === currentSlide
                );

            }
        );
    }


    if (gridViewBtn) {

        gridViewBtn.addEventListener(
            "click",
            function () {

                if (galleryGrid) {
                    galleryGrid.style.display = "grid";
                }

                if (gallerySlideshow) {
                    gallerySlideshow.style.display = "none";
                }

                gridViewBtn.classList.add("active");

                if (slideshowViewBtn) {
                    slideshowViewBtn.classList.remove("active");
                }

            }
        );
    }


    if (slideshowViewBtn) {

        slideshowViewBtn.addEventListener(
            "click",
            function () {

                if (galleryGrid) {
                    galleryGrid.style.display = "none";
                }

                if (gallerySlideshow) {
                    gallerySlideshow.style.display = "block";
                }

                slideshowViewBtn.classList.add("active");

                if (gridViewBtn) {
                    gridViewBtn.classList.remove("active");
                }

                showSlide(currentSlide);

            }
        );
    }


    if (prevSlide) {

        prevSlide.addEventListener(
            "click",
            function () {

                showSlide(currentSlide - 1);

            }
        );
    }


    if (nextSlide) {

        nextSlide.addEventListener(
            "click",
            function () {

                showSlide(currentSlide + 1);

            }
        );
    }


    indicators.forEach(
        function (indicator, index) {

            indicator.addEventListener(
                "click",
                function () {

                    showSlide(index);

                }
            );
        }
    );


    // =========================================================
    // SURPRISE MODAL
    // =========================================================

    const surpriseBtn =
        get("surpriseBtn");

    const surpriseModal =
        get("surpriseModal");

    const surpriseClose =
        get("surpriseClose");

    const surpriseCelebrate =
        get("surpriseCelebrate");


    function closeSurprise() {

        if (surpriseModal) {

            surpriseModal.classList.remove("active");

            surpriseModal.setAttribute(
                "aria-hidden",
                "true"
            );
        }
    }


    if (surpriseBtn) {

        surpriseBtn.addEventListener(
            "click",
            function () {

                if (surpriseModal) {

                    surpriseModal.classList.add("active");

                    surpriseModal.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    createConfetti(80);
                }

            }
        );
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
            function () {

                createConfetti(150);

            }
        );
    }


    if (surpriseModal) {

        surpriseModal.addEventListener(
            "click",
            function (event) {

                if (event.target === surpriseModal) {
                    closeSurprise();
                }

            }
        );
    }


    // =========================================================
    // PUZZLE
    // 3 × 3 TILE SWAP
    // NO EMPTY TILE
    // =========================================================

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

    let puzzleTiles = [];

    let selectedTileIndex = null;

    let moves = 0;

    let timerSeconds = 0;

    let timerInterval = null;

    let puzzleStarted = false;


    function updatePuzzleStats() {

        const timer =
            get("timer");

        const movesElement =
            get("moves");


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


        if (movesElement) {

            movesElement.textContent =
                moves;
        }
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

        if (timerInterval) {

            clearInterval(timerInterval);

            timerInterval = null;
        }
    }


    function isPuzzleSolved() {

        for (
            let i = 0;
            i < totalPuzzleTiles;
            i++
        ) {

            if (puzzleTiles[i] !== i) {
                return false;
            }
        }

        return true;
    }


    function renderPuzzle() {

        const container =
            get("puzzleContainer");

        if (!container) return;


        container.innerHTML = "";

        container.style.gridTemplateColumns =
            "repeat(3, 1fr)";


        puzzleTiles.forEach(
            function (tileValue, index) {

                const tile =
                    document.createElement("button");

                tile.type = "button";

                tile.className =
                    "puzzle-tile";


                const row =
                    Math.floor(
                        tileValue / puzzleSize
                    );

                const col =
                    tileValue % puzzleSize;


                tile.style.backgroundImage =
                    'url("./' +
                    puzzleImage +
                    '")';

                tile.style.backgroundRepeat =
                    "no-repeat";

                tile.style.backgroundSize =
                    "300% 300%";


                tile.style.backgroundPosition =
                    ((col / 2) * 100) +
                    "% " +
                    ((row / 2) * 100) +
                    "%";


                tile.setAttribute(
                    "aria-label",
                    "Puzzle tile " +
                    (tileValue + 1)
                );


                if (
                    selectedTileIndex === index
                ) {

                    tile.classList.add("selected");

                    tile.style.outline =
                        "4px solid white";

                    tile.style.outlineOffset =
                        "-4px";

                    tile.style.transform =
                        "scale(0.94)";

                    tile.style.filter =
                        "brightness(1.25)";
                }


                tile.addEventListener(
                    "click",
                    function () {

                        selectPuzzleTile(index);

                    }
                );


                container.appendChild(tile);

            }
        );
    }


    function createPuzzle() {

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


        if (isPuzzleSolved()) {

            const temp =
                puzzleTiles[0];

            puzzleTiles[0] =
                puzzleTiles[1];

            puzzleTiles[1] =
                temp;
        }


        selectedTileIndex = null;

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

            preview.style.display = "none";
        }
    }


    function selectPuzzleTile(index) {

        if (selectedTileIndex === null) {

            selectedTileIndex = index;


            if (!puzzleStarted) {

                puzzleStarted = true;

                startPuzzleTimer();
            }


            renderPuzzle();

            return;
        }


        if (selectedTileIndex === index) {

            selectedTileIndex = null;

            renderPuzzle();

            return;
        }


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


        moves++;

        selectedTileIndex = null;


        updatePuzzleStats();

        renderPuzzle();


        if (isPuzzleSolved()) {

            stopPuzzleTimer();

            showPuzzleCompletion();
        }
    }


    function selectPuzzleImage() {

        if (puzzleImages.length <= 1) {

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


        puzzleImage = newImage;
    }


    function startNewGame() {

        stopPuzzleTimer();

        timerSeconds = 0;

        moves = 0;

        puzzleStarted = false;

        selectedTileIndex = null;


        selectPuzzleImage();

        createPuzzle();

        updatePuzzleStats();
    }


    function showSolution() {

        const preview =
            get("solutionPreview");

        if (!preview) return;


        if (
            preview.style.display === "none" ||
            preview.style.display === ""
        ) {

            preview.style.display = "block";

        } else {

            preview.style.display = "none";
        }
    }


    function showPuzzleCompletion() {

        createConfetti(100);


        const completionModal =
            get("completionModal");


        if (completionModal) {

            completionModal.classList.add("active");

            completionModal.setAttribute(
                "aria-hidden",
                "false"
            );
        }
    }


    function closeCompletion() {

        const completionModal =
            get("completionModal");


        if (completionModal) {

            completionModal.classList.remove("active");

            completionModal.setAttribute(
                "aria-hidden",
                "true"
            );
        }
    }


    function initializePuzzle() {

        const newGameBtn =
            get("newGameBtn");

        const playAgainBtn =
            get("playAgainBtn");

        const showSolutionBtn =
            get("showSolutionBtn");

        const completionClose =
            get("completionClose");


        if (newGameBtn) {

            newGameBtn.addEventListener(
                "click",
                startNewGame
            );
        }


        if (playAgainBtn) {

            playAgainBtn.addEventListener(
                "click",
                function () {

                    closeCompletion();

                    startNewGame();

                }
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


    // =========================================================
    // BIRTHDAY JOURNAL
    // =========================================================

    const journalQuestions = [

        "What is one memory you never want to forget? 💭",

        "What is something that always makes you smile? 😊",

        "What is one thing you are grateful for today? 🌸",

        "What is your favorite birthday memory? 🎂",

        "What is one dream you want to achieve? ✨",

        "What is something you want to remember from this year? 💖",

        "What is one thing that makes a day special for you? 🌷"

    ];


    let currentQuestionIndex = 0;

    let allJournalAnswers = [];


    function showRandomQuestion() {

        const questionText =
            get("questionText");

        const questionNumber =
            get("questionNumber");


        if (!questionText) return;


        currentQuestionIndex =
            Math.floor(
                Math.random() *
                journalQuestions.length
            );


        questionText.textContent =
            journalQuestions[
                currentQuestionIndex
            ];


        if (questionNumber) {

            questionNumber.textContent =
                "Question " +
                (currentQuestionIndex + 1);
        }
    }


    function showNextQuestion() {

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
            get("questionText");

        const questionNumber =
            get("questionNumber");


        if (questionText) {

            questionText.textContent =
                journalQuestions[
                    currentQuestionIndex
                ];
        }


        if (questionNumber) {

            questionNumber.textContent =
                "Question " +
                (currentQuestionIndex + 1);
        }
    }


    function renderSavedAnswers() {

        const answerList =
            get("answerList");

        if (!answerList) return;


        answerList.innerHTML = "";


        if (allJournalAnswers.length === 0) {

            const empty =
                document.createElement("p");

            empty.className =
                "empty-answer";

            empty.textContent =
                "Your answers will appear here...";

            answerList.appendChild(empty);

            return;
        }


        allJournalAnswers.forEach(
            function (item) {

                const answerBox =
                    document.createElement("div");

                answerBox.className =
                    "saved-answer";


                const question =
                    document.createElement("strong");

                question.textContent =
                    item.question;


                const answer =
                    document.createElement("p");

                answer.textContent =
                    item.answer;


                answerBox.appendChild(question);

                answerBox.appendChild(answer);

                answerList.appendChild(answerBox);

            }
        );
    }


    function setJournalStatus(message) {

        const status =
            get("journalStatus");


        if (status) {

            status.textContent =
                message;
        }
    }


    // =========================================================
    // ADD ANSWER
    // =========================================================

    const addAnswerBtn =
        get("addAnswerBtn");


    if (addAnswerBtn) {

        addAnswerBtn.addEventListener(
            "click",
            function () {

                const answerInput =
                    get("questionAnswer");


                if (!answerInput) return;


                const answer =
                    answerInput.value.trim();


                if (!answer) {

                    setJournalStatus(
                        "Please write your answer first ✨"
                    );

                    answerInput.focus();

                    return;
                }


                allJournalAnswers.push({

                    question:
                        journalQuestions[
                            currentQuestionIndex
                        ],

                    answer:
                        answer

                });


                renderSavedAnswers();


                answerInput.value = "";


                setJournalStatus(
                    "Answer saved 💖"
                );


                showNextQuestion();

            }
        );
    }


    // =========================================================
    // NEXT QUESTION
    // =========================================================

    const nextQuestionBtn =
        get("nextQuestionBtn");


    if (nextQuestionBtn) {

        nextQuestionBtn.addEventListener(
            "click",
            function () {

                showNextQuestion();

            }
        );
    }


    // =========================================================
    // SEND ALL JOURNAL ANSWERS
    // =========================================================

    const sendJournalBtn =
        get("sendJournalBtn");


    if (sendJournalBtn) {

        sendJournalBtn.addEventListener(
            "click",
            async function (event) {

                event.preventDefault();


                const freeJournalElement =
                    get("freeJournal");


                const freeJournal =
                    freeJournalElement
                        ? freeJournalElement.value.trim()
                        : "";


                if (
                    allJournalAnswers.length === 0 &&
                    !freeJournal
                ) {

                    setJournalStatus(
                        "Please add at least one answer first ✨"
                    );

                    return;
                }


                let completeAnswers = "";


                allJournalAnswers.forEach(
                    function (item, index) {

                        completeAnswers +=
                            "\n\n" +
                            "Question " +
                            (index + 1) +
                            ":\n" +
                            item.question +
                            "\n\nAnswer:\n" +
                            item.answer;
                    }
                );


                if (freeJournal) {

                    completeAnswers +=
                        "\n\nFREE JOURNAL:\n" +
                        freeJournal;
                }


                setJournalStatus(
                    "Sending your answers... 💌"
                );


                sendJournalBtn.disabled = true;


                try {

                    const response =
                        await fetch(
                            "https://formsubmit.co/ajax/rakeshnanikengam1922@gmail.com",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Accept":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    "Birthday Journal":
                                        completeAnswers,

                                    "Total Answers":
                                        allJournalAnswers.length,

                                    "Website":
                                        "BUJJI Birthday Website",

                                    "_subject":
                                        "Birthday Journal Answers 💖",

                                    "_captcha":
                                        "false"

                                })
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Email sending failed"
                        );
                    }


                    setJournalStatus(
                        "All your answers were sent successfully 💖📩"
                    );


                    allJournalAnswers = [];

                    renderSavedAnswers();


                    if (freeJournalElement) {

                        freeJournalElement.value = "";
                    }


                } catch (error) {

                    console.error(
                        "Journal email error:",
                        error
                    );


                    setJournalStatus(
                        "Could not send the answers. Please try again."
                    );

                } finally {

                    sendJournalBtn.disabled = false;
                }

            }
        );
    }


    // =========================================================
    // START JOURNAL
    // =========================================================

    showRandomQuestion();

    renderSavedAnswers();


    // =========================================================
    // START PUZZLE
    // =========================================================

    initializePuzzle();


    // =========================================================
    // MOBILE NAVIGATION
    // =========================================================

    const menuToggle =
        get("menuToggle");

    const navLinks =
        get("navLinks");


    if (
        menuToggle &&
        navLinks
    ) {

        menuToggle.addEventListener(
            "click",
            function () {

                navLinks.classList.toggle(
                    "active"
                );

            }
        );


        navLinks
            .querySelectorAll("a")
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            navLinks.classList.remove(
                                "active"
                            );

                        }
                    );

                }
            );
    }


    console.log(
        "Birthday website script loaded successfully"
    );

});
