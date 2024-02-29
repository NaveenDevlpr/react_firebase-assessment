import React, { useEffect, useState } from 'react'
import app from '../firebaseConfig'
import { getDatabase,get,ref,query,startAt, orderByChild, equalTo} from 'firebase/database'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import SearchBox from './ui/SearchBox';
import Dropdown from './ui/Dropdown';
import Table from './ui/Table';



const Home = () => {


  const headers=['Employee ID','Name','Age','Department','Role']
  const [result,setResult]=useState([])


  const [noOfPages,setNoOfPages]=useState(4)
  const [page,setPage]=useState(1)


  const [search,setSearch]=useState(null)

  //this function fetches the data from the Firebase realtime databse, it aslo filters the data based upon the search query(Depending upon the IF ELSE statement)
  const getData=async()=>{

    const db=getDatabase(app)
    const docRef=ref(db,'employee')

    if(search)
    {
            const combinedQuery = query(docRef, orderByChild('name'), equalTo(search))    //this query id used to filter the data when name is equal to the searched text.

            await get(combinedQuery).then((snapshot) => {
            if (snapshot.exists()) {
          
              setResult(Object.values(snapshot.val()))
            } else {
              console.log("No data found");
            }
          }).catch((error) => {
            console.error(error);
          });
    }
    
    else
    {
          const snapshot=await get(docRef)

          if(snapshot.exists()){
            setResult(Object.values(snapshot.val()))
          }
    }
   
  }

  //this function will display the page or change the change based on the user action.
  const SelectedPage=(selected)=>{
    if(selected>=1 && selected<=Math.ceil(result.length / noOfPages) && selected!==page)
           setPage(selected)
  }


  useEffect(()=>{
    //once the compoment is mounted , tbis function will be called first.
    getData()
  },[search])

  return (
    <div className='ring-1 w-full ring-gray-200 rounded-2xl p-6'>

        <div className='flex flex-row items-center justify-between'>
            <h2 className='text-gray-600 font-bold text-2xl'>
              Employee Details :
            </h2>

            <div className='flex flex-row items-center space-x-2'>
                <SearchBox search={search} setSearch={setSearch} getData={getData}/> {/* this is the search bar component */}
                

                <div className='px-3 py-3 w-full bg-purple-500 rounded-lg text-white font-medium flex flex-row items-center space-x-2'>
                  <Link className='text-sm' to='/add'>Add Data</Link>
                  <IoMdAdd/>
                </div>


                <Dropdown result={result} setNoOfPages={setNoOfPages}/>  {/* this is the dropdown menu component */}
            </div>
         </div>


        <Table page={page} noOfPages={noOfPages} result={result} headers={headers}/>    {/* this is the table component */}
       
       
       
       {/* this is the pagination code */}
        {
          result.length>0 && (
            <div className='w-full flex flex-row items-center justify-center mt-6'>
                    <span className="px-4 cursor-pointer" onClick={() => SelectedPage(page - 1)}>
                      <FaChevronLeft />
                    </span>
                {
                  [...Array(Math.ceil(result.length/noOfPages))].map((e,i)=>{
                    return(
                      <span key={i} className={`py-2 px-4 cursor-pointer ${page===i+1?'bg-purple-500 rounded-lg text-white':''}`} onClick={()=>{SelectedPage(i+1)}}>{i+1}</span>
                    )
                  })
                }
                    <span className="px-4 cursor-pointer" onClick={() => SelectedPage(page + 1)}>
                      <FaChevronRight />
                    </span>
            </div>
          )
        }
    </div>
  )
}

export default Home