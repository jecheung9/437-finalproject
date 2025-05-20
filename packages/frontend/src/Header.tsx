import { Link } from "react-router";

interface IHeaderProps {
    title: string;
    createLink: boolean;
    homeLink: boolean;
    submitButton: boolean;
}

function Header(props: IHeaderProps) {
    return (
        <header>
            {props.homeLink && <Link to="/">Return to Home</Link>}
            <h1>{props.title}</h1>
            {props.createLink && <Link to="/create">Create Event</Link>}
            {props.submitButton && <button>Submit</button>}
        </header>
    );
}

export default Header;