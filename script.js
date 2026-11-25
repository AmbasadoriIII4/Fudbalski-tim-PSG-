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

const scrollTopBtn = document.getElementById("nazadNaVrh");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Interakcija na stranici Prodavnica
const sopPretraga = document.getElementById("sopPretraga");
const dresKartice = document.querySelectorAll(".dres-kartica");

if (sopPretraga && dresKartice.length) {
  sopPretraga.addEventListener("input", function () {
    const upit = this.value.trim().toLowerCase();
    dresKartice.forEach((kartica) => {
      const tekst = kartica.textContent.toLowerCase();
      kartica.style.display = tekst.includes(upit) ? "" : "none";
    });
  });
}

const detaljNaziv = document.getElementById("detaljNaziv");
const detaljCena = document.getElementById("detaljCena");
const detaljGlavnaSlika = document.getElementById("detaljGlavnaSlika");
const korpaPoruka = document.getElementById("korpaPoruka");

document.querySelectorAll(".dres-kartica .btn-kupi").forEach((btn) => {
  btn.addEventListener("click", function () {
    const kartica = this.closest(".dres-kartica");
    if (!kartica) return;
    if (detaljNaziv) detaljNaziv.textContent = kartica.dataset.punNaziv;
    if (detaljCena) detaljCena.textContent = "Cena: " + kartica.dataset.cena;
    if (detaljGlavnaSlika) detaljGlavnaSlika.src = kartica.dataset.slika;
    if (korpaPoruka) korpaPoruka.textContent = "";
    document.getElementById("dresDetalj")?.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".minijatura-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".minijatura-btn")
      .forEach((b) => b.classList.remove("aktivna"));
    this.classList.add("aktivna");
    if (detaljGlavnaSlika && this.dataset.img) {
      detaljGlavnaSlika.src = this.dataset.img;
    }
  });
});

["#polOpcije .opcija-btn", "#velicinaOpcije .opcija-btn"].forEach((selektor) => {
  document.querySelectorAll(selektor).forEach((btn) => {
    btn.addEventListener("click", function () {
      this.parentElement
        .querySelectorAll(".opcija-btn")
        .forEach((b) => b.classList.remove("aktivna"));
      this.classList.add("aktivna");
    });
  });
});

const dodajUKorpuBtn = document.getElementById("dodajUKorpu");
if (dodajUKorpuBtn && korpaPoruka) {
  dodajUKorpuBtn.addEventListener("click", function () {
    const pol =
      document.querySelector("#polOpcije .opcija-btn.aktivna")?.textContent ||
      "MUŠKO";
    const velicina =
      document.querySelector("#velicinaOpcije .opcija-btn.aktivna")
        ?.textContent || "M";
    const naziv = detaljNaziv?.textContent || "Dres";
    korpaPoruka.textContent = `Dodato u korpu: ${naziv} (${pol}, veličina ${velicina}).`;
  });
}

/* Dodati za prodavnicu da može da se izabere koji god artikl i da se doda lepo u korpicu kroz if i addEventListener i tako ta čuda :) */