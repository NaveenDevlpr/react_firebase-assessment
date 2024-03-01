import React from 'react'
import { IoSearch } from "react-icons/io5";

const SearchBox = ({search,setSearch,getData}) => {
  return (
    <div className="relative">
    <input type="text" placeholder="Search by Fullname..." 
    className="bg-white focus:outline-none md:w-[300px] focus:shadow-outline focus:ring-1 focus:ring-purple-500 border border-gray-400/80 rounded-lg py-[10px] px-4 block w-full appearance-none leading-normal"
    value={search}
    onChange={(e)=>{setSearch(e.target.value)}}
    />
    {
      <div className=" text-white absolute inset-y-0 right-0 flex items-center p-4 cursor-pointer bg-purple-500 rounded-lg"  onClick={()=>{getData()}}>
        <IoSearch/>
      </div>
    }
  </div>
  )
}

export default SearchBox