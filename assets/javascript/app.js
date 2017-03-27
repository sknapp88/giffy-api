var characters = ["Wolverine", "Gambit", "Magneto", "Professor X"]

$("li").on("click", function() {
      var label = $(this).attr("data-label");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        label + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < characters.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gif-dump").append(gifDiv);
          }
        });
    });

function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-dump").empty();

        // Looping through the array of movies
        for (var i = 0; i < characters.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<li>");
          console.log(characters[i]);
          // Adding a class of movie to our button
          a.addClass("character");
          // Adding a data-attribute
          a.attr("data-label", characters[i]);
          // Providing the initial button text
          a.text(characters[i]);
          // Adding the button to the buttons-view div
          $("#button-dump").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#button-factory").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var character = $("#add-character").val().trim();

        // Adding movie from the textbox to our array
        characters.push(character);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie"
      // $(document).on("click", ".movie", displayMovieInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();