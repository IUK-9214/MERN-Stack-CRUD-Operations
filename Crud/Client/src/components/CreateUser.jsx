import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateUser() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate()

  const Submit = (e) => {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/create`, { name, email, age })
      .then(result => {
        console.log(result)
        navigate('/')
      })
      .catch(err => console.log(err)
      )

  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-8">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6 border-b pb-3">
          Create New User
        </h1>

        <form className="space-y-5"
          onSubmit={Submit}>
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="Name" className="text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              name="Name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="Email" className="text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              name="Email"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label htmlFor="Age" className="text-gray-700 font-semibold mb-1">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter age"
              name="Age"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
            >
              Submit
            </button>

            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateUser
