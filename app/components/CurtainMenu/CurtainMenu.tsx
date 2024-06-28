'use client'

import { Button } from '@/components/ui/button';
import './style.css'
import { useEffect, useState } from "react";
import { ArrowRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import { usePomodoroContext } from './../../page';

export default function CurtainMenu() {
    let { updatePomodoro } = usePomodoroContext();

    const [curtainState, setCurtainState] = useState(false);
    const [formData, setFormData] = useState({
        pomodoro: 25,
        pomodoroBreak: 5,
    });

    useEffect(() => {
        const pomodoroTimer = Number(localStorage.getItem('ac_pomodoro_timer')) / 60 || 25;
        setFormData({
            ...formData,
            pomodoro: pomodoroTimer,
        });
    }, []);

    function toggleCurtain() {
        setCurtainState(!curtainState);
    }

    const FormSchema = z.object({
        pomodoro: z
            .coerce.number()
            .min(1, { message: "Number must be greater than or equal to 1" })
            .max(60, { message: "Number must be less than or equal to 59" }),
        pomodoroBreak: z
            .coerce.number()
            .min(1, { message: "Number must be greater than or equal to 1" })
            .max(60, { message: "Number must be less than or equal to 59" }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pomodoro: formData.pomodoro,
            pomodoroBreak: formData.pomodoroBreak
        },
    })

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log({ ...formData, [name]: value })
        setFormData({ ...formData, [name]: value });
    };

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })

        localStorage.setItem('ac_pomodoro_timer', String(data.pomodoro * 60));
        localStorage.setItem('ac_pomodoro_timer_break', String(data.pomodoroBreak));

        setCurtainState(false);
        updatePomodoro(data.pomodoro * 60);
    }

    return (
        <>
            <Button onClick={toggleCurtain} size={'sm'}>Settings</Button>
            <div className={`bg-zinc-900 t-curtain-closed rounded-sm ${curtainState ? 't-curtain-open' : ''}`}>
                <div className='p-4'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={toggleCurtain} variant={'secondary'} className='rounded-full'>
                                    <ArrowRight></ArrowRight>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Close
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 p-8">
                        <FormField
                            control={form.control}
                            name="pomodoro"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pomodoro</FormLabel>
                                    <FormControl>
                                        <Input min={1} max={60} type='number' placeholder='25' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Time for pomodoro usually 25 min
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pomodoroBreak"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Break</FormLabel>
                                    <FormControl>
                                        <Input min={1} max={60} type='number' placeholder='25' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Time for breaks usually 5 min
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant={'secondary'} type="submit">Save</Button>
                    </form>
                </Form>
            </div>
        </>
    );
}
