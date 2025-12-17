import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    YoutubeOutlined,
    TwitterOutlined,
    FacebookOutlined,
    AimOutlined,
    AlertOutlined,
    AmazonOutlined,
    AndroidOutlined,
    AppleOutlined,
    AppstoreOutlined,
    AudioOutlined,
    BankOutlined,
    BookOutlined,
    BellOutlined,
    BugOutlined,
    XOutlined,
    BulbOutlined,
    QqOutlined,
    SunOutlined,
    IeOutlined,
    CarOutlined,
    EyeOutlined,
    MehOutlined,
    UsbOutlined,
    AntDesignOutlined,
    AliwangwangOutlined,
    AreaChartOutlined,
    BackwardOutlined,
    FormatPainterOutlined,
    ForwardFilled,
    CustomerServiceOutlined,
    CalendarOutlined,
    CameraOutlined,
    ChromeOutlined,
} from "@ant-design/icons";
import { FlipCard } from '../../play-ground/components/FlipCard';
import { InstructionModal } from './InstructionModal';
import ProgressBar from './ProgressBar';
import { Feedback } from './Feedback';
import SideCannonsConfetti from './SideCannonsConfetti';
import { GameAbort } from './GameAbort';
import { GamePausePlay } from './GamePausePlay';
import { GameProvider, useGame } from '../../../contexts/GameContext';

const json = [
    { iconId: 1, icon: YoutubeOutlined },
    { iconId: 2, icon: TwitterOutlined },
    { iconId: 3, icon: FacebookOutlined },
    { iconId: 4, icon: AimOutlined },
    { iconId: 5, icon: AlertOutlined },
    { iconId: 6, icon: AmazonOutlined },
    { iconId: 7, icon: AndroidOutlined },
    { iconId: 8, icon: AppleOutlined },
    { iconId: 8, icon: AppstoreOutlined },
    { iconId: 9, icon: AudioOutlined },
    { iconId: 10, icon: BankOutlined },
    { iconId: 11, icon: BookOutlined },
    { iconId: 12, icon: BellOutlined },
    { iconId: 13, icon: BugOutlined },
    { iconId: 14, icon: XOutlined },
    { iconId: 15, icon: BulbOutlined },
    { iconId: 16, icon: QqOutlined },
    { iconId: 17, icon: SunOutlined },
    { iconId: 18, icon: IeOutlined },
    { iconId: 19, icon: CarOutlined },
    { iconId: 20, icon: EyeOutlined },
    { iconId: 21, icon: MehOutlined },
    { iconId: 22, icon: UsbOutlined },
    { iconId: 23, icon: AntDesignOutlined },
    { iconId: 24, icon: AliwangwangOutlined },
    { iconId: 25, icon: AreaChartOutlined },
    { iconId: 26, icon: BackwardOutlined },
    { iconId: 27, icon: FormatPainterOutlined },
    { iconId: 28, icon: ForwardFilled },
    { iconId: 29, icon: CustomerServiceOutlined },
    { iconId: 30, icon: CalendarOutlined },
    { iconId: 31, icon: CameraOutlined },
    { iconId: 32, icon: ChromeOutlined }
];

const levels = {
    easy: {
        time: 120,
        icons: 8,
        grids: {
            col: 'grid-cols-4',
            row: 'grid-cols-4'
        }
    },
    medium: {
        time: 240,
        icons: 18,
        grids: {
            col: 'grid-cols-6',
            row: 'grid-cols-6'
        }
    },
    hard: {
        time: 600,
        icons: 32,
        grids: {
            col: 'grid-cols-8',
            row: 'grid-cols-8'
        }
    }
}

export const Game = () => {
    const { gameStarted, setGameStarted, playPause, setPlayPause, escaped, setEscaped } = useGame();
    const [gameCompleted, setGameCompleted] = useState(false);
    const [gameSuccess, setGameSuccess] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [celebrateTime] = useState(3000);
    const [matchedflipCount, setMatchedflipCount] = useState(0);
    const [steps, setSteps] = useState(0);
    const [time, setTime] = useState(0);
    const [iconList, setIconList] = useState([]);
    const [level, setLevel] = useState("easy");
    const [previouslyClickedIcon, setPreviouslyClickedIcon] = useState(null);

    const childRefs = useRef({});
    const instructionModalRef = useRef(null);

    const selectedLevel = levels[level];

    useEffect(() => {

    }, [])

    const handleEscape = useCallback((event) => {
        if (event.key === "Escape" && gameStarted && !playPause) {
            instructionModalRef.current.togglePlayPause();
            setEscaped(prev => !prev);
        }
    })

    const handleP = useCallback((event) => {
        if (event.key === "p" && gameStarted && !escaped) {
            instructionModalRef.current.togglePlayPause();
            setPlayPause(prev => !prev);
        }
    })

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);
        document.addEventListener("keydown", handleP);
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("keydown", handleP);
        }
    }, [handleEscape, handleP]);

    useEffect(() => {
        setIconList(pickRandomIconsFromArray(selectedLevel.icons));
    }, [level])

    useEffect(() => {
        if (iconList.length !== 0 && matchedflipCount === (iconList.length / 2)) {
            onGameSuccess();
        }
    }, [matchedflipCount])

    const pickRandomIconsFromArray = (difficulty) => {
        console.log("pickRandomIconsFromArray")
        const arr = [...json];

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        let icons = arr.slice(0, difficulty);

        const duplicateIcons = Array.from({ length: difficulty }, (_, i) => icons[i]);

        const final = [...icons, ...duplicateIcons].map((x, i) => {
            return {
                id: `${new Date().getTime() + i + 1}`,
                isMatched: false,
                ...x
            }
        });

        for (let i = final.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [final[i], final[j]] = [final[j], final[i]];
        }

        return final;
    }

    const onLevelChange = (level) => {
        console.log("level", level)
        setLevel(level);
    }

    const onGameStart = () => {
        if (instructionModalRef) {
            instructionModalRef.current.togglePlayPause();
        }
        setGameStarted(true)
    }

    const onGameSuccess = () => {
        console.log("success!");
        setGameSuccess(true);
        setTime(instructionModalRef.current.timeElapsed);
        setTimeout(() => {
            setGameCompleted(true);
        }, celebrateTime);
        instructionModalRef.current.togglePlayPause();
    }

    const onGameComplete = () => {
        setGameCompleted(true);
        setTime(instructionModalRef.current.timeElapsed);
        console.log("Game Completed!")
    }

    const onPlayAgain = () => {
        setGameStarted(false);
        setGameCompleted(false);
        setGameSuccess(false);
        setMatchedflipCount(0);
        setTime(0);
        setSteps(0);
        instructionModalRef.current.onReset();
        setIconList(pickRandomIconsFromArray(selectedLevel.icons));
    }

    const onStep = () => {
        setSteps(prev => prev + 1);
    }

    const onCardClick = (data) => {
        const componentInstance = childRefs.current[data.id];
        console.log(componentInstance.childRef())
        console.log("previouslyClickedIcon", previouslyClickedIcon)

        if (!previouslyClickedIcon) {
            // console.log("!!!previouslyClickedIcon!!!")
            componentInstance.flip();
            setPreviouslyClickedIcon(data);
        } else {
            console.log("cardflip", previouslyClickedIcon.id, data.id)
            if (previouslyClickedIcon.id !== data.id) {
                componentInstance.flip();
                const prevChilRef = childRefs.current[previouslyClickedIcon.id].childRef();
                const currentChilRef = childRefs.current[data.id].childRef();
                onStep();
                if (previouslyClickedIcon.iconId !== data.iconId) {
                    setTimeout(() => {
                        prevChilRef.current.classList.add('flip-card-error')
                        currentChilRef.current.classList.add('flip-card-error')
                        setTimeout(() => {
                            childRefs.current[previouslyClickedIcon.id].flip();
                            childRefs.current[data.id].flip();
                            prevChilRef.current.classList.remove('flip-card-error')
                            currentChilRef.current.classList.remove('flip-card-error')
                            setPreviouslyClickedIcon(null);
                        }, 250);
                    }, 250);
                } else {
                    setTimeout(() => {
                        prevChilRef.current.classList.add('flip-card-success')
                        currentChilRef.current.classList.add('flip-card-success')
                        setTimeout(() => {
                            prevChilRef.current.classList.add('opacity-0');
                            currentChilRef.current.classList.add('opacity-0');
                            prevChilRef.current.classList.remove('flip-card-success');
                            currentChilRef.current.classList.remove('flip-card-success');
                            setPreviouslyClickedIcon(null);
                        }, 500);
                    }, 250)
                    setMatchedflipCount(prev => prev + 1);
                }
            }
        }
    }

    const onFlipAll = () => {
        setShowHint(prev => !prev);
        Object.keys(childRefs.current).forEach(key => {
            childRefs.current[key].showHint();
        })
    }

    const onQuit = () => {
        setEscaped(prev => !prev);
        onPlayAgain();
    }

    const onContinue = () => {
        setEscaped(prev => !prev);
        instructionModalRef.current.togglePlayPause();
    }

    const onPlayPause = () => {
        setPlayPause(prev => !prev);
        instructionModalRef.current.togglePlayPause();
    }

    return (
        <>
            <ProgressBar ref={instructionModalRef} totalTime={selectedLevel.time} onComplete={onGameComplete}></ProgressBar>
            {
                escaped ? <GameAbort onQuit={onQuit} onContinue={onContinue} /> : ''
            }
            {
                playPause ? <GamePausePlay onPlayPause={onPlayPause} /> : ''
            }
            {
                (gameStarted && gameCompleted) ? (
                    <Feedback time={time} level={level} matchedFlips={matchedflipCount} fromFlips={iconList.length / 2} totalFlips={steps} gameState={gameSuccess} onPlayAgain={onPlayAgain} />
                ) : <></>
            }
            {
                !gameStarted ? (
                    <InstructionModal levels={levels} onLevelChange={onLevelChange} onGameStart={onGameStart} />
                ) : (
                    <></>
                )
            }
            <div className={`grid ${selectedLevel.grids.col} ${selectedLevel.grids.row} w-full h-full gap-1 p-2`}>
                {
                    gameSuccess ? <SideCannonsConfetti celebrateTime={celebrateTime} /> : ''}
                {
                    iconList.map((icon, i) => (
                        <div key={icon.id} className={`inline-block`}>
                            <FlipCard
                                data={icon}
                                onCardClick={onCardClick}
                                flipped={false} isInCorrect={false} isCorrect={false}
                                ref={instance => {
                                    // Store the instance in the refs object using the item ID as key
                                    if (instance) {
                                        childRefs.current[icon.id] = instance;
                                    } else {
                                        // Cleanup on unmount (React handles this automatically, but explicit handling can be useful)
                                        delete childRefs.current[icon.id];
                                    }
                                }} />
                        </div>
                    ))
                }
            </div>
            {
                gameStarted && !showHint ?
                    (<div class="animate-bounce absolute bottom-4 right-4 border-5 rounded-[100%] px-3 py-2 text-2xl text-white cursor-pointer" onClick={onFlipAll} >
                        <BulbOutlined />
                    </div>) : ''
            }
        </>
    )
}
