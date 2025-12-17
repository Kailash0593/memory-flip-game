import React from 'react';
import { PlayCircleOutlined } from "@ant-design/icons";

export const GamePausePlay = ({ onPlayPause }) => {
    return (
        <>
            <div className='modal'></div >
            <div className='modal-dialog'>
                <div onClick={onPlayPause} className='modal-content z-2 text-white text-8xl cursor-pointer'>
                    <PlayCircleOutlined />
                </div>
            </div>
        </>
    )
}
