const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model("Person", personSchema)
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}

const password = process.argv[2]
const user = "jussis"
const newPerson = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb://${user}:${password}@ds129904.mlab.com:29904/puhelinluettelo_fs`
mongoose.connect(url, { useNewUrlParser: true })

const person = new Person({
  name: newPerson,
  number: newNumber
})

person.save().then(response => {
  console.log(`henkilö ${newPerson} puh: ${newNumber} lisätty!`)
  mongoose.connection.close()
})
