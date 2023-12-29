import './Register.css';

import RegisterBg from '../img/RegisterBg.svg';
import BrandName from '../img/BrandName.svg';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SignInUser } from '../server/supabaseConfig';

function LogIn() {
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const [ErrorText, setErrorText] = useState({className: 'NotVisible', ActualText: 'None'})

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        SignInUser(Email, Password).then((bool) => {
            if (bool) {
                navigate('/dashboard')
            } else {
                setErrorText({className: 'Visible', ActualText: 'Specified user does not exist...'})
            }
        })
    }

    return (
        <div className='RegisterContainer'>
            <div className='RegisterComponent LeftSide'>
                <img alt='registerBg' src={RegisterBg}/>
            </div>
            <div className='RegisterComponent RightSide'>
                <img alt='brandname' src={BrandName}/>
                <div className='RightSideTitle'>
                    Welcome Back!
                </div>                
                <form className='RightSideForm'>
                    <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                    <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                    <button onClick={handleSubmit}>Log In</button>
                </form>
                <div className='RightSideLinkToAnotherPage'>
                    Don't have an account? <a href='/signup'>Sign Up</a>
                </div>
                <div className={`RightSideError ${ErrorText.className}`}>
                    {ErrorText.ActualText}
                </div>
            </div>
        </div>
    )
}

export default LogIn