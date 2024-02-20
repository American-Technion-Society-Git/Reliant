import React, { useState, useEffect } from 'react'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase';


import UpdateModal from './UpdateModal';


const PropertyTable = ({ propertiesData, communitiesListName }) => {

  // Table States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateObj, setUpdateObj] = useState([])
  const [imgUploaded, setImgUploaded] = useState(false)


  // delete Community
  const deleteCommunity = async (id) => {
    const deleteReq = await deleteDoc(doc(db, "properties", id));
  }


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

 




  let selectedData;
  const updateProperty = async (id) => {
    setImgUploaded(false)
    const findingData = propertiesData.find((res) => {
      return res.id == id;
    })
    selectedData = findingData;
     setUpdateObj(selectedData);
     document.getElementById('property-update-modal-btn').click();
  }


  return (
    <React.Fragment >
    <UpdateModal communitiesListName={communitiesListName} data={updateObj} />

      <button style={{ visibility: "collapse" }} type="button" id='property-update-modal-btn' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#propertyUpdateModal">
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
                  {item.id && <button className='btn btn-secondary' onClick={() => {
                    updateProperty(item.id);
                  }}>update</button>}
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
