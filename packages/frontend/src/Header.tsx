import { Link } from "react-router";

interface IHeaderProps {
    title: string;
    createLink: boolean;
    homeLink: boolean;
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header(props: IHeaderProps) {
    return (
        <header>
            <h1>{props.title}</h1>
            {props.homeLink && <Link to="/">Return to Home</Link>}
            {props.createLink && <Link to="/create">Create Event</Link>}
            <label>
                Dark Mode
                <input
                    type="checkbox"
                    checked={props.darkMode}
                    onChange={() => props.setDarkMode(!props.darkMode)}
                />
            </label>
        </header>
    );
}

export default Header;