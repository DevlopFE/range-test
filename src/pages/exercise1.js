import React from 'react'
import { BASE_URL } from '../config'
import { useFetch } from '../hooks/useFetch';
import { Loader } from '../components/commons/loader';
import { Range } from '../components/rangeComponents/range';

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
       {response && <Range rangeValues={response?.values || VALUES_DEFAULT} />}
      </main>
  </div>
  )
}