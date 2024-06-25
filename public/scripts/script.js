$(document).ready(() => {
  $(".filters-btn").click(() => {
    $(".sidebar").addClass("active");
  });

  $(".close-sidebar").click(() => {
    $(".sidebar").removeClass("active");
  });


//   Retrieves data from the filters form

// Stores the filters as an object
let filters = {
    category: "Any",
    blacklist: [],
  };


  $("#filtersForm").on("submit", function (event) {
    event.preventDefault();

    // Retrieves the selected category
    let selectedCategory = $('input[name="category"]:checked').val();

    // Retrieves the selected blacklist options
    let selectedBlacklist = [];
    $('input[name="blacklist"]:checked').each(function () {
      selectedBlacklist.push($(this).val());
    });

    filters = {
        category: selectedCategory,
        blacklist: selectedBlacklist,
      };

    console.log(filters);
  });


  $(".next-btn").click(() => {
    $.ajax({
        type: "POST",
        url: "/filters",
        data: JSON.stringify(filters),
        contentType: "application/json",
        success: function (response) {
            console.log("Server response:", response);
        },
        error: function (xhr, status, error) {
            console.error("Error:", status, error);
        } 
    });
})
});
