import React from 'react'
import { useGame } from '../../../contexts/GameContext';

export const Feedback = ({
    time, level, matchedFlips, fromFlips, totalFlips, gameState, onPlayAgain
}) => {
    const { userName } = useGame();

    const formatTime = (ms) => {
        const totalSeconds = Math.round(ms / 1000);
        console.log("totalSeconds", totalSeconds)
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    
    return (
        <>
            <div className='modal'></div >
            <div className='modal-dialog'>
                <div className={`modal-content result-modal h-full p-2 ${gameState ? 'bg-linear-to-br from-green-200 to-[#28a745]' : 'bg-linear-to-br from-rose-300 to-[#dc3545]'}`}>
                    <div className='h-[15%] w-full flex justify-center items-center text-lg capitalize underline'>{userName}</div>
                    <div className='grid grid-cols-5 h-[40%]'>
                        <div className='col-span-2 gird grid-cols-1'>
                            <div className='flex justify-between'><span>Time:</span><span>{formatTime(time)}</span></div>
                            <div className='flex justify-between'><span>Level:</span><span className='capitalize'>{level}</span></div>
                            <div className='flex justify-between'><span>Total Flips:</span><span>{totalFlips}</span> </div>
                        </div>
                        <div className='col-span-3 text-center flex justify-center items-center'>
                            <span className='text-sm'>Match Flips: </span> <span className='text-xl p-1'>{matchedFlips} / {fromFlips}</span>
                        </div>
                    </div>
                    <div className='h-[25%] text-3xl w-full flex justify-center items-center text-white'>{gameState ? 'You Won' : 'You Lose!' }</div>
                    <div className='h-[20%] w-full flex justify-center items-center'>
                        <button className='btn-primary' onClick={onPlayAgain} >Play Again!</button>
                    </div>
                </div>
            </div>
        </>
    )
}