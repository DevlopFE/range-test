import React, {useState, useEffect, useCallback, useRef} from 'react'
import { InputRange } from './inputRange';
import { BulletRange } from './bulletRange';
import { LabelRange } from './labelRange';

export const MultiRange = ({minValue, maxValue}) => {

  const INIT_POSITION_MIN = minValue || 0;
  const INIT_POSITION_MAX = maxValue || 300;
  const LIMIT = 300
  const minColor='#282c34';
  const maxColor='rgb(228, 164, 108)';
  const isDraggingMin = useRef(false);
  const isDraggingMax = useRef(false);
  const dragHeadRefMin = useRef();
  const dragHeadRefMax = useRef();
  const inputMin = useRef();
  const inputMax = useRef();
  const [positionMin, setPositionMin] = useState(INIT_POSITION_MIN);
  const [positionMax, setPositionMax] = useState(INIT_POSITION_MAX);

  
  const onMouseDownLeft = useCallback((e) => {
    if (dragHeadRefMin.current && dragHeadRefMin.current.contains(e.target)) {
      isDraggingMin.current = true;
      dragHeadRefMin.current.style.backgroundColor = minColor;
      dragHeadRefMin.current.style.transition = "transform .2s";
      dragHeadRefMin.current.style.transform = "scale(1.2)";
    }
  }, []);

  const onMouseUpLeft = useCallback(() => {
    if (isDraggingMin.current) {
      isDraggingMin.current = false;
      dragHeadRefMin.current.style.backgroundColor = minColor;
      dragHeadRefMin.current.style.transition = "transform .2s";
      dragHeadRefMin.current.style.transform = "scale(1)";
    }
  }, []);

  const onMouseMoveLeft = useCallback( (e) => {
    if (isDraggingMin.current) {
      setPositionMin((positionMin) => positionMin + e.movementX);
    }
  }, []);

  const onMouseDownRight = useCallback((e) => {
    if (
      dragHeadRefMax.current &&
      dragHeadRefMax.current.contains(e.target)
    ) {
      dragHeadRefMax.current.style.backgroundColor = maxColor;
      dragHeadRefMax.current.style.transition = "transform .2s";
      dragHeadRefMax.current.style.transform = "scale(1.2)";
      isDraggingMax.current = true;
    }
  }, []);

  const onMouseUpRight = useCallback(() => {
    if (isDraggingMax.current) {
      isDraggingMax.current = false;
      dragHeadRefMax.current.style.backgroundColor = maxColor;
      dragHeadRefMax.current.style.transition = "transform .2s";
      dragHeadRefMax.current.style.transform = "scale(1)";
    }
  }, []);

  const onMouseMoveRight = useCallback( (e) => {
    if (isDraggingMax.current) {

      setPositionMax((positionMax) => positionMax + e.movementX);
    }
  }, []);

  const onMouseChangeMin =  (e) => {
    setPositionMin(parseInt(e.target.value));
}

  const onMouseChangeMax =  (e) => {
      setPositionMax(parseInt(e.target.value));
   }

   const handleClickMin = () => {
    inputMin.current.focus()
   }

   const handleClickMax = () => {
    inputMax.current.focus()
   }

  const handleKeyPressMin = (e) => {
    if (e.key === 'Enter') {
      if (inputMin.current.value <= positionMax && inputMin.current.value !== ''){
    e.target.blur()
      }else{
         setPositionMin(INIT_POSITION_MIN);
      }
    } 
  }

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUpLeft);
    document.addEventListener("mousedown", onMouseDownLeft);
    document.addEventListener("mousemove", onMouseMoveLeft);
    return () => {
      document.removeEventListener("mouseup", onMouseUpLeft);
      document.removeEventListener("mousedown", onMouseDownLeft);
      document.removeEventListener("mousemove", onMouseMoveLeft);
    };
  }, [onMouseMoveLeft, onMouseDownLeft, onMouseUpLeft]);

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUpRight);
    document.addEventListener("mousedown", onMouseDownRight);
    document.addEventListener("mousemove", onMouseMoveRight);
    return () => {
      document.removeEventListener("mouseup", onMouseUpRight);
      document.removeEventListener("mousedown", onMouseDownRight);
      document.removeEventListener("mousemove", onMouseMoveRight);
    };
  }, [onMouseMoveRight, onMouseDownRight, onMouseUpRight]);


  useEffect(() => {
    if(isNaN(positionMax)){
     return
    }
  }, [positionMax])

  useEffect(() => {
    if(isNaN(positionMin)){
     return
    }
  }, [positionMin])
  

  useEffect(() => {
    if(positionMin < INIT_POSITION_MIN ){
      setPositionMin(INIT_POSITION_MIN)
      return
    }
    if(positionMin >= positionMax ){
      setPositionMin(positionMax )
      return
    }
    if(positionMax > INIT_POSITION_MAX ){
      setPositionMax(INIT_POSITION_MAX)
      return
    }
    if(positionMax <= positionMin ){
      setPositionMax(positionMax)
      return
    }
  }, [positionMin, positionMax, INIT_POSITION_MIN, INIT_POSITION_MAX])

  return (
    <>
      <div className='range-container'>
        <div className='range-slider'>
          
          <InputRange 
            className='minvalue-input'
            inputRef={inputMin} 
            onMouseChange={onMouseChangeMin}
            handleKeyPress={handleKeyPressMin}
            position={positionMin}
          /> 
          <LabelRange className='minvalue-label' onClick={handleClickMin} sign={'$'} />
          <BulletRange bulletRef={dragHeadRefMin}  position={positionMin} className='minvalue-bullet' />


          <InputRange 
            className='maxvalue-input'
            inputRef={inputMax} 
            onMouseChange={onMouseChangeMax}
            //handleKeyPress={()=> {}}
            position={positionMax}
          /> 
          <LabelRange className='maxvalue-label' onClick={handleClickMax} sign={'$'} />
          <BulletRange bulletRef={dragHeadRefMax}  position={positionMax} className='maxvalue-bullet' />

        </div>
      </div>
    </>
  )
}
