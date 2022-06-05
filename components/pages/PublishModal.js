import { useEffect, useState } from "react";
import Alert from "../Alert";
import axios from "axios";
import dayjs from "dayjs";
// import id from "dayjs/locale/id";

const PublishModal = (props) => {
    // const [publish,setPublish]=useState(props.publish);
    // const [publishTime,setPublishTime]=useState(props.publishTime);
    const [isLoadingPublish,setIsLoadingPublish]=useState(false);
    const [msg,setMsg]=useState([]);
    
    const handleSubmitPublish=async(e)=>{
        e.preventDefault();
        setIsLoadingPublish(true);
        try{
            await axios.put(`pages/${props.id}`,{
                publish:props.publish,
                publish_time:dayjs(props.publishTime).format('YYYY-MM-DD HH:mm:ss')
            }).then((response)=>{
                props.getData();
                props.setMsg({
                    status:'success',
                    msg:response.data.message
                });
                props.setShow(false);
                setIsLoadingPublish(false);

            })
        }catch(error){
            setIsLoadingPublish(false);
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
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setMsg([])
    //     },[3000])
    // },[msg])
  return (
    <>
        {props.show&&(
        <form onSubmit={(e)=>handleSubmitPublish(e)}>
                <div id="publishModal" className="d-flex justify-content-center align-items-start" style={{position:'fixed',zIndex:'9999',top:'56px',left:'0',width:'100%',maxWidth:'100%',height:'100%',backgroundColor:'rgba(33,37,41,0.5)'}}>
                    <div className="modal-dialog flex-sm-fill" style={{minWidth:'50%'}}>
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Buat Page Baru</h5>
                            <button type="button" className="btn-close" onClick={()=>props.setShow(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Alert status={msg.status} msg={msg.msg}/>
                            
                                <div className="form-check form-switch mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        role="switch" 
                                        id="Publish"
                                        checked={props.publish=="1"?(true):(false)}
                                        onChange={(e)=>{if(e.target.checked){props.setPublish("1")}else{props.setPublish("0")}}}
                                        // defaultChecked={props.publish=="1"?(true):(false)}
                                        // onChange={(e)=>{setPublish(e.target.checked)}}
                                    />
                                    <label className="form-check-label" htmlFor="Publish" >Publish</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="datetime-local"
                                        defaultValue={dayjs(props.publishTime).format('YYYY-MM-DDThh:mm')}
                                        onChange={(e)=>props.setPublishTime(e.target.value)} 
                                        id="Tanggal" 
                                        required 
                                        className="form-control" 
                                    />
                                    <label htmlFor="Tanggal" className="form-label">Tanggal Publish</label>
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" disabled={isLoadingPublish}>
                                {isLoadingPublish && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Publish
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

export default PublishModal