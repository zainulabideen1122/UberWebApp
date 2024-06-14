
import './index.css'; // Import the CSS file
import landingPageImage from '../../media/landingPagePic.webp'
import landingUberLogo from '../../media/uberLandingLogo.webp'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function LandingPage() {
    

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(token)
            {
                navigate('/')
            }
        else
        {
            navigate('/landing')
        }
    }, [])

    return (
        <div style={{overflow:"hidden"}}>
            <div className='landingPageLogo'>
                <img src={landingUberLogo} />
                <div className='landingLogoBtns'>
                    <button className='landingLoginBtn' onClick={()=>navigate('/auth/login')}>Log in</button>
                    <button className='landingSignupBtn' onClick={()=>navigate('/auth/register')}>Sign Up</button>
                </div>
            </div>
            <div className='landingPage'>
                <div className='landingPageImg'>
                    <img src={landingPageImage} />
                </div>
                <div className='landingPageContent'>
                    <div className='landingContent'>
                        <h1>Go anywhere with <br></br>Uber</h1>
                        <p>Request a ride, get in and go</p>
                        <button className='getStartedBtn' onClick={()=>{if(!token){navigate('/auth/login')}else{navigate('/')}}}>Get Started<span><FaArrowRightLong /></span></button>
                    </div>
                </div>
            </div>
        
        </div>

    );
}

export default LandingPage;
