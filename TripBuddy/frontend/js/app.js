"use strict";

/*
 * TRIP BUDDY - FRONTEND APPLICATION
 *
 * Current responsibilities:
 * 1. Mobile navigation
 * 2. Translation form validation
 * 3. Clear form functionality
 * 4. Travel survival phrase display
 *
 * Real translation will be connected to the Java backend
 * in a later step. No fake translation is generated here.
 */


/* =========================================
   DOM ELEMENTS
   ========================================= */

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-navigation");

const sourceLanguage = document.querySelector("#source-language");
const targetLanguage = document.querySelector("#target-language");
const translationText = document.querySelector("#translation-text");

const translateButton = document.querySelector("#translate-button");
const clearButton = document.querySelector("#clear-button");
const translationResult = document.querySelector("#translation-result");

const featureButtons = document.querySelectorAll(".feature-button");
const survivalResult = document.querySelector("#survival-result");


/* =========================================
   MOBILE NAVIGATION
   ========================================= */

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("navigation-open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("navigation-open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}


/* =========================================
   MESSAGE DISPLAY HELPER
   ========================================= */

function displayTranslationMessage(message, type = "info") {
    if (!translationResult) {
        return;
    }

    translationResult.innerHTML = "";

    const messageElement = document.createElement("p");
    messageElement.className = `result-message result-${type}`;
    messageElement.textContent = message;

    translationResult.appendChild(messageElement);
}


/* =========================================
   TRANSLATION FORM VALIDATION
   ========================================= */

if (translateButton) {
    translateButton.addEventListener("click", () => {
        const source = sourceLanguage?.value.trim() || "";
        const target = targetLanguage?.value.trim() || "";
        const text = translationText?.value.trim() || "";

        if (!source || !target) {
            displayTranslationMessage(
                "Please select both source and target languages.",
                "error"
            );
            return;
        }

        if (source === target) {
            displayTranslationMessage(
                "Source and target languages must be different.",
                "error"
            );
            return;
        }

        if (!text) {
            displayTranslationMessage(
                "Please enter a message to translate.",
                "error"
            );
            return;
        }

        if (text.length > 2000) {
            displayTranslationMessage(
                "Please keep your message within 2000 characters.",
                "error"
            );
            return;
        }

        /*
         * We do not generate a fake translation.
         * The real API connection will be added in the backend step.
         */

        displayTranslationMessage(
            "Your message is valid. The translation service will be connected through the Java backend.",
            "info"
        );
    });
}


/* =========================================
   CLEAR TRANSLATION FORM
   ========================================= */

if (clearButton) {
    clearButton.addEventListener("click", () => {
        if (sourceLanguage) {
            sourceLanguage.value = "";
        }

        if (targetLanguage) {
            targetLanguage.value = "";
        }

        if (translationText) {
            translationText.value = "";
        }

        if (translationResult) {
            translationResult.innerHTML = `
                <p class="result-placeholder">
                    Your translation will appear here.
                </p>
            `;
        }
    });
}


/* =========================================
   TRAVEL SURVIVAL PHRASES
   ========================================= */

const survivalPhrases = {
    transport: {
        title: "Transport Phrases",
        phrases: [
            {
                phrase: "Where is the nearest bus stop?",
                meaning: "Ask for the nearest bus stop."
            },
            {
                phrase: "How much is the ticket?",
                meaning: "Ask about the ticket price."
            },
            {
                phrase: "Please take me to this address.",
                meaning: "Show the address to a taxi driver."
            },
            {
                phrase: "Does this train go to the city centre?",
                meaning: "Confirm the train destination."
            }
        ]
    },

    food: {
        title: "Food and Dining Phrases",
        phrases: [
            {
                phrase: "Can I see the menu, please?",
                meaning: "Request the restaurant menu."
            },
            {
                phrase: "I would like to order this.",
                meaning: "Use this when ordering a selected item."
            },
            {
                phrase: "Does this contain nuts?",
                meaning: "Ask whether the food contains nuts."
            },
            {
                phrase: "Can I have the bill, please?",
                meaning: "Request the restaurant bill."
            }
        ]
    },

    hotel: {
        title: "Hotel Phrases",
        phrases: [
            {
                phrase: "I have a reservation.",
                meaning: "Tell the hotel staff that you have a booking."
            },
            {
                phrase: "What time is check-in?",
                meaning: "Ask about the check-in time."
            },
            {
                phrase: "Where is my room?",
                meaning: "Ask for directions to your room."
            },
            {
                phrase: "Could I get some help, please?",
                meaning: "Request assistance from hotel staff."
            }
        ]
    },

    medical: {
        title: "Medical Help Phrases",
        phrases: [
            {
                phrase: "I need medical assistance.",
                meaning: "Tell someone that you need medical help."
            },
            {
                phrase: "Where is the nearest hospital?",
                meaning: "Ask for the nearest hospital."
            },
            {
                phrase: "Please call an ambulance.",
                meaning: "Request emergency medical transport."
            },
            {
                phrase: "I need to speak to a doctor.",
                meaning: "Request to speak with a doctor."
            }
        ]
    }
};


/* =========================================
   DISPLAY SURVIVAL PHRASES
   ========================================= */

function displaySurvivalPhrases(category) {
    if (!survivalResult) {
        return;
    }

    const selectedCategory = survivalPhrases[category];

    if (!selectedCategory) {
        survivalResult.textContent =
            "The selected travel category could not be found.";
        return;
    }

    survivalResult.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = selectedCategory.title;

    const phraseList = document.createElement("ul");

    selectedCategory.phrases.forEach((item) => {
        const listItem = document.createElement("li");

        const phraseText = document.createElement("strong");
        phraseText.textContent = item.phrase;

        const meaningText = document.createElement("p");
        meaningText.textContent = item.meaning;

        listItem.appendChild(phraseText);
        listItem.appendChild(meaningText);
        phraseList.appendChild(listItem);
    });

    survivalResult.appendChild(heading);
    survivalResult.appendChild(phraseList);

    survivalResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


featureButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;

        if (category) {
            displaySurvivalPhrases(category);
        }
    });
});


/* =========================================
   BASIC APPLICATION CHECK
   ========================================= */

console.log("Trip Buddy frontend loaded successfully.");

