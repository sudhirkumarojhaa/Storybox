var StoryBox = {
  containerObject: {},
  containerPanels: [],
  settings: {
    displayEffect: [
      "bounceInUp",
      "bounceInRight",
      "bounceInDown",
      "bounceInLeft"
    ],
    hideEffect: [
      "bounceOutUp",
      "bounceOutRight",
      "bounceOutDown",
      "bounceOutLeft"
    ]
  },
  namespace: "storybox",
  Init: function(e, t) {
    this.namespace = this.namespace + "-" + parseInt(Math.random() * 1e3);
    this.containerObject = e;
    this.settings = jQuery.extend(1, this.settings, t);
    this.setContainerPanels();
    this.loadPanels();
  },
  setContainerPanels: function() {
    var e = this;
    this.containerObject.find("[data-sb]").each(function() {
      e.containerPanels[e.containerPanels.length] = {
        container: jQuery(this),
        displayEffect:
          jQuery.trim(jQuery(this).attr("data-sb")) == ""
            ? e.settings.displayEffect
            : jQuery(this)
                .attr("data-sb")
                .indexOf(",") != -1
              ? jQuery(this)
                  .attr("data-sb")
                  .split(",")
              : jQuery(this).attr("data-sb"),
        hideEffect:
          typeof jQuery(this).attr("data-sb-hide") != "undefined"
            ? jQuery.trim(jQuery(this).attr("data-sb-hide")) == ""
              ? e.settings.hideEffect
              : jQuery(this)
                  .attr("data-sb-hide")
                  .indexOf(",") != -1
                ? jQuery(this)
                    .attr("data-sb-hide")
                    .split(",")
                : jQuery(this).attr("data-sb-hide")
            : false
      };
      $(this).css("opacity", 0);
    });
  },
  loadPanels: function() {
    var e = this;
    jQuery(window).bind("scroll." + this.namespace, function() {
      e._handleDisplay();
    });
    e._handleDisplay();
  },
  _handleDisplay: function() {
    var e = jQuery(window).scrollTop() + window.innerHeight,
      t = this;
    jQuery.each(t.containerPanels, function(n, r) {
      if (r.container.hasClass("sb-effect-running")) return;
      if (
        e >= r.container.offset().top &&
        e <=
          r.container.offset().top +
            r.container.height() * 0.7 +
            window.innerHeight
      ) {
        if (r.container.hasClass("sb-effect-displayed")) return;
        r.container.addClass("sb-effect-displayed sb-effect-running");
        var i = t._getRandomSettingElement(r.displayEffect);
        if (typeof r.container.data("sb-effect") != "undefined")
          r.container.removeClass("animated " + r.container.data("sb-effect"));
        r.container.css("opacity", 1);
        r.container.addClass("animated " + i);
        r.container.data("sb-effect", i);
        setTimeout(function() {
          r.container.removeClass("sb-effect-running");
        }, 1e3);
      } else if (r.container.hasClass("sb-effect-displayed")) {
        if (r.hideEffect != false) {
          r.container.removeClass(
            "sb-effect-displayed animated " + r.container.data("sb-effect")
          );
          var i = t._getRandomSettingElement(r.hideEffect);
          r.container.addClass("animated " + i);
          r.container.data("sb-effect", i);
          r.container.css("opacity", 1);
        }
      }
    });
  },
  unLoadPanels: function() {
    var e = this;
    this.containerPanels.each(function() {
      jQuery(this).unbind(e.namespace);
    });
  },
  _getRandomSettingElement: function(e) {
    return e instanceof Array ? e[Math.floor(Math.random() * e.length)] : e;
  }
};
jQuery(document).ready(function() {
  StoryBox.Init($("body"), {});
});
