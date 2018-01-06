export default (req, res, next) => {
  if (!req.timeout) next()
}
