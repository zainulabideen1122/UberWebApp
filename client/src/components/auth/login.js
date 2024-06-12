import "./index.css"
import loginPic from "../../media/login_pic.jpg"
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../responsive.css'



function Login() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [user, setUser] = useState();
    function getLoginCredentials(e){
    
        const cred = {[e.target.id]: e.target.value}
        setCredentials((prevCreds) => ({...prevCreds, ...cred}))

    }

    const login = ()=>{
        axios.post('http://localhost:3001/auth/login', credentials)
        .then(res=>{
            localStorage.setItem('token', res.data)
            navigate('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }


    const googleAuth = async (data)=>{
        await axios.post('http://localhost:3001/auth/googleAuth', data)
        .then(res=>{
            console.log("=>\n",res)
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

    

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            console.log(codeResponse);
            getDataFromGoogle(codeResponse.access_token)
           
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return ( 
        <>
            <div className="loginContainer">
                <img className="loginPagePic" src={loginPic}/>
                <div className="loginContent">

                    <h1>Login</h1>
                    <div className="loginFields">
                        <input type="text" placeholder="Email" id="email" onChange={getLoginCredentials}/>
                        
                        <input type="password" id="password" placeholder="Password" onChange={getLoginCredentials} />
                       
                       <button className="loginBtn" onClick={login} >Login</button>

                        <p className="orBreak">Or</p>

                        <button className="googleLoginBtn" onClick={() => googleLogin()}>Sign in with Google 🚀 </button>

                        <h4 className="newToUber">New to Uber? <span onClick={()=>{navigate('/auth/register')}}>Register Now</span></h4>
                    </div>

                </div>
            </div>
        </>
     );
}

export default Login;