import { React, useState, useEffect } from 'react'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import './App.scss';
import Communities from './pages/Communities';
import SignIn from './pages/SignIn';
import Admin from './pages/Admin';
import PropertyPage from './pages/PropertyPage';

function App() {

  const [communitiesData, setCommunitiesData] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let communitiesList = []
      let propertiesList = []
      try {
        const communitiesSnapshot = await getDocs(collection(db, "communities"));
        const propertiesSnapshot = await getDocs(collection(db, "properties"));
        communitiesSnapshot.forEach((doc) => {
          communitiesList.push(doc.data());
        });
        propertiesSnapshot.forEach((doc) => {
          propertiesList.push(doc.data());
        });
        setCommunitiesData(communitiesList)
        setPropertiesData(propertiesList)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()

  }, []);


  const communitiesName = communitiesData.map((res)=> res.name).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });


  return (
    <div className="App">
      <Navbar data={communitiesName}/>
      <Routes>
        <Route path='/' element={<Home data={communitiesData}/>} />
        <Route path='/about' element={<About />} />
        <Route path='/communities/:Id' element={<Communities communities={communitiesData} properties={propertiesData}/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/admin' element={<Admin />}/>
        <Route path='/communities/:Id/:Id' element={<PropertyPage />}/>
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
