import 'babel-polyfill'
import db from 'models'
import config from 'config'
import app from 'app'

const env = process.env.NODE_ENV
const port = config[env].port || 3030

db.connect()

app.init()
app.listen(port, () => console.log(`app is listening on ${port}`))
