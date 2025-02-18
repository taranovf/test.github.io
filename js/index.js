document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".button");

    buttons.forEach(button => {
        button.addEventListener("touchstart", () => {
            button.classList.add("active");
        });

        button.addEventListener("touchend", () => {
            setTimeout(() => button.classList.remove("active"), 300);
        });

        button.addEventListener("click", () => {
            setTimeout(() => button.blur(), 300);
        });
    });

    // 📌 Видаляємо `hover` після натискання на телефоні
    document.addEventListener("touchstart", () => {
        document.querySelectorAll(".button").forEach(btn => btn.classList.remove("active"));
    });
});
