import React, {useEffect, useCallback}  from 'react'

export const BulletRange = React.forwardRef( ({bulletRef, sign, position, minValue, maxValue, limit, ...props}) => {
  
  const getPositionFromValue = useCallback( (value) => {
    const diffMaxMin = maxValue - minValue
    const diffValMin = value - minValue
    const percentage = diffValMin / diffMaxMin
    const pos = Math.round(percentage * limit)
    return pos
  }, [maxValue, minValue, limit]);

  useEffect(() => {
    if(bulletRef.current){
      bulletRef.current.style.left = `${getPositionFromValue(position)}px`;
    }
  }, [bulletRef, getPositionFromValue, position]);

  return (
    <div ref={bulletRef} {...props} />
  )
})
