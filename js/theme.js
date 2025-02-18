document.addEventListener("DOMContentLoaded", () => {
    const themeSwitcher = document.getElementById("themeSwitcher");
    const currentTheme = localStorage.getItem("theme") || "light";

    // Застосовуємо збережену тему
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeSwitcher.checked = true;
    }

    // Перемикаємо тему
    themeSwitcher.addEventListener("change", () => {
        if (themeSwitcher.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    });
});
