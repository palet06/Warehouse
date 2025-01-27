import React from 'react'
import { QueryStatistics } from './QueryStatistics'


import QueryTable from './QueryTable';


const page = () => {

  return (
    <div className="flex flex-col gap-3">
    <div>
      <QueryStatistics />
    </div>
    
  </div>
  )
}

export default page