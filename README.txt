Module: StickySlot

Description
===========
This module is using the Sticky Kit JS library, Doubleclick for Publishers (DFP) and context to install a new ad slot which will stick fixed to the page on scroll.  
The configuration should be  vanilla enough that the code can be applied to any amount of multiple elements on the page to stick them too.


Installation
============
Copy the module directory in to your Drupal /sites/all/modules directory as per usual.


Configuration
=============
There is no special configuration page for the module, as it should work out of the box once installed and enabled.
Please do ensure you have removed onScroll or any other such sticky ads before replacing them.
To apply the script to new blocks or to override existing parameters, you will need to pass a new array of variables into Drupal.settings (see stickyslot.module for requirements). Detailed instructions coming soon.