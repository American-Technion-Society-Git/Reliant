import React from 'react'
import { useState,useEffect } from "react"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const UpdateModal = ({communitiesListName, data}) => {


    const [propertyObj, setPropertyObj] = useState({data:false})
    const [propertiesImgUrls, setPropertiesImgUrls] = useState([])
    const [propertiesFile, setPropertiesFile] = useState([])
    const [propertiesImgUpload, setPropertiesImgUpload] = useState(false)
    const [propertiesFileLoader, setPropertiesFileLoader] = useState(false)
    const [imgUploaded, setImgUploaded] = useState(false)         
    const [file, setFile] = useState([])
    const [imgUrl, setImgUrl] = useState("");
    const [imgUpload, setImgUpload] = useState(false)
    const [fileLoader, setFileLoader] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)    

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    useEffect(()=>{   
     if (Object.keys(propertyObj).length < 19) {
      setPropertyObj(data);
       setTimeout(() => {
        Object.keys(propertyObj).length == 18 && setPropertyObj({...propertyObj,data:false})
       }, 2000);
     }
    })



      const handleClick = () => {
       delete propertyObj.latitude
      }


        // Uploading Properties Img

  useEffect(() => {
    const uploadPropertiesImg = async () => {
      setImgUploaded(false)
      for (let i = 0; i < propertiesFile.length; i++) {
        const name = propertiesFile[i].name.replaceAll(" ","-");
        const uniqueName = Math.floor(Math.random() * 100 * 100000) + '-' + name;
        const storageRef = ref(storage, uniqueName);
        const uploadTask = uploadBytesResumable(storageRef, propertiesFile[i]);
        uploadTask.on('state_changed',
          (snapshot) => {

            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setPropertiesFileLoader(true)
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                setPropertiesFileLoader(true)
                break;
              default:
                break;
            }
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setPropertiesFileLoader(false)
              setPropertiesImgUrls(current => [...current, downloadURL])
              setImgUploaded(true)
              setPropertyObj({ ...propertyObj, featured_image: propertiesImgUrls })
            });
          }
        );
      }
    }
    propertiesImgUpload && uploadPropertiesImg()

  }, [propertiesFile])


    //  Uploading Thumbnail Img
    useEffect(() => {
      const uploadImg = () => {
          setImgUploaded(false)
          const name = file.name.replaceAll(" ", "-");
          const uniqueName = Math.floor(Math.random() * 100 * 100000) + '-' + name;
          const storageRef = ref(storage, uniqueName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on('state_changed',
              (snapshot) => {

                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  setFileLoader(true)
                  setBtnDisabled(true)
                  switch (snapshot.state) {
                      case 'paused':
                          console.log('Upload is paused');
                          break;
                      case 'running':
                          console.log('Upload is running');
                          setFileLoader(true)
                          break;
                      default:
                          break;
                  }
              },
              (error) => {
                  console.log('error');
                  console.log(error);
              },
              () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      console.log('File available at', downloadURL);
                      setFileLoader(false)
                      setImgUrl(downloadURL)
                      setImgUpload(false)
                      setBtnDisabled(false)
                      setImgUploaded(true)
                  });
              }
          );
      }
      imgUpload && uploadImg()
  }, [file])


  
  const SubmitEdit = async () => {
    const imgs = propertiesImgUrls.length == 0 ? propertyObj.featured_image : propertiesImgUrls;
    const thumbnail = imgUrl == "" ? propertyObj.thumbnail : imgUrl;
    const finalObj = { ...propertyObj, featured_image: imgs, thumbnail: thumbnail }
    const updatingData = doc(db, "properties", propertyObj.id);
    delete propertyObj.data;  
    await updateDoc(updatingData, finalObj);
    document.getElementById("community-update-modal-btn").click()
    delete propertyObj.latitude
  }


  return (
    <div class="modal fade" id="propertyUpdateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Propery</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  onClick={()=> handleClick()}></button>
        </div>
        <div class="modal-body">

        <label for="update_property_thumbnail_uploader" class="thumbnail-file-upload">
                {
                    imgUploaded ?
                        "Thumbnail Uploaded"
                        :
                        fileLoader ?
                            <>
                                <img src='https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif' width={"35px"} />
                                Loading ...
                            </>
                            :
                            <>
                                <img src='https://i.imgur.com/x2ct9C1.png' width={"35px"} />
                                Upload Thumbnail
                            </>
                }


            </label>
            <input style={{visibility:"collapse",position:"absolute"}} id='update_property_thumbnail_uploader' type="file" onChange={(e) => {
                setFile(e.target.files[0])
                setImgUpload(true)
            }} />

          <CKEditor
            editor={ClassicEditor}
            data={propertyObj.address}
            onChange={(event, editor) => {
              const data = editor.getData();
              setPropertyObj({ ...propertyObj, address: data })
            }}
            config={{
              toolbar: ['heading', 'bold', 'italic', 'bulletedList', 'numberedList'],
            }}
          />

          <input style={{marginTop:"10px"}} placeholder='Mangement Address' value={propertyObj.mangeAddress} onChange={(e) => setPropertyObj({ ...propertyObj, mangeAddress: e.target.value })} /><br />
          <select value={propertyObj.community} onChange={(e) => setPropertyObj({ ...propertyObj, community: e.target.value })}>
            <option value="">Choose Community</option>
            {communitiesListName.map((res, index) => {
              return (
                <option key={index} value={res}>{res}</option>
              )
            })}
          </select>
          <br />
          <input placeholder='Name' value={propertyObj.name} onChange={(e) => setPropertyObj({ ...propertyObj, name: e.target.value })} /><br />
          <input placeholder='Email' value={propertyObj.email} onChange={(e) => setPropertyObj({ ...propertyObj, email: e.target.value })} /><br />
          <input placeholder='Description' value={propertyObj.description} onChange={(e) => setPropertyObj({ ...propertyObj, description: e.target.value })} /><br />
          <label for="property_update_img_uploader" class="custom-file-upload">
            {
              imgUploaded ?
                "Image Uploaded"
                :
                propertiesFileLoader ?
                  <>
                    <img src='https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif' width={"35px"} />
                    Loading ...
                  </>
                  :
                  <>
                    <img src='https://i.imgur.com/x2ct9C1.png' width={"35px"} />
                    Upload Image
                  </>
            }
          </label>
          <br />
            <CKEditor
                editor={ClassicEditor}
                data={propertyObj.amenities}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setPropertyObj({ ...propertyObj, amenities: data })
                }}
                config={{
                    toolbar: ['heading', 'bold', 'italic', 'bulletedList', 'numberedList'],
                }}
            />
            <br/>
          <input placeholder='Latitude' value={propertyObj.latitude} onChange={(e) => setPropertyObj({ ...propertyObj, latitude: e.target.value })} /><br />
          <input placeholder='Longitude' value={propertyObj.longitude} onChange={(e) => setPropertyObj({ ...propertyObj, longitude: e.target.value })} /><br />
          <label>
            Time start
            <input type='time' value={propertyObj.timeStart} onChange={(e) => setPropertyObj({ ...propertyObj, timeStart: e.target.value })} />
          </label>
          <br />
          <label>
            Time end
            <input type='time' value={propertyObj.timeEnd} onChange={(e) => setPropertyObj({ ...propertyObj, timeEnd: e.target.value })} />
          </label>
          <select value={propertyObj.dayStart} onChange={(e) => setPropertyObj({ ...propertyObj, dayStart: e.target.value })}>
            <option value="">Start day</option>
            {days.map((res, index) => {
              return (
                <option key={index} value={res}>{res}</option>
              )
            })}
          </select>

          <br />

          <select value={propertyObj.dayEnd} onChange={(e) => setPropertyObj({ ...propertyObj, dayEnd: e.target.value })}>
            <option value="">End day</option>
            {days.map((res, index) => {
              return (
                <option key={index} value={res}>{res}</option>
              )
            })}
          </select>

          <br />
          <input placeholder='Application form' value={propertyObj.application_form} onChange={(e) => setPropertyObj({ ...propertyObj, application_form: e.target.value })} /><br />
          <input placeholder='Phone' value={propertyObj.phone} onChange={(e) => setPropertyObj({ ...propertyObj, phone: e.target.value })} />
          <input style={{ visibility: "collapse" }} id="property_update_img_uploader" type="file" multiple onChange={(e) => {
            setPropertiesFile(e.target.files)
            setPropertiesImgUpload(true)
            setImgUploaded(true)
          }} />

          
        </div>
        <div class="modal-footer">
          <button id='community-update-modal-btn' type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=> handleClick()}>Close</button>
          <button className='btn btn-primary' onClick={() => SubmitEdit()}>Update Data</button>

        </div>
      </div>
    </div>
  </div>
  )
}

export default UpdateModal
