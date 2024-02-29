import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Table = ({headers,result,page,noOfPages}) => {
  return (
    <div className='overflow-x-auto mt-4'>
    {
      result.length>0 ? (
<table className='w-full text-left table-auto'>
      <thead className='text-md text-gray-600'>
        <tr className=''>
          {
            headers.map((e,i)=>{
              return(
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
      ):
      (
       <div className='flex flex-row items-center justify-center'>
         <AiOutlineLoading3Quarters className='animate-spin h-10 w-10'/>
       </div>
      )
    }
</div>
  )
}

export default Table