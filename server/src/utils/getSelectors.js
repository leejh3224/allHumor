import { URL } from 'url'

export default url =>
  ({
    'www.dogdrip.net': {
      authorSelector: '.author span',
      bodySelector: '.contentBody .xe_content',
      titleSelector: '.titleAndUser .title h1 a',
      uploadDateSelector: '.dateAndCount .date',
      selectorsForUnneccessaryNode: ['.addon_addvote'],
    },
    'www.kick-off.co.kr': {
      authorSelector: '.view_regist_info_regist_user a[onclick^="$.userInfoMenu"]',
      bodySelector: '.view_contents',
      titleSelector: '.view_title',
      uploadDateSelector: '.view_regist_info_regist_date',
    },
    'www.ddengle.com': {
      authorSelector: '.btm_area .nick',
      bodySelector: '.xe_content',
      titleSelector: '.np_18px a',
      uploadDateSelector: '.fr .date',
    },
    'www.instiz.net': {
      authorSelector: '.tb_left span a',
      bodySelector: '.memo_content',
      titleSelector: '.tb_top #subject a',
      uploadDateSelector:
        '[itemtype="http://schema.org/Article"] .tb_left span[itemprop=datePublished]',
    },
  }[new URL(url).hostname])
