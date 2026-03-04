window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function toggleQuestion(questionId, element) {
    const questionDiv = document.getElementById(questionId);
    if (questionDiv.style.display === 'none') {
        questionDiv.style.display = 'block';
        element.innerHTML = '<img src="static/images/favicon.png" style="width:1.5rem"> <strong>Click to hide the question!</strong>';
    } else {
        questionDiv.style.display = 'none';
        element.innerHTML = '<img src="static/images/favicon.png" style="width:1.5rem"> <strong>Click to view the question!</strong>';
    }
}

// 函数：切换答案显示/隐藏
function toggleAnswer(answerId, element) {
    const answerDiv = document.getElementById(answerId);
    if (answerDiv.style.display === 'none') {
        answerDiv.style.display = 'block';
        element.innerHTML = '<img src="static/images/favicon.png" style="width:1.5rem"> <strong>Click to hide the answer!</strong>';
    } else {
        answerDiv.style.display = 'none';
        element.innerHTML = '<img src="static/images/favicon.png" style="width:1.5rem"> <strong>Click to view Ground Truth and MLLM\'s answer!</strong>';
    }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
