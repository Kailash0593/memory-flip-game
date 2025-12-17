import React, { Fragment, useState } from 'react'
import { useGame } from '../../../contexts/GameContext';

export const InstructionModal = ({ levels, onLevelChange, onGameStart }) => {
    const { userName, setUserName } = useGame();
    const deafultDifficulty = Object.keys(levels)[0];
    const [isActive, setIsActive] = useState(deafultDifficulty);
    const onLevelSelect = (e) => {
        setIsActive(e.target.id);
        onLevelChange(e.target.id)
    }

    return (
        <>
            <div className='modal'></div >
            <div className='modal-dialog'>
                <div className='modal-content instruction-modal'>
                    <div className='difficulty-slider'>
                        <fieldset className="difficulty-toggle">
                            <div className="toggle-container">
                                {
                                    Object.keys(levels).map((levelKey) => (
                                        // <div key={levelKey}>{levelKey}</div>
                                        <Fragment key={levelKey}>
                                            <input type="radio" name="difficulty" id={levelKey} value={levelKey} onChange={onLevelSelect} checked={isActive === levelKey} className={`${isActive === levelKey ? 'difficulty-active' : ''}`} />
                                            <label htmlFor={levelKey}>{levelKey}</label>
                                        </Fragment>
                                    )
                                    )
                                }
                                <div className="slider" aria-hidden="true"></div>
                            </div>
                        </fieldset>
                        <div className='grid grid-cols-3'>
                            {
                                Object.keys(levels).map((levelKey) => (
                                    <Fragment key={levelKey}>
                                        <div className='difficulty-time'>
                                            {levels[levelKey].time / 60} mins
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div>
                    </div>
                    <div className='p-1 grid grid-cols-3 justify-center items-center'>
                        <label className='flex text-sm w-full' htmlFor="user-name">Player Name : </label>
                        <input className='w-full col-span-2' type="text" value={userName} name='user-name' onChange={(e) => setUserName(e.target.value)} autoFocus />
                    </div>
                    <div className='grid'>
                        <div className=''>
                            <p className='game-instruction'>
                                Click the cards to see what symbol they uncover and try to find the matching symbol underneath the other cards.
                            </p>
                        </div>
                        <div className='text-sm p-1'>
                            <p>Press <b>[Esc]</b> to Exit - Press <b>[p]</b> Play or Pause</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-3'>
                        <button onClick={onGameStart} className="btn-primary col-start-2">
                            Start!
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
