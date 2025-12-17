import React, { useState } from 'react'
import { FlipCard } from './components/FlipCard'
import { YoutubeOutlined, TwitterOutlined, FacebookOutlined } from "@ant-design/icons";
import { Toggle } from './components/Toggle'

const json = [
  {
    id: 1,
    icon: TwitterOutlined
  },
  {
    id: 2,
    icon: YoutubeOutlined
  },
  {
    id: 3,
    icon: FacebookOutlined
  }
];

export const PlayGround = () => {
  const [flipped, setFlipped] = useState(false);
  const [isInCorrect, setIsInCorrect] = useState(false);
  const [isCorrect, setIscorrect] = useState(false);

  const toggleFlip = () => {
    setFlipped(!flipped);
  }

  const toggleIsIncorrect = () => {
    setIsInCorrect(!isInCorrect);
  }

  const toggleIncorrect = () => {
    setIscorrect(!isCorrect);
  }

  return (
    <div className='w-full '>
      <div className='bg-gray-200 border-gray-300 border-2 rounded-sm m-2'>
        <div className='w-full bg-gray-300 p-1'>FlipCard</div>
        <div className='p-2'>
          <p>FlipCard is a small UI component that shows a single memory-game card, flips it with animation, tracks its state, and notifies the parent when the player interacts with it.</p>
          <div className='flex flex-col'>
            <div className='text-black font-bold py-2'>Actions:</div>
            <div className='grid grid-cols-5 w-full p-2'>
              <div className='flex flex-row gap-2'>
                <label>Flip: </label> <Toggle flipped={flipped} toggleFlip={toggleFlip} />
              </div>
              <div className='flex flex-row gap-2'>
                <label>Incorrect: </label> <Toggle flipped={isInCorrect} toggleFlip={toggleIsIncorrect} />
              </div>
              <div className='flex flex-row gap-2'>
                <label>Correct: </label> <Toggle flipped={isCorrect} toggleFlip={toggleIncorrect} />
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className='grid grid-cols-5 w-full h-[150px] gap-2'>
              {
                json.map((item, i) => (
                  <div className={`col-start-${i + 2}`} key={i}>
                    <FlipCard data={item} flipped={flipped} isInCorrect={isInCorrect} isCorrect={isCorrect} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
