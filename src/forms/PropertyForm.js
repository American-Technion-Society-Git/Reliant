import React, { useState, useEffect } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { db, storage } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const PropertyForm = ({ communitiesListName }) => {

    //properties form states
    const [propertiesName, setPropertiesName] = useState("")
    const [propertiesEmail, setPropertiesEmail] = useState("")
    const [propertiesDesc, setPropertiesDesc] = useState("")
    const [communityName, setCommunityName] = useState("Choose Community")
    const [address, setAddress] = useState("<p>Address</p>")
    const [mangeAddress, setMangeAddress] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [applicationLink, setApplicationLink] = useState("")
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const [dayStart, setDayStart] = useState("Start day")
    const [dayEnd, setDayEnd] = useState("End day")
    const [phone, setPhone] = useState("")
    const [propertiesImgUrls, setPropertiesImgUrls] = useState([])
    const [propertiesFile, setPropertiesFile] = useState([])
    const [propertiesImgUpload, setPropertiesImgUpload] = useState(false)
    const [propertiesFileLoader, setPropertiesFileLoader] = useState(false)
    const [imgUploaded, setImgUploaded] = useState(false)
    const [amenities, setAmenities] = useState("<p>Add Amenities</p>")
    const [file, setFile] = useState([])
    const [imgUrl, setImgUrl] = useState("");
    const [imgUpload, setImgUpload] = useState(false)
    const [fileLoader, setFileLoader] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)


    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    // Uploading Properties Data
    const PropertiesUploader = async () => {
        const unique_id = uuid()


        try {
            const docRef = await setDoc(doc(db, "properties", unique_id), {
                thumbnail: imgUrl,
                id: unique_id,
                name: propertiesName,
                amenities: amenities == "<p>Add Amenities</p>" ? "" : amenities,
                description: propertiesDesc,
                community: communityName,
                latitude: latitude,
                longitude: longitude,
                address: address,
                mangeAddress: mangeAddress,
                application_form: applicationLink,
                email: propertiesEmail,
                timeStart: timeStart,
                timeEnd: timeEnd,
                dayEnd: dayEnd,
                dayStart: dayStart,
                phone: phone,
                featured_image: propertiesImgUrls,
            });
            setMangeAddress("")
            setPropertiesName("")
            setPropertiesEmail("")
            setPropertiesDesc("")
            setCommunityName("Choose Community")
            setAddress("<p>Address</p>")
            setAmenities("<p>Add Amenities</p>")
            setLatitude("")
            setLongitude("")
            setApplicationLink("")
            setTimeStart("")
            setTimeEnd("")
            setPhone("")
            setDayStart("Start day")
            setDayEnd("End day")
            setPropertiesImgUrls([])
            setImgUrl("")
            setFile([]);
            setPropertiesFile([])
            closeBtn()
        } catch (error) {
            console.log(error);
        }
    }

    // Uploading Properties Img

    useEffect(() => {
        const uploadPropertiesImg = async () => {
            setImgUploaded(false)
            for (let i = 0; i < propertiesFile.length; i++) {
                const name = propertiesFile[i].name.replaceAll(" ", "-");
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
                    (error) => {
                        console.log('error');
                        console.log(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            setPropertiesFileLoader(false)
                            setImgUploaded(true)
                            setPropertiesImgUrls(current => [...current, downloadURL])
                        });
                    }
                );
            }
        }
        propertiesImgUpload && uploadPropertiesImg()

    }, [propertiesFile])


    const closeBtn = () => {
        document.getElementById('property-close-btn').click()
    }


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

    return (
        <div>

            <label for="property_thumbnail_uploader" class="thumbnail-file-upload">
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
            <input style={{visibility:"collapse",position:"absolute"}} id='property_thumbnail_uploader' type="file" onChange={(e) => {
                setFile(e.target.files[0])
                setImgUpload(true)
            }} />

            <CKEditor
            
                editor={ClassicEditor}
                data={address}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setAddress(data);
                }}
                config={{
                    toolbar: ['heading', 'bold', 'italic', 'bulletedList', 'numberedList'],
                }}
            />
            
            
            <input style={{marginTop:"10px"}} placeholder='Mangement Address' value={mangeAddress} onChange={(e) => setMangeAddress(e.target.value)} /><br />
            <select value={communityName} onChange={(e) => setCommunityName(e.target.value)}>
                <option value="">Choose Community</option>
                {communitiesListName.map((res, index) => {
                    return (
                        <option key={index} value={res}>{res}</option>
                    )
                })}
            </select>
            <br />
            <input placeholder='Property name' value={propertiesName} onChange={(e) => setPropertiesName(e.target.value)} /><br />
            <input placeholder='Property email' value={propertiesEmail} onChange={(e) => setPropertiesEmail(e.target.value)} /><br />
            <input placeholder='Property description' value={propertiesDesc} onChange={(e) => setPropertiesDesc(e.target.value)} /><br />
            <label for="property_upload_img_uploader" class="custom-file-upload">
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
                data={amenities}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setAmenities(data);
                }}
                config={{
                    toolbar: ['heading', 'bold', 'italic', 'bulletedList', 'numberedList'],
                }}
            />
            <br />
            <input placeholder='Latitude' value={latitude} onChange={(e) => setLatitude(e.target.value)} /><br />
            <input placeholder='Longitude' value={longitude} onChange={(e) => setLongitude(e.target.value)} /><br />
            <input placeholder='Application form link' value={applicationLink} onChange={(e) => setApplicationLink(e.target.value)} />
            <br />
            <label>
                Time start
                <input type='time' value={timeStart} onChange={(e) => setTimeStart(e.target.value)} />
            </label>
            <br />
            <label>
                Time end
                <input type='time' value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} />
            </label>
            <br />
            <input placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
            <br />
            <select value={dayStart} onChange={(e) => setDayStart(e.target.value)}>
                <option value="">Start day</option>
                {days.map((res, index) => {
                    return (
                        <option key={index} value={res}>{res}</option>
                    )
                })}
            </select>
            <br />
            <select value={dayEnd} onChange={(e) => setDayEnd(e.target.value)}>
                <option value="">End day</option>
                {days.map((res, index) => {
                    return (
                        <option key={index} value={res}>{res}</option>
                    )
                })}
            </select>
            <input style={{ visibility: "hidden" }} id='property_upload_img_uploader' placeholder='images array' type='file' multiple
                onChange={(e) => {
                    setPropertiesFile(e.target.files)
                    setPropertiesImgUpload(true)
                }}
            />
            <div class="modal-footer">
                <button className={btnDisabled ? 'btn btn-secondary disabled' : 'btn btn-secondary'} onClick={() => closeBtn()}>Cloes</button>
                <button id='property-adding-form' onClick={() => PropertiesUploader()} className={btnDisabled ? 'btn btn-secondary disabled' : 'btn btn-primary'}>Upload</button>

            </div>
        </div>
    )
}

export default PropertyForm
