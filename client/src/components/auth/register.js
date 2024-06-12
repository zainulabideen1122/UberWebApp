import "./index.css"
import loginPic from "../../media/login_pic.jpg"
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Register() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [user, setUser] = useState();
    function getLoginCredentials(e){
    
        const cred = {[e.target.id]: e.target.value}
        setCredentials((prevCreds) => ({...prevCreds, ...cred}))

    }


    const googleAuth = async (data)=>{
        await axios.post('http://localhost:3001/auth/googleAuth', data)
        .then(res=>{
            localStorage.setItem('token',res.data)
            navigate('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }

    function getDataFromGoogle(access_token)
    {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,{
                    headers:{
                        Authorization:`Bearer:${access_token}`,
                        Accept:'application/json'
                    }
                })
                .then((res)=>{
                    console.log(res)
                    const data = 
                    {
                        email : res.data.email,
                        name: res.data.name
                    }
                    googleAuth(data)

                })
                .catch((e)=>{
                    console.log(e)
                })
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            console.log(codeResponse);
            getDataFromGoogle(codeResponse.access_token);
        },
        onError: (error) => console.log('Login Failed:', error)
    });


    const registerUser = ()=>{
        axios.post('http://localhost:3001/auth/register',credentials)
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem('token', res.data)
            navigate('/')
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return ( 
        <>
            <div className="loginContainer">
                <img className="loginPagePic" src={loginPic}/>
                <div className="loginContent">

                    <h1>Register</h1>
                    <div className="loginFields">
                        <input type="text" placeholder="Name" id="name" onChange={getLoginCredentials}/>
                        <input type="text" placeholder="Email" id="email" onChange={getLoginCredentials}/>
                        <input type="password" id="password" placeholder="Password" onChange={getLoginCredentials} />
                       
                       <button className="loginBtn" onClick={registerUser} >Register</button>

                        <p className="orBreak">Or</p>

                        <button className="googleLoginBtn" onClick={() => login()}>Sign up with Google 🚀 </button>

                        <h4 className="newToUber">Already have an account? <span onClick={()=>{navigate('/auth/login')}}>Login Now</span></h4>
                    </div>

                </div>
            </div>
        </>
     );
}

export default Register;