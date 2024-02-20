import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase';
import CommunityTable from '../tables/CommunityTable';
import PropertyTable from '../tables/PropertyTable';
import CommunityForm from '../forms/CommunityForm';
import PropertyForm from '../forms/PropertyForm';



const Admin = () => {

    // data states
    const [communitiesData, setCommunitiesData] = useState([]);
    const [propertiesData, setPropertiesData] = useState([]);



    const navigate = useNavigate()


    // Checking Admin
    useEffect(() => {
        const user = localStorage.getItem("accessToken")
        !user && navigate('/login')
        user == null && navigate('/login')
    }, [])


    // Logout Funtion
    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.removeItem('accessToken')
            navigate('/login')
        }).catch((error) => {
            console.log(error)
        });
    }


    // Fetching Data
    useEffect(() => {
        const fetchData = async () => {
            let communitiesList = [];
            let propertiesList = [];
            try {
                const communitiesRef = collection(db, "communities");
                const propertiesRef = collection(db, "properties");

                // Listen for changes in the "communities" collection
                const communitiesUnsubscribe = onSnapshot(communitiesRef, (snapshot) => {
                    communitiesList = snapshot.docs.map((doc) => doc.data());
                    setCommunitiesData(communitiesList);
                });

                // Listen for changes in the "properties" collection
                const propertiesUnsubscribe = onSnapshot(propertiesRef, (snapshot) => {
                    propertiesList = snapshot.docs.map((doc) => doc.data());
                    setPropertiesData(propertiesList);
                });

                // Cleanup the listeners when the component unmounts
                return () => {
                    communitiesUnsubscribe();
                    propertiesUnsubscribe();
                };
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


    const communitiesListName = communitiesData.map((res) => res.name).filter((value, index, self) => {
        return self.indexOf(value) === index;
    });


    return (
        <React.Fragment>
            <CommunityForm communitiesData={communitiesData} />

            <div class="modal fade" id="propertyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Property</h5>
                            <button type="button" id='property-close-btn' class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="modal-community-form" class="modal-body community-form">
                            <PropertyForm propertiesData={propertiesData} communitiesListName={communitiesListName} />
                        </div>
                        <div id='modal-footer' className='modal-footer'>
                           
                        </div>
                    </div>
                </div>
            </div>


            <CommunityTable communitiesData={communitiesData} />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

            <div className='header_container'>
                <div class="heading"><h2 class="textreveal">Property Table</h2></div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#propertyModal">
                    Add Property
                </button>
            </div>

            <PropertyTable propertiesData={propertiesData} communitiesListName={communitiesListName} />


        </React.Fragment>
    )
}

export default Admin
