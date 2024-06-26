$(document).ready(() => {

  // Close and open sidebar
  $(".filters-btn").click(() => {
    $(".sidebar").addClass("active");
  });

  $(".close-sidebar").click(() => {
    $(".sidebar").removeClass("active");
  });

  $("#submit-btn").click(() => {
    $(".sidebar").removeClass("active");
  })

// initializes the default filters variable as an object 
let filters = {
    category: "Any",
    blacklist: [],
  };


  // Retrieves data from the filters form
  $("#filtersForm").on("submit", function (event) {
    event.preventDefault();

    // Retrieves the selected category
    let selectedCategory = $('input[name="category"]:checked').val();

    // Retrieves the selected blacklist options
    let selectedBlacklist = [];
    $('input[name="blacklist"]:checked').each(function () {
      selectedBlacklist.push($(this).val());
    });

    if (selectedBlacklist.length > 1) {
      selectedBlacklist = selectedBlacklist.join(',');
      console.log(selectedBlacklist);
    } 

    filters = {
        category: selectedCategory,
        blacklist: selectedBlacklist,
      };

    console.log(filters);
  });


  // Sends the next joke request to the server 
  $(".next-btn").click(() => {
    $.ajax({
        type: "POST",
        url: "/next-joke",
        data: JSON.stringify(filters),
        contentType: "application/json",
        success: function (response) {
            console.log("Server response:", response);
            $('#jokeTitle').text(response.jokeTitle)
            $('#joke').text(response.joke)
        },
        error: function (xhr, status, error) {
            console.error("Error:", status, error);
        } 
    });
})
});
