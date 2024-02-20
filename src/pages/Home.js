import React from 'react'
import '../css/slick-theme.css'
import logo from '../assets/logo.png'
import hero from '../assets/hero.jpg'
import affordable from '../assets/affordable.png'
import safe from '../assets/safe.png'
import professional from '../assets/professional.png'
import attentive from '../assets/attentive.png'
import efficient from '../assets/efficient.png'
import community from '../assets/community.png'
import gallery1 from '../assets/gallery1.png'
import gallery2 from '../assets/gallery2.png'
import gallery3 from '../assets/gallery3.png'
import gallery4 from '../assets/gallery4.png'
import slide_1 from '../assets/slide_1.png'
import slide_2 from '../assets/slide_2.png'
import homeVideo from '../assets/home.mp4'
import heroVideo from '../assets/home.webm'
import { useNavigate, Link } from 'react-router-dom'
import Slider from 'react-slick'
import Contact from './Contact'


const Home = ({ data }) => {

    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    };

    return (
        <div>

            <section className="hero">
                <div className="container-fluid">
                    <div className="hero_inner">
                        <h1 className="textreveal">
                            Welcome Home
                        </h1>
                        <p>
                            The heart of a strong community is a happy home. We build beautiful neighborhoods through
                            affordable housing and best in class property management and compliance.
                        </p>
                    </div>
                </div>
                <div className="video_wrapper">
                    <video autoPlay id="heroVideo" loop muted poster={hero} playsInline
                        data-speed="0.5" data-lag="0"
                        // style="translate: none; rotate: none; scale: none; transform: translate(0px, 3.5px); will-change: transform;"
                        style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px,3.5px)', willChange: 'transform' }}
                    >
                        <source src={homeVideo} type="video/mp4" />
                        <source src={heroVideo} type="video/webm" />
                        {/* <!-- <source src="img/hero.mp4ogv" type="video/ogv" /> --> */}
                    </video>
                </div>
            </section>
            <section className="communities">
                <div className="container-fluid">
                    <div className="communities_inner">
                        <div className="heading text-center">
                            <h2 className="textreveal">
                                Explore Our Communities
                            </h2>
                            <p>
                                From the bustling metropolis to coastal New England and even the big sky country of the
                                west, wherever you’re searching, find a place to call home.
                            </p>
                        </div>
                        <div className="communities_grid">
                            {data.map((res, index) => {
                                return (
                                    <div onClick={() => {
                                        navigate(`/communities/${res.name.toLowerCase().replace(/\s+/g, '-')}`)
                                        window.scrollTo(0, 0)
                                    }} className={`community_card ${res.columns == 2 ? "col2" : ""} ${res.columns == 3 ? "fw" : ""}`} key={index}>
                                        <h4 className="textreveal">
                                            {res.name}
                                        </h4>
                                        <img src={res.featured_image} alt="" />
                                    </div>
                                )
                            })}
                            {/* <div className="community_card col2">
                                <h4 className="textreveal">
                                    Upstate New York
                                </h4>
                                <img src={upstate} alt=""/>
                            </div>
                            <div className="community_card">
                                <h4 className="textreveal">
                                    Maryland
                                </h4>
                                <img src={maryland} alt=""/>
                            </div>
                            <div className="community_card">
                                <h4 className="textreveal">
                                    New Jersey
                                </h4>
                                <img src={jersey} alt=""/>
                            </div>
                            <div className="community_card">
                                <h4 className="textreveal">
                                    Connecticut
                                </h4>
                                <img src={connecticut} alt=""/>
                            </div>
                            <div className="community_card">
                                <h4 className="textreveal">
                                    Massachusetts
                                </h4>
                                <img src={massachusetts} alt=""/>
                            </div>
                            <div className="community_card">
                                <h4 className="textreveal">
                                    Wyoming
                                </h4>
                                <img src={wyoming} alt=""/>
                            </div>
                            <div className="community_card">
                                <h4 className="textreveal">
                                    Rhode Island
                                </h4>
                                <img src={rhode} alt=""/>
                            </div>
                            <div className="community_card">
                                <h4 className="textreveal">
                                    Florida
                                </h4>
                                <img src={florida} alt=""/>
                            </div>
                            <div className="community_card fw">
                                <h4 className="textreveal">
                                    Metro New York
                                </h4>
                                <img src={metro} alt=""/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <section className="values">
                <div className="container-fluid">
                    <div className="values_inner">
                        <div className="heading linecross">
                            <h2 className="textreveal">
                                Our Values
                            </h2>
                        </div>
                        <div className="values_grid">
                            <div className="value_card">
                                <div className="head">
                                    <img src={affordable} className="img-fluid" alt="Affordable" />
                                    <h4 className="textreveal">Affordable</h4>
                                </div>
                                <div className="body">
                                    <p>Well managed, well kept, and safe, our properties offer all the comforts of home
                                        at affordable rates to fit any budget.</p>
                                </div>
                            </div>
                            <div className="value_card">
                                <div className="head">
                                    <img src={safe} className="img-fluid" alt="Safe" />
                                    <h4 className="textreveal">Safe</h4>
                                </div>
                                <div className="body">
                                    <p>Residents and renters can feel at ease knowing we provide innovative and
                                        time-tested methods to ensure our communities are safe and secure</p>
                                </div>
                            </div>
                            <div className="value_card">
                                <div className="head">
                                    <img src={professional} className="img-fluid" alt="Professional" />
                                    <h4 className="textreveal">Professional</h4>
                                </div>
                                <div className="body">
                                    <p>Our highly trained staff specializes in managing and maintaining positive
                                        relationships throughout the housing process.</p>
                                </div>
                            </div>
                            <div className="value_card">
                                <div className="head">
                                    <img src={attentive} className="img-fluid" alt="Attentive" />
                                    <h4 className="textreveal">Attentive</h4>
                                </div>
                                <div className="body">
                                    <p>Readily available, we tend to our properties ensuring total compliance with
                                        regular audits and inspections.</p>
                                </div>
                            </div>
                            <div className="value_card">
                                <div className="head">
                                    <img src={efficient} className="img-fluid" alt="Efficient" />
                                    <h4 className="textreveal">Efficient</h4>
                                </div>
                                <div className="body">
                                    <p>With experiences in occupancy, leasing management, and affordable housing
                                        business modeling, we provide solutions to achieve total occupancy and full
                                        compliance.</p>
                                </div>
                            </div>
                            <div className="value_card">
                                <div className="head">
                                    <img src={community} className="img-fluid" alt="Community Oriented" />
                                    <h4 className="textreveal">Community Oriented</h4>
                                </div>
                                <div className="body">
                                    <p>Most importantly, we believe in building strong communities. We’re committed to
                                        providing safe and comfortable homes for all our tenants to revitalize and
                                        strengthen underserved communities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="btn_wrapper text-center">
                            <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="btn btn-primary">Learn More</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="gallery">
                <div className="container-fluid">
                    <div className="gallery_inner">
                        <div className="grid_box">
                            <div className="content">
                                <h3 className="textreveal">
                                    Reliant Lifestyles
                                </h3>
                                <p>
                                    Families large and small are happy to call a Reliant property home, where attentive
                                    management keep communities safe so neighborhoods can thrive.
                                </p>
                                <div className='btn-container'>
                                    <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="btn btn-primary">Learn More</Link>
                                </div>
                            </div>
                        </div>
                        <div className="grid_box col2end">
                            <div className="image">
                                <img src={gallery1} alt="" />
                            </div>
                        </div>
                        <div className="grid_box">
                            <div className="image">
                                <img src={gallery2} alt="" />
                            </div>
                        </div>
                        <div className="grid_box col2end">
                            <div className="image">
                                <img src={gallery3} alt="" />
                            </div>
                        </div>
                        <div className="grid_box col2start">
                            <div className="image">
                                <img src={gallery4} alt="" />
                            </div>
                        </div>
                        <div className="grid_box">
                            <div className="content">
                                <h3 className="textreveal">
                                    Our Team
                                </h3>
                                <p>
                                    Comprised of highly skilled professionals, our dedicated staff have wide ranging
                                    experience across the housing space, from management to maintenance, security to
                                    sales, ensuring any obstacle is handled directly and overcome with ease and
                                    efficiency. </p>
                                <div className='btn-container'>
                                    <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="btn btn-primary">Learn More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="slider_section">
                <div className="container-fluid">
                    <div className="slider_inner">
                        <Slider {...settings}>
                            <div className="slide_wrapper">
                                <div className="content">
                                    <h3 className="textreveal">
                                        Property Management & Compliance
                                    </h3>
                                    <p>
                                        From legal issues and leasing to repairs and upkeep, our management team maintains a
                                        record of excellence. Our experienced staff of experts is prepared to handle a wide
                                        range of issues including all matters related to compliance in addition to
                                        (re)certifications, property lease-ups, staffing, and more. We’re proud of our
                                        team’s ability to maintain compliance with a number of agencies across multiple
                                        states.
                                    </p>
                                </div>
                                <div className="picture"><img src={slide_1} alt="" className="img-fluid" /></div>
                            </div>
                            <div className="slide_wrapper">
                                <div className="content">
                                    <h3 className="textreveal">
                                        Securing Safe and Compliant Properties
                                    </h3>
                                    <p>
                                        Among our topmost concerns is the safety of our properties and residents. Our sister
                                        company, Reliant Safety, is prepared to efficiently handle any and all issues that
                                        may arise with courtesy and professionalism. Our trained security specialists ensure
                                        all Reliant properties are as secure as they are compliant.
                                    </p>
                                    <br />
                                    <div className='btn-container'>
                                        <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="btn btn-primary">Learn More</Link>
                                    </div>
                                </div>
                                <div className="picture"><img src={slide_2} alt="" className="img-fluid" /></div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>

            <Contact />


        </div>

    )
}

export default Home