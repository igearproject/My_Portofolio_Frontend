import { useState,useEffect} from "react";
import MainLayout from "../../../layout/MainLayout";
import {Trash, UploadCloud} from "react-feather";
import ReactTooltip from 'react-tooltip';
import axios from "axios";

import dayjs from "dayjs";
import id from "dayjs/locale/id";
import relativeTime from 'dayjs/plugin/relativeTime';

import Alert from "../../../components/Alert";
// import DeleteMessageModal from "../../../components/files/DeleteMessageModal";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AddImageModal from "../../../components/images/AddImageModal";
import ShowImageModal from "../../../components/images/ShowImageModal";

import fileUploadService from "../../../services/fileUploadService";
import Image from "next/image";

import supportError from "../../../services/supportError";

const Images=()=>{
    const [msg,setMsg]=useState('');
    const [token,setToken]=useState(null);
    const [isLoading,setIsLoading]=useState(true);

    const [files,setFiles]=useState([]);
    // const [emails,setEmails]=useState('');

    dayjs.locale(id);
    dayjs.extend(relativeTime)

    const [openShowModal,setOpenShowModal]=useState(false);
    const [showData,setShowData]=useState([]);
    const handleOpenShowModal=async(data)=>{
        setOpenShowModal(true);
        setShowData(data);
    }

    const [openAddModal,setOpenAddModal]=useState(false);
    const handleOpenAddModal=async()=>{
        setOpenAddModal(true);
    }

    const [isMounted,setIsMounted] = useState(false); // Need this for the react-tooltip
    

    const getData=()=>{
        setIsLoading(true);
        try{
            fileUploadService.get(token)
            .then((response)=>{
                const data=response.data.data.data;
                // console.log(data);
                setFiles(data);
            }).catch(err=>{
                setMsg(supportError.getData('image',err));
            });
            setIsLoading(false);
            
        }catch(error){
            
            setMsg({
                status:'error',
                msg:error.message
            });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    },[]);

    useEffect(()=>{
        if(token){
            getData();
        }
    },[token]);

    // const myImageLoader = ({ src, quality }) => {
    //     return src+`?w=1080&q=${quality || 75}`
    // }

    
    return (
        <MainLayout setToken={setToken}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-3 ">Images</h1>
                <div>
                    <button onClick={handleOpenAddModal} className="btn btn-primary shadow" data-tip="Upload File Baru" data-for='addpage'><UploadCloud /></button>
                    {isMounted && <ReactTooltip id="addpage" place="left" type="info" effect="solid" backgroundColor="#0d6efd" textColor="white"/>}
                </div>
            </div>
            <Alert status={msg.status} msg={msg.msg}/>
            <div className="row">
                {isLoading?(
                    <>
                        {[...Array(6)].map((x, i) => {
                            return (
                                <div key={i} className="col-md-4 mb-3"><Skeleton style={{minHeight:"250px"}}/></div>
                            )}
                        )}
                        
                    </>
                ):(
                    <>
                    {files.map((data,index)=>{
                        return(
                            <div className="col-md-4" key={index} >
                                <div className="rounded img-thumbnail" >
                                    {index===0?(
                                        <Image 
                                            layout="responsive" 
                                            width="100%" 
                                            height="100%" 
                                            src={process.env.NEXT_PUBLIC_SERVER_IMAGE_URL+data.name_file} 
                                            priority
                                            onClick={()=>handleOpenShowModal(data)}
                                        />
                                    ):(
                                        <Image 
                                            layout="responsive" 
                                            width="100%" 
                                            height="100%" 
                                            src={process.env.NEXT_PUBLIC_SERVER_IMAGE_URL+data.name_file} 
                                            onClick={()=>handleOpenShowModal(data)}
                                        />
                                    )}
                                    
                                </div>
                            </div>
                        )})
                    }
                    
                    </>
                )}
            </div>
            <AddImageModal
                show={openAddModal} 
                setShow={setOpenAddModal} 
                getData={getData}
                setMsg={setMsg}
                token={token}
            />
            <ShowImageModal
                showData={showData}
                setShowData={setShowData}
                show={openShowModal} 
                setShow={setOpenShowModal} 
                getData={getData}
                setMsg={setMsg}
                token={token}
            />
        </MainLayout>
    );
}

export default Images;