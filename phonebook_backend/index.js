const { response, request } = require('express')
const express=require('express')
const app=express()

const morgan=require('morgan')


app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');
morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})
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
//getting a single person
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

app.delete('/api/persons/:id',(request,response)=>{
  const id = Number(request.params.id)
  const persons=persons.filter(per=>per.id !==id)
  response.status(204).end()
})

//how to add a new person
app.post('/api/persons', (request,response)=>{
  const maxPerson=persons.length>0
  ?Math.max(...persons.map(p=>p.id))
  :0
  const pers=request.body
  pers.id=maxPerson+1
  persons=persons.concat(pers)
  response.json(pers)

})

//how dectect a name that s alraedy added
app.post('/api/persons/:id',(request,response)=>{
  const id=Number(request.params.id)
  const person=persons.find(p=>p.id===id)

  if(person){
  
    response.error('name must unique').end()
  }
  else{
    response.json(person)
  }
 

})


const PORT=3005
app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`)
})





