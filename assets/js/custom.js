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
  // Init Tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Init Customer dropdown (single select with clear)
  if ($("#customerSelect").length && typeof $.fn.select2 === "function") {
    $("#customerSelect").select2({
      placeholder: "Select a role",
      minimumResultsForSearch: -1,
      allowClear: true,
      width: "100%",
    });
  }

  // Init Projects dropdown (multi-select)
  if ($("#projectsSelect").length && typeof $.fn.select2 === "function") {
    $("#projectsSelect").select2({
      placeholder: "Select KPI",
      allowClear: true,
      multiple: true,
      width: "100%",
    });
  }

  if ($("#projectsSelect1").length && typeof $.fn.select2 === "function") {
    $("#projectsSelect1").select2({
      placeholder: "Select Category",
      allowClear: true,
      multiple: true,
      width: "100%",
    });
  }

  // Init Participants Filters dropdowns
  if ($("#tipoSchedaSelect").length && typeof $.fn.select2 === "function") {
    $("#tipoSchedaSelect").select2({
      placeholder: "Select Tipo Scheda",
      minimumResultsForSearch: -1,
      allowClear: true,
      width: "100%",
    });
  }

  if ($("#partecipaSelect").length && typeof $.fn.select2 === "function") {
    $("#partecipaSelect").select2({
      placeholder: "Select Partecipa",
      minimumResultsForSearch: -1,
      allowClear: true,
      width: "100%",
    });
  }

  if ($("#categoriaSelect").length && typeof $.fn.select2 === "function") {
    $("#categoriaSelect").select2({
      placeholder: "Select Categoria",
      minimumResultsForSearch: -1,
      allowClear: true,
      width: "100%",
    });
  }

  if ($("#ruoloSelect").length && typeof $.fn.select2 === "function") {
    $("#ruoloSelect").select2({
      placeholder: "Select Ruolo",
      minimumResultsForSearch: -1,
      allowClear: true,
      width: "100%",
    });
  }

  // Init User Filters dropdowns
  if ($("#profileSelect").length && typeof $.fn.select2 === "function") {
    $("#profileSelect").select2({
      placeholder: "Select Profile",
      minimumResultsForSearch: -1,
      allowClear: true,
      width: "100%",
    });
  }

  if ($("#statusSelect").length && typeof $.fn.select2 === "function") {
    $("#statusSelect").select2({
      placeholder: "Select Status",
      minimumResultsForSearch: -1,
      allowClear: true,
      width: "100%",
    });
  }

  $(document).on("select2:open", function () {
    $(".select2-search__field").on("keydown", function (e) {
      if (e.which === 27) {
        // 27 is the Escape key
        e.stopPropagation();
      }
    });
  });

  // Initialize when modal opens
  $("#nwModal, #participantsModal").on("shown.bs.modal", function () {
    // Determine the container (the modal that is currently shown)
    var modalId = "#" + $(this).attr("id");
    
    // Datepicker
    $(this).find(".datepicker").datepicker({
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
      container: modalId,
      orientation: "bottom auto",
    });

    // Select2 (important: dropdownParent for modal)
    if ($(".select2-sessioni").length && typeof $.fn.select2 === "function") {
      $(".select2-sessioni").select2({
        dropdownParent: $("#nwModal"),
        width: "100%",
      });
    }

    if ($(".select2-funzioni").length && typeof $.fn.select2 === "function") {
      $(".select2-funzioni").select2({
        dropdownParent: $("#nwModal"),
        width: "100%",
      });
    }
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

    if ($(".select2-frequenza, .select2-approximate").length && typeof $.fn.select2 === "function") {
      $(".select2-frequenza, .select2-approximate").select2({
        dropdownParent: $("#kpiSettingModal"),
        width: "100%",
        minimumResultsForSearch: -1,
      });
    }

    if ($(".select2-performance").length && typeof $.fn.select2 === "function") {
      $(".select2-performance").select2({
        dropdownParent: $("#kpiSettingModal"),
        width: "100%",
      });
    }

    if ($("#kpi-relations-table .select2-relation").length && typeof $.fn.select2 === "function") {
      $("#kpi-relations-table .select2-relation").select2({
        dropdownParent: $("#kpiSettingModal"),
        width: "100%",
        minimumResultsForSearch: -1,
      });
    }

    if ($("#kpi-relations-table .select2-kpi, #kpi-relations-table .select2-function").length && typeof $.fn.select2 === "function") {
      $(
        "#kpi-relations-table .select2-kpi, #kpi-relations-table .select2-function",
      ).select2({
        dropdownParent: $("#kpiSettingModal"),
        width: "100%",
      });
    }
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

    if (typeof $.fn.select2 === "function") {
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
    }
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

    if ($(".select2-frequenza, .select2-approximate").length && typeof $.fn.select2 === "function") {
      $(".select2-frequenza, .select2-approximate").select2({
        dropdownParent: $("#scorecardsSettingModal"),
        width: "100%",
        minimumResultsForSearch: -1,
      });
    }

    if ($(".select2-performance").length && typeof $.fn.select2 === "function") {
      $(".select2-performance").select2({
        dropdownParent: $("#scorecardsSettingModal"),
        width: "100%",
      });
    }

    if ($("#scorecards-relations-table .select2-relation").length && typeof $.fn.select2 === "function") {
      $("#scorecards-relations-table .select2-relation").select2({
        dropdownParent: $("#scorecardsSettingModal"),
        width: "100%",
        minimumResultsForSearch: -1,
      });
    }

    if ($("#scorecards-relations-table .select2-kpi, #scorecards-relations-table .select2-function").length && typeof $.fn.select2 === "function") {
      $(
        "#scorecards-relations-table .select2-kpi, #scorecards-relations-table .select2-function"
      ).select2({
        dropdownParent: $("#scorecardsSettingModal"),
        width: "100%",
      });
    }

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

    if (typeof $.fn.select2 === "function") {
      $tbody.find(".scorecards-relation-row:last-child .select2-kpi").select2({
        dropdownParent: $("#scorecardsSettingModal"),
        width: "100%",
      });
    }
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
    
    // Store current note and active row reference
    var existingNote = $row.data('note-content') || "";
    $("#scorecardsNoteModal textarea").val(existingNote);
    $("#scorecardsNoteModal").data("active-row", $row);
  });

  $(document).on("click", "#saveModal", function () {
    var $activeRow = $("#scorecardsNoteModal").data("active-row");
    if ($activeRow) {
      var noteContent = $("#scorecardsNoteModal textarea").val().trim();
      $activeRow.data('note-content', noteContent);
      
      var $btn = $activeRow.find('.add-note-btn');
      if (noteContent !== "") {
        $btn.addClass('has-note');
      } else {
        $btn.removeClass('has-note');
      }
    }
  });

  /* End of setting - Scorecards modal */

  /* Participants Page */
  // Quick search for participants table
  $("#quickSearch").on("keyup", function() {
    var $tbody = $("#participants-table tbody");
    if ($tbody.find("tr.view").length === 0) return;

    var value = $(this).val().toLowerCase();
    var hasResults = false;

    $("#participants-table tbody tr.view").each(function() {
      var matricola = $(this).find("td:eq(1)").text().toLowerCase();
      var persona = $(this).find("td:eq(2)").text().toLowerCase();
      
      var match = matricola.indexOf(value) > -1 || persona.indexOf(value) > -1;
      
      if (match) {
        $(this).show();
        var nextTr = $(this).next(".spacing-tr");
        if (nextTr.length) nextTr.show();
        hasResults = true;
      } else {
        $(this).hide();
        var nextTr = $(this).next(".spacing-tr");
        if (nextTr.length) nextTr.hide();
      }
    });

    var $tbody = $("#participants-table tbody");
    if (!hasResults && value.trim() !== "") {
      if ($tbody.find(".no-results-row").length === 0) {
        $tbody.append('<tr class="no-results-row"><td colspan="10" class="text-center py-4 text-muted">No results found</td></tr>');
      }
      $tbody.find(".no-results-row").show();
    } else if (!hasResults && value.trim() === "") {
        // Edge case: if somehow everything is hidden but input is empty, wait, if input is empty match is true for all.
        // So hasResults will be true. But just in case:
        $tbody.find(".no-results-row").hide();
    } else {
      $tbody.find(".no-results-row").hide();
    }
  });


  // Handle click on editable bonus cells
  $(document).on("click", "#participants-table tbody tr.view td.editable-cell", function() {
    var $cell = $(this);
    var $row = $cell.closest("tr.view");
    var cellText = $cell.text().trim();
    
    // Only open if there's a value (or if we want to allow editing empty cells)
    var value = cellText.replace('€', '').trim();
    
    // Extract Matricola and Persona
    var matricola = $row.find("td:eq(1)").text().trim();
    var personaName = $row.find("td:eq(2) .participants-name h6").text().trim();
    if (!personaName) {
      personaName = $row.find("td:eq(2)").text().trim();
    }
    
    // Set dynamic subtitle
    $("#matricolaModal").text(matricola + " - " + personaName);

    // Extract period from data attribute
    var periodText = $cell.data("period") || "";
    
    // Extract Dal and Al
    var dal = $row.find("td:eq(4)").text().trim();
    var al = $row.find("td:eq(5)").text().trim();

    // Set values in modal
    $(".periodo-form-group input").val(periodText);
    $("#bonusPeriodoInput").val(value);
    $("#dalInput").val(dal);
    if ($("#dalInput").data("datepicker")) {
      $("#dalInput").datepicker("update", dal);
    }
    
    $("#alInput").val(al);
    if ($("#alInput").data("datepicker")) {
      $("#alInput").datepicker("update", al);
    }
    
    // Store active cell
    $("#participantsModal").data("active-cell", $cell);
    
    // Show modal
    $("#participantsModal").modal("show");
  });

  // Handle Save Bonus Modal
  $("#saveBonusModal").on("click", function() {
    $("#participantsModal").modal("hide");
    $("#confirmSaveBonusModal").modal("show");
  });

  // Handle Actual Save from Confirmation Modal
  $("#confirmSaveBtn").on("click", function() {
    var $cell = $("#participantsModal").data("active-cell");
    if ($cell) {
      var $row = $cell.closest("tr.view");
      var newValue = $("#bonusPeriodoInput").val().trim();
      // Keep the euro sign in front of the value
      $cell.text("€ " + newValue);
      
      var newDal = $("#dalInput").val().trim();
      var newAl = $("#alInput").val().trim();
      $row.find("td:eq(4)").text(newDal);
      $row.find("td:eq(5)").text(newAl);
    }
    $("#confirmSaveBonusModal").modal("hide");
  });

  // Handle Delete Scorecard Modal
  $("#deleteScorecardBtn").on("click", function(e) {
    e.preventDefault();
    $("#participantsModal").modal("hide");
    $("#deleteRecordsModal").data("delete-type", "single");
    $("#deleteRecordsMessage").text("Are you sure you want to delete this record?");
    $("#deleteRecordsModal").modal("show");
  });

  function toggleTrashIcon() {
    var checkedCount = $("#participants-table tbody .form-check-input:checked").length;
    if (checkedCount > 0) {
      $("#participants-table thead .delete-link-custom").removeClass("d-none");
    } else {
      $("#participants-table thead .delete-link-custom").addClass("d-none");
    }
  }

  function checkEmptyTable() {
    var $tbody = $("#participants-table tbody");
    if ($tbody.find("tr.view").length === 0) {
      if ($tbody.find(".empty-table-row").length === 0) {
        $tbody.append('<tr class="empty-table-row"><td colspan="10" class="text-center py-4 text-muted">No record found</td></tr>');
      }
      $tbody.find(".empty-table-row").show();
      $(".pagination-container").hide();
    } else {
      $tbody.find(".empty-table-row").hide();
      $(".pagination-container").show();
    }
  }

  // Select All Checkbox Logic
  $(document).on("change", "#participants-table thead .form-check-input", function() {
    var isChecked = $(this).prop("checked");
    $("#participants-table tbody .form-check-input").prop("checked", isChecked);
    toggleTrashIcon();
  });

  // Individual Checkbox Logic (uncheck select-all if one is unchecked)
  $(document).on("change", "#participants-table tbody .form-check-input", function() {
    var totalCheckboxes = $("#participants-table tbody .form-check-input").length;
    var checkedCheckboxes = $("#participants-table tbody .form-check-input:checked").length;
    
    if (totalCheckboxes > 0 && totalCheckboxes === checkedCheckboxes) {
      $("#participants-table thead .form-check-input").prop("checked", true);
    } else {
      $("#participants-table thead .form-check-input").prop("checked", false);
    }
    toggleTrashIcon();
  });

  // Massive Delete Logic
  $(document).on("click", ".check-prt-dv .delete-link-custom", function() {
    var checkedCheckboxes = $("#participants-table tbody .form-check-input:checked");
    if (checkedCheckboxes.length > 0) {
      $("#deleteRecordsModal").data("delete-type", "massive");
      $("#deleteRecordsMessage").text("Are you sure you want to delete the " + checkedCheckboxes.length + " selected record(s)?");
      $("#deleteRecordsModal").modal("show");
    } else {
      alert("Please select at least one record to delete.");
    }
  });

  $("#confirmDeleteRecordsBtn").on("click", function() {
    var deleteType = $("#deleteRecordsModal").data("delete-type");

    if (deleteType === "single") {
      var $cell = $("#participantsModal").data("active-cell");
      if ($cell) {
        var $row = $cell.closest("tr.view");
        var $spacingRow = $row.next(".spacing-tr");
        
        $row.remove();
        if ($spacingRow.length) {
          $spacingRow.remove();
        }
      }
    } else {
      // massive
      var checkedCheckboxes = $("#participants-table tbody .form-check-input:checked");
      checkedCheckboxes.each(function() {
        var $row = $(this).closest("tr.view");
        var $spacingRow = $row.next(".spacing-tr");
        $row.remove();
        if ($spacingRow.length) {
          $spacingRow.remove();
        }
      });
      // Uncheck select all after delete
      $("#participants-table thead .form-check-input").prop("checked", false);
    }
    
    toggleTrashIcon();
    checkEmptyTable();
    $("#deleteRecordsModal").modal("hide");
  });

  /* End of Participants Page */

  /* Users Page */
  // Select All Checkbox Logic for user-table
  $(document).on("change", ".user-table thead .form-check-input", function() {
    var isChecked = $(this).prop("checked");
    $(".user-table tbody .form-check-input").prop("checked", isChecked);
    if (isChecked) {
      $(".user-table tbody tr").addClass("selected-row");
    } else {
      $(".user-table tbody tr").removeClass("selected-row");
    }
    toggleUserTrashIcon();
  });

  // Individual Checkbox Logic for user-table
  $(document).on("change", ".user-table tbody .form-check-input", function() {
    var totalCheckboxes = $(".user-table tbody .form-check-input").length;
    var checkedCheckboxes = $(".user-table tbody .form-check-input:checked").length;
    
    var $row = $(this).closest("tr");
    if ($(this).prop("checked")) {
      $row.addClass("selected-row");
    } else {
      $row.removeClass("selected-row");
    }

    if (totalCheckboxes > 0 && totalCheckboxes === checkedCheckboxes) {
      $(".user-table thead .form-check-input").prop("checked", true);
    } else {
      $(".user-table thead .form-check-input").prop("checked", false);
    }
    toggleUserTrashIcon();
  });

  function toggleUserTrashIcon() {
    var checkedCount = $(".user-table tbody .form-check-input:checked").length;
    if (checkedCount > 0) {
      $(".user-table thead .delete-link-custom").removeClass("d-none");
    } else {
      $(".user-table thead .delete-link-custom").addClass("d-none");
    }
  }

  // Massive Delete for users
  $(document).on("click", ".user-table thead .delete-link-custom", function() {
    var checkedCheckboxes = $(".user-table tbody .form-check-input:checked");
    if (checkedCheckboxes.length > 0) {
      $("#selectedUserCount").text(checkedCheckboxes.length);
      $("#deleteUsersModal").modal("show");
    }
  });

  $(document).on("click", "#confirmDeleteUsersBtn", function() {
    var checkedCheckboxes = $(".user-table tbody .form-check-input:checked");
    checkedCheckboxes.each(function() {
      $(this).closest("tr").remove();
    });
    // Uncheck select all and hide trash icon
    $(".user-table thead .form-check-input").prop("checked", false);
    toggleUserTrashIcon();
    $("#deleteUsersModal").modal("hide");
    checkEmptyUserTable();
  });

  function checkEmptyUserTable() {
    var $tbody = $(".user-table tbody");
    if ($tbody.find("tr").length === 0) {
      if ($tbody.find(".empty-table-row").length === 0) {
        $tbody.append('<tr class="empty-table-row"><td colspan="8" class="text-center py-4 text-muted">No users found</td></tr>');
      }
      $tbody.find(".empty-table-row").show();
      $(".pagination-container").hide();
    } else {
      $tbody.find(".empty-table-row").hide();
      $(".pagination-container").show();
    }
  }

  // Single User Delete
  var $userRowToDelete = null;
  $(document).on("click", ".user-table .delete-user-btn", function(e) {
    e.preventDefault();
    $userRowToDelete = $(this).closest("tr");
    $("#deleteSingleUserModal").modal("show");
  });

  $(document).on("click", "#confirmDeleteSingleUserBtn", function() {
    if ($userRowToDelete) {
      $userRowToDelete.remove();
      $userRowToDelete = null;
    }
    $("#deleteSingleUserModal").modal("hide");
    checkEmptyUserTable();
  });

  // Edit User Modal Initialization for Select2
  $("#editUserModal").on("shown.bs.modal", function () {
    if ($(".select2-modal").length && typeof $.fn.select2 === "function") {
      $(".select2-modal").select2({
        dropdownParent: $("#editUserModal"),
        minimumResultsForSearch: -1,
        width: "100%"
      });
    }
  });

  // Edit User
  var $userRowToEdit = null;
  $(document).on("click", ".user-table .edit-user-btn", function(e) {
    e.preventDefault();
    $userRowToEdit = $(this).closest("tr");
    var name = $userRowToEdit.find(".td-name").text().trim();
    var email = $userRowToEdit.find("td:eq(2)").text().trim();
    var profile = $userRowToEdit.find("td:eq(3) .badge-common").text().trim();
    var status = $userRowToEdit.find("td:eq(4) .badge-common").text().trim();

    $("#editUserName").val(name);
    $("#editUserEmail").val(email);
    $("#editUserProfile").val(profile).trigger("change");
    $("#editUserStatus").val(status).trigger("change");

    $("#editUserModal").modal("show");
  });

  $(document).on("click", "#saveUserEditBtn", function() {
    if ($userRowToEdit) {
      var newName = $("#editUserName").val().trim();
      var newEmail = $("#editUserEmail").val().trim();
      var newProfile = $("#editUserProfile").val();
      var newStatus = $("#editUserStatus").val();

      if (newName === "" || newEmail === "") {
        alert("Name and Email are required.");
        return;
      }

      $userRowToEdit.find(".td-name").text(newName);
      $userRowToEdit.find("td:eq(2)").text(newEmail);

      // Update badge profile style based on Admin, HR, HRBP, Controls
      var profileClass = "badge-admin";
      if (newProfile === "HR") profileClass = "badge-hr";
      else if (newProfile === "HRBP") profileClass = "badge-hrbp";
      else if (newProfile === "Controls") profileClass = "badge-controls";

      $userRowToEdit.find("td:eq(3)").html('<span class="badge-common ' + profileClass + '">' + newProfile + '</span>');

      // Update badge status style
      var statusClass = "badge-active";
      if (newStatus === "Inactive") statusClass = "badge-inactive";
      else if (newStatus === "Blocked") statusClass = "badge-blocked";

      $userRowToEdit.find("td:eq(4)").html('<span class="badge-common ' + statusClass + '">' + newStatus + '</span>');
    }
    $("#editUserModal").modal("hide");
  });
  /* End of Users Page */
});
