import { useState,useEffect} from "react";
import MainLayout from "../../../layout/MainLayout";
import { CheckCircle, Trash, XCircle } from "react-feather";
import ReactTooltip from 'react-tooltip';
import axios from "axios";

import dayjs from "dayjs";
import id from "dayjs/locale/id";
import relativeTime from 'dayjs/plugin/relativeTime';

import Alert from "../../../components/Alert";
// import Link from "next/link";
import DeleteMessageModal from "../../../components/messages/DeleteMessageModal";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import supportError from "../../../services/supportError";

const Message=()=>{

    const [msg,setMsg]=useState('');
    const [token,setToken]=useState(null);
    const [isLoading,setIsLoading]=useState(true);

    const [messages,setMessages]=useState([]);
    // const [emails,setEmails]=useState('');

    dayjs.locale(id);
    dayjs.extend(relativeTime)

    const [openDeleteModal,setOpenDeleteModal]=useState(false);
    const [dataDelete,setDataDelete]=useState([]);
    const handleOpenDeleteModal=async(data)=>{
        setOpenDeleteModal(true);
        setDataDelete(data);
    }

    const [isMounted,setIsMounted] = useState(false); // Need this for the react-tooltip
    

    const getData=()=>{
        setIsLoading(true);
        try{
            axios.get(`message-list`)
            .then((response)=>{
                const data=response.data.data.data;
                // console.log(data);
                setMessages(data);
            }).catch(err=>{
                setMsg(supportError.getData('message',err));
            });
            setIsLoading(false);
            
        }catch(error){
            setMsg({
                status:'error',
                msg:error.message
            })
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
    
    return (
        <MainLayout setToken={setToken}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-3 ">Message List</h1>
                {/* <div>
                    <button className="btn btn-primary shadow" data-tip="Buat Page Baru" data-for='addpage'  onClick={()=>setshowModalAdd(true)}><Plus /></button>
                    {isMounted && <ReactTooltip id="addpage" place="left" type="info" effect="solid" backgroundColor="#0d6efd" textColor="white"/>}
                </div> */}
            </div>
            <Alert status={msg.status} msg={msg.msg}/>
            <div className="table-responsive bg-white p-3 rounded-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Tgl</th>
                            <th scope="col">Email</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Message</th>
                            <th scope="col">Untuk</th>
                            <th scope="col">Menu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading?(
                            <>
                                {[...Array(5)].map((x, i) => {
                                    return (
                                        <tr key={i}>
                                            <td><Skeleton/></td>
                                            <td><Skeleton/></td>
                                            <td><Skeleton/></td>
                                            <td><Skeleton/></td>
                                            <td><Skeleton/></td>
                                            <td><Skeleton/></td>
                                            <td><Skeleton/></td>
                                        </tr>
                                    )}
                                )}
                               
                            </>
                        ):(
                            <>
                            {messages.map((data,index)=>{
                                return(
                                    <tr key={index}>
                                        <td scope="row">{dayjs(data.created_at).fromNow()}</td>
                                        <td>{data.email_list.email}{data.email_list.verified==="1"?(<CheckCircle className="text-success"/>):(<XCircle className="text-danger"/>)}</td>
                                        <td>{data.email_list.name}</td>
                                        <td>{data.subject}</td>
                                        <td>{data.message}</td>
                                        <td>{data.email_to}</td>
                                        <td>
                                            <div className="d-flex justify-content-start">
                                                {/* <Link href={`/dashboard/pages/${page.id}`}>
                                                    <a className="btn btn-light btn-sm me-1" data-tip="Edit Page" data-for='editpage'><Edit2/></a>
                                                </Link>
                                                {isMounted && <ReactTooltip id="editpage" place="bottom" type="success" effect="solid" textColor='white' backgroundColor='#198754' className="tooltip-extra"/>}
                                             */}
                                                <button onClick={()=>handleOpenDeleteModal(data)} className="btn btn-light btn-sm"  data-tip="Hapus Page" data-for='deletepage' ><Trash/></button>
                                                {isMounted && <ReactTooltip id="deletepage" place="bottom" type="error" effect="solid"  textColor='white' backgroundColor='#dc3545' className="tooltip-extra"/>}
                                                
                                            </div>
                                        </td>
                                    </tr>
                                )})
                            }
                            </>
                        )}
                        
                    </tbody>
                </table>
            </div>
            <DeleteMessageModal
                data={dataDelete}
                setData={setDataDelete}
                show={openDeleteModal} 
                setShow={setOpenDeleteModal} 
                getData={getData}
                setMsg={setMsg}
            />
        </MainLayout>
    );
}

export default Message;