import React from 'react'

export const InputRange = React.forwardRef( ({inputRef, onMouseChange,handleKeyPress, position, ...props}) => {
  return (
    <input 
      // type="number"
      ref={inputRef}
      onChange={onMouseChange}
      onKeyPress={handleKeyPress}
      value={position}
      {...props}
    />  
  )
})

