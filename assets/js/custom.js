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

  document.querySelectorAll('.togglable_area').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent bubbling to document
      document.querySelector('.dropdown-menu-area').classList.toggle('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-menu-area')) {
      document.querySelector('.dropdown-menu-area').classList.remove('open');
    }
  });

  // 

  document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function (btn) {
    var target = document.querySelector(btn.getAttribute('data-bs-target'));
    target.addEventListener('show.bs.collapse', function () {
      btn.setAttribute('aria-expanded', 'true');
    });
    target.addEventListener('hide.bs.collapse', function () {
      btn.setAttribute('aria-expanded', 'false');
    });
  });

});

$(document).ready(function () {

  // Init Customer dropdown (single select with clear)
  $('#customerSelect').select2({
    placeholder: 'Select a customer',
    allowClear: true,
    width: 'auto',
  });

  // Init Projects dropdown (multi-select)
  $('#projectsSelect').select2({
    placeholder: 'Select projects',
    allowClear: true,
    multiple: true,
    width: 'auto',
  });

  $('#projectsSelect1').select2({
    placeholder: 'Select projects',
    allowClear: true,
    multiple: true,
    width: 'auto',
  });

  $(document).on('select2:open', function () {
    $('.select2-search__field').on('keydown', function (e) {
      if (e.which === 27) { // 27 is the Escape key
        e.stopPropagation();
      }
    });
  });

});