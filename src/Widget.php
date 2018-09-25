<?php

namespace OpenMedia\FilterableList;

use OpenMedia\FilterableList\Views\Config;

class Widget extends \WP_Widget {

  static $variables = array();
 
  function __construct() {
    wp_register_script('filterable-list-redux', plugins_url('../js/dist/bundle.js', __FILE__), array('jquery'), false, true);
    wp_register_style('filterable-list-select2', plugins_url('../css/select2.css', __FILE__));
    parent::__construct(
      // Base ID of your widget
      'om_list_widget',  
      // Widget name will appear in UI
      __('OM Filterable List Widget', 'om_list_widget_domain'), 
      // Widget description
      array( 'description' => __( 'Configurable Redux list.', 'om_list_widget_domain' ), ) 
    );
  }

  // Creating widget front-end 
  public function widget( $args, $instance ) {
    add_action('wp_footer', array($this, 'add_options_to_script'));
    wp_enqueue_script('filterable-list-redux');
    wp_enqueue_style('filterable-list-select2');
    $all_config = new Config(); 
    $id = $instance['app_config'];
    $config = $all_config->getView($id);
    $config['list_key'] = $id;
    if (!empty($config)) {
      foreach ($config['filters'] AS $key => $filter) {
        if (!empty($filter['options'])) {
          $select_2_options = array();
          foreach ($filter['options'] AS $id => $text) {
            $select_2_options[] = array('id' => $id, 'text' => $text);
          }
          $config['filters'][$key]['options'] = $select_2_options;
        }
      }
      self::$variables = $config;

      $title = apply_filters( 'widget_title', $instance['title'] );
      // before and after widget arguments are defined by themes
      echo $args['before_widget'];
      if ( ! empty( $title ) ) {
        echo $args['before_title'] . $title . $args['after_title'];
        echo "<div id='filterable-list-root'></div>"; 
        echo $args['after_widget'];
      }
    }
  }
         
  // Widget Backend 
  public function form( $instance ) {
    if ( isset( $instance[ 'title' ] ) ) {
      $title = $instance[ 'title' ];
    }
    else {
      $title = __( 'New title', 'wpb_widget_domain' );
    }
    // Widget admin form
    ?>
      <p>
        <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
        <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
      </p>
    <?php
    $all_config = new Config();
    $all_views = $all_config->getViews();
    if (!empty($all_views)) {
      if (isset($instance['app_config'])) {
        $app_config = $instance['app_config'];
      } 
      else {
        $app_config = __( 'New App Config', 'wpb_widget_domain' );
      }
      ?>
      <p>
        <label for="<?php echo $this->get_field_id( 'app_config' ); ?>"><?php _e( 'App Config:' ); ?></label>
        <select  class="widefat" id="<?php echo $this->get_field_id( 'app_config' ); ?>" name="<?php echo $this->get_field_name( 'app_config' ); ?>">
        <?php foreach ($all_views AS $key => $option) { ?>
          <option value="<?php echo $key; ?>" <?php echo ($app_config == $key ? ' selected' : ''); ?> ><?php echo $option['label']; ?></option> 
        <?php } ?>
        </select>
      </p>
      <?php
    }
    else {
      ?>
      <p><?php echo $all_config->emptyConfigMessage(); ?></p>
      <?php
    }
  }
     
  // Updating widget replacing old instances with new
  public function update( $new_instance, $old_instance ) {
    $instance = array();
    $instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
    $instance['app_config'] = ( ! empty( $new_instance['app_config'] ) ) ? strip_tags( $new_instance['app_config'] ) : '';
    return $instance;
  }
  public function add_options_to_script() {
    wp_localize_script( 'filterable-list-redux', 'listConfig', self::$variables);   
  } 
} // Class wpb_widget ends here

