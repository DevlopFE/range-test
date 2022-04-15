import React, {useEffect} from 'react'

export const BulletRange = React.forwardRef( ({bulletRef, sign, position, ...props}) => {
  useEffect(() => {
    if(bulletRef.current){
      bulletRef.current.style.left = `${position}px`;
    }
  }, [bulletRef, position]);

  return (
    <div ref={bulletRef} {...props} />
  )
})
