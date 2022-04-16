import React from 'react'
import { FixedRange } from './rangeComponents/fixedRange'
import { BASE_URL } from '../config'
import { useFetch } from '../hooks/useFetch';
import { Loader } from '../commons/loader';

export const RangeFixed = () => {
  const URL = `${BASE_URL}/fixed-range`
  const {isLoading, response, error } = useFetch(URL)
const VALUES_DEFAULT = [0,25,50,100, 200, 299]
  return (
    <div className='container'>
      <header>Fixed range</header>
      <main>
       {isLoading && <Loader />}
       {error && <p>{error}</p>}
        {response && <FixedRange values={response?.values || VALUES_DEFAULT} />}
      </main>
  </div>
  )
}