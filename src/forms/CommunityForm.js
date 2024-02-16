import React, { useState, useEffect } from 'react'
import { v4 as uuid } from "uuid";
import { setDoc, doc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CommunityForm = ({ communitiesData }) => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [columns, setColumns] = useState("")
    const [file, setFile] = useState([])
    const [imgUrl, setImgUrl] = useState("");
    const [imgUpload, setImgUpload] = useState(false)
    const [fileLoader, setFileLoader] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [imgUploaded, setImgUploaded] = useState(false)

    // Uploading Communnities Data
    const communitiesUploader = async () => {
        setBtnDisabled(true)
        const unique_id = uuid()

        const modalButton = document.getElementById('community-modal-btn')
        try {
            const docRef = await setDoc(doc(db, "communities", unique_id), {
                name: name,
                description: description,
                columns: columns,
                featured_image: imgUrl,
                id: unique_id
            });
            setName('')
            setDescription('')
            setColumns('')
            setImgUrl('')
            modalButton.click()
            setBtnDisabled(false)

        } catch (error) {
            console.log(error);
        }
    }

    //  Uploading Img
    useEffect(() => {
        const uploadImg = () => {
            setImgUploaded(false)
            const name = file.name.replaceAll(" ","-");
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

    return (
        <React.Fragment >
            <div className='header_container'>
                <div class="heading"><h2 class="textreveal">Community Table</h2></div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#communityModal">
                    ADD Community
                </button>
            </div>

            <div class="modal fade" id="communityModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Community</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div >
                                <br />
                                <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} /><br />
                                <input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                                <input placeholder='Columns' value={columns} onChange={(e) => setColumns(e.target.value)} /><br />
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
                                }} /><br />



                            </div>
                        </div>
                        <div class="modal-footer">
                            <button className={btnDisabled ? 'btn btn-secondary disabled' : 'btn btn-secondary'} id='community-modal-btn' type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className={btnDisabled ? 'btn btn-primary disabled' : 'btn btn-primary'} onClick={() => communitiesUploader()} type="button" class="btn btn-primary" data-bs-dismiss="modal">Add Community</button>
                        </div>


                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}

export default CommunityForm