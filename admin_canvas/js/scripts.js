/*!
 * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }
});

onload = getServices;

let services = [];

async function getServices() {
  let response = await fetch(
    `https://login-js-e88df-default-rtdb.firebaseio.com/services.json`
  );

  let data = await response.json();

  for (let key in data) {
    data[key].id = key;
    services.push(data[key]);
  }

  let tbody = document.querySelector("tbody");
  let tr = "";
  services.forEach((item, index) => {
    tr += `
    <tr id="item-${item.id}">
    <td>${item.id}</td>
    <td>${item.service}</td>
    <td><img src="${item.image}"/> </td>
    <td>${item.info.slice(0, 70) + ".."}</td>
    <td>${item.price} $</td>
    <td>
    <button onclick="updateService('${
      item.id
    }')" class="btn btn-success btn-sm" type="button"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal">Update</button>
        <button onclick="Delete('${
          item.id
        }')" class="btn btn-danger btn-sm deleteitem">Delete</button>
    </td>
    </tr>
    `;
  });
  tbody.innerHTML = tr;
}

async function Delete(id) {
  try {
    const result = await Swal.fire({
      title: "Əminsinizmi?",
      text: "Bu item'i silmək istədiyinizdən əminsinizmi?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Bəli, sil",
      cancelButtonText: "Xeyr",
    });

    if (result.isConfirmed) {
      let response = await fetch(
        `https://login-js-e88df-default-rtdb.firebaseio.com/services/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.status == 200) {
        services = services.filter((item) => item.id !== id);
        const removeElement = document.getElementById("item-" + id);
        if (removeElement) {
          removeElement.remove();
        }
        Swal.fire("Silindi!", "Item silindi.", "success");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateService(id) {
  try {
    let response = await fetch(
      `https://login-js-e88df-default-rtdb.firebaseio.com/services/${id}.json`
    );
    let serviceData = await response.json();

    let serviceInput = document.querySelector("#serviceModal");
    let infoTextarea = document.querySelector("#infoModal");
    let priceInput = document.querySelector("#priceModal");

    serviceInput.value = serviceData.service;
    infoTextarea.value = serviceData.info;
    priceInput.value = serviceData.price;


    const responseImg = await fetch(
      `https://source.unsplash.com/random/900×700/?${serviceInput.value}`
    );

    let saveChangesButton = document.querySelector("#change");


      saveChangesButton.addEventListener("click", async () => {
        if (serviceInput.value && infoTextarea.value && priceInput.value) {
        let updatedService = {
          service: serviceInput.value,
          image:responseImg.url,
          info: infoTextarea.value,
          price: priceInput.value,
        };
        response = await fetch(
          `https://login-js-e88df-default-rtdb.firebaseio.com/services/${id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(updatedService),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let modal = document.querySelector("#exampleModal");
        let bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
        window.location.reload();
      } else {
        alert("Please fill in all fields");
      }
      });
  } catch (error) {
    console.log(error);
  }
}
