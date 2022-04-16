import React, {useState, useEffect, useCallback, useRef} from 'react'
import { InputRange } from './inputRange';
import { BulletRange } from './bulletRange';
import { LabelRange } from './labelRange';

export const FixedRange = ({ values }) => {

  const INIT_POSITION_MIN = values[0];
  const INIT_POSITION_MAX = values[values.length - 1];
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
  const steps = values
  const [step, setStep] = useState(0);
  const stepsRight = values
  const [stepRight, setStepsRight] = useState(stepsRight.length);
    

  
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
      const valueToCheck =e.movementX*5;

          if(valueToCheck > 0 && positionMin < positionMax && step < steps.length-1){
            const newLeftPosition = steps[step+1]
            if(newLeftPosition < positionMax){
            setStep(step => step+1)
            setPositionMin(newLeftPosition);
          }
          }
        if(valueToCheck < 0 && positionMin > INIT_POSITION_MIN && step > 0){
          setStep(step => step-1)
          const newLeftPosition = steps[step]
          setPositionMin(newLeftPosition);
          }

          if(valueToCheck < 0 && step === 0){
            setStep(0)
            const newLeftPosition = steps[step]
            setPositionMin(newLeftPosition);
            }
      }  
    }
  , [positionMin, positionMax, step, steps]);


  const onMouseMoveRight = useCallback( (e) => {
    if (isDraggingMax.current) {
      const valueToCheck =e.movementX*5;

          if(valueToCheck < 0 && positionMax > positionMin){
            const newRightPosition = stepsRight[stepRight-1]
            if(newRightPosition > positionMin){
              setStepsRight(stepRight => stepRight-1)
              setPositionMax(newRightPosition);
            }
          }
        if(valueToCheck > 0 && positionMax > positionMin && stepRight < stepsRight.length){
          setStepsRight(stepRight => stepRight+1)
          const newRightPosition = stepsRight[stepRight]
          setPositionMax(newRightPosition);
          }
      }  
    }
  , [positionMin, positionMax, stepRight, stepsRight]);



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
            position={positionMin}
          /> 
          <LabelRange className='minvalue-label' sign={'$'} />
          <BulletRange bulletRef={dragHeadRefMin} minValue={INIT_POSITION_MIN} maxValue={INIT_POSITION_MAX} limit={LIMIT} position={positionMin} className='minvalue-bullet' />


          <InputRange 
            className='maxvalue-input'
            inputRef={inputMax} 
            position={positionMax}
          /> 
          <LabelRange className='maxvalue-label' sign={'$'} />
          <BulletRange bulletRef={dragHeadRefMax} minValue={INIT_POSITION_MIN} maxValue={INIT_POSITION_MAX} limit={LIMIT} position={positionMax} className='maxvalue-bullet' />

        </div>
      </div>
    </>
  )
}
