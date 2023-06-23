"use strict";

let form = document.querySelector("form");

form.addEventListener("submit", createService);

async function createService(e) {
  e.preventDefault();

  let service = document.querySelector("#service");
  let info = document.querySelector("#info");
  let price = document.querySelector("#price");

  try {
    const response = await fetch(
      `https://source.unsplash.com/random/900×700/?${service}`
    );

    let services = {
      service: service.value,
      image: response.url,
      info: info.value,
      price: price.value,
    };

    const result = await fetch(
      `https://login-js-e88df-default-rtdb.firebaseio.com/services.json`,
      {
        method: "POST",
        body: JSON.stringify(services),
      }
    );
    service.value = "";
    info.value = "";
    price.value = "";
  } catch (error) {
    console.log(error);
  }
}
