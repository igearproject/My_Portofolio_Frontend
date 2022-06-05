import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import Alert from "../components/Alert";

const Register = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    
    const [loading,setLoading]=useState(false);
    const [dataMsg,setDataMsg]=useState([]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('auth/register',{
                name:name,
                email:email,
                password:password,
                confirm_password:confirmPassword
            })
            .then((response)=>{
                e.target.reset();

                setDataMsg({
                    status:'success',
                    msg:response.data.message
                });
                setLoading(false);
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
                <title>Register - GedeArya</title>
            </Head>
            <div className="container container-sm">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                        <div className="card mt-5 shadow">
                            <div className="card-body">
                                <h1 className="display-6">Register</h1>
                                <hr className="mb-4"/>
                                <Alert status={dataMsg.status} msg={dataMsg.msg}/>
                                <form onSubmit={(e)=>handleSubmit(e)}>
                                    <div className="mb-3  ">
                                        {/* <label for="name" class="form-label">Name</label> */}
                                        <input type="text" onChange={(e)=>setName(e.target.value)} id="name" required className="form-control" placeholder="Name"/>
                                    </div>
                                    <div className="mb-3 ">
                                        {/* <label for="email" class="form-label">Email</label> */}
                                        <input type="email" onChange={(e)=>setEmail(e.target.value)} id="email" required className="form-control" placeholder="Email name@example.com"/>
                                    </div>
                                    <div className="mb-3 ">
                                        {/* <label for="password" class="form-label">Password</label> */}
                                        <input type="password" onChange={(e)=>setPassword(e.target.value)} id="password" required className="form-control" minLength="6" placeholder="Password"/>
                                    </div>
                                    <div className="mb-4 ">
                                        {/* <label for="confirm_password" class="form-label">Confirm Password</label> */}
                                        <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} id="confirm_password" required className="form-control" minLength="6" placeholder="Confirm password"/>
                                    </div>
                                    <p>
                                        <small>
                                            Creating an account means agreeing to our service policy
                                        </small>
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                            Register
                                        </button>
                                        <Link href="/login" passHref><button className="btn btn-link">Login</button></Link>
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

export default Register