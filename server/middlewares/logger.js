const logger = (req, res, next) => {
  console.log(req.parsedQuery);
  console.log(req.parsedCookies);
  next();
}

export default logger;
