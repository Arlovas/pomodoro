'use client'

import { useState, useEffect, Fragment, useRef, createContext, useContext } from 'react';
import { formatTimeMinutes } from './utils/timeFormatter';
import variable from './variables.module.scss';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';
import { NavPomodoro } from './components/NavPomodoro';

// const DEFAULT_POMODORO_TIME: number = 25 * 60; // 25 min in seconds
const DEFAULT_POMODORO_TIME: number = 10;

interface PomodoroContextType {
    updatePomodoro: React.Dispatch<React.SetStateAction<number>>;
}

const PomodoroContext = createContext<PomodoroContextType>({
    updatePomodoro: () => { },
});
export const usePomodoroContext = () => useContext(PomodoroContext);

export default function PomodoroTimer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const startTimeRef = useRef(Date.now());
    const intervalRef = useRef({});

    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setTimeLeft(getPomodoroTime());
    }, []);

    function getPomodoroTime(): number {
        const customTimer: number = parseInt(localStorage.getItem('ac_pomodoro_timer') ?? '');
        if (customTimer) {
            return customTimer;
        }

        return DEFAULT_POMODORO_TIME;
    }

    function getTimeForScreen(): string {
        if (timeLeft === null) {
            return 'n_n';
        }

        if (isActive || timeLeft > 0) {
            return formatTimeMinutes(timeLeft);
        }

        return '00:00';
    }

    useEffect(() => {
        if (!isActive) return;

        startTimeRef.current = Date.now();
        intervalRef.current = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);

            setTimeLeft(Math.max(timeLeft - elapsedTime, 0));

            if (timeLeft - elapsedTime <= 0) {
                audioRef.current?.play();
                setTimeLeft(0);
            }
        }, 1000);

        return () => clearInterval(intervalRef.current as number);
    }, [isActive]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(getPomodoroTime());

        audioRef.current && (audioRef.current.currentTime = 0);
        audioRef.current?.pause();
    };

    return (
        <>
            <PomodoroContext.Provider value={{ updatePomodoro: setTimeLeft }}>
                <audio ref={audioRef} src="./finishSound.mp3" />
                <div className='bg-zinc-800 flex flex-col h-screen'>
                    <NavPomodoro />

                    <div className='flex flex-col flex-1 center'>
                        <div className={`text-zinc-500 text-9xl font-semibold self-center ${variable.title} pb-8`}>
                            {getTimeForScreen()}
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
