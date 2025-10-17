import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function User() {
  const [user, setUser] = useState([
    { Name: "Ibad", Email: "Ibad5000@gmail.com", Age: 20 },
    { Name: "Ali", Email: "Ali123@gmail.com", Age: 22 },
    { Name: "Sara", Email: "SaraKhan@gmail.com", Age: 19 },
  ])

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
              {user.map((u, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition-all duration-200"
                >
                  <td className="py-3 px-4 border-b border-gray-200">{u.Name}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{u.Email}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{u.Age}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <div className="flex justify-center gap-2">
                      <Link
            to="/Update"
            className="bg-blue-600 text-white font-semibold hover:bg-blue-700 py-2 px-4 rounded-md transition-all shadow-md"
          >
         Update
          </Link>
                      <button
                      
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm transition-all">
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
