/* ============================================================ */
/* NEXT LEVEL GAMING & ESPORTS ARENA                            */
/* ============================================================ */

const experiencePrices = {
    "ultimate-gamer-pass": 1500,
    "vip-gaming-experience": 1500,
    "esports-training-package": 1500,
    "birthday-party-package": 1500,
    "virtual-reality-experience": 750,
    "racing-simulator-challenge": 750,
    "escape-room-challenge": 750
};

function formatRand(amount) {
    return "R" + amount.toLocaleString("en-ZA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/* ============================================================ */
/* PACKAGE FILTER                                               */
/* ============================================================ */

const categoryFilter = document.getElementById("category");

if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
        const rows = document.querySelectorAll("#package-table tbody tr");
        const selectedCategory = categoryFilter.value;

        rows.forEach(function (row) {
            const matchesCategory = selectedCategory === "all" || row.dataset.category === selectedCategory;
            row.hidden = !matchesCategory;
        });
    });
}

/* ============================================================ */
/* FEE ESTIMATE                                                 */
/* ============================================================ */

const quoteForm = document.getElementById("quote-form");

if (quoteForm) {
    const experienceOptions = quoteForm.querySelectorAll('input[name="experience"]');
    const bookingCount = document.getElementById("booking-count");
    const subtotalOutput = document.getElementById("quote-subtotal");
    const discountLabel = document.getElementById("quote-discount-label");
    const discountOutput = document.getElementById("quote-discount");
    const vatOutput = document.getElementById("quote-vat");
    const totalOutput = document.getElementById("quote-total");
    const quoteItemsOutput = document.getElementById("quote-items");
    const quoteFeedback = document.getElementById("quote-feedback");

    function updateQuote(showCalculatedMessage) {
        const selectedBookings = Array.from(experienceOptions).filter(function (option) {
            return option.checked;
        });
        const selectedCount = selectedBookings.length;
        const subtotal = selectedBookings.reduce(function (total, option) {
            return total + (experiencePrices[option.value] || 0);
        }, 0);

        let discountRate = 0;
        if (selectedCount === 2) {
            discountRate = 0.05;
        } else if (selectedCount === 3) {
            discountRate = 0.10;
        } else if (selectedCount >= 4) {
            discountRate = 0.15;
        }

        const discount = subtotal * discountRate;
        const discountedSubtotal = subtotal - discount;
        const vat = discountedSubtotal * 0.15;
        const total = discountedSubtotal + vat;

        const selectedLines = selectedBookings.map(function (option) {
            const label = quoteForm.querySelector('label[for="' + option.id + '"]').textContent.trim();
            return label + " — " + formatRand(experiencePrices[option.value] || 0);
        });

        quoteItemsOutput.textContent = selectedLines.length ? selectedLines.join("; ") : "No experiences selected.";
        bookingCount.textContent = selectedCount;
        subtotalOutput.textContent = formatRand(subtotal);
        discountLabel.textContent = "Discount (" + Math.round(discountRate * 100) + "%)";
        discountOutput.textContent = "– " + formatRand(discount);
        vatOutput.textContent = formatRand(vat);
        totalOutput.textContent = formatRand(total);
        if (showCalculatedMessage && selectedCount === 0) {
            quoteFeedback.textContent = "Please choose at least one experience to calculate your total.";
        } else if (showCalculatedMessage) {
            quoteFeedback.textContent = "Estimate calculated. Your total includes the applicable discount and 15% VAT.";
        } else {
            quoteFeedback.textContent = selectedCount ? "Your estimate updates as you choose experiences." : "Choose one or more experiences to see an estimate.";
        }
    }

    const calculateButton = document.getElementById("calculate-quote");
    if (calculateButton) {
        calculateButton.addEventListener("click", function () {
            updateQuote(true);
        });
    }

    const requestedExperience = new URLSearchParams(window.location.search).get("experience");
    if (requestedExperience) {
        experienceOptions.forEach(function (option) {
            if (option.value === requestedExperience) {
                option.checked = true;
            }
        });
    }

    experienceOptions.forEach(function (option) {
        option.addEventListener("change", updateQuote);
    });

    quoteForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const selectedOptions = Array.from(experienceOptions).filter(function (option) {
            return option.checked;
        });

        if (selectedOptions.length === 0) {
            quoteFeedback.textContent = "Please choose at least one experience before requesting a quote.";
            quoteForm.querySelector('input[name="experience"]').focus();
            return;
        }

        const selectedLines = selectedOptions.map(function (option) {
            const label = quoteForm.querySelector('label[for="' + option.id + '"]').textContent.trim();
            return label + " — " + formatRand(experiencePrices[option.value] || 0);
        });
        const subject = "Gaming arena quote request";
        const body = [
            "Name: " + document.getElementById("name").value.trim(),
            "Phone: " + document.getElementById("phone").value.trim(),
            "Email: " + document.getElementById("email").value.trim(),
            "Selected experiences:",
            selectedLines.join("\n"),
            "Subtotal: " + subtotalOutput.textContent,
            discountLabel.textContent + ": " + discountOutput.textContent,
            "VAT (15%): " + vatOutput.textContent,
            "Estimated total: " + totalOutput.textContent,
            "Estimate only; not a formal invoice."
        ].join("\n");

        quoteFeedback.textContent = "Your email app will open with the quote request ready to send.";
        window.location.href = "mailto:play@nextlevelgaming.co.za?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });

    updateQuote();
}

/* ============================================================ */
/* CONTACT ENQUIRY                                              */
/* ============================================================ */

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        const feedback = document.getElementById("contact-feedback");
        const emailSubject = "Website enquiry: " + subject;
        const emailBody = [
            "Name: " + name,
            "Email: " + email,
            "",
            message
        ].join("\n");

        feedback.textContent = "Your email app will open with your message ready to send.";
        window.location.href = "mailto:play@nextlevelgaming.co.za?subject=" + encodeURIComponent(emailSubject) + "&body=" + encodeURIComponent(emailBody);
    });
}
