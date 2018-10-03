<?php
/**
 * @package OM Filterable List
 */
/*
Plugin Name: Open Media Filterable List
Description: Create filterable list views with a modular Redux front end. 
*/

require_once(plugin_dir_path(__FILE__) . "/vendor/autoload.php");

use OpenMedia\FilterableList\Controller;
use OpenMedia\FilterableList\ConfigUtility;

add_action( 'init', function() {
  $utility = new ConfigUtility();
  foreach ($utility->getAllConfig() AS $config) {
    if (!empty($config['base_path'])) {
      $object = get_page_by_path(ltrim($config['base_path']));
      if (!empty($object)) {
        $regex = '^' . ltrim($config['base_path'], '/') . '/([^/]*)/?';
        $rewrite = 'index.php?page_id=' . $object->ID;
        add_rewrite_rule( $regex, $rewrite, 'top' );
        $regex = '^' . ltrim($config['base_path'], '/') . '/([^/]*)/([^/]*)/?';
        add_rewrite_rule( $regex, $rewrite, 'top' );
      }
    }
  }
});

add_action( 'rest_api_init', function () {
  $controller = new Controller();  
  $controller->register_routes();
} );

add_action( 'widgets_init', function() {
  register_widget( 'OpenMedia\FilterableList\Widget' );
}); 
