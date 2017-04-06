/**
 * @file
 * Sticky share buttons on content pages.
 */

(function($){

  Drupal.behaviors.stickyslot_sticky = {

    attach: function() { 
        
      
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

        window.onload = function() {          
          // Test that the sidebar is longer than the content, otherwise disable onScroll functionality. 
          var contentdiv = $('#content').height();
          var sidebardiv = $('#sidebar-second').height();
          if (contentdiv < sidebardiv) {
            return;            
          }else{
            $(stickyElement).stick_in_parent(options);
            $(document).on('lazyadslot:slotready', function(event){        
              // Init sticky-kit when a lazy ad slot is loaded.
              $(stickyElement).stick_in_parent(options);
            });
          }
        };

        // For ad slots: wait until the ad slot is loaded first
        googletag.cmd.push(function() {
          googletag.pubads().addEventListener('slotRenderEnded', function(e) {
            if ((e.slot === googletag.slots.stickyslot_0) && (e.isEmpty === false)) { 
              $(document.body).trigger('sticky_kit:recalc');           
            }
          });
        });
      }); 
    }
  }
})(jQuery);
