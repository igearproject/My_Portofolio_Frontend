import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import CryptoJS from "crypto-js";

import supportError from "../services/supportError";

const MainLayout = (props) => {
	const [user,setUser]=useState([]);
	const [isAuth,setIsAuth]=useState(false);
	const [tokenApp,setTokenApp]=useState('');
	const router = useRouter();
	const key=process.env.NEXT_PUBLIC_FRONTEND_SECRET_KEY;
	const baseUrl=process.env.NEXT_PUBLIC_SERVER_URL_API;

	useEffect(()=>{
		getUser()
	},[]);

	const getUser=()=>{
		try{
			const encryptToken=localStorage.getItem('token');
			const realToken=CryptoJS.AES.decrypt(encryptToken,key).toString(CryptoJS.enc.Utf8);
			const bearer=`Bearer ${realToken}`
			axios.defaults.headers.common['Authorization'] =bearer;
			axios.get(`${baseUrl}auth/me`,{
				headers:{
					Authorization:bearer
				}
				
			})
			.then((response)=>{
				setUser(response.data);
				setIsAuth(true);
				if(props.setToken){
					props.setToken(bearer);
				}
				setTokenApp(bearer);	
			}).catch(err=>{
                console.log(supportError.getData('component',err));
            });
			
		}catch(error){
			setUser([]);
			setIsAuth(false);
			if(error.status===401||error.status===403){
				router.push('/login');
			}
		}
	}

	return (
		<>
		<Navbar user={user} isAuth={isAuth} token={tokenApp} />
		<div className="container-fluid px-0">
			<div className="d-flex flex-row" style={{maxWidth:'100%',padding:0}}>
			<Sidebar/>
			<div className="flex-grow-1 px-3 bg-light" style={{paddingTop:'80px',minHeight:'100vh'}}>
				{props.children}
			</div>
			</div>
		</div>
		
		</>
	);
}

export default MainLayout;