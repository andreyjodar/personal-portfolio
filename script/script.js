window.addEventListener("DOMContentLoaded", () => {
    loadIdiom(currentIdiom);
    loadTheme(currentTheme); 
});

window.onload = function() {
    document.getElementById("contact-form").onsubmit = function (event) {
        event.preventDefault();
    
        let form = event.target;
    
        fetch("https://formsubmit.co/andreyviniciusjodar@gmail.com", {
            method: "POST",
            body: new FormData(form)
        }).then(response => {
            if(response.ok) {
                document.getElementById("popup").style.display="flex";
                form.reset();
            } else {
                alert("Erro ao enviar mensagem por email. Tente novamente");
            }
        }).catch(error => {
            alert("Erro de conexão.");
        });
    }
}

function closePopup() {
    document.getElementById("popup").style.display="none";
}

let currentIdiom = localStorage.getItem("language") || "en";

function changeIdiom() {
    currentIdiom = currentIdiom == "en" ? "pt" : "en";
    localStorage.setItem("language", currentIdiom);
    loadIdiom(currentIdiom);
}

function loadIdiom(idiom) {
    fetch(`json/${idiom}.json`)
    .then(data => data.json())
    .then(data => {
        translatePage(data);
    });
}

function translatePage(language) {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if(language[key]) {
            element.textContent = language[key];
        }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(element => {
        const key = element.getAttribute("data-i18n-html");
        if(language[key]) {
            element.innerHTML = language[key];
        }
    });
}

let currentTheme = localStorage.getItem("theme") || "dark";

function changeTheme() {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    loadTheme(newTheme);
}

function loadTheme(theme) {
    currentTheme = theme;
    document.body.setAttribute("data-theme", currentTheme);
}

function toggleMenu() {
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay");
    menu.classList.toggle("show");
    overlay.classList.toggle("show");
}

function closeMenu() {
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay");
    menu.classList.remove("show");
    overlay.classList.remove("show");
}