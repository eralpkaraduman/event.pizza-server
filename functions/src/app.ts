import express, { NextFunction, Request, Response } from 'express'
import { router as meetupRouter } from './routes/meetup/meetup'
import { HttpError } from './errors';

const app = express()

app.get('/', (req, res) => {
  res.send(`Nothing to see here 🍕`)
})

app.use('/meetup', meetupRouter)

// Error handler
app.use((error: HttpError, request: Request, response: Response, next: NextFunction) => {
  if (response.headersSent) {
    return next(error)
  }
  const status = error.code || 500;
  const message = error.message || 'Something went wrong';
  const type = error.name || 'Error';
  response.status(status).json({status, message, type})
})


export default app
