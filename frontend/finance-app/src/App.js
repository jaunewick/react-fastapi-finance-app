import React, { useEffect, useState } from 'react'

import api from "./api"

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
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
    console.log(formData);
    
    await api.post('/transactions', formData)
    fetchTransactions()
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
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
              type="Number"
              className='form-control'
              id='amount'
              name='amount'
              onChange={handleInputChange}
              value={formData.amount}
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
            />
          </div>
          <button type='submit' className="btn btn-primary mb-3">Submit</button>
        </form>
        <table className='table table-stripe table-bordered table-hover'>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Income?</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.map(t => (
              <tr key={t.id}>
                <td>{t.amount}</td>
                <td>{t.category}</td>
                <td>{t.description}</td>
                <td>{t.is_income ? 'Yes' : 'No'}</td>
                <td>{t.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
