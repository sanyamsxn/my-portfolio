"use strict";

/* Variables */
const root = document.querySelector(":root");
const burgerMenuButton = document.querySelector(".menu-button");
const header = document.querySelector(".header");
const headerTitle = document.querySelector(".header__title");
const headerNav = document.querySelector(".header__nav");

const sideNav = document.querySelector(".aside");
const mainContainer = document.querySelector(".main");
const allSections = document.querySelectorAll(".section");

const introSection = document.querySelector(".main__intro-animation");

const introFullname = document.querySelector(".full-name");

const heroSection = document.querySelector(".main__hero-section");
const profileImage = document.querySelector(".portfolio-hero-image");

const firstNameText = document.querySelector(".title__first-name");
const middleNameText = document.querySelector(".title__middle-name");
const lastNameText = document.querySelector(".title__last-name");

const skillsSection = document.querySelector(".main__skills");
const skillsContainer = document.querySelector(".skills__container");
const allSkillCards = document.querySelectorAll(".skill-card");
const skillTextContainer = document.querySelector(".skill-title");

const servicesSection = document.querySelector("#services")
const projectsSection = document.querySelector("#projects");
const certificatesSection = document.querySelector("#certificates");
const contactMeSection = document.querySelector("#contacts");
const allProjectCards = document.querySelectorAll(".project-card");

const worksSection = document.querySelector(".main__work-experience");
const companyTabContainer = document.querySelector(".work__tabs");
const companyTabs = document.querySelectorAll(".tab");
const companyDetails = document.querySelectorAll(".details");

const contactSection = document.querySelector(".main__contact-me ");

console.log

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Animation end time
const animationEndTime = 3500;
const animationEndOffset = 500;
const contentSections = [
    header,
    heroSection,
    skillsSection,
    servicesSection,
    projectsSection,
    certificatesSection,
    contactMeSection
];
let skillHideTimeout;
/* Functions */

const beginIntroAnimation = function () {
    // Intro page animation.
    sideNav.classList.add("hidden");

    // Hide main elements while animation is running.
    contentSections.forEach((section) => {
        section.classList.add("hidden");
    });

    // Show main content once animation is complete.
    setTimeout(() => {
        contentSections.forEach((section) => {
            section.classList.remove("hidden");
        });

        introSection.classList.add("hidden");
        sideNav.classList.remove("hidden");

        // Kick off the intersection observer.
        initializeObserver();
    }, animationEndTime + animationEndOffset);
};

const initializeObserver = function () {
    // Fade-in effects
    const options = {
        root: null, // viewport
        threshold: 0.1,
        rootMargin: "0px",
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        // Activate the side nav once the header goes out of view.
        entries.forEach((entry) => {
            // Render the side nav if the header goes out of view.
            if (entry.target.classList.contains("header")) {
                if (entry.isIntersecting) {
                    sideNav.classList.add("hidden");
                    sideNav.classList.remove("activate-element");
                } else {
                    sideNav.classList.remove("hidden");
                    setTimeout(() => {
                        sideNav.classList.add("activate-element");
                    }, 10);
                }
            }

            // Fade-out the section if it goes out of view, else fade-in.
            if (!entry.isIntersecting) {
                entry.target.classList.add("hide-element");
            } else {
                if (entry.target.classList.contains("section")) {
                    const allLinks = document.querySelectorAll(".aside-link");

                    // Highlight corresponding nav link when in the respective section.
                    allLinks.forEach((link) => link.classList.remove("active-link"));
                    const activeSection = entry.target.classList[0];

                    switch (activeSection) {
                        case "main__hero-section":
                            document
                                .querySelector(".aside-link--home")
                                .classList.add("active-link");
                            break;

                        case "main__skills":
                            document
                                .querySelector(".aside-link--skills")
                                .classList.add("active-link");
                            break;

                        case "services":
                            document
                                .querySelector(".aside-link--projects")
                                .classList.add("active-link");
                            break;

                        case "projects":
                            document
                                .querySelector(".aside-link--work-exp")
                                .classList.add("active-link");
                            break;

                        case "certificates":
                            document
                                .querySelector(".aside-link--contact-me")
                                .classList.add("active-link");
                            break;
                            case "contacts":
                            document
                                .querySelector(".aside-link--work-exp")
                                .classList.add("active-link");
                            break;
                    }
                }

                entry.target.classList.remove("hide-element");

                if (entry.target.classList.contains("skill-card")) {
                    entry.target.classList.add("display-skillcard");
                } else {
                    entry.target.classList.add("activate-element");
                }
            }
        });
    }, options);

    // Set intersection observers.
    observer.observe(header);
    allSections.forEach((section) => observer.observe(section));
    allSkillCards.forEach((card) => observer.observe(card));
    allProjectCards.forEach((project) => observer.observe(project));
};

const setMiddleName = function () {
    // Remove middle name element if it does not exist.
    if (middleNameText.innerHTML === "") middleNameText.style.display = "none";
};

const showSkillHoverEffects = function (e) {
    // Dispay corresponding skill when a skill card is hovered.
    if (!e.target.classList.contains("skill-card")) return;
    clearTimeout(skillHideTimeout);

    // Get skill text from the classname and replace underscore with space.
    const skillTextRaw = e.target.classList[1].split("--")[1];
    const skillText = skillTextRaw.replace("_", " ");

    skillTextContainer.innerText = skillText;
    skillTextContainer.classList.add("display-skilltext");

    // Remove the skill text after a set time.
    removeSkillText();
};

const removeSkillText = function () {
    clearTimeout(skillHideTimeout);
    skillHideTimeout = setTimeout(
        () => skillTextContainer.classList.remove("display-skilltext"),
        1500
    );
};

const switchWorktabs = function (e) {
    // Switch work tabs
    const clickedTabElement = e.target;
    if (!clickedTabElement.classList.contains("tab")) return;

    const clickedTab = clickedTabElement.classList[1].split("--")[1];

    companyTabs.forEach((tab) => tab.classList.remove("tab--active"));

    clickedTabElement.classList.add("tab--active");

    companyDetails.forEach((company) => {
        company.classList[1].split("--")[1] === clickedTab
            ? company.classList.remove("hidden")
            : company.classList.add("hidden");
    });
};

const initialize = function () {
    // Sets the animation steps for username in the intro animation.
    const usernameLength = introFullname.innerText.split("").length;
    root.style.setProperty("--username-char-count", +usernameLength);

    setMiddleName();
    beginIntroAnimation();
};

initialize();

/* Event Listeners */
burgerMenuButton.addEventListener("click", function (e) {
    // Hamburger menu for mobile devices.
    burgerMenuButton.classList.toggle("menu-active");
    headerNav.classList.toggle("menu-active");
    mainContainer.classList.toggle("menu-active");
});

document.addEventListener("DOMContentLoaded", () => {
    // Animate profile image on load.
    setTimeout(() => {
        profileImage.classList.add("activate-element");
    }, animationEndTime + animationEndOffset + 200);
});

// Display skill text on hover.
skillsContainer.addEventListener("mouseover", showSkillHoverEffects);

// For touch devices
skillsContainer.addEventListener("touchstart", showSkillHoverEffects);

companyTabContainer.addEventListener("click", switchWorktabs);
