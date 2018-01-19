import auth0 from 'auth0-js'
import history from 'utils/history'

export default class Auth {
  constructor() {
    this.scheduleRenewal()
  }

  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri:
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV_REDIRECT_URI
        : process.env.REACT_APP_PROD_REDIRECT_URI,
    audience: process.env.AUDIENCE,
    responseType: 'token id_token',
    scope: 'email profile',
  })

  userProfile
  tokenRenewalTimeout // for token renewal

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('no access token')
    }
    return accessToken
  }

  getProfile = (cb) => {
    const accessToken = this.getAccessToken()
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile
      }
      cb(err, profile)
    })
  }

  sendMagicLink = (email, cb) => {
    this.auth0.passwordlessStart(
      {
        connection: 'email',
        send: 'link',
        email,
      },
      cb,
    )
  }

  socialLogin = (provider = 'google-oauth2') => {
    this.auth0.authorize({ connection: provider })
  }

  handleAuthentication = async () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        history.replace('/')
      } else if (err) {
        history.replace('/')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  /* eslint-disable no-mixed-operators */
  setSession = (authResult) => {
    const { expiresIn, accessToken, idToken } = authResult
    const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
    localStorage.setItem('expires_at', expiresAt)

    this.scheduleRenewal()
    history.replace('/')
  }

  logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    clearTimeout(this.tokenRenewalTimeout)
    history.replace('/')
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  renewToken = () => {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        this.setSession(result)
      }
    })
  }

  scheduleRenewal = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    const delay = expiresAt - Date.now()

    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken()
      }, delay)
    }
  }
}
