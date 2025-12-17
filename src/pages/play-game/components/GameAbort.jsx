import React from 'react'

export const GameAbort = ({ onQuit, onContinue }) => {
    return (
        <>
            <div className='modal'></div >
            <div className='modal-dialog'>
                <div className='modal-content abort-modal'>
                    <div className='flex flex-col justify-between h-full p-1'>
                        <div className='text-center text-xl'>Are you sure you want to quit? All your progress will be lost!</div>
                        <div className='grid grid-cols-2'>
                            <div className='col-start-2 flex flex-row justify-end gap-2 p-1'>
                                <button className='btn-primary capitalize' onClick={onQuit} >exit</button>
                                <button className='btn-primary capitalize' onClick={onContinue} >continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
