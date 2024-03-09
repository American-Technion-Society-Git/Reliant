import React from 'react'
import { useLocation } from "react-router-dom"
import Slider from "react-slick";
import parse from 'html-react-parser';

const PropertyPage = () => {

    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 850,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
                breakpoint: 550,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                }
              }
        ]
      };
    
    const location = useLocation();
    const data = location.state;
    const startTime = data.timeStart.split(":");
    const startHour = startTime[0] > 12 ? startTime[0] - 12 : startTime[0];
    const startMin = startTime[1];
    let start_time = `${startHour}:${startMin}`

    const lastTime = data.timeEnd.split(":");
    const lastHour = lastTime[0] > 12 ? lastTime[0] - 12 : lastTime[0];
    const lastMin = lastTime[1]
    let end_time = `${lastHour}:${lastMin}`
    const check = data.amenities == '<p>-</p>' ||  data.amenities == '' ? false : true;
    const application_form = data.application_form == ''  ? false : true;
   const text = parse(data.amenities)


  return (
    <div className='property_section'>
      <div className="inner_banner" style={{backgroundImage: "url(https://www.reliantrs.com/dev/wp-content/uploads/2019/05/20201030_155053.jpg"}}></div>
      <div id="breadcrumb">
        <div class="container-fluid">
          <div class="col-sm-12">
            <a href="https://www.reliantrs.com">Home</a><span>&lt;</span>
            <a href="https://www.reliantrs.com/community/metro-new-york">Communities</a><span>&lt;</span>
            <a href="https://www.reliantrs.com/community/upstate-new-york">Upstate New York</a>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row'>
            <div className='col-sm-8'>
                <div class="pname">West Village</div>
                  <div class="paddress">150 West Village Place, Ithaca, NY 14850</div>
                  <div class="pdesc"><p><strong>West Village Apartments is a mixed-use property which consists of 18 buildings, containing 235 Low-Income Housing Tax Credit units in a variety of building types. All vouchers and rental assistance programs are accepted.</strong></p>
                  <p><strong>Building Amenities:</strong></p>
                  <ul>
                    <li>Utilities included: heat, water, electric, gas, garbage pickup and sewer</li>
                    <li>Community room</li>
                    <li>Laundry rooms (2)</li>
                    <li>Playgrounds (2)</li>
                    <li>Outdoor gazebo</li>
                    <li>Professional on-site management &amp; responsive maintenance team</li>
                    <li>24-hour surveillance system &amp; access control system</li>
                    <li>Public transportation available at property entrance</li>
                    <li>On-site 4-Hour after school program with computer room</li>
                  </ul>
                </div>
            </div>
            {application_form? 
            <div className='col-sm-4'>
                <a href={data.application_form}><button className='btn btn-primary'>Submit Application</button></a>
                <div class="pcontact">
                  <div class="pctitle">Management Office</div>
                    <p><strong>150 West Village Place, Ithaca, NY 14850</strong></p>
                    <p><strong>Office Hours:</strong> 9:00am–5:00pm M–F</p>
                    <p><strong>P:</strong> (607) 273-5215<br/><strong>F:</strong> (607) 273-5220<br/><a href="mailto:WestVillage@reliantrs.com">WestVillage@reliantrs.com</a></p>
                  </div>
            </div>
            : <div className='col-sm-4'><button className='btn btn-light' type='button'>Not Accepting Application</button></div>
            }
        </div>
      </div>

     <div className='container'>
            <div className='row'>
              <div className='col-sm-12'>
              <Slider {...settings}>
         {
            data.featured_image.map((res,index)=>{
                return(
                    <div key={index} className='slider-img-container'>
                        <img src={res} width={'92%'}/>
                    </div>
                )
            })
         }
     </Slider>
              </div>
            </div>
     </div>
   <br />
   <br />


    </div>
  )
}

export default PropertyPage
