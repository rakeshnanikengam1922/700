// =====================================================
// PREMIUM FEATURES
// =====================================================

let lightboxIndex = 0;


// ================= PREMIUM INITIALIZATION =================

document.addEventListener("DOMContentLoaded", () => {

    initializeFullscreenGallery();
    initializeSurprise();

});


// ================= FULLSCREEN GALLERY =================

function initializeFullscreenGallery() {

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCaption =
        document.getElementById("lightboxCaption");

    const lightboxCounter =
        document.getElementById("lightboxCounter");

    const closeButton =
        document.getElementById("lightboxClose");

    const previousButton =
        document.getElementById("lightboxPrev");

    const nextButton =
        document.getElementById("lightboxNext");


    if (!lightbox) return;


    // Gallery grid images
    const galleryItems =
        document.querySelectorAll(
            ".gallery-item img"
        );


    galleryItems.forEach((image, index) => {

        image.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    // Slideshow images
    const slides =
        document.querySelectorAll(
            ".slide img"
        );


    slides.forEach((image, index) => {

        image.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                changeLightboxImage(-1);

            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                changeLightboxImage(1);

            }
        );

    }


    // Click outside image to close
    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    // Keyboard controls
    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowRight"
            ) {

                changeLightboxImage(1);

            }


            if (
                event.key === "ArrowLeft"
            ) {

                changeLightboxImage(-1);

            }

        }
    );

}


function openLightbox(index) {

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    if (!lightbox) return;


    lightboxIndex =
        Math.max(
            0,
            Math.min(
                index,
                galleryImages.length - 1
            )
        );


    updateLightbox();


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
        document.getElementById(
            "lightboxImage"
        );

    const caption =
        document.getElementById(
            "lightboxCaption"
        );

    const counter =
        document.getElementById(
            "lightboxCounter"
        );


    if (!image) return;


    image.src =
        galleryImages[lightboxIndex];


    image.alt =
        `Birthday Memory ${lightboxIndex + 1}`;


    if (caption) {

        caption.textContent =
            galleryCaptions[
                lightboxIndex
            ];

    }


    if (counter) {

        counter.textContent =
            `${lightboxIndex + 1} / ${galleryImages.length}`;

    }

}


function changeLightboxImage(direction) {

    lightboxIndex += direction;


    if (
        lightboxIndex >=
        galleryImages.length
    ) {

        lightboxIndex = 0;

    }


    if (
        lightboxIndex < 0
    ) {

        lightboxIndex =
            galleryImages.length - 1;

    }


    updateLightbox();

}


function closeLightbox() {

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    if (!lightbox) return;


    lightbox.classList.remove(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


// ================= SURPRISE =================

function initializeSurprise() {

    const button =
        document.getElementById(
            "surpriseBtn"
        );

    const modal =
        document.getElementById(
            "surpriseModal"
        );

    const close =
        document.getElementById(
            "surpriseClose"
        );

    const celebrateButton =
        document.getElementById(
            "surpriseCelebrate"
        );


    if (!button || !modal) return;


    button.addEventListener(
        "click",
        () => {

            modal.classList.add(
                "active"
            );

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

            createConfetti();

        }
    );


    if (close) {

        close.addEventListener(
            "click",
            closeSurprise
        );

    }


    if (celebrateButton) {

        celebrateButton.addEventListener(
            "click",
            () => {

                createConfetti();

                setTimeout(
                    closeSurprise,
                    700
                );

            }
        );

    }


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeSurprise();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeSurprise();

            }

        }
    );

}


function closeSurprise() {

    const modal =
        document.getElementById(
            "surpriseModal"
        );

    if (!modal) return;


    modal.classList.remove(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}
