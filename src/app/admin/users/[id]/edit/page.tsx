'use client'
import React from 'react'
import UserForm from '../../userForm'
import EditController from './editController'

const Edit = () => {
    const {
        handleChange,
        handleSubmit,
        formValues
      } = EditController()
 
  return (
    <div 
      className="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-5 dark:bg-gray-800 dark:border-gray-700"
    >
      <form 
        className="space-y-2"
        onSubmit={handleSubmit}
      >
        <h5 
          className="text-xl font-medium text-gray-900 dark:text-white"
        >
          Edit a user
        </h5>
        <UserForm formValues={formValues} handleChange={handleChange}/>
      </form>
    </div>
  )
}

export default Edit
