const { response } = require('express')
const express=require('express')
const app=express()



  let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//if you want to get all persons
app.get('/api/persons',(request,response)=>{
  response.json(persons)

})

app.get('/info',(request,response)=>{
  //if you want to know the maximum number person
  const maxPerson = persons.length > 0
    ? Math.max(...persons.map(n => n.id)):0
    const dateNow=new Date()
  
  response.send(`<p>Phonebook has ${maxPerson}  people</p> <p>  ${dateNow} </p>`)

})

app.use(express.json())

app.get('/api/persons/:id',(request,response)=>{
  const id=Number(request.params.id)
  const person=persons.find(p=>p.id===id)

  if(person){
    response.json(person)
  }
  else{
    response.status(404).end()
  }
 

})


const PORT=3005
app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`)
})




