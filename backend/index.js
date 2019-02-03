require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const app = express()
const bodyParser = require("body-parser")
const Person = require("./models/person")

let persons = [
  { id: 1, name: "Arto Hellas", number: "045-123456" },
  { id: 2, name: " Arto Järvinen", number: "045-123456" },
  { id: 3, name: "Lea Kutvonen", number: "045-123456" },
  { id: 4, name: "Martti Tienaari", number: "045-122456" }
]
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(bodyParser.json())
morgan.token("body", req => JSON.stringify(req.body))
app.use(express.static("build"))
app.use(
  morgan(":method :url :body :status :res[content-length] - :response-time ms")
)
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>")
})
const formatPerson = person => ({
  name: person.name,
  number: person.number,
  id: person._id
})
app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => res.json(persons.map(formatPerson)))
})
app.post("/api/persons", (request, response) => {
  const body = request.body
  if (body.name === undefined) {
    return response.status(400).json({
      error: "name missing"
    })
  }
  if (body.number === undefined) {
    return response.status(400).json({
      error: "number missing"
    })
  }
  if (persons.filter(p => p.name === body.name).length > 0) {
    return response.status(400).json({
      error: "name already in list"
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 5000)
  })

  persons = persons.concat(person)
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
})
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(note => {
    response.json(note.toJSON())
  })
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})
app.get("/info", (req, res) => {
  Person.find({}).then(persons =>
    res.send(
      `<div><p>Puhelinluettelo sisältää ${persons.length} henkilön tiedot</p>
    <p> ${new Date()}</p></div>`
    )
  )
})
