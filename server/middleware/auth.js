
const checkAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).json({ message: 'Unauthenticated' })
    }
    const decodedToken = jwt.verify(token, SECRET_KEY)
    req.userData = { username: decodedToken.username }
    next()
}