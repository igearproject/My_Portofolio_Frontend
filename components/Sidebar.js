import {FileText,Image as ImageIcon,Layers,Mail,MessageCircle} from 'react-feather';
import ReactTooltip from 'react-tooltip';
import { useState,useEffect } from 'react';
import Link from 'next/link';

const Sidebar = () => {
    const [isMounted,setIsMounted] = useState(false); // Need this for the react-tooltip

    useEffect(() => {
        setIsMounted(true);
    },[]);

    return (
        <div className="p-0 " >
            <div className="card text-dark bg-light rounded-0 "  style={{height:'100%',width:'60px'}}>
                <div className="card-body p-0 pt-3">
                    <ul className="nav flex-column sticky-top" style={{paddingTop:'56px',width:'60px'}}>
                        <li className="nav-item " >
                            <Link href="/dashboard/home">
                                <a 
                                    className="nav-link link-dark" 
                                    aria-current="page"
                                    data-tip="Pages"
                                >
                                    <FileText/> 
                                </a>
                            </Link>
                            {isMounted && <ReactTooltip place="right" type="dark" effect="solid"/>}
                        </li>
                        <li className="nav-item">
                            <a 
                                className="nav-link link-dark" 
                                href="#"
                                data-tip="Components (upcoming)"
                            >
                                <Layers/> 
                            </a>
                            {isMounted && <ReactTooltip place="right" type="dark" effect="solid"/>}
                        </li>
                        <li className="nav-item">
                            <a 
                                className="nav-link link-dark" 
                                href="#"
                                data-tip="Comments (upcoming)"
                            >
                                <MessageCircle/> 
                            </a>
                            {isMounted && <ReactTooltip place="right" type="dark" effect="solid"/>}
                        </li>
                        <li className="nav-item">
                            <Link href="/dashboard/message/">
                                <a 
                                    className="nav-link link-dark" 
                                    href="#"
                                    data-tip="Email"
                                >
                                    <Mail/> 
                                </a>
                            </Link>
                            {isMounted && <ReactTooltip place="right" type="dark" effect="solid"/>}
                        </li>
                        <li className="nav-item">
                            <Link href="/dashboard/images">
                                <a 
                                    className="nav-link link-dark" 
                                    href="#"
                                    data-tip="Media"
                                >
                                    <ImageIcon/> 
                                </a>
                            </Link>
                            {isMounted && <ReactTooltip place="right" type="dark" effect="solid"/>}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar