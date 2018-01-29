export default {
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
    SHOW_ADD_COMMENT: 'ui/SHOW_ADD_COMMENT',
    HIDE_ADD_COMMENT: 'ui/HIDE_ADD_COMMENT',
    TOGGLE_REPLIES: 'ui/TOGGLE_REPLIES',
    TOGGLE_EXPAND_COMMENT: 'ui/TOGGLE_EXPAND_COMMENT',
  },
}
