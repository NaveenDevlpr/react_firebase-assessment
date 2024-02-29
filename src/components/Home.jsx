import React, { useEffect, useState } from 'react'
import app from '../firebaseConfig'
import { getDatabase,get,ref } from 'firebase/database'
import { Link } from 'react-router-dom'

const Home = () => {


  const headers=['Employee ID','Name','Age','Departmnt','Role']
  const [result,setResult]=useState([])

  const getData=async()=>{
    const db=getDatabase(app)
    const docRef=ref(db,'employee')
    const snapshot=await get(docRef)

    if(snapshot.exists()){
      setResult(Object.values(snapshot.val()))
    }
  }

  console.log(result)
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className='ring-1 w-full ring-gray-200 rounded-2xl p-6'>
        <div className='flex flex-row items-center justify-between'>
            <h2 className='text-gray-600 font-bold text-2xl'>
              Employee Details :
            </h2>

            <div className='flex flex-row items-center space-x-2'>
                <button className='px-2 py-2 w-[50px] bg-purple-500 rounded-lg text-white'>
                <Link className='text-sm' to='/add'>Add</Link>
                </button>
            </div>
        </div>
        <div className='overflow-x-auto mt-4'>
        <table className='w-full text-left table-auto'>
          <thead>
            <tr className='text-md text-gray-600/80  tracking-wider'>
              {
                headers.map((e,i)=>{
                  return (
                    <th key={i} className='px-5 py-6'>{e}</th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
              {
                result.map((e,i)=>{
                  return(
                    <tr key={i} className='border-t border-gray-200'>
                      <td className=' py-3 px-4 whitespace-nowrap'>
                      {e.id}
                      </td>
                      <td className=' py-3 px-4 whitespace-nowrap'>{e.name}</td>
                      <td className=' py-3 px-4 whitespace-nowrap'>{e.age}</td>
                      <td className=' py-3 px-4 whitespace-nowrap'>{e.department}</td>
                      <td className=' py-3 px-4 whitespace-nowrap'>{e.role}</td>
                      
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default Home