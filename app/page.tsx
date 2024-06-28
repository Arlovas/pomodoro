'use client'

import { useState, useEffect, Fragment, useRef, createContext, useContext } from 'react';
import { formatTimeMinutes } from './utils/timeFormatter';
import variable from './variables.module.scss';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';
import { NavPomodoro } from './components/NavPomodoro';

// const DEFAULT_POMODORO_TIME: number = 25 * 60; // 25 min in seconds
const DEFAULT_POMODORO_TIME: number = 1;

interface PomodoroContextType {
    updatePomodoro: React.Dispatch<React.SetStateAction<number>>;
}

const PomodoroContext = createContext<PomodoroContextType>({
    updatePomodoro: () => { },
});
export const usePomodoroContext = () => useContext(PomodoroContext);

export default function PomodoroTimer() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const [timeLeft, setTimeLeft] = useState(getPomodoroTime());
    const [isActive, setIsActive] = useState(false);

    function getPomodoroTime(): number {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const customTimer: number = parseInt(localStorage.getItem('ac_pomodoro_timer') ?? '');
            if (customTimer) return customTimer;
        }
        return DEFAULT_POMODORO_TIME;
    }

    useEffect(() => {
        let interval!: ReturnType<typeof setInterval>;

        if (!isActive) {
            clearInterval(interval);
            return;
        }

        interval = setInterval(() => {
            if (timeLeft === 0) {
                clearInterval(interval);
                setIsActive(false);

                audioRef.current?.play();
                return;
            }

            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(DEFAULT_POMODORO_TIME);

        audioRef.current && (audioRef.current.currentTime = 0);
        audioRef.current?.pause();
    };

    const handleFormSubmit = (newValue) => {
        console.log('asd,', newValue)
        // setMinutes(newValue);
        // setSeconds(0); // Reset seconds when updating minutes
        // setIsRunning(false); // Stop the timer if it's running
    };

    return (
        <>
            <PomodoroContext.Provider value={{ updatePomodoro: setTimeLeft }}>
                <audio ref={audioRef} src="./finishSound.mp3" />
                <div className='bg-zinc-800 flex flex-col h-screen'>
                    <NavPomodoro />

                    <div className='flex flex-col flex-1 center'>
                        <div className={`text-zinc-500 text-9xl font-semibold self-center ${variable.title} pb-8`}>
                            {formatTimeMinutes(timeLeft)}
                        </div>
                        <div className='flex flex-col items-center gap-8'>
                            <Button className='text-zinc-200' size={'lg'} onClick={toggleTimer}>{
                                isActive
                                    ? <Fragment>
                                        <Pause className='mr-1 text-orange-400' /> Pause
                                    </Fragment>
                                    : <Fragment>
                                        <Play className='mr-1 text-emerald-500' /> Start
                                    </Fragment>
                            }</Button>
                            <Button className='text-zinc-500' variant={'ghost'} onClick={resetTimer}> Reset</Button>
                        </div>
                    </div>
                </div>
            </PomodoroContext.Provider>
        </>
    );
};
