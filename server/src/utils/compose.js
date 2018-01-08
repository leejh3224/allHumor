export default (...fns) => data => fns.reduce((value, func) => func(value), data)
