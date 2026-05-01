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
    document.body.classList.toggle("overflow-hidden");
    document.querySelector("html").classList.toggle("overflow-hidden");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const arrowButtons = document.querySelectorAll(".arrowBtn");

  arrowButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const viewRow = btn.closest(".view");
      const foldRow = viewRow.nextElementSibling;

      viewRow.classList.toggle("show");
      if (foldRow && foldRow.classList.contains("fold")) {
        foldRow.classList.toggle("show");
      }
    });
  });

  document.querySelectorAll(".togglable_area").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelector(".dropdown-menu-area").classList.toggle("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-menu-area")) {
      const menu = document.querySelector(".dropdown-menu-area");
      if (menu) {
        menu.classList.remove("open");
      }
    }
  });

  //

  document
    .querySelectorAll('[data-bs-toggle="collapse"]')
    .forEach(function (btn) {
      var target = document.querySelector(btn.getAttribute("data-bs-target"));
      target.addEventListener("show.bs.collapse", function () {
        btn.setAttribute("aria-expanded", "true");
      });
      target.addEventListener("hide.bs.collapse", function () {
        btn.setAttribute("aria-expanded", "false");
      });
    });
});

$(document).ready(function () {
  // Init Customer dropdown (single select with clear)
  $("#customerSelect").select2({
    placeholder: "Select a customer",
    allowClear: true,
    width: "auto",
  });

  // Init Projects dropdown (multi-select)
  $("#projectsSelect").select2({
    placeholder: "Select projects",
    allowClear: true,
    multiple: true,
    width: "auto",
  });

  $("#projectsSelect1").select2({
    placeholder: "Select projects",
    allowClear: true,
    multiple: true,
    width: "auto",
  });

  $(document).on("select2:open", function () {
    $(".select2-search__field").on("keydown", function (e) {
      if (e.which === 27) {
        // 27 is the Escape key
        e.stopPropagation();
      }
    });
  });

  // Initialize when modal opens
  $("#nwModal").on("shown.bs.modal", function () {
    // Datepicker
    $(".datepicker").datepicker({
      format: "dd-mm-yyyy",
      autoclose: true,
      todayHighlight: true,
      container: "#nwModal",
      orientation: "bottom auto",
    });

    // Select2 (important: dropdownParent for modal)
    $(".select2-sessioni").select2({
      dropdownParent: $("#nwModal"),
      width: "100%",
    });

    $(".select2-funzioni").select2({
      dropdownParent: $("#nwModal"),
      width: "100%",
    });
  });

  // Wizard Logic for nwModal  // Reset on modal close
  $(".custom-wizard-modal").on("hidden.bs.modal", function () {
    // Reset to step 1
    $(".custom-wizard-modal #wizard-step-1").show();
    $(".custom-wizard-modal #wizard-step-2").hide();

    // Reset form fields
    $(".custom-wizard-modal #funzione-nome").val("").removeClass("is-invalid");
    $(".custom-wizard-modal #btn-next-step").prop("disabled", true);
    $(".custom-wizard-modal #funzione-tipologia").val("").trigger("change");
    $(".custom-wizard-modal #dynamic-params-lineare").hide();
  });

  $(".custom-wizard-modal .select2-funzioni").on("change", function () {
    var selected = $(this).val();
    if (selected === "Lineare") {
      $(".custom-wizard-modal #dynamic-params-lineare").slideDown();
    } else {
      $(".custom-wizard-modal #dynamic-params-lineare").slideUp();
    }
  });

  $(".custom-wizard-modal #funzione-nome").on("input", function () {
    var val = $(this).val().trim();
    $(".custom-wizard-modal #btn-next-step").prop("disabled", val === "");
  });

  $(".custom-wizard-modal #btn-next-step").on("click", function () {
    var nome = $(".custom-wizard-modal #funzione-nome").val().trim();
    var tipologia = $(".custom-wizard-modal #funzione-tipologia").val();

    // Reset errors
    $(".custom-wizard-modal .form-control").removeClass("is-invalid");

    if (!tipologia) {
      // alert('Seleziona una tipologia.');
      return;
    }

    // Set read-only name
    $(".custom-wizard-modal #step2-nome-display").text(nome);

    // Show appropriate step 2 content and toggle Save button
    $(
      ".custom-wizard-modal #step-2-lineare, .custom-wizard-modal #step-2-matrice, .custom-wizard-modal #step-2-altro",
    ).hide();
    var $saveBtn = $(".custom-wizard-modal #btn-save-wizard");

    if (tipologia === "Lineare") {
      $(".custom-wizard-modal #step-2-lineare").show();
      $saveBtn.show();
    } else if (tipologia === "Matrice") {
      $(".custom-wizard-modal #step-2-matrice").show();
      $saveBtn.show();
    } else if (tipologia === "Altro") {
      $(".custom-wizard-modal #step-2-altro").show();
      $saveBtn.hide();
    }

    // Switch step
    $(".custom-wizard-modal #wizard-step-1").hide();
    $(".custom-wizard-modal #wizard-step-2").fadeIn();
  });

  $(".custom-wizard-modal #btn-prev-step").on("click", function () {
    $(".custom-wizard-modal #wizard-step-2").hide();
    $(".custom-wizard-modal #wizard-step-1").fadeIn();
  });

  // Dynamic Row addition/removal for Lineare segments
  $(document).on("click", ".custom-wizard-modal .add-data-btn", function () {
    var $table = $(this).closest("table");
    var $container = $table.find(".row-box-area");
    var $lastRow = $container.find(".data-row").last();
    if ($lastRow.length) {
      var $clonedRow = $lastRow.clone();
      $clonedRow.find('input[type="text"]').val("");
      $clonedRow.find('input[type="checkbox"]').prop("checked", false);
      $container.append($clonedRow);
    }
  });

  $(document).on("click", ".custom-wizard-modal .remove-data-btn", function () {
    var $container = $(this).closest(".row-box-area");
    // Ensure we don't delete the last remaining row
    if ($container.find(".data-row").length > 1) {
      $(this).closest(".data-row").remove();
    }
  });

  // Dynamic Matrix row/col addition/removal
  // Add Column
  $(document).on("click", ".custom-wizard-modal .add-matrix-col", function () {
    var $table = $(this).closest("table");
    var $theadRow = $table.find("thead tr");

    // Clone header cell
    var $lastHeader = $theadRow.find("th").not(":last").last();
    var $clonedHeader = $lastHeader.clone();
    $clonedHeader.insertBefore($theadRow.find("th").last());

    // Go through each body row
    var $bodyRows = $table.find("tbody tr");
    $bodyRows.each(function () {
      var $row = $(this);

      if ($row.hasClass("matrix-x-axis-row")) {
        // This is the bottom row
        var $lastCell = $row.find("td").not(":last").last();
        var $clonedCell = $lastCell.clone();
        // Reset values
        $clonedCell.find('input[type="text"]').val("");
        $clonedCell.find('input[type="checkbox"]').prop("checked", false);
        $clonedCell.insertBefore($row.find("td").last());
      } else {
        // Regular data row
        var $lastCell = $row.find("td").not(":last").last();
        var $clonedCell = $lastCell.clone();
        // Reset values
        $clonedCell.find('input[type="text"]').val("");
        $clonedCell.insertBefore($row.find("td").last());
      }
    });
  });

  // Remove Column
  $(document).on(
    "click",
    ".custom-wizard-modal .remove-matrix-col",
    function () {
      var $table = $(this).closest("table");
      var $th = $(this).closest("th");
      var colIndex = $th.index();

      // Ensure we don't delete the last data column
      if ($table.find("thead th").length > 3) {
        $table.find("tr").each(function () {
          $(this).find("th, td").eq(colIndex).remove();
        });
      }
    },
  );

  // Add Row
  $(document).on("click", ".custom-wizard-modal .add-matrix-row", function () {
    var $table = $(this).closest("table");
    var $tbody = $table.find("tbody");
    var $xAxisRow = $tbody.find(".matrix-x-axis-row");

    // Find the last regular data row
    var $lastDataRow = $xAxisRow.prev("tr");

    if ($lastDataRow.length) {
      var $clonedRow = $lastDataRow.clone();

      // Reset values on the cloned row for left axis
      $clonedRow.find('td:first-child input[type="text"]').val("");
      $clonedRow
        .find('td:first-child input[type="checkbox"]')
        .prop("checked", false);

      // Reset values for data cells
      $clonedRow
        .find("td")
        .not(":first-child, :last-child")
        .each(function () {
          $(this).find('input[type="text"]').val("");
        });

      $clonedRow.insertBefore($xAxisRow);
    }
  });

  // Remove Row
  $(document).on(
    "click",
    ".custom-wizard-modal .remove-matrix-row",
    function () {
      var $row = $(this).closest("tr");
      var $tbody = $row.closest("tbody");

      // Ensure we don't delete the last data row
      if ($tbody.find("tr.matrix-data-row").length > 1) {
        $row.remove();
      }
    },
  );

  /* setting - KPIs modal */

  $("#kpiSettingModal").on("shown.bs.modal", function () {
    $("#kpi-wizard-step-1").show();
    $("#kpi-wizard-step-2").hide();

    $(".select2-frequenza, .select2-approximate").select2({
      dropdownParent: $("#kpiSettingModal"),
      width: "100%",
      minimumResultsForSearch: -1,
    });

    $(".select2-performance").select2({
      dropdownParent: $("#kpiSettingModal"),
      width: "100%",
    });

    $("#kpi-relations-table .select2-relation").select2({
      dropdownParent: $("#kpiSettingModal"),
      width: "100%",
      minimumResultsForSearch: -1,
    });

    $(
      "#kpi-relations-table .select2-kpi, #kpi-relations-table .select2-function",
    ).select2({
      dropdownParent: $("#kpiSettingModal"),
      width: "100%",
    });
  });

  $("#kpi-btn-next-step").on("click", function () {
    $("#kpi-wizard-step-2").show();
    $("#kpi-wizard-step-1").hide();
  });

  $("#kpi-btn-prev-step").on("click", function () {
    $("#kpi-wizard-step-1").show();
    $("#kpi-wizard-step-2").hide();
  });

  $(document).on("click", ".add-kpi-relation-btn", function () {
    var $tbody = $("#kpi-relations-table tbody");
    $tbody.find(".empty-state-row").remove();

    var newRowHtml = `
        <tr class="kpi-relation-row data-row">
            <td class="border-bottom py-3">
                <select class="form-control select2-relation dynamic-select w-100">
                    <option value="">Seleziona Relazione</option>
                    <option value="Asse X">Asse X</option>
                    <option value="Asse Y">Asse Y</option>
                </select>
            </td>
            <td class="border-bottom py-3">
                <select class="form-control select2-kpi dynamic-select w-100">
                    <option value="">Seleziona KPI</option>
                    <option value="123 - KPI asse X matrice">123 - KPI asse X matrice</option>
                    <option value="124 - Altro KPI">124 - Altro KPI</option>
                </select>
            </td>
            <td class="border-bottom py-3">
                <select class="form-control select2-function dynamic-select w-100">
                    <option value="">Seleziona Funzione</option>
                    <option value="456 - OP Actual">456 - OP Actual</option>
                    <option value="457 - Altra funzione">457 - Altra funzione</option>
                </select>
            </td>
            <td class="border-bottom text-end py-3">
                <i class="fa-solid fa-circle-minus remove-kpi-relation-btn text-danger fs-5" style="cursor:pointer;"></i>
            </td>
        </tr>
    `;

    $tbody.append(newRowHtml);

    $tbody.find(".kpi-relation-row:last-child .select2-relation").select2({
      dropdownParent: $("#kpiSettingModal"),
      width: "100%",
      minimumResultsForSearch: -1,
    });
    $tbody
      .find(
        ".kpi-relation-row:last-child .select2-kpi, .kpi-relation-row:last-child .select2-function",
      )
      .select2({
        dropdownParent: $("#kpiSettingModal"),
        width: "100%",
      });
  });

  $(document).on("click", ".remove-kpi-relation-btn", function () {
    var $tbody = $(this).closest("tbody");
    $(this).closest("tr.kpi-relation-row").remove();
    if ($tbody.find("tr.kpi-relation-row").length === 0) {
      $tbody.append(`
        <tr class="empty-state-row">
            <td colspan="4" class="text-center text-muted py-4">
              <p class="empty-state-text">No related KPIs added yet. Click <i class="fa-solid fa-circle-plus add-kpi-relation-btn text-success d-inline-flex text-end fs-5" style="cursor:pointer;" aria-hidden="true"></i> to add one.</p>
            </td>
        </tr>
      `);
    }
  });

  $("#kpiSettingModal").on("hidden.bs.modal", function () {
    var $tbody = $("#kpi-relations-table tbody");
    $tbody.empty();
    $tbody.append(`
        <tr class="empty-state-row">
            <td colspan="4" class="text-center text-muted py-4">
              <p class="empty-state-text">No related KPIs added yet. Click <i class="fa-solid fa-circle-plus add-kpi-relation-btn text-success d-inline-flex text-end fs-5" style="cursor:pointer;" aria-hidden="true"></i> to add one.</p>
            </td>
        </tr>
    `);
  });

  /* End of setting - KPIs modal */

  /* setting - Scorecards modal */

  $("#scorecardsSettingModal").on("shown.bs.modal", function () {
    if (!$(this).data("is-toggling-note")) {
      $("#scorecards-wizard-step-1").show();
      $("#scorecards-wizard-step-2").hide();
    }

    $(".select2-frequenza, .select2-approximate").select2({
      dropdownParent: $("#scorecardsSettingModal"),
      width: "100%",
      minimumResultsForSearch: -1,
    });

    $(".select2-performance").select2({
      dropdownParent: $("#scorecardsSettingModal"),
      width: "100%",
    });

    $("#scorecards-relations-table .select2-relation").select2({
      dropdownParent: $("#scorecardsSettingModal"),
      width: "100%",
      minimumResultsForSearch: -1,
    });

    $(
      "#scorecards-relations-table .select2-kpi, #scorecards-relations-table .select2-function"
    ).select2({
      dropdownParent: $("#scorecardsSettingModal"),
      width: "100%",
    });

    // Clear the toggling flag after modal is fully shown
    if ($(this).data("is-toggling-note")) {
      $(this).data("is-toggling-note", false);
    }
  });

  $("#scorecards-btn-next-step").on("click", function () {
    $("#scorecards-wizard-step-2").show();
    $("#scorecards-wizard-step-1").hide();
  });

  $("#scorecards-btn-prev-step").on("click", function () {
    $("#scorecards-wizard-step-1").show();
    $("#scorecards-wizard-step-2").hide();
  });

  $(document).on("click", ".add-scorecards-relation-btn", function () {
    var $tbody = $("#scorecards-relations-table tbody");
    $tbody.find(".empty-state-row").remove();

    var newRowHtml = `
        <tr class="scorecards-relation-row data-row">
            <td class="border-bottom py-3">
                <select class="form-control select2-kpi dynamic-select w-100">
                    <option value="">Seleziona KPI</option>
                    <option value="123 - KPI 1">123 - KPI 1</option>
                    <option value="124 - KPI 2">124 - KPI 2</option>
                </select>
            </td>
            <td class="border-bottom py-3">
                <div class="input-group">
                    <input type="number" class="form-control" placeholder="" min="0" max="100">
                    <span class="input-group-text">%</span>
                </div>
            </td>
            <td class="border-bottom py-3">
                <input type="number" class="form-control text-center" placeholder="" min="1">
            </td>
            <td class="border-bottom text-end py-3">
              <div class="btn-scorecards-div">
                <button type="button" class="btn btn-normal-blue add-note-btn" data-bs-toggle="modal" data-bs-target="#scorecardsNoteModal" data-bs-dismiss="modal" disabled><span class="d-none d-lg-inline"> Add / Edit Note</span><span class="d-flex d-lg-none"><i class="fa-regular fa-message-plus"></i></span></button>
                <i class="fa-solid fa-circle-minus remove-scorecards-relation-btn text-danger fs-5" style="cursor:pointer;" title="Delete"></i>
              </div>
            </td>
        </tr>
    `;

    $tbody.append(newRowHtml);

    $tbody.find(".scorecards-relation-row:last-child .select2-kpi").select2({
      dropdownParent: $("#scorecardsSettingModal"),
      width: "100%",
    });
  });

  $(document).on("change", ".scorecards-relation-row .select2-kpi", function () {
    var $row = $(this).closest("tr");
    var $noteBtn = $row.find(".add-note-btn");
    if ($(this).val()) {
      $noteBtn.prop("disabled", false);
    } else {
      $noteBtn.prop("disabled", true);
    }
  });

  $(document).on("click", ".remove-scorecards-relation-btn", function () {
    var $tbody = $(this).closest("tbody");
    $(this).closest("tr.scorecards-relation-row").remove();
    if ($tbody.find("tr.scorecards-relation-row").length === 0) {
      $tbody.append(`
        <tr class="empty-state-row">
            <td colspan="4" class="text-center text-muted py-4">
              <p class="empty-state-text">No related KPIs added yet. Click <i class="fa-solid fa-circle-plus add-scorecards-relation-btn text-success d-inline-flex text-end fs-5" style="cursor:pointer;" aria-hidden="true"></i> to add one.</p>
            </td>
        </tr>
      `);
    }
  });

  $("#scorecardsSettingModal").on("hidden.bs.modal", function () {
    if ($(this).data("is-toggling-note")) {
      return;
    }
    
    var $tbody = $("#scorecards-relations-table tbody");
    $tbody.empty();
    $tbody.append(`
        <tr class="empty-state-row">
            <td colspan="4" class="text-center text-muted py-4">
              <p class="empty-state-text">No related KPIs added yet. Click <i class="fa-solid fa-circle-plus add-scorecards-relation-btn text-success d-inline-flex text-end fs-5" style="cursor:pointer;" aria-hidden="true"></i> to add one.</p>
            </td>
        </tr>
    `);
  });

  $(document).on("click", ".add-note-btn", function () {
    var $row = $(this).closest("tr");
    var kpiName = $row.find(".select2-kpi option:selected").text();
    if (!kpiName || kpiName === "Seleziona KPI") {
      kpiName = "Selected KPI";
    }
    $("#scorecardsNoteModalLabel").text("Add Note - " + kpiName);
    
    // Set flag so settings modal doesn't reset when hiding/showing for note modal
    $("#scorecardsSettingModal").data("is-toggling-note", true);
  });

  /* End of setting - Scorecards modal */
});

