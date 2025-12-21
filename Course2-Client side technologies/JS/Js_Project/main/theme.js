const themeBtn = document.querySelector("#theme");
const dashboard = document.querySelector("#dashboard");
const nav = document.querySelector("nav");
const table = document.querySelector("#dashboard table");
const modal = document.querySelector(".addExam");
const viewModal = document.querySelector(".examDetails");

function applyTheme(theme) {
    if (theme === "dark") {
        themeBtn.innerText = '🌚';
        document.body.style.backgroundColor = "#191b20ff";
        nav.style.backgroundColor = "black";
        table.style.backgroundColor = "black";
        if(modal){
            modal.style.backgroundColor = "black";
        }
        if(viewModal){
            viewModal.style.backgroundColor = "black";
            viewModal.style.color = "white";
        }
        dashboard.classList.remove("text-black");
        dashboard.classList.add("text-white");
    } else {
        themeBtn.innerText = '🌞';
        document.body.style.backgroundColor = "rgb(201, 138, 239)";
        nav.style.backgroundColor = "white";
        table.style.backgroundColor = "rgb(201, 138, 239)";
        if(modal) {
            modal.style.backgroundColor = "white";
        }
        if(viewModal){
            viewModal.style.backgroundColor = "white";
            viewModal.style.color = "black";

        }
        dashboard.classList.remove("text-white");
        dashboard.classList.add("text-black");
    }
    localStorage.setItem("theme", theme);
}

applyTheme(currentTheme);

themeBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(currentTheme);
});