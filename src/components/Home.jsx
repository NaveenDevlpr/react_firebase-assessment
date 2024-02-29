import React, { useEffect, useState } from 'react'
import app from '../firebaseConfig'
import { getDatabase,get,ref,query,startAt, orderByChild, equalTo} from 'firebase/database'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import {MdClear} from 'react-icons/md'
import {IoIosSearch} from 'react-icons/io'

const Home = () => {


  const headers=['Employee ID','Name','Age','Department','Role']
  const [result,setResult]=useState([])


  const [noOfPages,setNoOfPages]=useState(4)
  const [page,setPage]=useState(1)


  const [search,setSearch]=useState(null)

  const getData=async()=>{

    const db=getDatabase(app)
    const docRef=ref(db,'employee')

    if(search){
      
    const combinedQuery = query(docRef, orderByChild('name'), equalTo(search));
    

    get(combinedQuery).then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        setResult(Object.values(snapshot.val()))
      } else {
        console.log("No data found");
      }
    }).catch((error) => {
      console.error(error);
    });
    }
    else{
    const snapshot=await get(docRef)

      if(snapshot.exists()){
        setResult(Object.values(snapshot.val()))
      }
    }
   

    
  }

  const SelectedPage=(selected)=>{
    if(selected>=1 && selected<=Math.ceil(result.length / noOfPages) && selected!==page)
           setPage(selected)
  }
  useEffect(()=>{
    getData()
  },[search])
  return (
    <div className='ring-1 w-full ring-gray-200 rounded-2xl p-6'>
        <div className='flex flex-row items-center justify-between'>
            <h2 className='text-gray-600 font-bold text-2xl'>
              Employee Details :
            </h2>

            <div className='flex flex-row items-center space-x-2'>

            <div className="relative">
              <input type="text" placeholder="Enter a place..." 
              className="bg-white focus:outline-none md:w-[300px] focus:shadow-outline border border-gray-300/80 rounded-lg py-3 px-4 block w-full appearance-none leading-normal"
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              />
              {
              
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"  onClick={()=>{getData()}}>
                  <IoIosSearch className='text-gray-400/70 '/>
                </div>
                
              }
          </div>

                <div className='px-3 py-3 w-full bg-purple-500 rounded-lg text-white font-medium flex flex-row items-center space-x-2'>
                <Link className='text-sm' to='/add'>Add Data</Link>
                <IoMdAdd/>
                </div>
                <select id="page" name="page" 
                onChange={(e)=>{setNoOfPages(e.target.value)}}
                class="block px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:border-pruple-500 focus:ring focus:ring-purple-500">
                  <option className='text-sm text-black'>Select Page</option>
               {
                    [...Array(result.length)].map((e,i)=>{
                      return(
                        <option value={i+1} className='text-gray-600'>{i+1}</option>
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
            <div className='w-full flex flex-row items-center justify-center mt-6'>
                 {page > 1 && (
                    <span className="px-4 cursor-pointer" onClick={() => SelectedPage(page - 1)}>
                      <FaChevronLeft />
                    </span>
                  )}
                {
                  [...Array(Math.ceil(result.length/noOfPages))].map((e,i)=>{
                    return(
                      <span key={i} className={`py-2 px-4 cursor-pointer ${page===i+1?'bg-purple-500 rounded-lg text-white':''}`} onClick={()=>{SelectedPage(i+1)}}>{i+1}</span>
                    )
                  })
                }
                 {page < Math.ceil(result.length / noOfPages) && (
                    <span className="px-4 cursor-pointer" onClick={() => SelectedPage(page + 1)}>
                      <FaChevronRight />
                    </span>
                  )}
            </div>
          )
        }
    </div>
  )
}

export default Home