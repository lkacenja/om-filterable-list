<?php

namespace OpenMedia\FilterableList;

class ConfigBase {
  protected $views = [];
  public function __construct() {
    $this->views = $this->defineConfig();
  }
  public function getViews() {
    return $this->views;
  }
  public function getView($view) {
    return !empty($this->views[$view]) ? $this->views[$view] : FALSE;
  }
  public function getOptions($field_name) {
    $field = get_field_object($field_name);
    return $field['choices'];
  }
  public function emptyConfigMessage() {
    return "Missing required list config. Please edit plugin configuration object directly.";
  }
}
