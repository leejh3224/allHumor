export default {
  test: {
    mongoUri: 'mongodb://localhost/test',
    port: 3031,
  },
  development: {
    mongoUri: 'mongodb://localhost/allhumor',
    port: 3030,
    jwtSecret: 'wet3ghuo8e@@#T$sssvCCssAxcs',
    smtpProvider: 'Gmail',
    gmailAccount: 'leejh3224@khu.ac.kr',
    gmailPassword: '10rhrnak9027@',
  },
  production: {},
}
