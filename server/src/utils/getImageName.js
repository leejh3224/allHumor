import head from 'lodash/head'
import uuidv4 from 'uuid/v4'

export default src => uuidv4() + head(src.match(/.(gif|jpe?g|tiff|png)?$/i))
