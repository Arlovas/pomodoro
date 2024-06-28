import { useContext } from 'react';
import CurtainMenu from './CurtainMenu/CurtainMenu';
import { FaqModal } from './FaqModal';

export function NavPomodoro() {

    return (
        <nav className='flex justify-end text-zinc-500'>
            <menu className='flex p-4 gap-4 mb-28'>
                <li>
                    <FaqModal />
                </li>
                <li>
                    <CurtainMenu />
                </li>
            </menu>
        </nav>
    );
};
