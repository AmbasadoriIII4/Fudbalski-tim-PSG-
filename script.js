const navbar = document.getElementById("navbar");

let lastScrollY = window.scrollY; let hideTimer;

function updateNavbar() { const currentScrollY = window.scrollY;

clearTimeout(hideTimer);

if (currentScrollY <= 0) { // Restore everything only at the top navbar.classList.remove( "navbar-hidden", "navbar-red-hidden", "navbar-border-hidden" ); } else { // Keep the navbar hidden regardless of scroll direction navbar.classList.add("navbar-border-hidden");

hideTimer = setTimeout(() => {
  navbar.classList.add("navbar-red-hidden");

  hideTimer = setTimeout(() => {
    navbar.classList.add("navbar-hidden");
  }, 300);
}, 300);


}

lastScrollY = currentScrollY; }

window.addEventListener("scroll", updateNavbar, { passive: true });

// Set the correct state on page load updateNavbar();