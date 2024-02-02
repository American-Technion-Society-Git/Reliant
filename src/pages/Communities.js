import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser';

const Communities = ({ communities, properties }) => {
    const navigate = useNavigate();

    const location = useLocation().pathname.replace("/communities/", "");

    const filterCommunities = communities.filter((res) => res.name.toLowerCase().replace(/\s+/g, '-') == location)
    const filterProperties = properties.filter((res) => res.community.toLowerCase().replace(/\s+/g, '-') == location)

    return (
        <div>
            <section className="communities">
                <div className="container-fluid">
                    <div className="communities_inner">
                        <div className="heading text-center">

                            {filterCommunities.map((res, index) => {
                                return (
                                    <div>
                                        <h2 className="textreveal">
                                            Explore {res.name}
                                        </h2>
                                        <p>
                                            {res.description}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='properties_grid'>
                            {filterProperties.map((res, index) => {
                                const route = res.name.toLowerCase().replace(/\s+/g, '-')
                                const defaultImg = `url(https://www.usbforwindows.com/storage/img/images_3/function_set_default_image_when_image_not_present.png)`
                                const divStyle = {
                                    backgroundImage: res.featured_image[1] ? `url(${res.featured_image[1]})` : defaultImg
                                };
                                console.log(divStyle)
                                return (
                                    <Link onClick={()=> window.scrollTo(0,0)} to={`${route}`} state={res} key={index}>
                                        <div className='grid_box' style={divStyle}>
                                            <div key={index} id='div-address'>
                                                <h3>
                                                    {res.name}
                                                </h3>
                                                {parse(`${res.address}`)}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                        <div className="heading text-center">
                            <h2 className="textreveal">
                                <br />
                                Explore  More Communities
                            </h2>
                        </div>
                        <div className="communities_grid">
                            {communities.map((res, index) => {
                                return (
                                    <div onClick={() =>  {
                                        navigate(`/communities/${res.name.toLowerCase().replace(/\s+/g, '-')}`)
                                        window.scrollTo(0,0)
                                        }} className={`community_card ${res.columns == 2 ? "col2" : ""} ${res.columns == 3 ? "fw" : ""}`} key={index}>
                                        <h4 className="textreveal">
                                            {res.name}
                                        </h4>
                                        <img src={res.featured_image} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Communities