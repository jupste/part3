const express = require('express')
const morgan= require('morgan')
const app = express()
const bodyParser = require('body-parser')

let persons = [
  {id: 1, name: "Arto Hellas", number: "045-123456"},
  {id: 2, name:" Arto Järvinen", number: "045-123456"},
  {id: 3, name: "Lea Kutvonen", number: "045-123456"},
  {id: 4, name: "Martti Tienaari", number: "045-122456"}
]
app.use(bodyParser.json())
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'));
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})
  app.post('/api/persons', (request, response) => {
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
    if((persons.filter(p => p.name === body.name)).length>0){
      return response.status(400).json({ 
        error: 'name already in list' 
      })
    }
    const person = {
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random() *5000),
    }
  
    persons = persons.concat(person)
    response.json(person)
  })
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    console.log(id)
    const person = persons.find(p => Number(p.id) === Number(id))
    console.log(person)
    response.json(person)
  })
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(p => p.id !== id);
    response.status(204).end();
  });
app.get('/info', (req, res) => {
    res.send(`<div><p>Puhelinluettelo sisältää ${persons.length} henkilön tiedot</p>
    <p> ${new Date()}</p></div>`)
    console.log(persons.length)
  })