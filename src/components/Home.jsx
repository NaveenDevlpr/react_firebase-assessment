import React, { useEffect, useState } from 'react'
import app from '../firebaseConfig'
import { getDatabase,get,ref } from 'firebase/database'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";


const Home = () => {


  const headers=['Employee ID','Name','Age','Department','Role']
  const dropdownValues=[2,4,6,8,10]
  const [result,setResult]=useState([])


  const [noOfPages,setNoOfPages]=useState(4)
  const [page,setPage]=useState(1)

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
                <select id="page" name="page" 
                onChange={(e)=>{setNoOfPages(e.target.value)}}
                class="block w-full px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:border-pruple-500 focus:ring focus:ring-purple-500">
                  <option>Select Page</option>
               {
                    dropdownValues.map((e,i)=>{
                      return(
                        <option value={e} className='text-gray-600'>{e}</option>
                      )
                    })
               }
                
              </select>
            </div>
        </div>
        <div className='overflow-x-auto mt-4'>
        <table className='w-full text-left table-auto'>
          <thead>
            <tr className='text-md text-gray-600  tracking-wider'>
              {
                headers.map((e,i)=>{
                  return (
                    <th key={i} className='px-4 py-6'>{e}</th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
              {
                result.slice(page*noOfPages-noOfPages,noOfPages*page).map((e,i)=>{
                  return(
                    <tr key={i} className='border-t border-gray-200'>
                      <td className=' py-3 px-4 whitespace-nowrap'>
                      <h2 className='text-gray-600/80 text-lg font-medium'>{e.id}</h2>
                      </td>
                      <td className=' py-3 px-4 whitespace-nowrap'> <h2 className='text-gray-600/80 text-lg font-medium'>{e.name}</h2></td>
                      <td className=' py-3 px-4 whitespace-nowrap'> <h2 className='text-gray-600/80 text-lg font-medium'>{e.age}</h2></td>
                      <td className=' py-3 px-4 whitespace-nowrap'> <h2 className='text-gray-600/80 text-lg font-medium'>{e.department}</h2></td>
                      <td className=' py-3 px-4 whitespace-nowrap'> <h2 className='text-gray-600/80 text-lg font-medium'>{e.role}</h2></td>
                      
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
        </div>
        {
          result.length>0 && (
            <div className='w-full flex flex-row items-center justify-center px-2'>
                <span>
                  <FaChevronLeft/>
                </span>
                {
                  [...Array(Math.floor(result.length/noOfPages))].map((e,i)=>{
                    return(
                      <span key={i} className={`p-4 cursor-pointer ${page===i+1?'bg-purple-500 rounded-lg text-white':''}`} onClick={()=>{setPage(i+1)}}>{i+1}</span>
                    )
                  })
                }
                <span><FaChevronRight/></span>
            </div>
          )
        }
    </div>
  )
}

export default Home