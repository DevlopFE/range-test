import React from 'react'
import { MultiRange } from './rangeComponents/multiRange'
import { BASE_URL } from '../config'
import { useFetch } from '../hooks/useFetch';
import { Loader } from '../commons/loader';

export const RangeFree = () => {
  const URL = `${BASE_URL}/normal-range`
  const {isLoading, response, error } = useFetch(URL)

  return (
    <div className='container'>
      <header>Normal range</header>
      <main>
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {response && <MultiRange minValue={response.min} maxValue={response.max} />}
      </main>
  </div>
  )
}
