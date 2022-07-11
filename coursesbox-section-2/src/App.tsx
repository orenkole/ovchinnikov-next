import React, {FC} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <Header logo={logo}>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
            </Header>
            <Link href="https://reactjs.org" target="_blank">
                Learn React
            </Link>
        </div>
    );
}

interface HeaderProps {
    children: React.ReactNode;
    logo: string;
}

const Header: FC<HeaderProps> = ({ children, logo }) => (
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {children}
    </header>
)

interface LinkProps {
    children: React.ReactNode
    href: string;
    target: "_blank" | "_self" | "_parent" | "top";
    rel?: string;
}

const Link: FC<LinkProps> = ({children, href, target="_blank", rel="nooperner, noreferrer"}) => (
    <a
        className="App-link"
        href={href}
        target={target}
        rel={rel}
    >
        {children}
    </a>
)

export default App;
