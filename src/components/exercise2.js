import React from 'react'
import { MultiRange } from './rangeComponents/multiRange'

export const RangeFree = () => {
  return (
    <div className='container'>
      <header>Range</header>
      <main>
        <MultiRange minValue={0} maxValue={300} />
      </main>
  </div>
  )
}
