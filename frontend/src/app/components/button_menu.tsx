import { Link } from 'react-router-dom';

interface ButtonProps {
    name: string;
    link: string;
    icon: React.ComponentType<any>;
}

export function MenuButton({ name, link, icon: Icon }: ButtonProps) {
    return (
        <Link to={link}>
            <button
                type="submit"
                className="grid justify-items-center items-center w-[200px] h-[200px] bg-foreground rounded-xl text-background font-bold shadow-md hover:shadow-lg hover:scale-110 transition duration-200">
                <Icon className="w-20 h-20 mt-2" />
                <p>{name}</p>
            </button>
        </Link>

    )
}