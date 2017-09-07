/**
 * @file
 * Sticky share buttons on content pages.
 */

(function($){

  Drupal.behaviors.stickyslot_sticky = {

    attach: function() {

      if (Drupal.settings.stickySlot && Drupal.settings.stickySlot.slots) {} else { return; }

      var stickyslots = Drupal.settings.stickySlot.slots;

      var firstElements     = [];
      var dontExistElements = [];

      stickyslots.forEach(function(slot, index) {
        var $el = document.querySelector(slot.element);

        if ($el) {
          slot.position = $el.getBoundingClientRect().top;
          firstElements.push(slot);
        } else {
          dontExistElements.push(slot);
        }
      });

      firstElements.sort(function(a, b) {
        return a.position - b.position;
      });

      stickyslots = firstElements.concat(dontExistElements);

      window.addEventListener('load', function() {

        var $body       = $(document.body);

        var contentdiv  = $('#content-group').height();
        var sidebardiv  = $('#sidebar-second').height();

        if (contentdiv < sidebardiv) {
          return;            
        }

        var stickSlots = function() {
          stickyslots.forEach(function(slot, index) {
            var $stickyElement = $(slot.element);

            var options = {
              parent:     slot.parent,
              spacer:     slot.spacer,
              offset_top: slot.offset_top
            };

            if ($stickyElement.length > 0 && !slot.sticky) {
              $stickyElement.stick_in_parent(options);
              slot.sticky = true;

              if (index === stickyslots.length - 1) {
                onBottom($stickyElement);
              }
            }
          });
        }

        var onBottom = function($stickyElement) {
          $stickyElement.one('sticky_kit:bottom', function() {
            var reverseStickySlot = stickyslots.slice().reverse();

            var height = window.getComputedStyle(document.querySelector(reverseStickySlot[0].element)).height;

            reverseStickySlot.shift();

            reverseStickySlot.forEach(function(slot, index) {
              document.querySelector(slot.element).style.paddingBottom = height;
            });

            $body.trigger('sticky_kit:recalc');

            offBottom($stickyElement);
          });
        }

        var offBottom = function($stickyElement) {
          $stickyElement.one('sticky_kit:unbottom', function() {
            var reverseStickySlot = stickyslots.slice().reverse();
            reverseStickySlot.shift();

            reverseStickySlot.forEach(function(slot, index) {
              document.querySelector(slot.element).style.removeProperty('padding-bottom');
            });

            $body.trigger('sticky_kit:recalc');

            var $el = $(stickyslots[0].element);

            $el.off('sticky_kit:unstick');
            $el.one('sticky_kit:unstick', function() {
              $body.trigger('sticky_kit:recalc');
            });

            onBottom($stickyElement);
          });
        }

        googletag.cmd.push(function() {
          googletag.pubads().addEventListener('slotRenderEnded', function(e) {
            stickSlots();

            if ((e.slot === googletag.slots.stickyslot_0) && (e.isEmpty === false)) { 
              $body.trigger('sticky_kit:recalc');

              var stickyHeights = 0;

              stickyslots.forEach(function(slot) {
                stickyHeights += parseInt(getComputedStyle(document.querySelector(slot.element)).height, 10) + 30;
              });

              if (stickyHeights > window.innerHeight) {
                stickyslots.forEach(function(slot) {
                  jQuery(slot.element).trigger('sticky_kit:detach');
                });
              }
            }
          });
        });

        stickSlots();
      });
    }
  }
})(jQuery);