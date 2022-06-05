import Link from "next/link";
import Head from "next/head";
import { useRouter } from 'next/router';
import axios from "axios";
import { useState } from "react";
import Alert from "../components/Alert";
import CryptoJS from "crypto-js";

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const [loading,setLoading]=useState(false);
    const [dataMsg,setDataMsg]=useState([]);
 
    
    const key=process.env.NEXT_PUBLIC_FRONTEND_SECRET_KEY;
 
    const router = useRouter();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('auth/login',{
                email:email,
                password:password
            })
            .then((response)=>{
                e.target.reset();
                const encrptToken=CryptoJS.AES.encrypt(response.data.token, key);
                localStorage.setItem('token',encrptToken);
                setDataMsg({
                    status:'success',
                    msg:response.data.message
                });
                setLoading(false);
                router.push('/dashboard/home');
            });

        }catch(error){
            
            if(error.response){
                setDataMsg({
                    status:'error',
                    msg:error.response.data.message
                });
            }else{
                setDataMsg({
                    status:'error',
                    msg:error.message
                });
            }
            setLoading(false);            
        }

    }
    return (
        <main>
            <Head>
                <title>Login - GedeArya</title>
            </Head>
            <div className="container container-sm">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-5">
                        <div className="card mt-5 shadow">
                            <div className="card-body">
                                <h1 className="display-6">Login</h1>
                                <hr className="mb-4"/>
                                <Alert status={dataMsg.status} msg={dataMsg.msg}/>
                                <form onSubmit={(e)=>handleSubmit(e)}>
                                    <div className="mb-3">
                                        <input type="email" onChange={(e)=>setEmail(e.target.value)} required className="form-control" placeholder="name@example.com"/>
                                    </div>
                                    <div className="mb-4">
                                        <input type="password" onChange={(e)=>setPassword(e.target.value)} required className="form-control" minLength="6" placeholder="password"/>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        
                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                            Login
                                        </button>
                                        <Link href="/register" passHref><button className="btn btn-link">Create new account</button></Link>
                                    </div>
                                    
                                </form>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Login