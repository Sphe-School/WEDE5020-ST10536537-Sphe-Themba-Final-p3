//  GALLERY LIGHTBOX

// How to Find all the gallery images
const galleryImages = document.querySelectorAll(".gallery-card img");

if (galleryImages.length > 0) {

    // Create the lightbox window
    const lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Gallery image viewer");

    // Add the buttons and image inside the lightbox
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close image viewer">
            &times;
        </button>

        <button class="lightbox-prev" aria-label="Previous image">
            &#10094;
        </button>

        <div class="lightbox-content">
            <img class="lightbox-image" src="" alt="">
            <p class="lightbox-caption"></p>
        </div>

        <button class="lightbox-next" aria-label="Next image">
            &#10095;
        </button>
    `;

    // Add the lightbox to the webpage
    document.body.appendChild(lightbox);


    // Find the elements inside the lightbox.
    const largeImage = lightbox.querySelector(".lightbox-image");
    const caption = lightbox.querySelector(".lightbox-caption");

    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");


    // Keep track of the image currently being displayed
    let currentImageIndex = 0;


    // Function to display an image
    function showImage(index) {

        currentImageIndex =
            (index + galleryImages.length) % galleryImages.length;

        const selectedImage = galleryImages[currentImageIndex];

        largeImage.src = selectedImage.src;
        largeImage.alt = selectedImage.alt;

        const card = selectedImage.closest(".gallery-card");

        const heading = card.querySelector("h3");

        caption.textContent = heading
            ? heading.textContent
            : selectedImage.alt;
    }


    // Open the lightbox when an image is clicked
    galleryImages.forEach(function (image, index) {

        image.addEventListener("click", function () {

            showImage(index);

            lightbox.classList.add("active");

            closeButton.focus();

        });

    });


    // Function to close the lightbox
    function closeLightbox() {

        lightbox.classList.remove("active");

    }


    // Close button
    closeButton.addEventListener("click", closeLightbox);


    // Previous image button
    previousButton.addEventListener("click", function () {

        showImage(currentImageIndex - 1);

    });


    // Next image button
    nextButton.addEventListener("click", function () {

        showImage(currentImageIndex + 1);

    });


    // Close when clicking outside the image
    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    // Keyboard controls
    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) {

            return;

        }

        if (event.key === "Escape") {

            closeLightbox();

        }

        else if (event.key === "ArrowRight") {

            showImage(currentImageIndex + 1);

        }

        else if (event.key === "ArrowLeft") {

            showImage(currentImageIndex - 1);

        }

    });

}




// DYNAMIC SERVICES SEARCH AND FILTER


// Find the search box and category selector.
const serviceSearch = document.querySelector("#service-search");

const serviceCategory = document.querySelector("#service-category");

const serviceCards = document.querySelectorAll(".service-card");

const serviceCount = document.querySelector("#service-count");

const servicesList = document.querySelector("#services-list");


if (serviceSearch && serviceCategory && serviceCards.length > 0) {

    // Create a message for when no services are found.
    const noServicesMessage = document.createElement("p");

    noServicesMessage.className = "no-services";

    noServicesMessage.textContent =
        "No services match your search. Please try another search.";

    servicesList.appendChild(noServicesMessage);


    // Function to search and filter services.
    function filterServices() {

        const searchText = serviceSearch.value.toLowerCase().trim();

        const selectedCategory = serviceCategory.value;

        let visibleServices = 0;


        // Check each service card.
        serviceCards.forEach(function (card) {

            const cardText = card.textContent.toLowerCase();

            const cardCategory = card.dataset.category;


            // Check if the service matches the search.
            const matchesSearch = cardText.includes(searchText);


            // Check if the category matches.
            const matchesCategory =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;


            // Display matching services.
            if (matchesSearch && matchesCategory) {

                card.classList.remove("hidden");

                visibleServices++;

            }

            else {

                card.classList.add("hidden");

            }

        });


        // Update the number of services displayed.
        serviceCount.textContent =
            "Showing " + visibleServices +
            " of " + serviceCards.length + " services";


        // Display a message if no services match.
        noServicesMessage.style.display =
            visibleServices === 0 ? "block" : "none";

    }


    // Run the filter when someone types.
    serviceSearch.addEventListener("input", filterServices);


    // Run the filter when someone changes the category.
    serviceCategory.addEventListener("change", filterServices);

}


// Check whether the visitor has already accepted cookies
const cookieAccepted = localStorage.getItem("bigTechCookieConsent");

// Find the page body
const pageBody = document.body;

// Create the blue screen overlay
const overlay = document.createElement("div");
overlay.className = "cookie-overlay";

// Create the cookie message
const banner = document.createElement("div");
banner.className = "cookie-banner";

banner.innerHTML = `
    <h2>We Value Your Privacy</h2>

    <p>
        Big Tech Solutions uses cookies and similar storage
        technologies to improve your browsing experience.
        Please accept to continue.
    </p>

    <button class="cookie-accept" id="acceptCookies">
        Accept Cookies
    </button>
`;

// if cookies have not been accepted
if (cookieAccepted !== "accepted") {

    pageBody.appendChild(overlay);
    pageBody.appendChild(banner);

}

// Accept cookies button
document.addEventListener("click", function(event) {

    if (event.target && event.target.id === "acceptCookies") {

        // Save the visitor's choice
        localStorage.setItem("bigTechCookieConsent", "accepted");

        // Remove the blue screen and cookie message
        overlay.remove();
        banner.remove();

    }

});
