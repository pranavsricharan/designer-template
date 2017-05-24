
Globals = {};
prevScroll = 10;

$(document).ready(function() {
	$(document).data("prevScroll",$("#contents").scrollTop());

	//console.log("[[ " + prevScroll + "]]");
	$("#contents").focus();
//console.log('ready');
var sections = $(".scrollable");
var scrollFlag = false;
/*$('#contents').animate({
          scrollTop: $(sections[0]).offset().top
        }, 1000);*/
	$("#contents").on("scroll",function(){scrollFunction();});

	function scrollFunction() {

		fixHeader();
		//console.log(document.getElementById("aboutSection").getBoundingClientRect().top );
		if(document.getElementById("aboutSection").getBoundingClientRect().top < 200)
		$(".aboutGraphic").removeClass("aboutGraphicCollapsed");


		if(scrollFlag == false) {
	//		console.log($(document).data("prevScroll"));
		//	console.log($("#contents").scrollTop());
		//	console.log("------");
			if($("#contents").scrollTop() > $(document).data("prevScroll")) {
				for(var i=sections.length-1;i>=0;i--) {
	//				console.log(i + ": " + $(sections[i]).position().top);
					if($(sections[i]).offset().top < 0) {
						scrollFlag = true;
		//				console.log(i);
			//			console.log(sections[i]);
				//		console.log(sections[i+1]);
						$("#contents").off("scroll",scrollFunction).delay(200).queue(function() {
							$('#contents').stop().animate({
						          scrollTop: ($(sections[i+1]).offset().top  + $('#contents').scrollTop())
						        }, 500,function() {
											scrollFlag = false;
											$("#contents").on("scroll",scrollFunction);
											$(document).data("prevScroll", $("#contents").scrollTop());
						});
						$(this).dequeue();
					}
					);
										break;

					}
				}


			}
//console.log("<< " + $(document).data("prevScroll"));
			prevScroll = $(document).data("prevScroll",$("#contents").scrollTop());
//console.log(">> " + $(document).data("prevScroll"));
		}


	}
	//window.addEventListener("pageshow",animateBg);


	/*function animateBg()
	{
		$("#cut").addClass("fullSizeBg");
		$("#coverText").addClass("coverTextOpaque");
	}*/

	function fixHeader()
	{

		if(document.body.scrollTop > window.innerHeight - 60)
		{
			$("#top").addClass("collapsed");
			//console.log(prevScroll);
			prevScroll = document.body.scrollTop;
		}
		else
		{
			$("#top").removeClass("collapsed");
			prevScroll = document.body.scrollTop;
		}
	}


  var isOpen = false;
  $("#menuButton").on("click", function() {
    if(isOpen == false) {
      $("#contents").addClass("menuOpenCollapsed").delay(100).queue(function() {
          $("#menu").removeClass("hidden");
          $("#menuButton").addClass("menuOpen");
        $(this).dequeue();
			}).delay(300).queue(function() {
           $(".socialLinks").removeClass("hiddenDown");

         $(this).dequeue();
        });
       isOpen = true;
    } else {
       $(".socialLinks").addClass("hiddenDown").delay(300).queue(function() {
           $("#menu").addClass("hidden");

         $(this).dequeue();
			 }).delay(300).queue(function() {
          $("#contents").removeClass("menuOpenCollapsed");
          $("#menuButton").removeClass("menuOpen");
        $(this).dequeue();
       });
       isOpen = false;
    }




    //$("#menu").toggleClass("hidden");
  });


	$(".activateModal").on("click", function() {
		$("#contents").addClass("collapsedModal").delay(300).queue(function() {
		$("#modal").removeClass("hidden");
		$("#menuButton").addClass("hidden");
		$("#closeButton").addClass("hiddenModla");
		$(this).dequeue();
	});
		});
	$("#closeButton").on("click", function() {

		$("#modal").addClass("hidden").delay(300).queue(function() {
			$("#contents").removeClass("collapsedModal");
			$("#menuButton").removeClass("hidden");
			$("#closeButton").removeClass("hiddenModal");
			$(this).dequeue();
		});

	});

	$(".portfolioItem").on("mouseover" ,function(){

		hoverPadding = parseInt($(this).find(".portfolioItemHover").css("padding-top").substr(0,$(this).css("padding-top").replace("px","")));
		console.log(hoverPadding);

			//$(this).find(".portfolioItemHover").css('top', "0px");
			padding = parseInt($(this).css("padding-top").substr(0,$(this).css("padding-top").replace("px","")));
			$(this).find(".portfolioItemHover").css({
				top: $(this).offset().top + padding,
				left: $(this).offset().left + padding
			});

			$(this).find(".portfolioItemHover").height($(this).height() - hoverPadding * 2);
			$(this).find(".portfolioItemHover").width($(this).width() - hoverPadding * 2);
			//$(this).find(".portfolioItemHover").css('left', $(this).offset().left + $(this).css("padding-left") + "px");
			$(this).find(".portfolioItemHover").removeClass("portfolioItemHoverHidden");
			console.log($(this).css("padding-top").substr(0,$(this).css("padding-top").replace("px","")));

	});

	$(".portfolioItem").on("mouseout" ,function(){


			$(this).find(".portfolioItemHover").addClass("portfolioItemHoverHidden").delay(500).queue(function(){
				$(this).find(".portfolioItemHover").css({
					top: '',
					left: ''
				});
				$(this).dequeue();
			});



	});



});
