$(document).ready(function() {
    
    if (window.matchMedia("(min-width: 768px)").matches) {
    document.addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-')) {
        event.preventDefault();
        }
    });

    document.addEventListener('wheel', function(event) {
        if (event.ctrlKey) {
        event.preventDefault();
        }
    }, { passive: false });
    } 

    $(".circle i:not(.fa-bars)").hide();

    $(".fa-bars").click(function() {
        var iconBars = $(this);
        var circle = iconBars.parent(".circle");
        var cylinderBg = circle.find(".cylinder-bg");

        if (circle.hasClass("closed")) {
            circle.removeClass("closed").addClass("open");
            iconBars.css("transform", "rotate(90deg)");
            circle.find("i:not(.fa-bars)").fadeIn(400);

            cylinderBg.animate({ height: "23.7vh" }, 400);
            
            circle.find(".github-link").animate({ top: "-=9vh" }, 800);
            circle.find(".pdf-link").animate({ top: "-=14.4vh" }, 800);
            circle.find(".linkedin-link").animate({ top: "-=19.7vh" }, 800);
        }else { 
            circle.removeClass("open").addClass("closed");
            iconBars.css("transform", "rotate(0deg)");
            circle.find("i:not(.fa-bars)").fadeOut(400);
            circle.find(".github-link").animate({ top: "50%" }, 400);
            circle.find(".pdf-link").animate({ top: "50%" }, 400);
            circle.find(".linkedin-link").animate({ top: "50%" }, 400);
            
            cylinderBg.animate({ height: 0 }, 400);
        }
    });

    function applyMarginOnZoom() {
        const zoomLevel = window.devicePixelRatio;
        const profileImg = $('.profile-img');

        if (zoomLevel >= 2.5) {
            profileImg.css('margin', '15vh');
        }else{
            profileImg.css('margin', '0');
        }
    }

    applyMarginOnZoom();
    window.addEventListener('resize', applyMarginOnZoom);
});