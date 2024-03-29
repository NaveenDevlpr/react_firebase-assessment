import React from 'react'

const Dropdown = ({setNoOfPages,result}) => {
  return (
    <select id="page" name="page" 
                onChange={(e)=>{
                  if(e.target.value!=='Select Page')
                  setNoOfPages(e.target.value)
                }}
                class="block px-4 py-2 border-2 rounded-md bg-white focus:outline-none border-gray-400/80 focus:border-none focus:ring-2 focus:ring-purple-500">
                  <option className='text-sm text-black'>No. of Rows</option>
               {
                    [...Array(Math.ceil(result.length/2+1))].map((e,i)=>{
                      return(<option value={i+1} className='text-gray-600'>{i+1}</option>)
                    })
               
               }
    </select>
  )
}

export default Dropdown