import Pagination from '../components/Pagination'

export default {
  component: Pagination,
  props: {
    currentPage: 1,
    rangeMinMax: [1, 2, 3, 4, 5],
    loadPage: () => console.log('loading pages ...'),
    lastPage: 20,
    loadNextMinPage: () => console.log('loading next ...'),
    loadPrevMinPage: () => console.log('loading prev ...'),
  },
}
