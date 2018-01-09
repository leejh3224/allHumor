import head from 'lodash/head'

// returns full match
export default string => head(string.match(/[\w]{0,}.(gif|jpe?g|tiff|png)?$/i))
