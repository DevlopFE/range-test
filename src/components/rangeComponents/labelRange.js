import React from 'react'

export const LabelRange = React.forwardRef( ({ sign, ...props}) => {
  
  return (
    <div {...props} >{sign}</div>
  )
})
