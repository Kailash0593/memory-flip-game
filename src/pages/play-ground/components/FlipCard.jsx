import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

export const FlipCard = forwardRef(({ data, flipped, isInCorrect, isCorrect, onCardClick }, ref) => {
  const Icon = data.icon;
  const [currentFlip, setCurrentFlip] = useState(flipped);
  const [currentIsInCorrect, setIsIncorrect] = useState(isInCorrect);
  const [currentIsCorrect, setIsCorrect] = useState(isCorrect);
  const [isDisabled, setIsDisabled] = useState(false);
  const childRef = useRef(null);

  useEffect(() => {
    console.log("do something!")
  }, [])

  useEffect(() => {
    setCurrentFlip(flipped);
  }, [flipped])

  useEffect(() => {
    setIsIncorrect(isInCorrect);
  }, [isInCorrect])

  useEffect(() => {
    setIsCorrect(isCorrect);
  }, [isCorrect])

  const onCorrect = () => {
    setIsCorrect(true);
  }

  const disableEnableCard = (state) => {
    setIsDisabled(state);
  }

  const flip = () => {
    setCurrentFlip(prev => !prev);
  }

  const onClick = () => {
    console.log("onClick", !isDisabled , !isCorrect)
    if(!isDisabled && !isCorrect){
      onCardClick(data)
    }
  }

  useImperativeHandle(ref, () => ({
    onCorrect: onCorrect,
    disableEnableCard: disableEnableCard,
    flip: flip,
    childRef: () => childRef,
    showHint: () => {
      setIsDisabled(true);
      if(!currentFlip){
        setCurrentFlip(prev => !prev);
      }
      setTimeout(() => {
        if(!currentFlip){
          setCurrentFlip(prev => !prev);
        }
        setIsDisabled(false);
      }, 3000);
    }
  }));
  
  console.log("flipped", flipped)

  return (
    <>
    <div ref={childRef} className={`h-full ${currentIsInCorrect ? 'flip-card-error' : ''} ${currentIsCorrect ? 'flip-card-success' : ''}`}>
      <div className={`flip-card h-full ${currentFlip ? 'flipped' : ''}`} onClick={onClick} >
        <div className='flip-card-front'>
        </div>
        <div className='flip-card-back'>
          <Icon className={`flip-card-icon`} />
        </div>
      </div>
    </div>
    </>
  )
})