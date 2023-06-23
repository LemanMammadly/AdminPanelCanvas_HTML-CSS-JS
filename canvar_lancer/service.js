/*!
 * Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  //  Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

async function getServices() {
  let response = await fetch(
    `https://login-js-e88df-default-rtdb.firebaseio.com/services.json`
  );

  let data = await response.json();

  let products = [];

  for (let key in data) {
    data[key].id = key;
    products.push(data[key]);
  }

  let row = document.querySelector(".row");
  let div = "";
  products.forEach((item, index) => {
    div += `
    <div class="col-lg-4 col-sm-6 mb-4">
    <div class="portfolio-item">
        <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal1">
            <img class="img-fluid" style="width:400px ; height:300px" src=${item.image} alt="..." />
        </a>
        <div class="portfolio-caption">
            <div class="portfolio-caption-heading">${item.service}</div>
            <div class="portfolio-caption-heading">${item.price} $</div>
            <div class="portfolio-caption-subheading text-muted">${item.info}</div>
        </div>
    </div>
   </div>
      `;
  });
  row.innerHTML = div;
}

getServices()