import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
          setResponse(data);
          setError(null);
          setIsLoading(false);
      })
      .catch(() => {
        setResponse(null);
        setError('Ops! something wrong happened!');
        setIsLoading(false);
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return { response, error, isLoading }
}
