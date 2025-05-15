interface IHeaderProps {
    title: string;
    createLink: boolean;
    homeLink: boolean;
    submitButton: boolean;
}

function Header(props: IHeaderProps) {
    return (
        <header>
            {props.homeLink && <a href="main.html"> Return to Home</a>}
            <h1>{props.title}</h1>
            {props.createLink && <a href="createevent.html">Create Event</a>}
            {props.submitButton && <button>Submit</button>}
        </header>
    );
}

export default Header;