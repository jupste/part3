if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 3001
const Person = require('./models/persons')
app.use(bodyParser.json())
app.use(express.static('build'))
morgan.token('body', req => JSON.stringify(req.body))
app.use(
  morgan(':method :url :body :status :res[content-length] - :response-time ms')
)
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(note => {
      response.json(note.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(body)
  if (body.name === undefined) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (body.number === undefined) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person
    .save()
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  if (body.name === undefined) {
    return res.status(400).json({ error: 'name is missing' })
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: 'number is missing' })
  }

  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
app.get('/info', (req, res) => {
  Person.find({}).then(persons =>
    res.send(
      `<div><p>Puhelinluettelo sisältää ${persons.length} henkilön tiedot</p>
    <p> ${new Date()}</p></div>`
    )
  )
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' || error.name === 'TypeError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
