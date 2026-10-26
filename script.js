const navbar = document.getElementById("navbar");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("pretraga");
const searchToggle = document.getElementById("searchToggle");

let lastScrollY = window.scrollY;
let hideTimer;

function updateNavbar() {
  const currentScrollY = window.scrollY;

  clearTimeout(hideTimer);

  if (currentScrollY <= 0 || currentScrollY < lastScrollY) {
    // Show navbar when scrolling up or at the top
    navbar.classList.remove(
      "navbar-hidden",
      "navbar-red-hidden",
      "navbar-border-hidden"
    );
  } else if (currentScrollY > lastScrollY) {
    // Step 1: Hide the blue border
    navbar.classList.add("navbar-border-hidden");

    // Step 2: Fade out the red background and contents
    hideTimer = setTimeout(() => {
      navbar.classList.add("navbar-red-hidden");

      // Step 3: Slide the navbar away
      hideTimer = setTimeout(() => {
        navbar.classList.add("navbar-hidden");
      }, 300);
    }, 300);
  }

  lastScrollY = currentScrollY;
}

window.addEventListener("scroll", updateNavbar, {
  passive: true
});

updateNavbar();

searchToggle.addEventListener("click", function () {
  const isOpen = searchContainer.classList.toggle("active");

  searchToggle.setAttribute("aria-expanded", isOpen);
  searchToggle.setAttribute(
    "aria-label",
    isOpen ? "Zatvori pretragu" : "Otvori pretragu"
  );

  if (isOpen) {
    searchInput.focus();
  } else {
    searchInput.value = "";
  }
});

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    searchContainer.classList.remove("active");
    searchToggle.setAttribute("aria-expanded", "false");
    searchToggle.setAttribute("aria-label", "Otvori pretragu");
    searchToggle.focus();
  }

  if (event.key === "Enter") {
    const query = searchInput.value.trim();

    if (query !== "") {
      window.find(query);
    }
  }
});