/* global jQuery, SUShortcodesL10n */

export default function SUOtherShortcodes () {
  jQuery(document).ready(function ($) {
    function scrollIn ($el) {
      if (
        $(window).scrollTop() + $('body').offset().top > $el.offset().top ||
        $(window).scrollTop() + $(window).height() < $el.offset().top
      ) {
        $(window).scrollTop(
          $el.offset().top -
            $('body').offset().top -
            $el.data('scroll-offset')
        )
      }
    }
    function addAnchor (anchor = '') {
      if (typeof anchor !== 'string') {
        return
      }
      anchor = anchor
        .replace(/[^a-z0-9_-]/gim, '')
        .trim()
      if (anchor === '') {
        return
      }
      window.location.hash = '#' + anchor
    }
    // Spoiler
    $('body:not(.su-other-shortcodes-loaded)').on(
      'click keypress',
      '.su-spoiler-title',
      function (e) {
        var $spoiler = $(this).parent()
        // Open/close spoiler
        $spoiler.toggleClass('su-spoiler-closed')
        // Add anchor to URL
        if (!$spoiler.hasClass('su-spoiler-closed') && $spoiler.data('anchor-in-url') === 'yes') {
          addAnchor($spoiler.data('anchor'))
        }
        // Close other spoilers in accordion
        $spoiler
          .parent('.su-accordion')
          .children('.su-spoiler')
          .not($spoiler)
          .addClass('su-spoiler-closed')
        // Scroll in spoiler in accordion
        scrollIn($spoiler)
        e.preventDefault()
      }
    )

    function revealTab ($tab) {
      var index = $tab.index()
      var isDisabled = $tab.hasClass('su-tabs-disabled')
      var $container = $tab.parents('.su-tabs')
      var $tabs = $container.find('.su-tabs-nav span')
      var $panes = $container.find('.su-tabs-pane')
      var $gmaps = $panes
        .eq(index)
        .find('.su-gmap:not(.su-gmap-reloaded)')
        // Check tab is not disabled
      if (isDisabled) return false
      // Hide all panes, show selected pane
      $panes
        .removeClass('su-tabs-pane-open')
        .eq(index)
        .addClass('su-tabs-pane-open')
        // Disable all tabs, enable selected tab
      $tabs
        .removeClass('su-tabs-current')
        .eq(index)
        .addClass('su-tabs-current')
        // Reload gmaps
      if ($gmaps.length > 0) {
        $gmaps.each(function () {
          var $iframe = $(this).find('iframe:first')
          $(this).addClass('su-gmap-reloaded')
          $iframe.attr('src', $iframe.attr('src'))
        })
      }
    }

    // Tabs
    $('body:not(.su-other-shortcodes-loaded)').on(
      'click keypress',
      '.su-tabs-nav span',
      function (e) {
        var $tab = $(this)
        var $container = $tab.parents('.su-tabs')
        var data = $tab.data()
        revealTab($tab)
        // Add anchor to URL
        if ($container.data('anchor-in-url') === 'yes') {
          addAnchor($tab.data('anchor'))
        }
        // Open specified url
        if (data.url !== '') {
          if (data.target === 'self') window.location = data.url
          else if (data.target === 'blank') window.open(data.url)
        }
        e.preventDefault()
      }
    )

    // Activate tabs
    $('.su-tabs').each(function () {
      var active = parseInt($(this).data('active')) - 1

      var $tab = $(this)
        .children('.su-tabs-nav')
        .children('span')
        .eq(active)

      revealTab($tab)
    })

    // Activate anchor nav for tabs and spoilers
    anchorNav()

    // Lightbox
    $(document).on('click', '.su-lightbox', function (e) {
      e.preventDefault()
      e.stopPropagation()

      if (
        $(this)
          .parent()
          .attr('id') === 'su-generator-preview'
      ) {
        $(this).html(SUShortcodesL10n.noPreview)

        return
      }

      var type = $(this).data('mfp-type')
      var mobile = $(this).data('mobile')
      var windowWidth = $(window).width()

      $(this)
        .magnificPopup({
          disableOn: function () {
            if (mobile === 'no' && windowWidth < 768) {
              return false
            }
            if (typeof mobile === 'number' && windowWidth < mobile) {
              return false
            }
            return true
          },
          type: type,
          tClose: SUShortcodesL10n.magnificPopup.close,
          tLoading: SUShortcodesL10n.magnificPopup.loading,
          gallery: {
            tPrev: SUShortcodesL10n.magnificPopup.prev,
            tNext: SUShortcodesL10n.magnificPopup.next,
            tCounter: SUShortcodesL10n.magnificPopup.counter
          },
          image: {
            tError: SUShortcodesL10n.magnificPopup.error
          },
          ajax: {
            tError: SUShortcodesL10n.magnificPopup.error
          },
          iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
              '<div class="mfp-close"></div>' +
              '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe>' +
            '</div>'
          }
        })
        .magnificPopup('open')
    })
    // Frame
    $('.su-frame-align-center, .su-frame-align-none').each(function () {
      var frameWidth = $(this)
        .find('img')
        .width()
      $(this).css('width', frameWidth + 12)
    })
    // Tooltip
    $('.su-tooltip').each(function () {
      var $tt = $(this)
      var $content = $tt.find('.su-tooltip-content')
      var isAdvanced = $content.length > 0
      var data = $tt.data()
      var config = {
        style: {
          classes: data.classes
        },
        position: {
          my: data.my,
          at: data.at,
          viewport: $(window)
        },
        content: {
          title: '',
          text: ''
        }
      }
      if (data.title !== '') config.content.title = data.title
      if (isAdvanced) config.content.text = $content
      else config.content.text = $tt.attr('title')
      if (data.close === 'yes') config.content.button = true
      if (data.behavior === 'click') {
        config.show = 'click'
        config.hide = 'click'
        $tt.on('click', function (e) {
          e.preventDefault()
          e.stopPropagation()
        })
        $(window).on('scroll resize', function () {
          $tt.qtip('reposition')
        })
      } else if (data.behavior === 'always') {
        config.show = true
        config.hide = false
        $(window).on('scroll resize', function () {
          $tt.qtip('reposition')
        })
      } else if (data.behavior === 'hover' && isAdvanced) {
        config.hide = {
          fixed: true,
          delay: 600
        }
      }
      $tt.qtip(config)
    })

    // Expand
    $('body:not(.su-other-shortcodes-loaded)').on(
      'click',
      '.su-expand-link',
      function () {
        var $this = $(this)
        var $container = $this.parents('.su-expand')
        var $content = $container.children('.su-expand-content')

        if ($container.hasClass('su-expand-collapsed')) {
          $content.css('max-height', 'none')
        } else {
          $content.css('max-height', $container.data('height') + 'px')
        }

        $container.toggleClass('su-expand-collapsed')
      }
    )

    function isTransitionSupported () {
      var thisBody = document.body || document.documentElement
      var thisStyle = thisBody.style
      var support =
        thisStyle.transition !== undefined ||
        thisStyle.WebkitTransition !== undefined ||
        thisStyle.MozTransition !== undefined ||
        thisStyle.MsTransition !== undefined ||
        thisStyle.OTransition !== undefined

      return support
    }

    // Animations is supported
    if (isTransitionSupported()) {
      // Animate
      $('.su-animate').each(function () {
        $(this).one('inview', function (e) {
          var $this = $(this)
          var data = $this.data()
          window.setTimeout(function () {
            $this.addClass(data.animation)
            $this.addClass('animated')
            $this.css('visibility', 'visible')
          }, data.delay * 1000)
        })
      })
    } else {
      // Animations isn't supported
      $('.su-animate').css('visibility', 'visible')
    }

    function anchorNav () {
      // Check hash
      if (document.location.hash === '') return
      // Go through tabs
      $('.su-tabs-nav span[data-anchor]').each(function () {
        if ('#' + $(this).data('anchor') === document.location.hash) {
          var $tabs = $(this).parents('.su-tabs')
          // Activate tab
          $(this).trigger('click')
          // Scroll-in tabs container
          window.setTimeout(function () {
            scrollIn($tabs)
          }, 100)
        }
      })
      // Go through spoilers
      $('.su-spoiler[data-anchor]').each(function () {
        if ('#' + $(this).data('anchor') === document.location.hash) {
          var $spoiler = $(this)
          // Activate tab
          if ($spoiler.hasClass('su-spoiler-closed')) {
            $spoiler.find('.su-spoiler-title:first').trigger('click')
          }
          // Scroll-in tabs container
          window.setTimeout(function () {
            scrollIn($spoiler)
          }, 100)
        }
      })
    }

    if ('onhashchange' in window) $(window).on('hashchange', anchorNav)

    $('body').addClass('su-other-shortcodes-loaded')
  })
}
