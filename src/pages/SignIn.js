import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import spinner from '../assets/Spinner.svg'


const SignIn = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const accessToken = user.accessToken
                localStorage.setItem("accessToken", accessToken)
                setLoading(false)
                navigate('/admin')
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                setError(true)
            });
    }

    return (
        <div style={{minHeight:"100dvh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div 
            style={{margin:"1.5rem",maxWidth:"400px",width:"100%",padding:"1rem",border:"1px solid",borderRadius:"10px"}}>
              <h3 style={{textAlign:"center",marginBottom:"20px"}}>Sign In </h3>
           <input className='input'
             style={{height:"40px",padding:"7px",width:"100%"}}
            placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} onClick={() => setError(false)} />
             <br /><br />
            <input
            style={{height:"40px",padding:"7px",width:"100%"}}
            className='input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} onClick={() => setError(false)} />
            <br /><br />
            <button className='btn btn-primary' style={{width:"100%"}}
             onClick={() => { handleClick() }}
             >{ loading ? <img src={spinner} width={"25px"}/> :  'Sign in' } </button>
            {error && <p style={{textAlign:"center",marginTop:"5px"}}>Wrong email and password</p>}
        </div>
        </div>
    )
}

export default SignIn
