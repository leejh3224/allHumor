import 'babel-polyfill'
import config from 'config'
import app from 'app'

const port = config.etc.port || 3030

app.listen(port, () => console.log(`app is listening on ${port}`))
