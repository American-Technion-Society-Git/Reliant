import React, { useState, useEffect } from 'react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';


const PropertyTable = ({ propertiesData, communitiesListName }) => {

  // Table States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateObj, setUpdateObj] = useState({})
  const [propertiesImgUrls, setPropertiesImgUrls] = useState([])
  const [propertiesFile, setPropertiesFile] = useState([])
  const [propertiesImgUpload, setPropertiesImgUpload] = useState(false)
  const [propertiesFileLoader, setPropertiesFileLoader] = useState(false)
  const [imgUploaded, setImgUploaded] = useState(false)


  // delete Community
  const deleteCommunity = async (id) => {
    const deleteReq = await deleteDoc(doc(db, "properties", id));
    console.log(deleteReq)
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


  // Table Functions

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredUsers = propertiesData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = searchTerm == "" ? Math.ceil(propertiesData.length / itemsPerPage) :
    Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${currentPage === i ? "btn btn-primary" : "btn btn-seconaday"}`}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const updateProperty = async (id) => {
    setImgUploaded(false)
    const findingData = propertiesData.find((res) => {
      return res.id == id
    })

    console.log(findingData.id)

    setUpdateObj(findingData)
    await console.log(findingData)
    document.getElementById('property-update-modal-btn').click()
  }


  // Uploading Properties Img

  useEffect(() => {
    const uploadPropertiesImg = async () => {
      setImgUploaded(false)
      console.log(propertiesFile)
      for (let i = 0; i < propertiesFile.length; i++) {
        const uniqueName = Math.floor(Math.random() * 100 * 100000) + '-' + propertiesFile[i].name;
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
          (error) => {
            console.log('error');
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setPropertiesFileLoader(false)
              setPropertiesImgUrls(current => [...current, downloadURL])
              setImgUploaded(true)
              setUpdateObj({ ...updateObj, featured_image: propertiesImgUrls })
            });
          }
        );
      }
    }
    propertiesImgUpload && uploadPropertiesImg()

  }, [propertiesFile])


  const SubmitEdit = async () => {
     const imgs = propertiesImgUrls.length == 0 ? updateObj.featured_image : propertiesImgUrls;
    const finalObj = { ...updateObj, featured_image: imgs }
    const updatingData = doc(db, "properties", updateObj.id);
    await updateDoc(updatingData, finalObj);
    document.getElementById("community-update-modal-btn").click()
  }


  return (
    <React.Fragment >
      <div class="modal fade" id="propertyUpdateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Propery</h5>
              <button type="button"  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            <CKEditor
        editor={ClassicEditor}
        data={updateObj.address}
        onChange={(event, editor) => {
            const data = editor.getData();
            setUpdateObj({ ...updateObj, address: data })
        }}
        config={{
            toolbar: ['heading', 'bold', 'italic', 'bulletedList', 'numberedList'],
        }}
         />

              <input placeholder='Address' value={updateObj.address} onChange={(e) => setUpdateObj({ ...updateObj, address: e.target.value })} /><br />
              <select value={updateObj.community} onChange={(e) => setUpdateObj({ ...updateObj, community: e.target.value })}>
                <option value="">Choose Community</option>
                {communitiesListName.map((res, index) => {
                  return (
                    <option key={index} value={res}>{res}</option>
                  )
                })}
              </select>
              <br />
              <input placeholder='Name' value={updateObj.name} onChange={(e) => setUpdateObj({ ...updateObj, name: e.target.value })} /><br />
              <input placeholder='Email' value={updateObj.email} onChange={(e) => setUpdateObj({ ...updateObj, email: e.target.value })} /><br />
              <input placeholder='Description' value={updateObj.description} onChange={(e) => setUpdateObj({ ...updateObj, description: e.target.value })} /><br />
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
              <input placeholder='Latitude' value={updateObj.latitude} onChange={(e) => setUpdateObj({ ...updateObj, latitude: e.target.value })} /><br />
              <input placeholder='Longitude' value={updateObj.longitude} onChange={(e) => setUpdateObj({ ...updateObj, longitude: e.target.value })} /><br />
              <label>
                Time start
                <input type='time' value={updateObj.timeStart} onChange={(e) => setUpdateObj({ ...updateObj, timeStart: e.target.value })} />
              </label>
              <br />
              <label>
                Time end
                <input type='time' value={updateObj.timeEnd} onChange={(e) => setUpdateObj({ ...updateObj, timeEnd: e.target.value })} />
              </label>
              <select value={updateObj.dayStart} onChange={(e) => setUpdateObj({ ...updateObj, dayStart: e.target.value })}>
                <option value="">Start day</option>
                {days.map((res, index) => {
                  return (
                    <option key={index} value={res}>{res}</option>
                  )
                })}
              </select>

              <br />

              <select value={updateObj.dayEnd} onChange={(e) => setUpdateObj({ ...updateObj, dayEnd: e.target.value })}>
                <option value="">End day</option>
                {days.map((res, index) => {
                  return (
                    <option key={index} value={res}>{res}</option>
                  )
                })}
              </select>
              
              <br />
              <input placeholder='Application form' value={updateObj.application_form} onChange={(e) => setUpdateObj({ ...updateObj, application_form: e.target.value })} /><br />
              <input placeholder='Phone' value={updateObj.phone} onChange={(e) => setUpdateObj({ ...updateObj, phone: e.target.value })} />
              <input style={{visibility:"collapse"}} id="property_update_img_uploader" type="file" multiple onChange={(e) => {
                setPropertiesFile(e.target.files)
                setPropertiesImgUpload(true)
                setImgUploaded(true)
              }} />
            </div>
            <div class="modal-footer">
              <button id='community-update-modal-btn' type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className='btn btn-primary' onClick={() => SubmitEdit()}>Update Data</button>

            </div>
          </div>
        </div>
      </div>

      <button style={{visibility:"collapse"}} type="button" id='property-update-modal-btn' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#propertyUpdateModal">
        sdfz
      </button>

      <div className="table">

        <div className="entries">
          <p>
            Showing{" "}
            <input
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              type="number"
              min='1'
            />{" "}
            entries
          </p>
          <span className="ent-txt">
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              type="search"
              className="input"
              placeholder="Search"
            />
          </span>
        </div>
        <div className="table-container">


          <table className="users">
            <tr>
              <td className="user-h">Name</td>
              <td className="user-h">Address</td>
              <td className="user-h">Description </td>
              <td className="user-h">Email </td>
              <td className="user-h">Action</td>
            </tr>
            {currentItems.map((item, i) => (
              <tr key={i} className="user-row">
                <td className="user-t">{item.name}</td>
                <td className="user-t">{item.address.slice(0, 40)}{item.address.length > 40 && '...'}</td>
                {item.description && <td className="user-t">{item.description.slice(0, 40)}{item.description.length > 40 && '...'}</td>}
                <td className="user-t">{item.email}</td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {item.id && <button className='btn btn-primary' onClick={() => deleteCommunity(item.id)}>delete</button>}
                  {item.id && <button className='btn btn-secondary' onClick={() => updateProperty(item.id)}>update</button>}
                </td>
              </tr>

            ))}
          </table>
        </div>
        <div className="pagination-cont">
          <propertiesImgUrls className="pag-txt">
            Showing {indexOfFirstItem + 1} to  {currentPage === totalPages ? propertiesData.length : indexOfLastItem} of {propertiesData.length}{" "}
            entries
          </propertiesImgUrls >

          <div className="pagination">
            <button
              className="btn btn-seconaday"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              Previous
            </button>
            {renderPageNumbers()}
            <button
              className="btn btn-seconaday"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PropertyTable
