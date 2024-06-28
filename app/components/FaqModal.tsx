import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function FaqModal() {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button size={'sm'} >FAQ</Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl">
                <DialogHeader>
                    <DialogTitle autoFocus tabIndex={0} >Pomodoro Technique</DialogTitle>
                    <DialogDescription>
                        Make your time worth more
                    </DialogDescription>
                </DialogHeader>

                <strong>Q. What is Pomodoro Technique?</strong>
                <p>The time management technique created by Francesco Cirillo for a more productive
                    way to work and study. For more information, <TooltipProvider><Tooltip><TooltipTrigger><a className="text-blue-700" target="_blank" href="https://en.wikipedia.org/wiki/Pomodoro_Technique">click here.</a></TooltipTrigger><TooltipContent>wikipedia.org/wiki/Pomodoro_Technique</TooltipContent></Tooltip></TooltipProvider>
                </p>

                <strong>Q. tldr;</strong>
                <p>
                    You set a timer, typically for 25 minutes, and concentrate entirely on the tasks you wish to accomplish. Once the alarm sounds, you can take a 5-minute break.
                </p>

                <strong>Q. What is this?</strong>
                <p>
                    My custom tomato, with things I like.
                </p>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
