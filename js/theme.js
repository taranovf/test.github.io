document.addEventListener("DOMContentLoaded", () => {
    const themeSwitcher = document.getElementById("themeSwitcher");
    const currentTheme = localStorage.getItem("theme") || "light";

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeSwitcher.checked = true;
    }

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
