// jQuery regex filter (http://james.padolsey.com/javascript/regex-selector-for-jquery/)
jQuery.expr[':'].regex = function(elem, index, match) {
  var matchParams = match[3].split(','),
  validLabels = /^(data|css):/,
  attr = {
    method: matchParams[0].match(validLabels) ?
                matchParams[0].split(':')[0] : 'attr',
    property: matchParams.shift().replace(validLabels,'')
  },
  regexFlags = 'ig',
  regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
  return regex.test(jQuery(elem)[attr.method](attr.property));
};

jQuery(document).ready(function($) {
  /**
   * jQuery plugin to change element type (http://stackoverflow.com/questions/8584098/how-to-change-an-element-type-using-jquery)
   */
  (function($) {
    $.fn.changeElementType = function(newType) {
      var attrs = {};

      $.each(this[0].attributes, function(idx, attr) {
        attrs[attr.nodeName] = attr.nodeValue;
      });

      this.replaceWith(function() {
        return $("<" + newType + "/>", attrs).append($(this).contents());
      });
    };
  })(jQuery);

  Galleria.loadTheme('//lsecities.net/app/themes/lsecities-alexandria/assets/bower_components/galleria/src/themes/classic/galleria.classic.js');
    
  // enable Galleria for embedded slideshows
  try {
    if(jQuery('.lc-newspaper-article .lc-galleria').length > 0) {
      jQuery('.lc-newspaper-article .lc-galleria').galleria({responsive: true, height: 0.75, lightbox: true, _toggleInfo: false, preload: 'all', debug: $('body').hasClass('is_user_logged_in') ? 'true' : 'false' });
    }
  } catch(error) { }

  // enable Galleria for right-hand-side navbar slideshows
  try {
    if(jQuery('#navigationarea .lc-galleria').length > 0) {
      jQuery('#navigationarea .lc-galleria').galleria({responsive: true, height: 0.75, transition: 'fade', transitionSpeed: 600, carousel: false, thumbnails: false, autoplay: 5000, showInfo: false, preload: 'all', debug: $('body').hasClass('user_logged_in') ? 'true' : 'false' });
      jQuery('#navigationarea .lc-galleria.fullbleed .galleria-thumbnails-container').hide();
    }
  } catch(error) { }

  // enable Galleria for research/publication/event pages photo slider
  try {
    var selector = '.lc-research-project .lc-galleria, .lc-publication .lc-galleria, .lc-event .lc-galleria',
        fullbleed_selector = '.lc-research-project .lc-galleria.fullbleed .galleria-thumbnails-container, .lc-publication .lc-galleria .lc-galleria.fullbleed .galleria-thumbnails-container, .lc-event .lc-galleria.fullbleed .galleria-thumbnails-container';

    if(jQuery(selector).length > 0) {
      jQuery(selector).galleria({
        responsive: true,
        height: 0.4,
        transition: 'fade',
        transitionSpeed: 600,
        carousel: false,
        thumbnails: false,
        autoplay: 5000,
        showInfo: false,
        preload: 'all',
        wait: true,
        debug: $('body').hasClass('user_logged_in') ? 'true' : 'false'
      });
      jQuery(fullbleed_selector).hide();
    }
  } catch(error) { }

  // Run Galleria for galleria shortcodes
  try {
    $('.galleria-tag').each(function(index) {
      var galleria_options = {
        wait: true,
        debug: $(this).data('debug'),
        responsive: $(this).data('responsive'),
        height: $(this).data('height')
      };
      
      if($(this).data('allowFullscreen')) {
        galleria_options['extend'] = function() {
          var gallery = this;
          this.bind('image', function(e) {
            $(e.imageTarget).unbind('click').click(function() {
              gallery.toggleFullscreen();
            });
          });
        };
      }
      if($(this).data('picasaSelector')) {
        galleria_options['picasa'] = $(this).data('picasaSelector');
        galleria_options['picasaOptions'] = $(this).data('picasaOptions');
      }
      if($(this).data('flickrSelector')) {
        galleria_options['flickr'] = $(this).data('flickrSelector');
        galleria_options['flickrOptions'] = $(this).data('flickrOptions');
      }
    
      Galleria.run("#" + $(this).attr('id'), galleria_options);
    });
  } catch(error) {}
  
  try {
    if(jQuery('.lc-galleria.single .galleria-image-nav')) {
      jQuery('.lc-galleria.single .galleria-image-nav').hide();
    }
  } catch(error) {}

  $('.speaker-profile').hover(
    function () {
        $(this).children('.speaker-card').fadeIn();
    },
    function () {
        $(this).children('.speaker-card').fadeOut();
    }
  );

  $('.flexslider').each(function(index) {
    var
    base_flexslider_configuration = {
      animation: 'slide',
      slideshow: true,
      mousewheel: false,
      controlNav: false,
      directionNav: true,
      pauseOnHover: true
    },
    /**
     * First read data attribute as string (i.e. via $.attr() rather
     * than via $.data(), then replace single quotes with double quotes
     * so that the resulting string is valid JSON.
     * Unfortunately we can't avoid replacing double quotes with single
     * quotes in PHP and then single quotes with double quotes here, as
     * MtHAML outputs HTML attributes delimited by double quotes (it
     * may be possible to change that, but there doesn't seem to be any
     * per-template configuration option at least in the current
     * version of MtHAML.
     */
    flexslider_configuration_string = $(this).attr('data-flexslider-configuration'),
    flexslider_configuration = $.parseJSON(flexslider_configuration_string.replace(/'/g, '"'))
    
    $(this).flexslider($.extend(base_flexslider_configuration, flexslider_configuration));
  });
  
  $('.accordion').accordion({heightStyle: 'content', active: $(this).find('.active')});

  // enable tabs on #uiTabs and .uiTabs lists
  $('#uiTabs, .uiTabs').tabs();
  
  jQuery('.lc-index .controls ul li').click(function() {
    var selector = '[data-' + jQuery(this).closest('[data-toggle-on]').data('toggle-on') + '="' + jQuery(this).data('toggle') + '"]';
    var toggle_status = jQuery(this).attr('data-status') == 'disabled' ? 'enabled' : 'disabled';
    
    jQuery(this).attr(
      'data-status',
      toggle_status
    );
    
    console.log(toggle_status);
    
    jQuery(selector)
      .attr('data-status', toggle_status);
  });

  // track clicks to binary files hosted in WordPress.
  // based on http://www.wduffy.co.uk/blog/tracking-google-goals-with-no-url-using-jquery/.
  // uses regex jQuery filter (http://james.padolsey.com/javascript/regex-selector-for-jquery/).
  if($('body').hasClass('is_user_logged_in')) {
    function addGAEventTracker(uri) {
      var re = /^(http:\/\/lsecities\.net)?(.*)$/gi;
      var originalhref = $(this).attr('href');
      var href = originalhref.replace(re, '$2');
      console.log("PDF download at URI %s tracked with event label '%s'", originalhref, href);
      _gaq.push(['_trackEvent', 'PDF', 'download', href]);
    }
    $(':regex(href,(http:\/\/lsecities\.net\/)?\/files\/.*.pdf)').click(function() {
      console.log('download');
    });
    $(':regex(href,(http:\/\/lsecities\.net\/)?\/files\/.*)').click(function() {
      var re = /^(http:\/\/lsecities\.net)?(.*\.(.*))$/gi;
      var originalhref = $(this).attr('href');
      var href = originalhref.replace(re, '$2');
      var extension = originalhref.match(/^.*(\..*)$/);
      console.log('Download (type: %s) at URI %s tracked with event label \'%s\'', extension, originalhref, href);
    });
  } else {

    $(':regex(href,(http:\/\/lsecities\.net\/)?\/files\/.*.pdf)').click(function() {
      var re = /^(http:\/\/lsecities\.net)?(.*)$/gi;
      var originalhref = $(this).attr('href');
      var href = originalhref.replace(re, '$2');
      console.log("PDF download at URI %s tracked with event label '%s'", originalhref, href);
      _gaq.push(['_trackEvent', 'PDF', 'download', href]);
    });
    $(':regex(href,(http:\/\/lsecities\.net\/)?\/files\/.*.xlsx?)').click(function() {
      var re = /^(http:\/\/lsecities\.net)?(.*)$/gi;
      var originalhref = $(this).attr('href');
      var href = originalhref.replace(re, '$2');
      console.log("Excel document download at URI %s tracked with event label '%s'", originalhref, href);
      _gaq.push(['_trackEvent', 'Excel document', 'download', href]);
    });
    $(':regex(href,(http:\/\/lsecities\.net\/)?\/files\/.*.docx?)').click(function() {
      var re = /^(http:\/\/lsecities\.net)?(.*)$/gi;
      var originalhref = $(this).attr('href');
      var href = originalhref.replace(re, '$2');
      console.log("Word document download at URI %s tracked with event label '%s'", originalhref, href);
      _gaq.push(['_trackEvent', 'Word document', 'download', href]);
    });
  }
  
  // Enable mediaelementjs for event materials (audio)
  $('.event-materials audio').mediaelementplayer({
    audiowidth: '100%',
    defaultVideoWidth: '100%'
  });
});
