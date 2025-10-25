import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function User() {
  const [user, setUser] = useState([])

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}`) 
    .then(result=>setUser(result.data))
    .catch(err=>console.log(err))   
  },[])

  const handleDelete=(id)=>{
    axios.delete(`${import.meta.env.VITE_API_URL}/deleteUser/${id}`)
    .then(res=>console.log(res)
    )
    .catch(err=>console.log(err)
    )
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-600 text-white px-6 py-4">
          <h2 className="text-2xl font-bold tracking-wide">User Management</h2>
          <Link
            to="/create"
            className="bg-white text-blue-600 font-semibold hover:bg-blue-50 py-2 px-4 rounded-md transition-all shadow-md"
          >
            + Add User
          </Link>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-center">
            <thead className="bg-blue-100 text-blue-800 uppercase text-sm font-semibold">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200">Name</th>
                <th className="py-3 px-4 border-b border-gray-200">Email</th>
                <th className="py-3 px-4 border-b border-gray-200">Age</th>
                <th className="py-3 px-4 border-b border-gray-200">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {user.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition-all duration-200"
                >
                  <td className="py-3 px-4 border-b border-gray-200">{user.name}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{user.email}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{user.age}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <div className="flex justify-center gap-2">
                      <Link
            to={`/Update/${user._id}`}
            className="bg-blue-600 text-white font-semibold hover:bg-blue-700 py-2 px-4 rounded-md transition-all shadow-md"
          >
         Update
          </Link>
                      <button
                      
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm transition-all"
                      onClick={()=>handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-gray-500 text-sm text-center py-3">
          © {new Date().getFullYear()} User Dashboard | Built by <span className="font-semibold text-blue-600">Ibad Ullah Khan</span>
        </div>
      </div>
    </div>
  )
}

export default User
