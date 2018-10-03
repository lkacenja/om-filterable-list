<?php

namespace OpenMedia\FilterableList;

class ConfigUtility {
  protected $config = [];
  public function __construct() {
    $this->config = $this->getConfigDefinitions();
  }
  protected function getConfigDefinitions() {
    $config = array();
    $config = apply_filters('om-filterable-list-config', $config);
    return $this->processConfig($config);
  }
  protected function processConfig($config) {
    if (!empty($config)) {
      foreach ($config AS $key => $list) {
        foreach ($list['filters'] AS $filter_key => $item) {
          if (!empty($item['options']) || !empty($item['category'])) {
            if (!empty($item['category'])) {
              $config[$key]['filters'][$filter_key]['options'] = $this->categoriesToOptions($item['taxonomy']);
            }
            else {
              $options = array();
              foreach($item['options'] AS $option_key => $value) {
                $options[] = array('id' => $option_key, 'text' => $value);
              }
              $config[$key]['filters'][$filter_key]['options'] = $options;
            }
          }
        }
      } 
    }
    return $config;
  }
  protected function categoriesToOptions($taxonomy) {
   $options = array();
   $terms = get_terms([
      'taxonomy' => $taxonomy,
      'hide_empty' => false,
    ]);
    if (!empty($terms) && is_array($terms)) {
      foreach ($terms AS $term) {
        $options[] = array('id' => $term->term_id, 'text' => $term->name);
      }
    }
    return $options;
  }
  public function getAllConfig() {
    return $this->config;
  }
  public function getConfigById($id) {
    return  !empty($this->config[$id]) ? $this->config[$id] : FALSE;
  }
}
