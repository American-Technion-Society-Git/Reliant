import React from 'react'
import logo from '../assets/logo.png'
import { useLocation, Link } from 'react-router-dom'

const Navbar = ({ data }) => {

    const location = useLocation().pathname

    if (location == '/admin') {
        return null
    } else if (location == '/login') {
        return null
    } else {
        return (
            <div className={location == '/' ? "navigation" : "navigation inner"}>
                <nav className="navbar navbar-expand-sm navbar-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to={"/"}>
                            <img src={logo} className="img-fluid" alt="" />
                        </Link>
                        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavId">
                            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <Link className={location == '/' ? "nav-link active" : "nav-link"} to={'/'} aria-current="page">Home <span
                                        className="visually-hidden">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={location == '/about' ? "nav-link active" : "nav-link"} to={'/about'}>About</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Communities
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" id="communities">
                                        {data.map((res, index) => {
                                            return (
                                                <div key={index}>
                                                    <Link className="dropdown-item" to={`/communities/${res.toLowerCase().replace(/\s+/g, '-')}`}>{res}</Link>
                                                </div>
                                            )
                                        })}

                                    </ul>
                                </li>
                                
                                <li className="nav-item">
                                    <Link className={location == '/contact' ? "nav-link active" : "nav-link"} to={'/contact'}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar