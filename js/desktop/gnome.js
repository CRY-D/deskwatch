/*global $, console, alert, geoip2*/
$(function () {
    "use strict";

//+=================+===============================
    var count       = 0,
        lst         = [],
        lst2        = [],
        freqlst     = [],
        vl          = $(".vl"),
        vlm         = $(".vlm"),
        all         = $("#all"),
        user        = $(".user"),
        over        = $(".over"),
        d           = new Date(),
        time        = $(".time"),
        cnchi       = $(".cnchi"),
        onoff       = $(".onoff"),
        login       = $(".login"),
        bgOptions   = $(".close"),
        button      = $("button"),
        desktop     = $(".desktop"),
        apps        = $(".allapps"),
        open_ter    = $(".open_ter"),
        frequent    = $("#frequent"),
        showapps    = $(".showapps"),
        stat        = $(".stat > i"),
        rightNav    = $(".rightNav"),
        nextapps    = $(".nextapps"),
        centapps    = $(".centapps"),
        terminal    = $(".terminal"),
        prevapps    = $(".prevapps"),
        activities  = $(".activities"),
        nots        = $(".notification"),
        showUl      = $(".showUl > span"),
        nxprev      = $(".allapps > span"),
        day         = d.getDate().toString(),
        titls       = $(".leftMainNav > span"),
        openS       = $(".settings > ul > li"),
        range       = $("input[type = range]"),
        applists    = $(".applications > div"),
        lists       = $(".applications > div > li"),
        span        = lists.find("span"),
        search      = $(".allapps :text"),
        opencnchi   = $(".leftMainNav > span:first-of-type");
//+=================+===============================
    
    //EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    /* get weather */
/*    function GetWeatherAndLocation() {
        this.OnSuccess = function () {
            this.kat = function (location) {
                //console.log(JSON.stringify(location));
                var k   = JSON.stringify(location.city.names.en),
                    api = 'http://api.wunderground.com/api/305b011f183c8c98/conditions/q/CA/' + k.replace(/"/gi, "") + '.json';
                console.log(location);
                $.getJSON(api, function (r) {
                    var ff = r.current_observation.display_location.city +
                        ", " + r.current_observation.observation_location.city +
                        ", " + r.current_observation.display_location.state_name,
                        fr = r.current_observation.temperature_string,
                        tmp_c = r.current_observation.temp_c;
                    $(".get_weather").text(ff + " " + fr);
                    $(".deg").text(tmp_c).append($("<b>&#176; C</b>")); // temp + deg simbol °
                    $(".weather").append($("<img src=" + r.current_observation.icon_url + " />"));
                    ($("<img src=" + r.current_observation.icon_url + " />")).insertAfter(".deg");
                });
            };
        };
        this.onError = function (error) {
            alert("Error:\n\n" + JSON.stringify(error, undefined, 4));
        };
    }
    var gwl = new GetWeatherAndLocation(),
        ff  = new gwl.OnSuccess();
    geoip2.city(ff.kat, gwl.onError);
    */
    
    //EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    
    
    /* terminal*/
    $(".commands").focus();
    
    $(".commands").keydown(function () {
       
        $(".blink").css({"animation": "none"});
        
    });
    
    $(".commands").keyup(function () {
        $(".blink").css({"animation": "blink 1.5s linear infinite"});
    });
    
    open_ter.click(function () {
       
        terminal.fadeToggle(200);
        
    });
    
    $(".ter_controls").click(function () {
       
        terminal.hide(200);
        open_ter.removeClass("open");
        
    });
    
//----------------------------- Start Login -----------------------------
//###################### Start Background Options ########################
    bgOptions.click(function () {
        rightNav.toggleClass("navOpen");
        if ($(this).hasClass("fa-bars")) {
            $(this).removeClass("fa-bars").addClass("fa-times");
        } else {
            $(this).removeClass("fa-times").addClass("fa-bars");
        }
    });
//###################### End Background Options ########################

    
    
    
//###################### Start Background change ########################
    rightNav.find("li").click(function () {
        var img = $(this).css("background-image");
        $(this).addClass("bgdSelect").siblings().removeClass("bgdSelect");
        over.animate({width: "toggle"}, 200, function () {
            login.css({
                "background-image": img
            });
        });
        over.animate({width: "toggle"});
    });
//###################### End Background change ########################

    
    
    
    
//###################### Start time (user view) ########################
    time.click(function () {
        $(this).fadeToggle(300, function () {
            user.fadeToggle();
        });
    });
    
    user.find("i").click(function () {
        user.fadeToggle(300, function () {
            time.fadeToggle();
        });
    });
    
    user.find("span").click(function () {
        login.css({"background-color": "rgba(0, 0, 0, 1)"});
        login.fadeOut(10, function () {
            desktop.fadeIn(1000)
            
        });
        
        /*desktop.fadeIn(1000, function () {
            login.fadeOut(10);
        });*/
        
    });
//###################### End time (user view) ########################
//----------------------------- End Login -----------------------------
    
    
    
    
    
//###################### start Check Browser ########################
    // this function for check the brower name
    // for remove scroll bar of applist in firefox. (bug)
    // can't styling it whith css like chrome
    function BrowserCheck() {
        var N   = navigator.appName,
            ua  = navigator.userAgent,
            tem,
            M  = ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) {M[2] = tem[1]; }
        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        return M;
    }
    // adjust some styles on moz
    if (new BrowserCheck()[0] === "Firefox") {
        applists.css({
            "overflow": "hidden",
            "max-height": "66.5vh"
        });
        all.css({"bottom": "4%"});
        frequent.css({"bottom": "4%"});
        $(".date_time").css({"left": "-210%"});
        $(".pow_last").css({"line-height": 0, "margin-top": "5%"});
        
    }
//###################### start Check Browser ########################
    
    
    
    
    

//######################  start volume up     ########################
    vlm.animate({
        width: (range.val()) / 1.5 + "%"
    }, 100);
    
    $(".vl").text(range.val() + "%");
    
    range.on("input", function () {
        if ($(this).val() > 90) {
            vlm.animate({
                width: ($(this).val()) / 1.6 + "%"
            }, 5);
        } else {
            vlm.animate({
                width: ($(this).val()) / 1.5 + "%"
            }, 5);
        }
        $(".vl").text($(this).val() + "%");
        
    });
//######################  end volume up     ########################

    
    
    
    
    
//######################  start wirless & power   ########################
    openS.click(function () {
        $(this).find("div").slideToggle(300)
            .parent()
            .siblings()
            .children("div").slideUp(500);
        if ($(this).find(".stat > i").hasClass("fa-caret-right")) {
            $(this).find(".stat > i")
                .removeClass("fa-caret-right")
                .addClass("fa-caret-down");
        } else {
            $(this).find(".stat > i")
                .removeClass("fa-caret-down")
                .addClass("fa-caret-right");
        }
        
        if ($(this).find("div").is(":visible")) {
            $(".stat > i").not($(this).find(".stat > i"))
                .removeClass("fa-caret-down")
                .addClass("fa-caret-right");
        }
    });
    onoff.click(function () {
       
        if ($(this).hasClass("fa-toggle-off")) {
            $(this).removeClass("fa-toggle-off")
                .addClass("fa-toggle-on");
            $(this).parent().siblings().text("Turn On");
            $(this).parent().parent().siblings().not(":last-of-type").hide();
        } else {
            $(this).addClass("fa-toggle-off")
                .removeClass("fa-toggle-on");
            $(this).parent().siblings().text("Turn Off");
            $(this).parent().parent().siblings().not(":last-of-type").show();
        }
    });
//######################  end wirless & power   ########################

    
    
    // calender adjust
    nots.height($(".cal").height());


    
    
//######################  start show ul(date places & other...)   ########################
    showUl.click(function () {
        $(this).parent().find("ul").fadeToggle(400);
        $(this).parent().siblings().find("ul").fadeOut(400);
    });
//######################  end show ul(date places & other ...)   ########################

    
    
    
    
//######################  star add class this_day   ########################    
    for (count; count <= button.length - 1; count = count + 1) {
        if ((button[count]).value === day) {
            $(button[count]).addClass("this_day")
                .siblings().removeClass("this_day");
        }
    }
//######################  end add class this_day   ########################    

    
    
    
    
//######################  start show apps titles   ########################    
    titls.hover(function () {
        $(this).find(".title").fadeToggle(50);
    });
//######################  end show apps titles   ########################    


    
    
    
//######################  start activities   ########################  
    activities.on('click', function () {
        $(".virtual_desktop").fadeToggle(200);
        if (cnchi.css("transform") === "matrix(0.7, 0, 0, 0.7, 0, 0)") {
            cnchi.css({
                "transform": "scale(1)",
                "border": "1px solid #484848",
                "z-index": 5
            });
            cnchi.find("a").fadeOut(200);
            $(".desk.this_desk").children().remove("div");
        } else {
            cnchi.css({
                "transform": "scale(.7)",
                "border": "6px solid #2EA3F2",
                "z-index": parseInt($(this).css("z-index"), 3) + 5
            });
            cnchi.find("a").fadeIn(50);

            var m = cnchi.clone().css({
                "top": "-120%",
                "left": "-130%",
                "transform": "scale(.1)",
                "width": "350%"
            });
            m.appendTo(".this_desk");
        }
    });
//######################  end activities     ########################    

    
    
//######################  start add class open  ########################    
    titls.click(function () {
       
        $(this).addClass("open");
        
    });
//######################  end add class open  ########################    
    
    
    
//######################  start cnchi     ########################    
    // Open and Close cnchi
    opencnchi.click(function () {
        cnchi.fadeIn(200);
        cnchi.css({"transform": "scale(1)", "border": "none"});
        $(".circle_o").hide();
        $(".virtual_desktop").fadeOut(200);
        
    });
    $(".circle_o").on('click', function () {
        cnchi.fadeOut(50);
        $(".virtual_desktop").find(".cnchi").fadeOut(200);
    });
    
    $(".cnchi_close").click(function () {
        opencnchi.removeClass("open");
        cnchi.css({
            "transform": "scale(1.1)"
        }).animate({"opacity": "1"}, function () {
            $(this).css({"transform": "scale(0)"}).fadeOut(500);
        });
        
    });
    
    $(".cnchi_minu").click(function () {
        cnchi.css({
            "transform": "scale(1.1)"
        }).animate({"opacity": "1"}, function () {
            $(this).css({"transform": "scale(0)"}).fadeOut(500);
        });
        
    });
    
    // start install or try
    $(".try_it").click(function () {
        $(".letStart")
            .fadeIn(50)
            //.css({"top": "73%"})
            .css({"transform": "scale(1)"})
            .delay(4000)
            .animate({"opacity": "1"}, function () {
                $(this).css({"transform": "scale(0)"}).fadeOut(500);
            });
    });
//######################  end cnchi     ########################     

    
    
    
    
//######################  start change desktop ########################    
    $(".desk").click(function () {
        $(this).addClass("this_desk").siblings()
            .removeClass("this_desk");
    });
//######################  end change desktop   ########################    
       

    
    
    
//######################  start rightClick       ########################    

    titls.mousedown(function (event) {
        var key = event.which;
        if (key === 3) {
            event.preventDefault();
            //$(this).find(".title").hide();
            $(this).find(".rightclick").show();
            return false;
        } else if (key === 1) {
            $(".rightclick").fadeOut(100);
        }
    });
//######################  end rightClick         ########################    
 

    
    
    
//######################  start show apps    ########################  
    showapps.click(function () {
        apps.fadeToggle(100).css({"z-index": "9"});
        for (count = 0; count <= lists.length - 1; count += 1) {
            $(lists[count]).css({
                "animation": "sh_apps  " + count / 15  + "s 1 linear",
				"-moz-animation": "sh_apps  " + count / 15 + "s 1 linear",
                "position": "static",
                "opacity": 1
            });
        }
        search.focus();
    });
//######################  end show apps      ########################    

    
    
    
    
//######################  start add names & nxt|prev app   ########################    
    for (count = 0; count <= lists.length - 1; count = count + 1) {
        $(lists[count]).find("span").text($(lists[count]).css("background-image")
                    .substr(68).split(".")[0]);
    }
    
    nextapps.click(function () {
        applists.animate({scrollTop : applists.height() * 2}, 300);
    });
    
    centapps.click(function () {
        applists.animate({scrollTop : applists.height()}, 300);
    });
    
    prevapps.click(function () {
        applists.animate({scrollTop : 0}, 300);
    });
    
    nxprev.click(function () {
       
        if (!$(this).hasClass("this_apps")) {
            $(this).addClass("this_apps").siblings().removeClass("this_apps");
        }
        
    });
//######################  end add names & nxt|prev app   ########################       

    
    
    
    

//######################  start search for apps   ######################## 
    for (count = 0; count <= lists.length - 1; count += 1) {
        lst.push(span[count]);
    }
    search.keyup(function () {
        var optie   = $(this).val().toLowerCase();
        for (count = 0; count <= lists.length - 1; count += 1) {
            if (optie === lst[count].innerHTML.substr(0, 2)) {
                lst2.push(lists[count]);
                freqlst.push(lists[count]);    //regester to Frequent apps
                lists.fadeOut(50);
            }
            if (optie === lst[count].innerHTML.toLowerCase().substr(0, 4)) {
                lst2 = [];
                lst2.push(lists[count]);
                freqlst.push(lists[count]);
                lists.fadeOut(50);
            }
        }
        $(lst2).fadeIn();
        if (search.val().length <= 1) {
            lists.fadeIn(50);
            lst2 = [];
        }
        lists.css({"animation": "none"});
    });
    frequent.click(function () {
        $(this).addClass("chek").siblings().removeClass("chek");
        lists.fadeOut(50);
        $(freqlst).fadeIn(50);
        
    });
    all.click(function () {
        if (!$(this).hasClass("chek")) {
            $(this).addClass("chek").siblings().removeClass("chek");
        }
        $(freqlst).fadeOut(50);
        lists.fadeIn(50);
    });
//######################  end search for apps   ########################       
    
    
});
