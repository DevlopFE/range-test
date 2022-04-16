import React from 'react'

export const InputRange = React.forwardRef( ({inputRef, position, ...props}) => {
  return (
    <input 
      // type="number"
      ref={inputRef}
      value={position}
      {...props}
      readOnly
    />  
  )
})

