

export function isAuth(req,res,next) {
  console.log(req.headers);
  next();
}
