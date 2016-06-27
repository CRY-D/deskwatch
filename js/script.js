/*global $*/
$(function () {
    
    "use strict";
    var loading = $(".loading"),
		header	= $(".header"),
        navbar  = $(".navBar"),
		slider	= $(".slide"),
        provid  = $(".provide"),
        scrl_up = $(".scrl_up"),
        like    = $("<br><i class='like fa fa-thumbs-up'></i>"),
        count   = 1,
        txtSlid = [ "The 6 most popular Linux Desktops",
                    "Gnome Desktop", "Kde Desktop",
                    "Unity Desktop", "Cinnamon Desktop",
                    "Xfce Desktop", "Lxde Desktop",
                    "< Yes that can be achieved. />"
                  ];
    //loading.delay(15000).fadeOut();   
    
    navbar.find("li > a").click(function () {
        if (!$(this).hasClass("_active")) {
            navbar.find("li > a").removeClass("_active");
            $(this).addClass("_active");
        }

    });

    provid.find("i:first-child").click(function () {
        provid.find("h2").animate({
            opacity: 0
        }, 500, function () {
            if (count === 7) {
                $(this).text(txtSlid[count]).animate({
                    opacity: 1
                }, 500).append(like);
            } else {
                $(this).text(txtSlid[count]).animate({
                    opacity: 1
                }, 500);
            }
            count = count + 1;
        });
        if (count > 7) {
            count = 0;
        }
    });
    $(".down").click(function () {
        $('html, body').animate({
            scrollTop: $("#content").offset().top
        }, 1000);
    });

    $(".cntc").click(function () {
        $('html, body').animate({
            scrollTop: $("#footer").offset().top
        }, 1000);
    });

    $(window).scroll(function () {

        if ($(window).scrollTop() > 800) {
            scrl_up.css({"right": 0});

        } else {
            scrl_up.css({"right": -40 + "px"});
        }

    });

    scrl_up.click(function () {

        $("html, body").animate({
            scrollTop: 0
        }, 500);

    });


});
