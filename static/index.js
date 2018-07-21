var host = "www.isaacsuntag.com";
if ((host == window.location.host) && (window.location.protocol != "https:"))
window.location.protocol = "https";

$(document).ready(function() {

  $('body').removeClass('fade-out');

  $('.project').click(function(){
    window.open($(this).find('a:first').attr('href'), '_blank');
    return false;
  });

  $('.scroll_down').on("click", function() {
    $.scrollify.next();
  });

  // Scrollify Settings
  $(function() {
    $.scrollify({
      // A CSS selector for the sections of the page.
      section : ".section",
      // Scrollify lets you define a hash value for each section. This makes it possible to permalink to particular sections. This is set as a data attribute on the sections. The name of the data attribute is defined by 'sectionName'.
      sectionName : false,
      // A CSS selector for non-full-height sections, such as a header and footer.
      // interstitialSection : "",
      // Define the easing method.
      easing: "easeOutExpo",
      scrollSpeed: 800,
      // A distance in pixels to offset each sections position by.
      offset : 0,
      // A boolean to define whether scroll bars are visible or not.
      scrollbars: true,
      // A CSS selector for elements within sections that require standard scrolling behaviour.
      // standardScrollElements: "",
      // A boolean to define whether Scollify assigns a height to the sections. True by default.
      setHeights: false,
      // A boolean to define whether Scrollify will allow scrolling over overflowing content within sections. True by default.
      overflowScroll: true,
      // A boolean to define whether Scrollify updates the browser location hash when scrolling through sections. True by default.
      updateHash: false,
      // A boolean to define whether Scrollify handles touch scroll events. True by default.
      touchScroll:true,
      // A callback that is fired before a section is scrolled to via the move method. Arguments include the index of the section and an array of all section elements.
      before:function(i,panels) {
        // Change nav bubble to indicate correct section
        $(".pagination .active").removeClass("active");
        $(".pagination").find("li[data-id='"+ i +"']").addClass("active");
        if(i == 0) {
          $(".pagination").css("opacity", "0");
        } else {
          $(".pagination").css("opacity", "1");
        }
        // Show scrollbar if section has overflow
        if(panels[i].height() > $(window).height()) {
          $('body').css("overflow", "scroll")
        } else {
          $('body').css("overflow", "hidden")
        }
      },
      // // A callback that is fired after Scrollify's initialisation.
      afterRender:function() {
        // Disable scrollify if window width is less than 992
        if($(window).width() < 992) {
          $('body').css("overflow", "scroll")
          $.scrollify.disable();
        } else {
          // create nav bubbles
          var pagination = "<ul class=\"pagination\">";
          var activeClass = "";
          $(".section").each(function(i) {
            activeClass = "";
            // set the current scrollify page to be active
            if($(this).attr('id') == $.scrollify.current()[0].id) {
              activeClass = "active";
            }
            pagination += "<li class=\"" + activeClass + "\" data-id=\"" + i + "\"><span class=\"nav-label\">" + $(this).attr('data-section-name') + "</span></li>";
          });
          pagination += "</ul>";
          $(".container-fluid").append(pagination);
          // if the current scrollify page is the header page make opacity 0
          if($.scrollify.current()[0].id == 'header'){
            $(".pagination").css("opacity", "0");
          }
          // on click of nav bubble move to the correct page
          $(".pagination li").on("click",function() {
            $.scrollify.move(parseInt($(this).attr("data-id")));
          });
          // set correct overflow for current section
          if($.scrollify.current().height()>$(window).height()) {
            $('body').css("overflow", "scroll")
          } else {
            $('body').css("overflow", "hidden")
          }
        }
      },
      // // A callback that is fired after the window is resized.
      afterResize:function() {
        // Update heights of sections
        $.scrollify.update();
        // Disable scrollify if window width is less than 992
        if($(window).width() < 992) {
          $('body').css("overflow", "scroll")
          $.scrollify.disable();
        } else {
          $.scrollify.enable();
          // if the current scrollify page is the header page make opacity 0
          if($.scrollify.current()[0].id == 'header'){
            $(".pagination").css("opacity", "0");
          }
          // scroll to top of current section
          var $target = $('html,body');
          $target.animate({scrollTop: $.scrollify.current()[0].offsetTop}, 500);
          // set correct overflow for current section
          if($.scrollify.current().height() > $(window).height()) {
            $('body').css("overflow", "scroll")
          } else {
            $('body').css("overflow", "hidden")
          }
        }
      }
    });
  });
});
