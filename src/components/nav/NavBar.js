import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import 'bulma/css/bulma.min.css';

export const NavBar = (props) => {
    return (
        <nav className="navbar">
            <a className="navbar-item" href="/">
                home
            </a>
            <a className="navbar-item">
                about
            </a>
            <a className="navbar-item" href="/plants">
                view plants
            </a>
            <a className="navbar-item" href="/add-plant">
                add plant
            </a>
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="navbar-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                props.history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }       
        </nav>
    )
}