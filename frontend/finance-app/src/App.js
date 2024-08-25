import React, { useEffect, useState } from 'react'

import api from "./api"

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [fromData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: '',
    date: '',
  })

  const fetchTransactions = async () => {
    const response = await api.get('/transactions')
    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...fromData,
      [e.target.name]: value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await api.post('/transactions', fromData)
    fetchTransactions()
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: '',
      date: '',
    })
  }

  return (
    <>
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <a href="#" className="navbar-brand">Finance App</a>
      </div>
    </nav>
    </>
  )
}

export default App
