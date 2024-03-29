import React, { useEffect, useState } from 'react'
import app from '../firebaseConfig'
import { getDatabase,get,ref,query,orderByChild, equalTo, orderByKey, limitToFirst,limitToLast} from 'firebase/database'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import SearchBox from './ui/SearchBox';
import Dropdown from './ui/Dropdown';
import Table from './ui/Table';
import Sort from './ui/Sort';



const Home = () => {


  const headers=['ID','Name','Age','Department','Role']  //headers for the table


  const [result,setResult]=useState([]) //array stores the resulting fetched data


  const [noOfPages,setNoOfPages]=useState(5)  //Number of rows to be displayed at once


  const [page,setPage]=useState(1)  // number of pages based upon the number of rows to be displayed


  const [search,setSearch]=useState(null)  //stores the searched text from the input box


  const [sort,setSort]=useState(null)
  
  //this function fetches the data from the Firebase realtime databse, it aslo filters the data based upon the search query(Depending upon the IF ELSE statement)
  const getData=async()=>{

    const db=getDatabase(app)
    const docRef=ref(db,'employee')

    if(search)
    {
      setSort(null)
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
    else if(sort){                                      //sorting functionality based on the columns
      var sortedVal;
      if(sort==='age')
      {
        sortedVal=[...result].sort((a,b)=>a.age-b.age)
        
      }
      if(sort==='name')
      {
        sortedVal=[...result].sort((a,b)=>a.name.localeCompare(b.name))
      }
      if(sort==='department')
      {
        sortedVal=[...result].sort((a,b)=>a.department.localeCompare(b.department))
      }
       if(sort==='role')
      {
        sortedVal=[...result].sort((a,b)=>a.role.localeCompare(b.role))
      }
      if(sort==='id')
      {
        sortedVal=[...result].sort((a,b)=>a.id.localeCompare(b.id))
      }
     setResult(sortedVal)
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
  },[search,sort])

  return (
    <div className='ring-1 w-full ring-gray-200 rounded-2xl p-6'>

        <div className='flex md:flex-row flex-col md:items-center md:justify-between'>
            <h2 className='text-gray-600 font-bold text-2xl'>
              Employee Details :
            </h2>

            <div className='lg:flex grid grid-cols-2 lg:flex-row gap-4 items-center mt-4 lg:mt-0 lg:space-x-2'>
            
                <Sort headers={headers} setSort={setSort} />

                <SearchBox search={search} setSearch={setSearch} getData={getData}/> {/* this is the search bar component */}
                

                <Link to='/add' className='px-3 py-3 w-full bg-purple-500 rounded-lg text-white font-medium flex flex-row items-center space-x-2'>
                  <div className='text-sm w-full' >Add Data</div>
                  <IoMdAdd className='w-5 h-5'/>
                </Link>


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
                      <span key={i} className={`py-2 px-4 font-medium cursor-pointer ${page===i+1?'bg-purple-500 rounded-lg text-white':''}`} onClick={()=>{SelectedPage(i+1)}}>{i+1}</span>
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