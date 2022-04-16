import {useFetch} from '../hooks/useFetch';
import { renderHook, cleanup } from '@testing-library/react-hooks'
import fetchMock from 'fetch-mock'

const consoleError = console.error

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      !args[0].includes(
        'Warning: An update to %s inside a test was not wrapped in act'
      )
    ) {
      consoleError(...args)
    }
  })
})

beforeEach(() => {
  fetchMock.mock('test.com', () => ({ min: 1, max: 100}))
})

afterEach(() => {
  fetchMock.restore()
  cleanup()
})

describe('useFetch()', () => {
  it('should return a default values', async () => {
    const solution = { response: null, error: null, isLoading: true }
    const { result } = renderHook(() => useFetch('test.com'))
    expect(result.current).toStrictEqual(solution)
  })

  it('should set a response when resolved', async () => {
    const solution =  { min: 1, max: 100 }
    const { result, waitForNextUpdate } = renderHook(() => useFetch('test.com'))
    await waitForNextUpdate()
    const { response, error, isLoading } = result.current

    expect(response).toStrictEqual(solution)
    expect(error).toBe(null)
    expect(isLoading).toBe(false)
  })

  it('should return error as true if there is a error', async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    fetchMock.mock('failed.com', Promise.reject({ error: true }))
    const { result, waitForNextUpdate } = renderHook(() =>  useFetch('failed.com'))
    await waitForNextUpdate()
    expect(result.current.error).toBe('Ops! something wrong happened!')
  })
})
