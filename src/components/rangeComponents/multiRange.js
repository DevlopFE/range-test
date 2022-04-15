import React, {useState, useEffect, useCallback, useRef} from 'react'
import { InputRange } from './inputRange';
import { BulletRange } from './bulletRange';
import { LabelRange } from './labelRange';

export const MultiRange = ({minValue, maxValue}) => {

  const INIT_POSITION_MIN = minValue;
  const INIT_POSITION_MAX = maxValue;
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

  const onMouseDownRight = useCallback((e) => {
    if ( dragHeadRefMax.current && dragHeadRefMax.current.contains(e.target)){
      isDraggingMax.current = true;
      dragHeadRefMax.current.style.backgroundColor = maxColor;
      dragHeadRefMax.current.style.transition = "transform .2s";
      dragHeadRefMax.current.style.transform = "scale(1.2)";
    }
  }, []);


  const onMouseUpLeft = useCallback((e) => {
    if (isDraggingMin.current) {
      isDraggingMin.current = false;
      dragHeadRefMin.current.style.backgroundColor = minColor;
      dragHeadRefMin.current.style.transition = "transform .2s";
      dragHeadRefMin.current.style.transform = "scale(1)";
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

  const onMouseMoveLeft = useCallback( (e) => {
    if (isDraggingMin.current) {
      setPositionMin((positionMin) =>  positionMin + e.movementX);
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
    if(isDraggingMin.current && positionMin <= INIT_POSITION_MIN ){
      setPositionMin(INIT_POSITION_MIN)
    }
    if(isDraggingMin.current && positionMin >= positionMax  ){
      setPositionMin(positionMax)
      isDraggingMax.current = false;
    }
    if(isDraggingMax.current && positionMax <= positionMin ){
      setPositionMax(positionMin)
      isDraggingMin.current = false;
    }
    if(isDraggingMax.current && positionMax >= INIT_POSITION_MAX ){
      setPositionMax(INIT_POSITION_MAX)
    }
    if(isDraggingMax.current && positionMax <= INIT_POSITION_MIN ){
      setPositionMax(INIT_POSITION_MIN)
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
          <BulletRange bulletRef={dragHeadRefMin} minValue={minValue} maxValue={maxValue} limit={LIMIT} position={positionMin} className='minvalue-bullet' />


          <InputRange 
            className='maxvalue-input'
            inputRef={inputMax} 
            onMouseChange={onMouseChangeMax}
            //handleKeyPress={()=> {}}
            position={positionMax}
          /> 
          <LabelRange className='maxvalue-label' onClick={handleClickMax} sign={'$'} />
          <BulletRange bulletRef={dragHeadRefMax} minValue={minValue} maxValue={maxValue} limit={LIMIT} position={positionMax} className='maxvalue-bullet' />

        </div>
      </div>
    </>
  )
}
