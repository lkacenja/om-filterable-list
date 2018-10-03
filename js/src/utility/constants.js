import { base_path, list_key } from 'config';

export default {
  BASE_PATH: base_path,
  CONTENT_ENDPOINT: '/wp-json/om-list/v1/query/' + list_key,
  MOUNT_ELEMENT: 'filterable-list-root',
  EMPTY_TEXT: 'Your filters did not return any results. Please try again.',
  PAGER_PREVIOUS: 'Previous', 
  PAGER_NEXT: 'Next', 
  PAGER_TEXT: 'Load More',
  ITEMS_PER_PAGE: 25
}
