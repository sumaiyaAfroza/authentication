import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "30d"
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // ✅ production এ true
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // ✅ cross-site এর জন্য 'none'
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/'
  })

  return token
}



// import jwt from "jsonwebtoken";
//
// export const generateToken = ( res, userId) => {
//   const token = jwt.sign({userId}, process.env.JWT_SECRET , {
//     expiresIn: "30d"
//   } )
//   res.cookie('jwt', token, {
//     httpOnly: true,
//      secure: true,
//     sameSite: "none",
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     path: '/'
//   })
//
//   return token
// }