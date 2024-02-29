import React, { useState } from 'react'
import app from '../firebaseConfig'
import {getDatabase,push,set,ref} from 'firebase/database'
import { Link } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const AddForm = () => {



  const [loading ,setLoading]=useState(false)

  const[id,setID]=useState('')
  const [name,setName]=useState('')
  const [age,setAge]=useState('')
  const [department,setDepartment]=useState('')
  const [role,setRole]=useState('')

  const submitData=async(e)=>{
    setLoading(true)
    e.preventDefault()
    if(name && age && department && role){
     
    
      const db=getDatabase(app)
      const docRef=push(ref(db,'employee'))
      set(docRef,{
        id:id,
        name:name,
        age:age,
        department:department,
        role:role
      }).then(()=>{
        console.log('submitted successfully')
        setAge('')
        setDepartment('')
        setID('')
        setName('')
        setRole('')
        setLoading(false)
        alert('Your Data has been submitted')
      }).catch((error)=>{
        console.log(error.message)
      })
    }
    else{
      alert('You have left a field empty')
    }
  }
  return (
    <div className='max-w-md w-full'>
      <div className='flex flex-row justify-between items-center mb-4'>
      <h2 className='text-gray-600 text-2xl font-medium text-center'>Add Details to Table</h2>
      <div className='rounded-lg border-2 border-black py-[6px] px-4 cursor-pointer'>
        <Link to='/'><h2 className='text-black text-sm font-normal'>Back Home</h2></Link>
      </div>
      </div>
        <form 
        onSubmit={(e)=>{submitData(e)}}
        className='w-full rounded-lg bg-white ring-1 ring-gray-300 shadow-lg px-4 py-4'>
          <div className='mb-4'>
           <label className='text-gray-600 text-md font-medium block mb-2'>
                Employee ID:
            </label>
            <input 
            placeholder='XX12345'
            type='text'
            onChange={(e)=>{setID(e.target.value)}}
            value={id}
            className='bg-gray-100 appearance-none border-2 border-gray-200/80 rounded w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'></input>
           </div>
           <div className='mb-4'>
           <label className='text-gray-600 text-md font-medium block mb-2'>
                Name:
            </label>
            <input 
            placeholder='Naveen'
            type='text'
            onChange={(e)=>{setName(e.target.value)}}
            value={name}
            className='bg-gray-100 appearance-none border-2 border-gray-200/80 rounded w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'></input>
           </div>
           <div className='mb-4'>
           <label className='text-gray-600 text-md font-medium block mb-2'>
                Age:
            </label>
            <input 
            placeholder='21'
            type='number'
              onChange={(e)=>{setAge(e.target.value)}}
              value={age}
            className='bg-gray-100 appearance-none border-2 border-gray-200/80 rounded w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'></input>
           </div>
           <div className='mb-4'>
           <label className='text-gray-600 text-md font-medium block mb-2'>
                Department:
            </label>
            <input 
            placeholder='Frontend, Tester...'
            type='text'
              onChange={(e)=>{setDepartment(e.target.value)}}
              value={department}
            className='bg-gray-100 appearance-none border-2 border-gray-200/80 rounded w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'></input>
           </div>
           <div className='mb-4'>
           <label className='text-gray-600 text-md font-medium block mb-2'>
                Role:
            </label>
            <input 
            placeholder='Lead, Manager...'
            type='text'
              onChange={(e)=>{setRole(e.target.value)}}
              value={role}
            className='bg-gray-100 appearance-none border-2 border-gray-200/80 rounded w-full py-3 px-4 text-gray-600 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'></input>
           </div>
           <div className='mb-4 flex items-center justify-center'>
           {
            loading ? (
            <AiOutlineLoading3Quarters className='animate-spin h-5 w-5'/>
            ):(
              <button 
              type='submit'
              className='w-[80px] rounded-lg py-2 px-4 text-center bg-purple-500 text-white'>
                Add
              </button>
            )
           }
           </div>
        </form>
    </div>
  )
}

export default AddForm