import React from 'react'
import { useLocation } from "react-router-dom"
import Slider from "react-slick";

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

   


  return (
    <div className='property_section'>
      <div className='container-fluid'>
  
        <div class="content">
        <h3 class="textreveal">{data.name}</h3>
       <h6><b>{data.address}</b></h6>
      <p>{data.description}</p>

     <h3>Management Office</h3>
     <h6><b>{data.address}</b></h6>
     <h6><b>Office Hours: {start_time} - {end_time}</b></h6>
     <h6><b>{data.dayStart}-{data.dayEnd}</b></h6>
     <h6><b>P: {data.phone}</b></h6>
     <h6><b>{data.email}</b></h6>
        </div>

        <div>
            <a href={data.application_form}><button className='btn btn-primary'>Submit Application</button></a>
        </div>
      </div>

     <Slider {...settings}>
         {
            data.featured_image.map((res,index)=>{
                return(
                    <div key={index} className='slider-img-container'>
                        <img src={res} width={'90%'}/>
                    </div>
                )
            })
         }
     </Slider>
   <br />
   <br />


    </div>
  )
}

export default PropertyPage
