/**
 * @file
 * Sticky share buttons on content pages.
 */

(function($){

  Drupal.behaviors.stickyslot_sticky = {

    attach: function() {

      // Test that the sidebar is longer than the content, otherwise disable onScroll functionality. 
      var contentdiv = $('#content').height();
      var sidebardiv = $('#sidebar-second').height();
      if (contentdiv < (sidebardiv+500)) {
        return;
      }
      
      var stickyslots = Drupal.settings.stickySlot.slots;

      // The element to stick.
      stickyslots.forEach(function(slot, index) {  

        var stickyElement = stickyslots[index].element;

        /**
        * Initialise sticky-kit
        *
        * @callback
        */
       
        var options = {
          parent: stickyslots[index].parent,
          spacer: stickyslots[index].spacer,
          offset_top: stickyslots[index].offset_top,
        };

        // Init sticky-kit for when the element is immediately availible. 
        $(stickyElement).stick_in_parent(options);

        $(document).on('lazyadslot:slotready', function(event){        
          // Init sticky-kit when a lazy ad slot is loaded.
          $(stickyElement).stick_in_parent(options);
        });
      });        
    }
  }
})(jQuery);
