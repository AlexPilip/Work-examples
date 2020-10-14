"user strict";

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth(callback) {
  logInInput.style.borderColor = "";
  modalAuth.classList.toggle("is-open");
}
// modalAuth.classList.add('hello');
// console.log(modalAuth.classList.contains('hello'));
// modalAuth.classList.remove('modal-auth');
// buttonAuth.addEventListener('click', function(){
//   console.log('h');
// })

// buttonAuth.addEventListener('click', console.log('ds'));
// buttonAuth.removeEventListener('click',toggleModalAuth);

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const logInInput = document.getElementById("login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const buttonLogin = document.querySelector(".button-login");
const cardsRestaurant = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem("gloDelivery");
console.log(login);

const getData = async function (url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url},
     статус ошибки ${response.status}`);
  }
  return await response.json();
};
console.log(getData("./db/partners.json"));
console.log(getData("./db/food-band.json"));

const valid = function (str) {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  return nameReg.test(str);
};
function returnMain() {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
}

function authorized() {
  console.log("авторизован");
  userName.textContent = login;
  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";
  buttonOut.addEventListener("click", logOut);

  function logOut() {
    login = null;
    localStorage.removeItem("gloDelivery");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
    returnMain();
  }
}

function notAuthorized() {
  console.log("не авторизован");

  function logIn(event) {
    event.preventDefault();

    if (valid(logInInput.value)) {
      login = logInInput.value;
      console.log(login);
      localStorage.setItem("gloDelivery", login);
      toggleModalAuth();
      logInForm.reset();
      checkAuth();
    } else {
      logInInput.style.borderColor = "red";
      logInInput.value = "";
    }
    buttonAuth.removeEventListener("click", toggleModalAuth);
    closeAuth.removeEventListener("click", toggleModalAuth);
    logInForm.removeEventListener("submit", logIn);
  }

  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCardRestaurants({
  image,
  kitchen,
  name,
  price,
  stars,
  products,
  time_of_delivery: timeOfDelivery,
}) {
  // console.log(image);
  // console.log(kitchen);
  // console.log(name);
  // console.log(price);
  // console.log(stars);
  // console.log(products);
  // console.log(time_of_delivery);

  const card = `
    <a class="card card-restaurant" data-products ='${products}'>;
              <img src="${image}" alt="image" class="card-image"/>
              <div class="card-text">
                <div class="card-heading">
                   <h3 class="card-title">${name}</h3>
                  <span class="card-tag tag">${timeOfDelivery}мин</span>
                </div>
                <div class="card-info">
                  <div class="rating">
                    ${stars}
                  </div>
                  <div class="price">От ${price} ₽</div>
                  <div class="category">${kitchen}</div>
                </div>
              </div>
            </a>
    `;
  cardsRestaurant.insertAdjacentHTML("beforeend", card);
}

// Когда кляцаем на тануки, получаем section
function createCardGood(goods) {
  console.log(goods);
  const { description, id, image, price } = goods;

  const card = document.createElement("div");
  card.className = "card";
  card.insertAdjacentHTML(
    "beforeend",
    `			<img src="img/pizza-plus/pizza-girls.jpg" alt="image" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Девичник</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">Соус томатный, постное тесто, нежирный сыр, кукуруза, лук,
									маслины,
									грибы, помидоры, болгарский перец.
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">450 ₽</strong>
							</div>
						</div>
  `
  );
  cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(event) {
  const target = event.target;

  // Когда click на ТАНУКИ убераеться контейнер промо
  if (login) {
    // const restaurant = target.parentElement;
    const restaurant = target.closest(".card-restaurant");
    if (restaurant) {
      console.log(restaurant.dataset.products);
      cardsMenu.textContent = "";
      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");
      getData(`./db/${restaurant.dataset.products}`).then(function (data) {
        data.forEach(createCardGood);
      });
    } else {
      toggleModalAuth();
    }
  }
}

function init() {
  getData("./db/partners.json").then(function (data) {
    data.forEach(createCardRestaurants);
  });

  cartButton.addEventListener("click", toggleModal);

  close.addEventListener("click", toggleModal);
  // Событие на cards
  cardsRestaurant.addEventListener("click", openGoods);

  // Когда click на LOGO возвращается контейнер промо
  logo.addEventListener("click", function () {
    containerPromo.classList.remove("hide");
    restaurants.classList.remove("hide");
    menu.classList.add("hide");
  });

  checkAuth();

  new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 1000,
    },
  });
}
init();
