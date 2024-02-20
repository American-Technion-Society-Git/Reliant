import React from 'react'
import logo_dark from '../assets/logo_dark.png'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    const location = useLocation().pathname

    if (location == '/admin') {
        return null
    } else if (location == '/login') {
        return null
    } else {
        return (
            <section className="footer">
                <div className="container-fluid">
                    <div className="footer_inner">
                        <div className="column_wrapper copyright">
                            <img src={logo_dark} alt="" className="img-fluid" />
                            <p><a href="tel:1(800) 456-2301">Tel: 1(800) 456-2301</a></p>
                            <p>
                                ©2023 Reliant Realty Services, LLC. <br /> All Rights Reserved
                            </p>
                        </div>
                        <div className="column_wrapper">
                            <ul>
                                <li>
                                    <Link to={'/about'} onClick={() => scrollToTop()}>About</Link>
                                </li>
                                <li>
                                    <a href='https://www.indeed.com/q-Reliant-Realty-jobs.html' target='_blank'>Careers</a>
                                </li>
                                <li>
                                    <Link to={'/'} onClick={() => scrollToTop()}>Communities</Link>
                                </li>
                                <li>
                                    <Link to={'/contact'} onClick={() => scrollToTop()}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="column_wrapper">
                            <form action="" className="newsletter">
                                <input type="email" placeholder="Enter you Email Address" className="form-control" />
                                <button href="#" type="submit" className="btn btn-primary">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Footer