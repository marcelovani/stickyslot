<?php

/**
 * @file
 * Context reaction plugin for Sticky Slots.
 */

/**
 * Class StickySlotContextReaction
 */
class StickySlotContextReaction extends context_reaction {
  /**
   * Form options.
   *
   * @param $context
   * @return mixed
   */
  function options_form($context) {
    // Get existing values for this form.
    $values = array();
    $settings = $this->fetch_from_context($context);
    if (!empty($settings['values'])) {
      $values = $settings['values'];
    }

    $form['values'] = array(
      '#type' => 'fieldset',
    );

    $form['values']['element'] = array(
      '#type' => 'textfield',
      '#size' => 20,
      '#title' => t('Element'),
      '#description' => t('CSS selector'),
      '#required' => TRUE,
      '#default_value' => isset($values['element']) ? $values['element'] : '',
    );

    $form['values']['parent'] = array(
      '#type' => 'textfield',
      '#size' => 20,
      '#title' => t('parent'),
      '#description' => t('CSS selector'),
      '#required' => TRUE,
      '#default_value' => isset($values['parent']) ? $values['parent'] : '',
    );

    $form['values']['offset_top'] = array(
      '#type' => 'textfield',
      '#size' => 20,
      '#title' => t('offset_top'),
      '#description' => t('Integer (pixels)'),
      '#required' => TRUE,
      '#default_value' => isset($values['offset_top']) ? $values['offset_top'] : '',
    );

    return $form;
  }

  /**
   * Execute context.
   */
  function execute() {
    foreach ($this->get_contexts() as $context) {
      if (!isset($context->reactions['stickyslot']['values'])) {
        continue;
      }

      $values = $context->reactions['stickyslot']['values'];

      $default_slot = array(
        'element'=> $values['element'],
        'parent'=> $values['parent'],
        'spacer'=> false,
        'offset_top'=> (int) $values['offset_top'],
      );

      drupal_add_js(array(
        'stickySlot' => array(
          'slots' => array (
            $default_slot
          ),
        ),
      ),
      'setting');
    }
  }
}
