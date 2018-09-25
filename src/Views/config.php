<?php

namespace OpenMedia\FilterableList\Views;

use OpenMedia\FilterableList\ConfigBase;

/**
 * @file
 * This is the per-site editable configuration file. Make changes here.
 *   This class is responsible for building out all filterable list widgets. 
 */

class Config extends ConfigBase {

  /**
   * Defines arrays of widget configuration.
   * 
   * @return array
   *     The array of widget configuraion or empty.
   *
   * Each config item is keyed by an arbitrary string. Does not have to be post type.
   * 
   * @code
   *  $views['my-post-list'] = array(
   *    'label' => 'Filterable List of Posts', // Label shown in widget UI.
   *    'post_type' => 'post', // Type of post to pull in. Renders tease.php and tease-[type].php by default.
   *    'items_per_page' => 10, // Number of items shown per page.
   *    'base_path' => '/sample-page', // Url where the list will live. Must be unique.
   *  );
   *  // Optional list of filters.
   *  $views['my-post-list']['filters'] = array(
   *    'size' => array(
   *      'type' => 'select', // Type of filter. select|search|date
   *      'multiple' => TRUE, // If type is select, whether or not filter is a multi-select.
   *      'label' => 'T-shirt size.', // Optional label text to show above input.
   *      'options' => array( // If type is select, required list of options.
   *         'small' => 'Small',
   *         'medium' => 'Medium',
   *         'large' => 'Large',
   *      ),
   *      'placeholder' => 'Size',  // Optional placeholder text.
   *      'default_value' => array('medium'), // Default value to preload the app with.
   *      'acf' => TRUE // Is this an ACF field or core
   *    )
   *  );
   * @endcode 
   */
  public function defineConfig() {
    $views = array();
    $views['my-post-list'] = array(
      'label' => 'Filterable List of Posts',
      'items_per_page' => 10,
      'post_type' => 'post',
      'base_path' => '/sample-page',
    ); 
    $views['my-post-list']['filters'] = array(
      'size' => array(
        'type' => 'select',
        'options' => array(
          'small' => 'Small',
          'medium' => 'Medium',
          'large' => 'Large',
        ),
        'placeholder' => 'Size',
        'default_value' => array('medium'),
        'acf' => TRUE
      )
    );
    return $views;
  }
}
