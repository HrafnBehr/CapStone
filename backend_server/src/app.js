require('dotenv/config')
const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const authRouter = require('./models/auth/auth.routes')
const usersRouter = require('./models/users/users.routes')
const projectsRouter = require('./models/projects/projects.routes')
const { jwt } = require('./middleware/jwt')

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(logger('dev'))
app.use(cookieParser())

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/projects', projectsRouter)
// app.use('/api/v1/users', jwt, usersRouter)
// app.use('/api/v1/projects', jwt, projectsRouter)

// Catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404))
})

// Error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  return res.status(err.status).send()
})

module.exports = app
