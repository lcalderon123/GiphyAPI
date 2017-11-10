var feelings = ["Angry", "Happy", "Excited", "Confused"];
var currentGif;
var pausedGif;
var animatedGif;
var stillGif;



function createButtons() {

	$('#buttons').empty();

	for(var i = 0; i < feelings.length; i++) {

		var showBtn = $('<button>').text(feelings[i]).addClass('showBtn').attr({'data-name' : feelings[i]});

		$('#buttons').append(showBtn);
	}


	$('.showBtn').on('click', function() {

		$('.display').empty();

		var currentFeeling = $(this).attr('data-name');

		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + currentFeeling + "&api_key=0BScOL3fj1asLChkeb0QOnvJcNr7VbHc&limit=14";

		$.ajax({

		url: giphyURL,
		method: 'GET'
	})

		.done(function(giphy) {

		currentGif = giphy.data;

		$.each(currentGif, function(index, value) {

			animatedGif = value.images.original.url;
			pausedGif = value.images.original_still.url;

			var thisRating = value.rating;

			if(thisRating == '') {

				thisRating = 'unrated';
			}

			var rating = $('<h3>').html('Rated: '+ thisRating).addClass('ratingStyle');

			stillGif = $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');

			var fullGifDisplay = $('<button>').append(rating, stillGif);

			$('.display').append(fullGifDisplay);
		});



	});

	});
}

$(document).on('mouseover', '.playOnHover', function() {

	$(this).attr('src', $(this).data('animated'));
});

$(document).on('mouseleave', '.playOnHover', function() {

	$(this).attr('src', $(this).data('paused'));
});

$('#add-feeling').on('click', function() {

	var newFeeling = $('#feeling-input').val().trim();

	feelings.push(newFeeling);

	createButtons();

	return false;
});

createButtons();