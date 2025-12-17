import { createContext, useContext, useState } from 'react';

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
    const [userName, setUserName] = useState("John Doe");
    const [gameStarted, setGameStarted] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [gameSuccess, setGameSuccess] = useState(false);
    const [playPause, setPlayPause] = useState(false);
    const [escaped, setEscaped] = useState(false);

    const value = {
        userName,
        setUserName,
        gameStarted,
        setGameStarted,
        gameCompleted,
        setGameCompleted,
        gameSuccess,
        setGameSuccess,
        playPause, 
        setPlayPause,
        escaped,
        setEscaped
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within GameProvider");
    }
    return context;
}