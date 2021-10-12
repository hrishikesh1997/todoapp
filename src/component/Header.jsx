import React from 'react'
import logo from "../assetes/imagess/logo.jpg"

const Header = () => {
    return <header className="header">
        <nav >
            <div className="logo">
                <img src={logo} alt="TODO"></img>

            </div>

        </nav>
    </header>

}

export default Header
