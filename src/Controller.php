<?php

namespace OpenMedia\FilterableList;

use OpenMedia\FilterableList\Views\Config; 

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
    $all_config = new Config();
    $this_config = $all_config->getView($list_type);
    if (empty($this_config)) {
      throw new \Exception("List is not in config.");
    }
    $post_type = $this_config['post_type'];
    $page = !empty($_GET['page']) ? $_GET['page'] : 0;
    $args = array(
      'post_type' => $post_type,
      'post_status' => 'publish',
      'order_by' => 'date',
      'order' => 'DESC'
    );
    $meta_query = array('relation' => 'AND');
    foreach ($_GET AS $key => $value) {
      if ($key != 'page' && $key != 'sort') {
        if (!empty($this_config['filters'][$key])) {
          $meta_query[] = array(
            'key' => $key,
            'value' => $value,
            'compare' => is_array($value) ? 'IN' : '='
          );
        }
        else {
          throw new \Exception("Key: $key is not in config.");
        }
      }
    }
    $args['meta_query'] = $meta_query;
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
