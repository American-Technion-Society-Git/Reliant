import React from 'react'
import { useLocation ,Link} from "react-router-dom"
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
                breakpoint: 768,
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
    const application_form = data.application_form == '' || data.application_form == '-' ? false : true;
    const text = data.amenities.replace("<p>", "<li>")

    let content = data.amenities;
content = content.replace(/<p>/g, "<li>");  
content = content.replace(/<\/p>/g,"</li>"); 
  return (
    <div className='property_section'>
      <div className="inner_banner" style={{backgroundImage: `url(${(data.thumbnail)})`}}></div>
      <div id="breadcrumb">
        <div class="container-fluid">
          <div class="col-sm-12">
            <Link to={'/'}>Home</Link><span>&lt;</span>
            <Link to={`/communities/${data.community.toLowerCase().replace(/\s+/g, '-')}`}>{data.community}</Link>
<span>&lt;</span>
            <a href="javascript">Upstate New York</a>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row'>
            <div className='col-lg-8 col-md-7'>
                <div class="pname">{data.name}</div>
                  <div class="paddress">{parse(data.address)}`</div>
                  <div class="pdesc"><p><strong>{parse(data.description)}</strong></p>
                  {check ?
                  <div>
                  <p><strong>Building Amenities:</strong></p>
                  <ul>
                    {parse(content)}
                  </ul>
                  </div>
                  : <div></div>
}
                </div>
            </div>
            <div className='col-lg-4 col-md-5'>
              <div>
                {application_form? 
                 <a href={data.application_form}><button className='btn btn-primary'>Submit Application</button></a>
                : <button className='btn btn-light' type='button'>Not Accepting Application</button>
                }
                </div>
                <div class="pcontact">
                  <div class="pctitle">Management Office</div>
                    <p><strong>{parse(data.mangeAddress)}</strong></p>
                    <p><strong>Office Hours:</strong> {data.timeStart}-{data.timeEnd} {data.dayStart}-{data.dayEnd}</p>
                    <p><strong>P:</strong>{parse(data.phone)}<br/><a href="mailto:{data.email}">{data.email}</a></p>
                  </div>
            </div>
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
