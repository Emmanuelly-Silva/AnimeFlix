window.addEventListener("load", function () {
    checkListAnimes();
    clearInputs();
});

let btnStartFormAdd = document.getElementById('btn-add');
let btnStartListFavorites = document.getElementById('btn-favorites');
let btnStartListWatching = document.getElementById('btn-watching');
let listAnimes = [];
let i = 0;
let foundLink = false;
let checkObjectAnime = false;

function checkListAnimes() {
    if (listAnimes.length === 0) {
        document.getElementById("empty-anime-list").innerHTML = "Nenhum anime";
        btnStartListFavorites.classList.add("disabled");
        btnStartListWatching.classList.add("disabled");
    }
    else {
        document.getElementById("empty-anime-list").style.display = "none";
        btnStartListFavorites.classList.remove("disabled");
        btnStartListWatching.classList.remove("disabled");
    }
}

function showForm() {
    document.getElementById("catalog").style.display = "none";
    document.getElementById("add-anime").style.display = "flex";
    btnStartFormAdd.classList.add("disabled");
    btnStartListFavorites.classList.add("disabled");
    btnStartListWatching.classList.add("disabled");
}

function hideForm() {
    document.getElementById("add-anime").style.display = "none";
    document.getElementById("catalog").style.display = "flex";
    btnStartFormAdd.classList.remove("disabled");
    btnStartListFavorites.classList.remove("disabled");
    btnStartListWatching.classList.remove("disabled");
}

btnStartFormAdd.addEventListener('click', () => {
    showForm();
    clearInputs();
});

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("link").value = "";
    let radio = document.getElementsByName("rating");
    for (let i = 0; i < radio.length; i++) {
        radio[i].checked = false;
    }
}

function invalidImageAlert() {
    document.getElementById("alert").style.display = "flex";
    document.getElementById("alert-url").innerHTML = '<i class="fa-solid fa-triangle-exclamation" id="icon-alert"></i>' + 'Os formatos de imagens aceitos são .png e .jpg !';
    document.getElementById("link").value = "";
}

function pushAnimes(anime) {
    listAnimes.push(anime);
    document.getElementById("alert").style.display = "none";
    hideForm();
}

function repeatedAnimeAlert() {
    document.getElementById("alert").style.display = "flex";
    document.getElementById("alert-url").innerHTML = '<i class="fa-solid fa-triangle-exclamation" id="icon-alert"></i>' + 'Esse anime já foi adicionado !';
    document.getElementById("link").value = "";
}

function findRepeatedAnime(anime) {
    i = 1;
    listAnimes.forEach(object => {
        if (object.link == anime.link) {
            foundLink = true;
        }
    });
}

function divAnime(anime) {
    let catalog = document.getElementById("anime-list");

    if (anime.status == "watching") {
        let divAnime =
            `<div class="anime watching" id="card-anime">
            <div class="front-side">
                <img src="${anime.link}">
                <p>${anime.name}</p>
            </div>
            <div class="back-side">
                <p id="text-rating">Avaliação</p>
                <i class="fa-solid fa-tv"></i>
                <p id="value-rating">${anime.rating}</p>
            </div>
        </div>`

        catalog.innerHTML += divAnime;
    }
    else if (anime.status == "favorite") {
        let divAnime =
            `<div class="anime favorite" id="card-anime">
            <div class="front-side">
                <img src="${anime.link}">
                <p>${anime.name}</p>
            </div>
            <div class="back-side">
                <p id="text-rating">Avaliação</p>
                <i class="fa-solid fa-heart"></i>
                <p id="value-rating">${anime.rating}</p>
            </div>
        </div>`
        catalog.innerHTML += divAnime;
    }
}

function emptyInputNameAlert() {
    document.getElementById("alert").style.display = "flex";
    document.getElementById("alert-url").innerHTML = '<i class="fa-solid fa-triangle-exclamation" id="icon-alert"></i>' + 'Informe o nome do anime!';
    document.getElementById("name").value = "";
}

function emptyInputRatingAlert() {
    document.getElementById("alert").style.display = "flex";
    document.getElementById("alert-url").innerHTML = '<i class="fa-solid fa-triangle-exclamation" id="icon-alert"></i>' + 'Informe a pontuação da avaliação do anime !';
    document.getElementById("name").value = "";
}

function flipCardAnimes() {
    let cardsAnimes = document.querySelectorAll(".anime-list .anime");
    function flipCards() {
        this.classList.toggle("flip");
    }
    cardsAnimes.forEach(card => card.addEventListener('click', flipCards));
}

btnStartListFavorites.addEventListener('click', () => {
    btnStartListFavorites.classList.toggle("active");
    let animesFavorites = document.querySelectorAll(".anime.favorite");
    if (btnStartListFavorites.classList.contains("active")) {
        hideCategoryCard(animesFavorites);
    }
    else {
        showCategoryCard(animesFavorites);
    }
});

btnStartListWatching.addEventListener('click', () => {
    btnStartListWatching.classList.toggle("active");
    let animesWatching = document.querySelectorAll(".anime.watching");
    if (btnStartListWatching.classList.contains("active")) {
        hideCategoryCard(animesWatching);
    }
    else {
        showCategoryCard(animesWatching);
    }
});

function showCategoryCard(animes) {
    animes.forEach(card => {
        if (!card.classList.contains("flip")) {
            return;
        }
        else {
            card.classList.remove("flip");
        }
    });
}

function hideCategoryCard(animes) {
    animes.forEach(card => {
        if (card.classList.contains("flip")) {
            return;
        }
        else {
            card.classList.add("flip");
        }
    });
}

function addAnime() {
    let select = document.getElementById("status");
    const anime = {
        name: document.getElementById("name").value,
        link: document.getElementById("link").value,
        rating: parseInt(document.querySelector('input[name="rating"]:checked').value),
        status: select.options[select.selectedIndex].value
    }

    if (anime.name !== "") {
        if (anime.link.endsWith("jpg") || anime.link.endsWith("png")) {
            if (listAnimes.length == 0) {
                pushAnimes(anime);
                checkObjectAnime = true;
            }
            else {
                findRepeatedAnime(anime);
                if (i == 1 && foundLink == true) {
                    repeatedAnimeAlert();
                }
                else {
                    pushAnimes(anime);
                    checkObjectAnime = true;
                }
            }
        }
        else {
            invalidImageAlert();
        }
    }
    else {
        emptyInputNameAlert();
    }

    checkListAnimes();

    if (checkObjectAnime == true) {
        divAnime(anime);
    }

    flipCardAnimes();

    i = 0;
    foundLink = false;
    checkObjectAnime = false;
}