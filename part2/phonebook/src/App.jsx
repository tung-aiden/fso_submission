import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({
  addInput,
  newName,
  newPhone,
  handleNameChange,
  handlePhoneChange,
}) => {
  return (
    <form onSubmit={addInput}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ namesToShow }) => {
  
  return (
    <ul>
      {namesToShow.map((person) => (
        <>
          <li key={person.name}>
            {person.name} {person.phone}{' '}
            <button onClick={() => personService.deleteID(person.id)}>delete</button>
          </li>
        </>
      ))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPeople) => setPersons(initialPeople))
  }, [])

  const addInput = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      phone: newPhone,
    }

    if (persons.some((person) => person.name === personObject.name)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    personService.create(personObject).then((newPerson) => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhone('')
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }



  const namesToShow =
    filter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().startsWith(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addInput={addInput}
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} />
    </div>
  )
}

export default App
