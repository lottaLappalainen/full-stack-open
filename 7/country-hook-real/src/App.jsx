import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
//vittu
const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const url = `https://studies.cs.helsinki.fi/restcountries/api/name`

  useEffect(() => {
    if (!name) return; 
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`${url}/${name}`)
        setCountry({ data: response.data, found: true })
      } catch (err) {
        setCountry({ found: false })
      }
    }
    fetchCountry()
  }, [name]) 

  console.log(country)
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App