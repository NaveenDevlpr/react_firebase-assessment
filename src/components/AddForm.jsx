import React from 'react'

const AddForm = () => {
  return (
    <div>
        <form>
            <label className='text-black text-xl font-medium'>
                Name:
                <input className='px-2 py-3 rounded-lg text-black'>
                </input>
            </label>
        </form>
    </div>
  )
}

export default AddForm