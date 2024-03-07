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
   
console.log(data)
  return (
    <div className='property_section'>
      <div className='container-fluid'>
  
        <div class="content">
        <h3 class="textreveal">{data.name}</h3>
       <h6><b id='div-address'>{parse(`${data.address}`)}</b></h6>
      <p>{data.description}</p>


      
      {check? 
      <div>
            <h3>Building Amenities</h3>
            <h6><b id='div-address'>{parse(`${data.amenities}`)}</b></h6>
            </div>
          :
            <div></div>
          }


     <h3>Management Office</h3>
     <h6><b>{data.mangeAddress}</b></h6>
     <h6><b>Office Hours: {start_time} - {end_time}</b></h6>
     <h6><b>{data.dayStart}-{data.dayEnd}</b></h6>
     <h6><b>P: {data.phone}</b></h6>
     <h6><b>{data.email}</b></h6>
        </div>
        {application_form? 
        <div>
            <a href={data.application_form}><button className='btn btn-primary'>Submit Application</button></a>
        </div>
        : <div><button className='btn btn-light' type='button'>Not Accepting Application</button></div>
        }
      </div>

     <Slider {...settings}>
         {
            data.featured_image.map((res,index)=>{
                return(
                    <div key={index} className='slider-img-container'>
                        <img src={res} width={'80%'}/>
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
