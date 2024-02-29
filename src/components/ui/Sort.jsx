import React from 'react'

const Sort = ({setSort,headers}) => {
  return (
    <select id="sort" name="sort" 
                onChange={(e)=>{
                  if(e.target.value!=='Select option')
                  setSort(e.target.value)
                }}
                class="block px-4 py-2 border-2 rounded-md bg-white focus:outline-none border-gray-400/80 focus:border-none focus:ring-2 focus:ring-purple-500">
                  <option className='text-sm text-black'>Select option</option>
               {
                   headers.map((e,i)=>{
                      return(<option value={e.toLowerCase()} className='text-gray-600'>{e.toLowerCase()}</option>)
                    })
               
               }
    </select>
  )
}

export default Sort