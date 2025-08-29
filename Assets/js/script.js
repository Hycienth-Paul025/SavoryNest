
/// MENU BUTTON FUNCTION



//// MENU CTA BUTTON FUNCTION



/* 
menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  MenuContainer.classList.toggle("show-more");

  if (MenuContainer.classList.contains("show-more")) {
    menuBtn.textContent = "SHOW LESS";
  } else {
    menuBtn.textContent = "SHOW MORE";
  }

  console.log("clicked");
}); */
 


//// CAROUSEL FUNCTION

const duplicate = document.querySelector(".sponsors-carousel").cloneNode(true);

let parent = document.querySelector(".sponsors-content").appendChild(duplicate);



/// ACCORDION FUNCTION

const accordionEl = document.querySelectorAll(" .faq-question");

function AcordionEffect() {
  const expand = this.getAttribute("aria-expanded") == "true";

  accordionEl.forEach((togItem) =>
    togItem.setAttribute("aria-expanded", "false")
  );

  if (!expand) {
    this.setAttribute("aria-expanded", "true");
  } else {
    this.setAttribute("aria-expanded", "false");
  }
  console.log("clicked");
}

accordionEl.forEach((toggle) => {
  toggle.addEventListener("click", AcordionEffect);
});


///////IMAGE CARD  SLIDING LOOP FUNCTION

const cardContainer = document.querySelector(".cards-container");

const cardsList = document.querySelector(".cards-container-list");

const arrowBtn = document.querySelectorAll(".cards-navigation-btn");

const cardWidth = cardsList.querySelector(".cards-container-slide").offsetWidth;

const cardsListChildren = [...cardsList.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerview = Math.round(cardsList.offsetWidth / cardWidth + 10);

/// button funcction

arrowBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    cardsList.scrollLeft += btn.id === "left" ? -cardWidth : cardWidth;
  });
});

/// Drag sliding function

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
  .forEach((card) => [
    cardsList.insertAdjacentHTML("afterbegin", card.outerHTML),
  ]);

cardsListChildren
  .slice(0, cardPerview)
  .forEach((card) => [
    cardsList.insertAdjacentHTML("beforeend", card.outerHTML),
  ]);

///// Infinite scrolling

cardsList.addEventListener("scroll", () => {
  if (cardsList.scrollLeft === 0) {
    cardsList.classList.add("no-scroll");

    cardsList.scrollLeft = cardsList.scrollWidth - 2 * cardsList.offsetWidth;

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
  if (!cardContainer.matches(":hover")) autoplay();
});

/// AUTOPLAY SLIDING CARDs

function autoplay() {
  if (window.innerWidth < 800) return;

  timeoutId = setTimeout(() => (cardsList.scrollLeft += cardWidth), 2500);
}

autoplay();

cardContainer.addEventListener("mouseenter", () => clearTimeout(timeoutId));

cardContainer.addEventListener("mouseleave", autoplay);
