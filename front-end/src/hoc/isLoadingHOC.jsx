import React, { useState } from 'react'
import Spinner from '../reusable/spinner'

const IsLoadingHOC = (WrappedComponent) => {
  function HOC(props) {
    const [isLoading, setLoading] = useState(true)

    const setLoadingState = (isComponentLoading) => {
      setLoading(isComponentLoading)
    }

    return (
      <>
        {isLoading && <Spinner hidden={!isLoading} />}
        <WrappedComponent {...props} setLoading={setLoadingState} />
      </>
    )
  }

  return HOC
}

export default IsLoadingHOC
