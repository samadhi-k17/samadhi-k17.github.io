"use strict";

/* ================================
   MOBILE NAVIGATION
================================ */

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

/* ================================
   ROTATING HERO ROLE
================================ */

const roles = [
    "Aspiring Business Analyst",
    "Full-Stack Development Enthusiast",
    "UI/UX Design Enthusiast",
    "Creative Problem Solver",
    "Confident Communicator",
    "Human-Centered Technology Enthusiast"
];

const changingRole = document.getElementById("changingRole");

let currentRoleIndex = 0;

function changeRole() {
    if (!changingRole) {
        return;
    }

    currentRoleIndex = (currentRoleIndex + 1) % roles.length;

    changingRole.classList.remove("role-change-animation");

    void changingRole.offsetWidth;

    changingRole.textContent = roles[currentRoleIndex];
    changingRole.classList.add("role-change-animation");
}

setInterval(changeRole, 2600);

/* ================================
   SCROLL REVEAL
================================ */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

/* ================================
   SKILL CATEGORY TABS
================================ */

const skillTabs = document.querySelectorAll(".skill-tab");
const skillPanels = document.querySelectorAll(".skill-panel");

skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const selectedCategory = tab.dataset.category;

        skillTabs.forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-selected", "false");
        });

        skillPanels.forEach((panel) => {
            panel.classList.remove("active");
            panel.hidden = true;
        });

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        const selectedPanel = document.getElementById(selectedCategory);

        if (selectedPanel) {
            selectedPanel.hidden = false;
            selectedPanel.classList.add("active");
        }
    });
});

/* ================================
   PROJECT FILTERS
================================ */

const projectFilterButtons =
    document.querySelectorAll(".project-filter");

const projectCards =
    document.querySelectorAll(".project-card");

projectFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        projectFilterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach((card) => {
            const categories =
                card.dataset.category.split(" ");

            const shouldShow =
                selectedFilter === "all" ||
                categories.includes(selectedFilter);

            if (shouldShow) {
                card.classList.remove("project-hidden");

                card.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateY(15px)"
                        },
                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    ],
                    {
                        duration: 350,
                        easing: "ease"
                    }
                );
            } else {
                card.classList.add("project-hidden");
            }
        });
    });
});

"use strict";

/* =================================
   GALLERY FILTERING
================================= */

const galleryFilterButtons =
    document.querySelectorAll(".gallery-filter");

const galleryItems =
    document.querySelectorAll(".gallery-item");

galleryFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter =
            button.dataset.galleryFilter;

        galleryFilterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        galleryItems.forEach((galleryItem) => {
            const categories =
                galleryItem.dataset.galleryCategory.split(" ");

            const shouldShow =
                selectedFilter === "all" ||
                categories.includes(selectedFilter);

            if (shouldShow) {
                galleryItem.classList.remove("gallery-hidden");

                galleryItem.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateY(15px)"
                        },
                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    ],
                    {
                        duration: 350,
                        easing: "ease"
                    }
                );
            } else {
                galleryItem.classList.add("gallery-hidden");
            }
        });
    });
});

/* =================================
   GALLERY LIGHTBOX
================================= */

const galleryImageButtons =
    Array.from(document.querySelectorAll(".gallery-image-button"));

const galleryLightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxDescription =
    document.getElementById("lightboxDescription");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrevious =
    document.getElementById("lightboxPrevious");

const lightboxNext =
    document.getElementById("lightboxNext");

let currentGalleryIndex = 0;

function showGalleryImage(index) {
    if (!galleryImageButtons.length) {
        return;
    }

    currentGalleryIndex =
        (index + galleryImageButtons.length) %
        galleryImageButtons.length;

    const currentButton =
        galleryImageButtons[currentGalleryIndex];

    const imageSource =
        currentButton.dataset.fullImage;

    const title =
        currentButton.dataset.title;

    const description =
        currentButton.dataset.description;

    lightboxImage.src = imageSource;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
}

function openGalleryLightbox(index) {
    if (!galleryLightbox) {
        return;
    }

    showGalleryImage(index);

    galleryLightbox.classList.add("open");
    galleryLightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("lightbox-open");

    lightboxClose.focus();
}

function closeGalleryLightbox() {
    if (!galleryLightbox) {
        return;
    }

    galleryLightbox.classList.remove("open");
    galleryLightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("lightbox-open");

    galleryImageButtons[currentGalleryIndex]?.focus();
}

galleryImageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        openGalleryLightbox(index);
    });
});

lightboxClose?.addEventListener(
    "click",
    closeGalleryLightbox
);

lightboxPrevious?.addEventListener("click", () => {
    showGalleryImage(currentGalleryIndex - 1);
});

lightboxNext?.addEventListener("click", () => {
    showGalleryImage(currentGalleryIndex + 1);
});

galleryLightbox?.addEventListener("click", (event) => {
    if (event.target === galleryLightbox) {
        closeGalleryLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (!galleryLightbox?.classList.contains("open")) {
        return;
    }

    if (event.key === "Escape") {
        closeGalleryLightbox();
    }

    if (event.key === "ArrowLeft") {
        showGalleryImage(currentGalleryIndex - 1);
    }

    if (event.key === "ArrowRight") {
        showGalleryImage(currentGalleryIndex + 1);
    }
});
/* ================================
   CONTACT FORM
================================ */

const contactForm = document.getElementById("contactForm");
const messageField = document.getElementById("message");
const messageCount = document.getElementById("messageCount");
const formStatus = document.getElementById("formStatus");

if (messageField && messageCount) {
    messageField.addEventListener("input", () => {
        messageCount.textContent = messageField.value.length;
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector(".contact-submit-btn");

        const originalButtonContent =
            submitButton.innerHTML;

        submitButton.disabled = true;

        submitButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Sending...
        `;

        if (formStatus) {
            formStatus.textContent = "";
        }

        const formData =
            new FormData(contactForm);

        try {

            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (response.ok) {

                if (formStatus) {
                    formStatus.textContent =
                        "Thank you! Your message has been sent successfully.";
                }

                contactForm.reset();

                if (messageCount) {
                    messageCount.textContent = "0";
                }

            } else {

                if (formStatus) {
                    formStatus.textContent =
                        "Sorry, your message could not be sent. Please try again.";
                }

            }

        } catch (error) {

            if (formStatus) {
                formStatus.textContent =
                    "Something went wrong. Please check your connection and try again.";
            }

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML =
                originalButtonContent;

        }

    });
}

/* ================================
   CURRENT YEAR
================================ */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* ==================================================
   FINAL PORTFOLIO POLISH
================================================== */

/* ================================
   LOADING SCREEN
================================ */

const pageLoader =
    document.getElementById("pageLoader");

window.addEventListener("load", () => {

    if (!pageLoader) {
        return;
    }

    setTimeout(() => {
        pageLoader.classList.add("hide");
    }, 500);

});


/* ================================
   SCROLL PROGRESS
================================ */

const scrollProgress =
    document.getElementById("scrollProgress");

function updateScrollProgress() {

    if (!scrollProgress) {
        return;
    }

    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

    scrollProgress.style.width =
        `${progress}%`;
}


/* ================================
   BACK TO TOP
================================ */

const backToTop =
    document.getElementById("backToTop");

function updateBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 600) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

backToTop?.addEventListener(
    "click",
    () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


/* Single scroll listener */

window.addEventListener(
    "scroll",
    () => {
        updateScrollProgress();
        updateBackToTop();
    },
    {
        passive: true
    }
);

updateScrollProgress();
updateBackToTop();

/* ================================
   ACHIEVEMENT COUNTERS
================================ */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;

function startCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;

    counters.forEach((counter) => {

        const target =
            Number(counter.dataset.target);

        const suffix =
            counter.dataset.suffix || "";

        const duration = 1200;

        const startTime =
            performance.now();

        function animateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue =
                Math.round(
                    target * easedProgress
                );

            counter.textContent =
                `${currentValue}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(
                    animateCounter
                );
            }

        }

        requestAnimationFrame(
            animateCounter
        );

    });
}


const achievementSection =
    document.querySelector(".achievement-section");

if (achievementSection) {

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio > 0.2
                    ) {

                        startCounters();

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.2
            }
        );

    counterObserver.observe(
        achievementSection
    );

}

/* ================================
   ACTIVE NAVIGATION ON SCROLL
================================ */

const navLinks = document.querySelectorAll(".nav-link");

const sections = [
    document.getElementById("home"),
    document.getElementById("about"),
    document.getElementById("skills"),
    document.getElementById("projects"),
    document.getElementById("research"),
    document.getElementById("journey"),
    document.getElementById("gallery"),
    document.getElementById("beyond-tech"),
    document.getElementById("contact")
].filter(Boolean);

function setActiveNavLink(sectionId) {
    navLinks.forEach((link) => {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${sectionId}`) {
            link.classList.add("active");
        }
    });
}

const sectionObserver = new IntersectionObserver(
    (entries) => {
        const visibleSections = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
                (a, b) =>
                    b.intersectionRatio -
                    a.intersectionRatio
            );

        if (visibleSections.length > 0) {
            setActiveNavLink(
                visibleSections[0].target.id
            );
        }
    },
    {
        root: null,

        rootMargin:
            "-25% 0px -55% 0px",

        threshold: [
            0.1,
            0.25,
            0.5,
            0.75
        ]
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});