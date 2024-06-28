import { Button } from "@/components/ui/button";

type NavLinkProps = {
    linkText: string
};

export default function NavLink({ linkText }: NavLinkProps) {
    return (
        <Button className="text-zinc-400" variant={'link'}> {linkText}</Button>
    );
}