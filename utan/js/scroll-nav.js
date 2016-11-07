/*! scrollNav - v2.6.0 - 2015-02-19
 * http://scrollnav.com
 * Copyright (c) 2015 James Wilson; Licensed MIT */
! function(a) {
  var b = function(b, c, d, e) {
      if (a(b).length > 0) {
        var f = a(b).offset().top;
        c = e ? c : 0, a("html:not(:animated),body:not(:animated)").animate({
          scrollTop: f - d
        }, c)
      }
    },
    c = function() {
      return window.location.hash
    },
    d = {
      classes: {
        loading: "sn-loading",
        failed: "sn-failed",
        success: "sn-active"
      },
      defaults: {
        sections: "h1",
        subSections: !1,
        sectionElem: "section",
        className: "scroll-nav",
        showHeadline: !0,
        headlineText: "UTan",
        showTopLink: !0,
        topLinkText: "Top",
        fixedMargin: 40,
        scrollOffset: 40,
        animated: !0,
        speed: 500,
        insertLocation: "insertBefore",
        arrowKeys: !1,
        scrollToHash: !0,
        onInit: null,
        onRender: null,
        onDestroy: null,
        onResetPos: null
      },
      _set_body_class: function(b) {
        var c = a("body");
        "loading" === b ? c.addClass(d.classes.loading) : c.removeClass(d.classes.loading).addClass("success" === b ? d.classes.success : d.classes.failed)
      },
      _find_sections: function(b) {
        var c = d.settings.sections,
          e = [];
        if (d.settings.showTopLink) {
          var f = b.children().first();
          f.is(c) || e.push(f.nextUntil(c).andSelf())
        }
        b.find(c).each(function() {
          e.push(a(this).nextUntil(c).andSelf())
        }), d.sections = {
          raw: e
        }
      },
      _setup_sections: function(b) {
        var c = [];
        a(b).each(function(b) {
          var e = [],
            f = a(this),
            g = "scrollNav-" + (b + 1),
            h = function() {
              return 0 === b
            },
            i = function() {
              return !f.eq(0).is(d.settings.sections)
            },
            j = d.settings.showTopLink && h() && i() ? d.settings.topLinkText : f.filter(d.settings.sections).text();
          if (f.wrapAll("<" + d.settings.sectionElem + ' id="' + g + '" class="' + d.settings.className + '__section" />'), d.settings.subSections) {
            var k = f.filter(d.settings.subSections);
            k.length > 0 && k.each(function(b) {
              var c = g + "-" + (b + 1),
                h = a(this).text(),
                i = f.filter(a(this).nextUntil(k).andSelf());
              i.wrapAll('<div id="' + c + '" class="' + d.settings.className + '__sub-section" />'), e.push({
                id: c,
                text: h
              })
            })
          }
          c.push({
            id: g,
            text: j,
            sub_sections: e
          })
        }), d.sections.data = c
      },
      _tear_down_sections: function(b) {
        a(b).each(function() {
          var b = this.sub_sections;
          a("#" + this.id).children().unwrap(), b.length > 0 && a(b).each(function() {
            a("#" + this.id).children().unwrap()
          })
        })
      },
      _setup_nav: function(b) {
        var c = a("<span />", {
            "class": d.settings.className + "__heading",
            text: d.settings.headlineText
          }),
          e = a("<div />", {
            "class": d.settings.className + "__wrapper"
          }),
          f = a("<nav />", {
            "class": d.settings.className,
            role: "navigation"
          }),
          g = a("<ol />", {
            "class": d.settings.className + "__list"
          });
        a.each(b, function(b) {
          var c, e = 0 === b ? a("<li />", {
              "class": d.settings.className + "__item active"
            }) : a("<li />", {
              "class": d.settings.className + "__item"
            }),
            f = a("<a />", {
              href: "#" + this.id,
              "class": d.settings.className + "__link",
              text: this.text
            });
          this.sub_sections.length > 0 && (e.addClass("is-parent-item"), c = a("<ol />", {
            "class": d.settings.className + "__sub-list"
          }), a.each(this.sub_sections, function() {
            var b = a("<li />", {
                "class": d.settings.className + "__sub-item"
              }),
              e = a("<a />", {
                href: "#" + this.id,
                "class": d.settings.className + "__sub-link",
                text: this.text
              });
            c.append(b.append(e))
          })), g.append(e.append(f).append(c))
        }), f.append(d.settings.showHeadline ? e.append(c).append(g) : e.append(g)), d.nav = f
      },
      _insert_nav: function() {
        var a = d.settings.insertLocation,
          b = d.settings.insertTarget;
        d.nav[a](b)
      },
      _setup_pos: function() {
        var b = d.nav,
          c = a(window).height(),
          e = b.offset().top,
          f = function(b) {
            var c = a("#" + b.id),
              d = c.height();
            b.top_offset = c.offset().top, b.bottom_offset = b.top_offset + d
          };
        a.each(d.sections.data, function() {
          f(this), a.each(this.sub_sections, function() {
            f(this)
          })
        }), d.dims = {
          vp_height: c,
          nav_offset: e
        }
      },
      _check_pos: function() {
        var b = d.nav,
          c = a(window).scrollTop(),
          e = c + d.settings.scrollOffset,
          f = c + d.dims.vp_height - d.settings.scrollOffset,
          g = [],
          h = [];
        c > d.dims.nav_offset - d.settings.fixedMargin ? b.addClass("fixed") : b.removeClass("fixed");
        var i = function(a) {
          return a.top_offset >= e && a.top_offset <= f || a.bottom_offset > e && a.bottom_offset < f || a.top_offset < e && a.bottom_offset > f
        };
        a.each(d.sections.data, function() {
          i(this) && g.push(this), a.each(this.sub_sections, function() {
            i(this) && h.push(this)
          })
        }), b.find("." + d.settings.className + "__item").removeClass("active").removeClass("in-view"), b.find("." + d.settings.className + "__sub-item").removeClass("active").removeClass("in-view"), a.each(g, function(a) {
          0 === a ? b.find('a[href="#' + this.id + '"]').parents("." + d.settings.className + "__item").addClass("active").addClass("in-view") : b.find('a[href="#' + this.id + '"]').parents("." + d.settings.className + "__item").addClass("in-view")
        }), d.sections.active = g, a.each(h, function(a) {
          0 === a ? b.find('a[href="#' + this.id + '"]').parents("." + d.settings.className + "__sub-item").addClass("active").addClass("in-view") : b.find('a[href="#' + this.id + '"]').parents("." + d.settings.className + "__sub-item").addClass("in-view")
        })
      },
      _init_scroll_listener: function() {
        a(window).on("scroll.scrollNav", function() {
          d._check_pos()
        })
      },
      _rm_scroll_listeners: function() {
        a(window).off("scroll.scrollNav")
      },
      _init_resize_listener: function() {
        a(window).on("resize.scrollNav", function() {
          d._setup_pos(), d._check_pos()
        })
      },
      _rm_resize_listener: function() {
        a(window).off("resize.scrollNav")
      },
      _init_click_listener: function() {
        a("." + d.settings.className).find("a").on("click.scrollNav", function(c) {
          c.preventDefault();
          var e = a(this).attr("href"),
            f = d.settings.speed,
            g = d.settings.scrollOffset,
            h = d.settings.animated;
          b(e, f, g, h)
        })
      },
      _rm_click_listener: function() {
        a("." + d.settings.className).find("a").off("click.scrollNav")
      },
      _init_keyboard_listener: function(c) {
        d.settings.arrowKeys && a(document).on("keydown.scrollNav", function(a) {
          if (40 === a.keyCode || 38 === a.keyCode) {
            var e = function(a) {
                var b = 0,
                  e = c.length;
                for (b; e > b; b++)
                  if (c[b].id === d.sections.active[0].id) {
                    var f = 40 === a ? b + 1 : b - 1,
                      g = void 0 === c[f] ? void 0 : c[f].id;
                    return g
                  }
              },
              f = e(a.keyCode);
            if (void 0 !== f) {
              a.preventDefault();
              var g = "#" + f,
                h = d.settings.speed,
                i = d.settings.scrollOffset,
                j = d.settings.animated;
              b(g, h, i, j)
            }
          }
        })
      },
      _rm_keyboard_listener: function() {
        a(document).off("keydown.scrollNav")
      },
      init: function(e) {
        return this.each(function() {
          var f = a(this);
          d.settings = a.extend({}, d.defaults, e), d.settings.insertTarget = d.settings.insertTarget ? a(d.settings.insertTarget) : f, f.length > 0 ? (d.settings.onInit && d.settings.onInit.call(this), d._set_body_class("loading"), d._find_sections(f), f.find(d.settings.sections).length > 0 ? (d._setup_sections(d.sections.raw), d._setup_nav(d.sections.data), d.settings.insertTarget.length > 0 ? (d._insert_nav(), d._setup_pos(), d._check_pos(), d._init_scroll_listener(), d._init_resize_listener(), d._init_click_listener(), d._init_keyboard_listener(d.sections.data), d._set_body_class("success"), d.settings.scrollToHash && b(c()), d.settings.onRender && d.settings.onRender.call(this)) : (console.log('Build failed, scrollNav could not find "' + d.settings.insertTarget + '"'), d._set_body_class("failed"))) : (console.log('Build failed, scrollNav could not find any "' + d.settings.sections + 's" inside of "' + f.selector + '"'), d._set_body_class("failed"))) : (console.log('Build failed, scrollNav could not find "' + f.selector + '"'), d._set_body_class("failed"))
        })
      },
      destroy: function() {
        return this.each(function() {
          d._rm_scroll_listeners(), d._rm_resize_listener(), d._rm_click_listener(), d._rm_keyboard_listener(), a("body").removeClass("sn-loading sn-active sn-failed"), a("." + d.settings.className).remove(), d._tear_down_sections(d.sections.data), d.settings.onDestroy && d.settings.onDestroy.call(this), d.settings = [], d.sections = void 0
        })
      },
      resetPos: function() {
        d._setup_pos(), d._check_pos(), d.settings.onResetPos && d.settings.onResetPos.call(this)
      }
    };
  a.fn.scrollNav = function() {
    var b, c = arguments[0];
    if (d[c]) c = d[c], b = Array.prototype.slice.call(arguments, 1);
    else {
      if ("object" != typeof c && c) return a.error("Method " + c + " does not exist in the scrollNav plugin"), this;
      c = d.init, b = arguments
    }
    return c.apply(this, b)
  }
}(jQuery);