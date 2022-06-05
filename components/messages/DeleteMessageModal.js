import { useState } from "react";
import Alert from "../Alert";
import axios from "axios";
import {CheckCircle,XCircle} from 'react-feather';

import dayjs from "dayjs";
import id from "dayjs/locale/id";
import relativeTime from 'dayjs/plugin/relativeTime';

const DeleteMessageModal = (props) => {
    const [isLoading,setIsLoading]=useState(false);
    const [isLoadingDeleteEmail,setIsLoadingDeleteEmail]=useState(false);
    
    const [msg,setMsg]=useState([]);
    
    dayjs.locale(id);
    dayjs.extend(relativeTime)

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            await axios.delete(`message-list/${props.data.id}`)
            .then((response)=>{
                props.setShow(false);
                props.getData();
                props.setData([])
                props.setMsg({
                    status:'success',
                    msg:response.data.message
                });
                setIsLoading(false);

            })
        }catch(error){
            setIsLoading(false);
            if(error.response){
                setMsg({
                    status:'error',
                    msg:error.response.data.message
                });
            }else{
                setMsg({
                    status:'error',
                    msg:error.message
                });
            }
        }

    }

    const handleDeleteEmail=async()=>{
        setIsLoadingDeleteEmail(true);
        try{
            await axios.delete(`email-list/${props.data.email_from_id}`)
            .then((response)=>{
                props.setShow(false);
                props.getData();
                props.setData([])
                props.setMsg({
                    status:'success',
                    msg:response.data.message
                });
                setIsLoadingDeleteEmail(false);

            })
        }catch(error){
            setIsLoadingDeleteEmail(false);
            if(error.response){
                setMsg({
                    status:'error',
                    msg:error.response.data.message
                });
            }else{
                setMsg({
                    status:'error',
                    msg:error.message
                });
            }
        }

    }

    const handleClose=async()=>{
        props.setShow(false);
        props.setData([]);
    }
    return (
        <>
            {props.show&&(
            <form onSubmit={(e)=>handleSubmit(e)}>
                    <div id="publishModal" className="d-flex justify-content-center align-items-start" style={{position:'fixed',zIndex:'3000',top:'56px',left:'0',width:'100%',maxWidth:'100%',height:'100%',backgroundColor:'rgba(33,37,41,0.5)'}}>
                        <div className="modal-dialog flex-sm-fill" style={{minWidth:'50%'}}>
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Delete Message</h5>
                                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <Alert status={msg.status} msg={msg.msg}/>
                                    <div className="form-floating mb-3">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>Dari</th>
                                                    <th>Tanggal</th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {props.data.email_list.email}
                                                        {props.data.email_list.verified==="1"?(<CheckCircle className="text-success"/>):(<XCircle className="text-danger"/>)}
                                                    </td>
                                                    <td>{dayjs(props.data.created_at).fromNow()}</td>
                                                </tr>
                                                <tr>
                                                    <th colSpan="2">
                                                        Subject
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2">
                                                        {props.data.subject}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colSpan="2">
                                                        Message
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2">
                                                        {props.data.message}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button onClick={()=>handleDeleteEmail()} type="button" className="btn btn-danger" disabled={isLoadingDeleteEmail}>
                                    {isLoadingDeleteEmail && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Hapus Email dan Pesan
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                    {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Hapus Pesan
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                    
            </form>
            )}
        </>
    )
}

export default DeleteMessageModal