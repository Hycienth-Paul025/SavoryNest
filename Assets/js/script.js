"use strict";

document.addEventListener("DOMContentLoaded", () => {
  ///// NAVBAR MOBILE FUNCTION
  const NavCont = document.querySelector(".navbar");
  const Navbar = document.querySelector(".navbar nav");
  const NavOverlay = document.querySelector(".navbar-overlay");
  const NavToggle = document.querySelector(".navbar-hamburger");
  const NavClose = document.querySelector(".navbar-close");
  const Navlinks = document.querySelectorAll(".navbar-link");

  ///// NAVBAR CONTAINER FUNCTION
  function navShadow() {
    if (NavCont) {
      window.scrollY >= 50
        ? NavCont.classList.add("shadow")
        : NavCont.classList.remove("shadow");
    }
  }
  window.addEventListener("scroll", navShadow);

  /// NAV-TOGGLE FUNCTION
  if (NavToggle && Navbar && NavOverlay) {
    NavToggle.addEventListener("click", () => {
      Navbar.classList.add("show");
      NavOverlay.classList.add("visible");
    });
  }

  /// NAVCLOSE FUNCTION
  if (NavClose && Navbar && NavOverlay) {
    NavClose.addEventListener("click", () => {
      Navbar.classList.remove("show");
      NavOverlay.classList.remove("visible");
    });
  }

  // OVERLAY FUNCTION
  if (NavOverlay && Navbar) {
    NavOverlay.addEventListener("click", () => {
      Navbar.classList.remove("show");
      NavOverlay.classList.remove("visible");
    });
  }

  ////// NAVBAR LINKS FUNCTIONS

  if (Navlinks.length > 0 && Navbar && NavOverlay) {
    Navlinks.forEach((links) =>
      links.addEventListener("click", () => {
        removeActive();
        links.classList.add("active-btn");

        Navbar.classList.remove("show");
        NavOverlay.classList.remove("visible");
      })
    );
  }

  function removeActive() {
    Navlinks.forEach((n) => {
      n.classList.remove("active-btn");
    });
  }

  //// NAVBAR ACTIVE LINK

  /// DARK AND LIGHT THEME MODE
  const body = document.body;
  const moonIcon = document.querySelector(".navbar-theme-icon.moon");
  const sunIcon = document.querySelector(".navbar-theme-icon.sun");

  function setTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
      if (sunIcon) sunIcon.classList.add("activate");
      if (moonIcon) moonIcon.classList.remove("activate");
      if (Navbar) Navbar.classList.remove("show");
      if (NavOverlay) NavOverlay.classList.remove("visible");
    } else {
      body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
      if (moonIcon) moonIcon.classList.add("activate");
      if (sunIcon) sunIcon.classList.remove("activate");
      if (Navbar) Navbar.classList.remove("show");
      if (NavOverlay) NavOverlay.classList.remove("visible");
    }
  }

  if (moonIcon && sunIcon) {
    moonIcon.addEventListener("click", () => setTheme("dark"));
    sunIcon.addEventListener("click", () => setTheme("light"));
  }

  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  initTheme();

  //////    MODAL FUNCTION
  const modalEL = document.querySelector(".modal");
  const modalCLose = document.querySelector(".modal-close");
  const modalCancel = document.getElementById("modal-cancel");

  if (modalCLose && modalCancel) {
    modalCLose.addEventListener("click", () => {
      modalEL.classList.remove("open");
    });
    modalCancel.addEventListener("click", () => {
      if (modalEL) modalEL.classList.remove("open");
    });
  }

  // cards Book Now Button Function
  const orderBtn = document.querySelectorAll(".cards-container-content a");
  orderBtn.forEach((btns) =>
    btns.addEventListener("click", (e) => {
      e.preventDefault();
      if (modalEL) modalEL.classList.add("open");
    })
  );



  
  /// MENU FILTERATION BUTTON FUNCTION
  const filterBtn = document.querySelectorAll(".menu-btn a");
  const filterCards = document.querySelectorAll(".menu-image");

  function filterate(e) {
    const currentActive = document.querySelector(".active");
    if (currentActive) {
      currentActive.classList.remove("active");
    }
    e.target.classList.add("active");
    e.preventDefault();

    let dataFilter = e.target.getAttribute("data-filter");

    filterCards.forEach((cards) => {
      cards.classList.add("Inactive");
      if (
        cards.getAttribute("data-name") === dataFilter ||
        dataFilter === "all"
      ) {
        cards.classList.remove("Inactive");
      }
    });
  }
  if (filterBtn.length > 0) {
    filterBtn.forEach((btns) => btns.addEventListener("click", filterate));
  }

  //// CAROUSEL FUNCTION
  const carousel = document.querySelector(".sponsors-carousel");
  if (carousel) {
    const duplicate = carousel.cloneNode(true);
    const sponsorsContent = document.querySelector(".sponsors-content");
    if (sponsorsContent) {
      sponsorsContent.appendChild(duplicate);
    }
  }

  /// ACCORDION FUNCTION
  const accordionEl = document.querySelectorAll(".faq-question");
  if (accordionEl.length > 0) {
    function AcordionEffect() {
      const expand = this.getAttribute("aria-expanded") === "true";
      accordionEl.forEach((togItem) =>
        togItem.setAttribute("aria-expanded", "false")
      );
      if (!expand) {
        this.setAttribute("aria-expanded", "true");
      } else {
        this.setAttribute("aria-expanded", "false");
      }
    }
    accordionEl.forEach((toggle) => {
      toggle.addEventListener("click", AcordionEffect);
    });
  }



  ///////   IMAGE CARD SLIDING LOOP FUNCTION
  const cardContainer = document.querySelector(".cards-container");
  const cardsList = document.querySelector(".cards-container-list");
  const arrowBtn = document.querySelectorAll(".cards-navigation-btn");

  if (cardsList) {
    const firstCard = cardsList.querySelector(".cards-container-slide");
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const cardsListChildren = [...cardsList.children];
      let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;
      let cardPerview = Math.round(cardsList.offsetWidth / cardWidth + 10);
      arrowBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          cardsList.scrollLeft += btn.id === "left" ? -cardWidth : cardWidth;
        });
      });
      cardsList.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        cardsList.scrollLeft = startScrollLeft - (e.pageX - startX);
      });
      cardsList.addEventListener("mousedown", (e) => {
        isDragging = true;
        cardsList.classList.add("grab");
        startX = e.pageX;
        startScrollLeft = cardsList.scrollLeft;
      });
      document.addEventListener("mouseup", () => {
        isDragging = false;
        cardsList.classList.remove("grab");
      });
      cardsListChildren
        .slice(-cardPerview)
        .reverse()
        .forEach((card) => {
          cardsList.insertAdjacentHTML("afterbegin", card.outerHTML);
        });
      cardsListChildren.slice(0, cardPerview).forEach((card) => {
        cardsList.insertAdjacentHTML("beforeend", card.outerHTML);
      });
      cardsList.addEventListener("scroll", () => {
        if (cardsList.scrollLeft === 0) {
          cardsList.classList.add("no-scroll");
          cardsList.scrollLeft =
            cardsList.scrollWidth - 2 * cardsList.offsetWidth;
          cardsList.classList.remove("no-scroll");
        } else if (
          Math.ceil(cardsList.scrollLeft) ===
          cardsList.scrollWidth - cardsList.offsetWidth
        ) {
          cardsList.classList.add("no-scroll");
          cardsList.scrollLeft = cardsList.offsetWidth;
          cardsList.classList.remove("no-scroll");
        }
        clearTimeout(timeoutId);
        if (cardContainer && !cardContainer.matches(":hover")) autoplay();
      });
      function autoplay() {
        if (window.innerWidth < 800) return;
        timeoutId = setTimeout(() => (cardsList.scrollLeft += cardWidth), 2500);
      }
      autoplay();
      if (cardContainer) {
        cardContainer.addEventListener("mouseenter", () =>
          clearTimeout(timeoutId)
        );
        cardContainer.addEventListener("mouseleave", autoplay);
      }
    }
  }




  /////  MEMBERSHIP JOIN BUTTON FUNCTION

  const memberBtn = document.querySelector(".member-btn");

  memberBtn.addEventListener("click", () => {
    modalEL.classList.add("open");
  });




  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: "2500",
    delay: 300,
    // reset: true,
  });

  /// About scroll Reveal

  sr.reveal(".about-details-card, .menu-image, .testimonials-card", {
    interval: 100,
  });

  sr.reveal(".about-chef-description", { origin: "right" });

  sr.reveal(".about-chef-description", { origin: "right" });

  /// Chef
  sr.reveal(".chef, .hero", { origin: "left" });

  /// Sponsor

  sr.reveal(".sponsors");

  /// Cards

  sr.reveal(".cards-container");
});
