  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".sidebarToggle");
    const menuBtn = document.querySelector("#menu-toggle-btn");
    const sidebarContent = document.querySelector(".sidebarContent");

    if (toggleBtn && sidebarContent) {
      toggleBtn.addEventListener("click", () => {
        sidebarContent.classList.toggle("open");
      });
    }
    menuBtn.addEventListener("click", () => {
      document.body.classList.toggle('overflow-hidden');
      document.querySelector('html').classList.toggle('overflow-hidden');
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const arrowButtons = document.querySelectorAll(".arrowBtn");

  arrowButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const viewRow = btn.closest(".view");
      const foldRow = viewRow.nextElementSibling;

      viewRow.classList.toggle("show");
      if (foldRow && foldRow.classList.contains("fold")) {
        foldRow.classList.toggle("show");
      }
    });
  });
});

