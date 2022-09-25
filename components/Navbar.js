import Link from "next/link";
import { User } from "react-feather";
import { useRouter } from 'next/router';
import axios from "axios";

const Navbar = (props) => {
    const router = useRouter();
    const handleLogout=async ()=>{
        try{
			axios.post('auth/logout',{
				headers:{
					Authorization:`${props.token}`
				}
				
			}).then((response)=>{
                console.log('Response : ',response);
                localStorage.removeItem('token');
                router.push('/login');
            })
			
		}catch(error){
			console.log('Logout error : ',error.message);
            if(error.response){
    			console.log('Logout error response: ',error.response.data.message);
            }
		}
    }
    const UserMenu=()=>{
        return (
            <>
                <a className="nav-link link-light dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <User size={16} /> {props.user.name}
                </a>
                <ul className="dropdown-menu zindex-popover" aria-labelledby="profileDropdown" style={{left:'auto',right:'24px'}}>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Change password</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
            </>
        )
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                
                <Link href="/" ><a className=" navbar-brand my-auto">Gede_arya</a></Link>
                <div className="d-flex d-lg-none d-block">
                    {props.isAuth===false?(
                        <Link href="/register" passHref>
                            <button className="btn btn-primary me-3">Register</button>
                        </Link>
                    ):(
                        <UserMenu/>
                    )}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                        <Link href="/">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </Link>
                        </li> */}
                        {/* <li className="nav-item">
                        <a className="nav-link " href="#">Link</a>
                        </li> */}
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Home
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link href="/" passHref >
                                <li><a className="dropdown-item" href="#">Prod home</a></li>
                            </Link>
                            <Link href="/preview-home" passHref >
                                <li><a className="dropdown-item" href="#">Dev home</a></li>
                            </Link>
                            {/* <li><a className="dropdown-item" href="#"> action</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                        </ul>
                        </li>
                        {/* <li className="nav-item">
                        <a className="nav-link disabled">Disabled</a>
                        </li> */}
                    </ul>
                    <div className="d-flex justify-content-sm-between justify-content-md-between">
                        { props.isAuth === false ? (
                            <>
                            <Link href="/login" passHref>
                                <button className="btn btn-outline-light me-2 ">Login</button>
                            </Link>
                            <Link href="/register" passHref>
                                <button className="btn btn-primary d-none d-lg-block">Register</button>
                            </Link>
                            </>
                        ):(
                            <div className="d-flex d-none d-lg-block">
                                <UserMenu/>
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar