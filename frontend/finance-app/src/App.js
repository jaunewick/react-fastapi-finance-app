import React, { useEffect, useState } from 'react'

import api from "./api"

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [formData, setFormData] = useState({
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
      ...formData,
      [e.target.name]: value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await api.post('/transactions', formData)
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
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">Finance App</a>
        </div>
      </nav>
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="amount" className='form-label'>Amount</label>
            <input
              type="text"
              className='form-control'
              id='amount'
              name='amount'
              onChange={handleInputChange}
              value={formData.amount}
              placeholder='e.g., 100,00'
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className='form-label'>Category</label>
            <input
              type="text"
              className='form-control'
              id='category'
              name='category'
              onChange={handleInputChange}
              value={formData.category}
              placeholder='e.g., Clothing'
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className='form-label'>Description</label>
            <input
              type="text"
              className='form-control'
              id='description'
              name='description'
              onChange={handleInputChange}
              value={formData.description}
              placeholder='e.g., T-shirt'
            />
          </div>
          <div className="mb-3">
            <label htmlFor="is_income" className='form-label'>Income?</label>
            <input
              type="checkbox"
              id='is_income'
              name='is_income'
              onChange={handleInputChange}
              value={formData.is_income}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className='form-label'>Date</label>
            <input
              type="text"
              className='form-control'
              id='date'
              name='date'
              onChange={handleInputChange}
              value={formData.date}
              placeholder='e.g. 25-08-2024'
            />
          </div>
          <button type='submit' className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
