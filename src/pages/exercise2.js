import React from 'react'
import { BASE_URL } from '../config'
import { useFetch } from '../hooks/useFetch';
import { Loader } from '../components/commons/loader';
import { Range } from '../components/rangeComponents/range';

export const RangeFree = () => {
  const URL = `${BASE_URL}/normal-range`
  const {isLoading, response, error } = useFetch(URL)

  return (
    <div className='container'>
      <header>Normal range</header>
      <main>
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {response && <Range minValue={response.min || 0} maxValue={response.max || 100} />}
      </main>
  </div>
  )
}
