export default {
  previewList: {
    REQUEST: 'previewList/FETCH_REQUEST',
    SUCCESS: 'previewList/FETCH_SUCCESS',
    ERROR: 'previewList/FETCH_ERROR',
  },
  article: {
    REQUEST: 'article/ARTICLE_REQUEST',
    SUCCESS: 'article/ARTICLE_SUCCESS',
    ERROR: 'article/ARTICLE_ERROR',
  },
  comment: {
    REQUEST: 'comment/COMMENT_REQUEST',
    SUCCESS: 'comment/COMMENT_SUCCESS',
    ERROR: 'comment/COMMENT_ERROR',
    ADD_REQUEST: 'comment/COMMENT_ADD_REQUEST',
    ADD_SUCCESS: 'comment/COMMENT_ADD_SUCCESS',
    ADD_ERROR: 'comment/COMMENT_ADD_ERROR',
    EDIT_REQUEST: 'comment/COMMENT_EDIT_REQUEST',
    EDIT_SUCCESS: 'comment/COMMENT_EDIT_SUCCESS',
    EDIT_ERROR: 'comment/COMMENT_EDIT_ERROR',
    REMOVE_REQUEST: 'comment/COMMENT_REMOVE_REQUEST',
    REMOVE_SUCCESS: 'comment/COMMENT_REMOVE_SUCCESS',
    REMOVE_ERROR: 'comment/COMMENT_REMOVE_ERROR',
  },
  voting: {
    REQUEST: 'voting/VOTING_REQUEST',
    SUCCESS: 'voting/VOTING_SUCCESS',
    ERROR: 'voting/VOTING_ERROR',
  },
  reply: {
    REQUEST: 'comment/REPLY_REQUEST',
    SUCCESS: 'comment/REPLY_SUCCESS',
    ERROR: 'comment/REPLY_ERROR',
    ADD_REQUEST: 'comment/REPLY_ADD_REQUEST',
    ADD_SUCCESS: 'comment/REPLY_ADD_SUCCESS',
    ADD_ERROR: 'comment/REPLY_ADD_ERROR',
  },
  login: {
    SWITCH_VIEW: 'login/SWITCH_VIEW',
  },
  user: {
    SET_USER_PROFILE: 'user/SET_USER_PROFILE',
  },
  ui: {
    SWITCH_LOGIN_VIEW: 'ui/SWITCH_LOGIN_VIEW',
    TOGGLE_REPLIES: 'ui/TOGGLE_REPLIES',
    TOGGLE_EXPAND_COMMENT: 'ui/TOGGLE_EXPAND_COMMENT',
    START_EDIT_COMMENT: 'ui/START_EDIT_COMMENT',
    FINISH_EDIT_COMMENT: 'ui/FINISH_EDIT_COMMENT',
  },
  search: {
    CHANGE_INPUT: 'search/CHANGE_INPUT',
    REQUEST: 'search/SEARCH_REQUEST',
    SUCCESS: 'search/SEARCH_SUCCESS',
    ERROR: 'search/SEARCH_ERROR',
  },
  addReply: {
    START_ADD_REPLY: 'addReply/START_ADD_REPLY',
    FINISH_ADD_REPLY: 'addReply/FINISH_ADD_REPLY',
  },
}
