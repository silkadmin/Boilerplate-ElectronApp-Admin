module.exports = {
	renderAd: function(adDiv, callBack){
		if(adDiv==null) adDiv="#adCarousel1";

		if($(adDiv).length>0) {
			appUtils._serviceGET("ads/"+appUI.CURRENT_PAGE,function(data) {
				html="";
				if(Array.isArray(data)) {
					html+="<div id='myCarousel' class='carousel slide' data-ride='carousel'>";// login-carousel

					//Indicators
					html+="<ol class='carousel-indicators'>";
					html+="<li data-target='#myCarousel' data-slide-to='0' class='active'></li>";
					html+="</ol>";

					//Slides
					html+="<div class='carousel-inner' role='listbox'>";//login-carousel

					html+="<div class='item active'>";
					html+="<img src='"+data.ad_src+"' alt='"+data.ad_name+"' width='100%'>";
					html+="<div class='carousel-caption'>";
					html+="<h3>"+data.ad_caption+"</h3>";
					html+="<p>"+data.ad_body+"</p>";
					html+="</div>";
					html+="</div>";

					html+="</div>";

					//Arrows
					html+="<a class='left carousel-control' href='#myCarousel' role='button' data-slide='prev'>";
					html+="<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span><span class='sr-only'>Previous</span></a>";

					html+="<a class='right carousel-control' href='#myCarousel' role='button' data-slide='next'>";
					html+="<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span><span class='sr-only'>Next</span></a>";

					html+="</div>";
				} else {
					html+="<div id='myCarousel' class='carousel slide' data-ride='carousel'>";// login-carousel

					//Indicators
					// html+="<ol class='carousel-indicators'>";
					// html+="<li data-target='#myCarousel' data-slide-to='0' class='active'></li>";
					// html+="</ol>";

					//Slides
					html+="<div class='carousel-inner' role='listbox'>";//login-carousel

					html+="<div class='item active'>";
					html+="<img src='"+data.ad_src+"' alt='"+data.ad_name+"' width='100%'>";
					html+="<div class='carousel-caption'>";
					html+="<h3>"+data.ad_caption+"</h3>";
					html+="<p>"+data.ad_body+"</p>";
					html+="</div>";
					html+="</div>";

					html+="</div>";

					html+="</div>";
				}
				$(adDiv).html(html);

				$('#adCarousel1 .carousel-control.left').click(function() {
				  $('#adCarousel1').carousel('prev');
				});

				$('#adCarousel1 .carousel-control.right').click(function() {
				  $('#adCarousel1').carousel('next');
				});
			},function(err) {
				if(typeof callBack=="function") callBack(false);
			});
		}
	}
}