
// takes a function and returns another function w/ 3 parameters
// applies the 1st function to the given parameters in the 2nd function
// next takes an error as parameter and lets express catch the error
const asyncWrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next))
  .catch(next);

module.exports = asyncWrap;
