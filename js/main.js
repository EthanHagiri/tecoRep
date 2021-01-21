$(function(){

    $('.partnersSlider').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="images/left.png" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="images/right.png" alt=""></button>'
    });

    $("[data-scroll]").on("click", function(event) {
		event.preventDefault();

		var $this = $(this),
			blockId = $this.data('scroll'),
			blockOffset = $(blockId).offset().top;

		$("#nav a").removeClass("active");
		$this.addClass("active");

		$("html, body").animate({
			scrollTop: blockOffset
		}, 500);

	});


	$("#menuToggle").on("click", function(event) {
        event.preventDefault();
        $("#menu").toggleClass("show")
    });

});

