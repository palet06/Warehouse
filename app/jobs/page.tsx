import React from 'react'
import CreateJobCard from './CreateJobCard'
import JobsTable from './JobsTable'

const Jobs = () => {
  return (
    <div className='flex flex-col lg:flex-row  w-full gap-3 lg:justify-between justify-center'>
    <div className='flex lg:w-[40%]  justify-center'>

        <CreateJobCard />
    </div>
    <div className='lg:w-[60%]'>
        <JobsTable />
    </div>
    </div>
    
  )
}

export default Jobs