$(document).ready(function() {
	//array for the buttons
	var emotions = ["Frustrated", "Joyful", "Grumpy", "Puzzled", "Hangry", "Discouraged", "Outraged", "Disappointed", "Jealous", "Shocked", "Relaxed", "Embarassed", "Heartbroken", "Vulnerable", "Obsessed", "Lazy", "Pumped Up", "Drained", "Stressed Out"];
	// function that will create and display gifs
	function displayGifs() {
		//emptying the gif space each time a button is clicked to limit the number of displayed gifs to 10.
		$("#gif-space").empty();
		var emotion = $(this).attr("data-name");
		//code that will add a random offset number to the url so that different gifs are displayed after each click to the same button.
		var randomOffsetNum = Math.floor((Math.random() * 101));
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=dc6zaTOxFJmzC&limit=10&offset=" + randomOffsetNum;
        //making the Ajax call
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
			// storing the data from the AJAX request in the results variable
			var results = response.data;
			// Looping through each result item
			for (var i = 0; i < results.length; i++) {
		        // Creating and storing a div tag
		        var gifDiv = $("<div>");
		        // Creating a paragraph tag with the result item's rating
		        var p = $("<p>").text("Rating: " + results[i].rating);
		        // Creating and storing an image tag
		        var gifImage = $("<img>");
		        //adding the still state source to the gif so that gifs display unanimated when they load
		        gifImage.attr("src", results[i].images.fixed_height_still.url);
		        //adding the still, animate and data-state attributes to the image to change them later with clicks
		        gifImage.attr("data-animate", results[i].images.fixed_height.url);
		        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
		        gifImage.attr("data-state", "still");
		        //adding the image and p together and creating divs that will hold these.
		        gifDiv.append(p);
		        gifDiv.append("<br>");
		        gifDiv.prepend("<br>");
		        gifDiv.append(gifImage);
		        gifDiv.addClass("gifDiv");
		        // Prepending the gifDiv to the HTML page in the "#gif-space" div
		        $("#gif-space").prepend(gifDiv);
		        //calling the animate function to change to state of the gif when clicked. The on click event was firing off for every other gif, so I did some research and came up with the off click solution.
		        $("img").off("click", animate);
		        $("img").on("click", animate);
			}
		});
	};

	//function that will display buttons when the page loads
	function renderButtons() {
		$("#button-space").empty();
		for (var i = 0; i < emotions.length; i++) {
			var button = $("<button>");
			button.addClass("emotion");
			button.attr("data-name", emotions[i]);
			button.text(emotions[i]);
			$("#button-space").append(button);
		}
	};

	//function that will add additional buttons to the page
	$("#add-category").on("click", function(event) {
        event.preventDefault();
        var userInput = $("#category-input").val().trim();
        emotions.push(userInput);
        renderButtons();
	});
	
	 //function that will animate the gifs when clicked, and vice versa
	function animate() {
		var state = $(this).attr("data-state");
		if (state === "still") {
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
      	} else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
      	}
	};

    $(document).on("click", ".emotion", displayGifs);
    renderButtons();

});
