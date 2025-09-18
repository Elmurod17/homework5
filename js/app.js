import { checkAuth } from "./check-auth.js";
import { BASE_URL, LOADER_COUNT } from "./constants.js";
import {
  elCardLoader,
  elCardSkletonTemplate,
  elInfoModal,
  elLoginLogoutButton,
  elModalLoginButton,
} from "./html-selection.js";
import { ui } from "./ui.js";

if (checkAuth()) {
  elLoginLogoutButton.innerText = "Log out";
} else {
  elLoginLogoutButton.innerText = "Log in";
}

function init() {
  loader(true);
  fetch(BASE_URL + "/cars")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      ui(res.data);
    })
    .catch(() => {})
    .finally(() => {
      loader(false);
    });
}

function loader(bool) {
  if (bool) {
    elCardLoader.innerHTML = "";
    elCardLoader.classList.remove("hidden");
    let i = 0;
    while (true) {
      if (i === LOADER_COUNT) break;
      const clone = elCardSkletonTemplate.cloneNode(true).content;
      elCardLoader.append(clone);
      i++;
    }
  } else {
    elCardLoader.classList.add("hidden");
  }
}

// crud

document.addEventListener("click", (e) => {
  // delete
  if (e.target.classList.contains("js-delete")) {
    if (checkAuth()) {
      //
    } else {
      elInfoModal.showModal();
    }
  }
  // edit
  if (e.target.classList.contains("js-edit")) {
    if (checkAuth()) {
      //
    } else {
      elInfoModal.showModal();
    }
  }
});

init();
// events
elLoginLogoutButton.addEventListener("click", () => {
  if (checkAuth()) {
    localStorage.removeItem("token");
  } else {
    elLoginLogoutButton.innerText = "Log in";
    location.href = "./pages/register.html";

    location.reload();
  }
});

elModalLoginButton.addEventListener("click", () => {
  location.href = "./pages/register.html";
});
