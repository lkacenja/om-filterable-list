<?php

namespace OpenMedia\FilterableList;

use OpenMedia\FilterableList\ConfigUtility; 

class Controller extends \WP_REST_Controller {
 
  /**
   * Register the routes for the objects of the controller.
   */
  public function register_routes() {
    $version = '1';
    $namespace = 'om-list/v' . $version;
    $base = 'query/(?P<list_type>[a-z\-\_]+)';
    register_rest_route( $namespace, '/' . $base, array(
      array(
        'methods'             => \WP_REST_Server::READABLE,
        'callback'            => array( $this, 'get_items' ),
        'permission_callback' => array( $this, 'get_items_permissions_check' ),
        'args'                => array(
        ),
      ),
    ) );
  }
 
  /**
   * Get a collection of items
   *
   * @param \WP_REST_Request $request Full data about the request.
   * @return \WP_Error|WP_REST_Response
   */
  public function get_items( $request ) {
    $list_type = $request->get_param('list_type');
    $utility = new ConfigUtility();
    $this_config = $utility->getConfigById($list_type);
    if (empty($this_config)) {
      throw new \Exception("List is not defined by config.");
    }
    $post_type = $this_config['post_type'];
    $page = !empty($_GET['page']) ? $_GET['page'] : 0;
    $args = array(
      'post_type' => $post_type,
      'post_status' => 'publish',
      'order' => 'DESC'
    );
    foreach ($_GET AS $key => $value) {
      if ($key != 'page') {
        if (!empty($this_config['filters'][$key])) {
          switch($this_config['filters'][$key]['type']) {
            case 'search':
              $args['s'] = $value;
              break;
            default:
              if (!empty($this_config['filters'][$key]['category'])) {
                $args['tax_query'] = !empty($args['tax_query']) ? $args['tax_query'] : array();
                $args['tax_query'][] = array(
                  'taxonomy' => $this_config['filters'][$key]['taxonomy'],
                  'field' => 'term_id',
                  'terms' => $value
                );
              }
              else if (!empty($this_config['filters'][$key]['sort'])) {
                $args['order'] = $this_config['filters'][$key]['order'][$value];
                $args['order_by'] = $value;
              }
              else {
                $meta_query = !empty($meta_query) ? $meta_query : array('relation' => 'AND');
                $meta_query[] = array(
                  'key' => $key,
                  'value' => $value,
                  'compare' => is_array($value) ? 'IN' : '='
                );
              }
          }
        }
        else {
          throw new \Exception("Key: $key is not in config.");
        }
      }
    }
    if (!empty($meta_query)) {
      $args['meta_query'] = $meta_query;
    }
    $query_object = new \WP_Query($args);
    $total = ceil($query_object->post_count / $this_config['items_per_page']);
    $args['paged'] = !empty($_GET['page']) ? $_GET['page'] : 0;
    $args['posts_per_page'] = $this_config['items_per_page'];
    $items = $query_object->query($args);
    $data = array();
    foreach( $items as $item ) {
      $itemdata = $this->prepare_item_for_response($item, $request);
      $data[] = $this->prepare_response_for_collection($itemdata);
    }
    $response = array('result' => $data, 'page' => $page, 'total' => $total); 
    return new \WP_REST_Response( $response, 200 );
  }

  /**
   * Prepare the item for the REST response
   *
   * @param mixed $item WordPress representation of the item.
   * @param \WP_REST_Request $request Request object.
   * @return mixed
   */
  public function prepare_item_for_response( $item, $request ) {
    $args = ['post_id' => $item->ID, 'post_object' => $item];
    return render_template_part('tease', 'tease', $args, FALSE);
  }
 
  /**
   * Check if a given request has access to get items
   *
   * @param \WP_REST_Request $request Full data about the request.
   * @return \WP_Error|bool
   */
  public function get_items_permissions_check( $request ) {
    return true; 
  }
 
  /**
   * Get the query params for collections
   *
   * @return array
   */
  public function get_collection_params() {
    return array(
      'page'     => array(
        'description'       => 'Current page of the collection.',
        'type'              => 'integer',
        'default'           => 1,
        'sanitize_callback' => 'absint',
      ),
      'per_page' => array(
        'description'       => 'Maximum number of items to be returned in result set.',
        'type'              => 'integer',
        'default'           => 10,
        'sanitize_callback' => 'absint',
      ),
      'search'   => array(
        'description'       => 'Limit results to those matching a string.',
        'type'              => 'string',
        'sanitize_callback' => 'sanitize_text_field',
      ),
    );
  }
}
