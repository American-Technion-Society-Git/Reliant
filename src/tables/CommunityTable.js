import React, { useState, useEffect } from 'react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { hasPointerEvents } from '@testing-library/user-event/dist/utils';

const CommunityTable = ({ communitiesData }) => {

  // Table States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateObj, setUpdateObj] = useState({})
  const [file, setFile] = useState([])
  const [imgUpload, setImgUpload] = useState(false)
  const [fileLoader, setFileLoader] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [imgUploaded, setImgUploaded] = useState(false)

  // delete Community
  const deleteCommunity = async (id) => {
    const deleteReq = await deleteDoc(doc(db, "communities", id));
    console.log(deleteReq)
  }

  // Table Functions

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredUsers = communitiesData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = searchTerm == "" ? Math.ceil(communitiesData.length / itemsPerPage) :
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
          className={currentPage === i ? "btn btn-primary" : "btn btn-seconaday"}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };



  const updateCommunity = async (id) => {

    const findingData = communitiesData.find((res) => {
      return res.id == id
    })

    console.log(findingData.id)

    setUpdateObj(findingData)
    document.getElementById('community-update-modal').click()
  }


  useEffect(() => {
    const uploadImg = () => {
      setImgUploaded(false)
      const uniqueName = Math.floor(Math.random() * 100 * 100000) + '-' + file.name;
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
            setUpdateObj({ ...updateObj, featured_image: downloadURL })
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
    setBtnDisabled(true)
    console.log(updateObj.id)
    const updatingData = doc(db, "communities", updateObj.id);
    await updateDoc(updatingData, updateObj);
    setBtnDisabled(false)
    document.getElementById("close-edit-modal").click()
  }

  return (
    <React.Fragment>

      <div class="modal fade" id="communityUpdateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Community</h5>
              <button id='close-edit-modal' type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input placeholder='Name' value={updateObj.name} onChange={(e) => setUpdateObj({ ...updateObj, name: e.target.value })} /><br />
              <input placeholder='Description' value={updateObj.description} onChange={(e) => setUpdateObj({ ...updateObj, description: e.target.value })} /><br />
              <input placeholder='Columns' value={updateObj.columns} onChange={(e) => setUpdateObj({ ...updateObj, columns: e.target.value })} /><br />
              <label for="community_img_uploader" class="custom-file-upload">
                {
                  imgUploaded ?
                    "Image Uploaded"
                    :
                    fileLoader ?
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
              <input id='community_img_uploader' type="file" onChange={(e) => {
                setFile(e.target.files[0])
                setImgUpload(true)
              }} />




            </div>
            <div class="modal-footer">
              <button className={btnDisabled ? 'btn btn-secondary disabled' : 'btn btn-secondary'} id='community-modal-btn' type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className={btnDisabled ? 'btn btn-primary disabled' : 'btn btn-primary'} onClick={() => SubmitEdit()} type="button" class="btn btn-primary" data-bs-dismiss="modal">Edit Community</button>
            </div>
          </div>
        </div>
      </div>

      <button style={{ visibility: 'collapse' }} type="button" id='community-update-modal' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#communityUpdateModal">

      </button>


      <div className="table">
        <div className="entries">
          <p>
            Showing{" "}
            <input
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              className='ent-inp'
              type="number"
              min="1"
            />{" "}
            entries
          </p>
          <span className="ent-txt">
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              type="search"
              className="ser-inp"
              placeholder="Search"
            />
          </span>
        </div>
        <div className="table-container">


          <table className="users">
            <tr>
              <td className="user-h">Image</td>
              <td className="user-h">Name</td>
              <td className="user-h">description</td>
              <td className="user-h">columns</td>
              <td className="user-h">Delete</td>
            </tr>
            {currentItems.map((item, i) => (
              <tr key={i} className="user-row">
                <td className="user-t"><img src={item.featured_image} alt="" width={'50px'} /></td>
                <td className="user-t">{item.name}</td>
                <td className="user-t" style={{ maxWidth: "300px" }} >{item.description.slice(0, 40)}{item.description.length > 40 && '...'}</td>
                <td className="user-t">{item.columns}</td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                  {item.id && <button className='btn btn-secondary' onClick={() => updateCommunity(item.id)}>update</button>}
                  {item.id && <button className='btn btn-primary' onClick={() => deleteCommunity(item.id)}>del</button>}
                </td>
              </tr>

            ))}
          </table>
        </div>
        <div className="pagination-cont">
          <p className="pag-txt">
            Showing {indexOfFirstItem + 1} to  {currentPage === totalPages ? communitiesData.length : indexOfLastItem} of {communitiesData.length}{" "}
            entries
          </p>

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

export default CommunityTable
