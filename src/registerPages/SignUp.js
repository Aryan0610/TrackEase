import './Register.css';

import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import RegisterBg from '../img/RegisterBg.svg';
import BrandName from '../img/BrandName.svg';

import { CreateUser } from '../server/supabaseConfig';

function SignUp() {
    const [Username, setUsername] = useState()
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const [ConfirmPassword, setConfirmPassword] = useState()
    const [ErrorText, setErrorText] = useState({className: 'NotVisible', ActualText: 'None'})

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Password !== ConfirmPassword) {
            setErrorText({className: 'Visible', ActualText: 'Passwords Do Not Match'})
        } else if (Password.length <= 7) {
            setErrorText({className: 'Visible', ActualText: 'Passwords should have atleast 8 characters'})
        } else {
            CreateUser(Username, Email, Password).then((bool) => {
                if (bool) {
                    navigate('/dashboard')
                } else {
                    setErrorText({className: 'Visible', ActualText: 'Specified user does not exist...'})
                }
            })
        }
    }

    return (
        <div className='RegisterContainer'>
            <div className='RegisterComponent LeftSide'>
                <img alt='registerBg' src={RegisterBg}/>
            </div>
            <div className='RegisterComponent RightSide'>
                <img alt='brandName' src={BrandName}/>
                <div className='RightSideTitle'>
                    Create Your Account!
                </div>                
                <form className='RightSideForm'>
                    <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} required/>
                    <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                    <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                    <input type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    <button onClick={handleSubmit}>Sign Up</button>
                </form>
                <div className='RightSideLinkToAnotherPage'>
                    Already have an account? <a href='/login'>Log In</a>
                </div>
                <div className={`RightSideError ${ErrorText.className}`}>
                    {ErrorText.ActualText}
                </div>
            </div>
        </div>
    )
}

export default SignUp