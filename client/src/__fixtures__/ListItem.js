/* eslint-disable */
import formatDate from 'utils/formatDate'

import ListItem from '../components/ArticleList/ListItem'

// static 파일은 앞에 / 없이 바로 images 혹은 파일명부터 적는다.
export default {
  component: ListItem,
  url: '/',
  props: {
    author: '작성자',
    date: '2018-01-05 02:30:32',
    title: '샘플 제목',
    thumbnail: 'images/ducks.jpeg',
    site: 'dogdrip',
  },
}
