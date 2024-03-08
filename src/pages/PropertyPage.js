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
      <div className="inner_banner" style={{backgroundImage: "url(https://www.reliantrs.com/dev/wp-content/uploads/2019/05/west_village_building.jpg)"}}></div>
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
              <h3 class="textreveal">{data.name}</h3>
              <h6><b id='div-address'>{parse(data.address)}</b></h6>
              <p>{data.description}</p>
                {
                  Object.keys(text).length > 0 &&
                      <div>
                        <h3>Building Amenities</h3>
                    <h6><b id='div-address'>{parse(data.amenities)}</b></h6>
                      </div>
                }
              <h3>Management Office</h3>
              <h6><b>{data.mangeAddress}</b></h6>
              <h6><b>Office Hours: {start_time} - {end_time}</b></h6>
              <h6><b>{data.dayStart}-{data.dayEnd}</b></h6>
              <h6><b>P: {data.phone}</b></h6>
              <h6><b>{data.email}</b></h6>
            </div>
            {application_form? 
            <div className='col-sm-4'>
                <a href={data.application_form}><button className='btn btn-primary'>Submit Application</button></a>
            </div>
            : <div><button className='btn btn-light' type='button'>Not Accepting Application</button></div>
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
