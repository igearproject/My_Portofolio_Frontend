import { useState } from "react";
import Alert from "../../Alert";
import axios from "axios";

const DeleteComponentModal = (props) => {
    const [isLoading,setIsLoading]=useState(false);
    const [isLoadingDeleteAll,setIsLoadingDeleteAll]=useState(false);
    const [msg,setMsg]=useState([]);
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            // await axios.delete(`components/${props.data.id}?all=true`)
            await axios.delete(`components/${props.data.id}?page=${props.pageId}`)
            .then((response)=>{
                props.getData();
                props.setData([])
                props.setMsg({
                    status:'success',
                    msg:response.data.message
                });
                props.setShow(false);
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

    const handleSubmitDeleteAll=async()=>{
        setIsLoadingDeleteAll(true);
        try{
            await axios.delete(`components/${props.data.id}?all=true`)
            .then((response)=>{
                props.getData();
                props.setData([])
                props.setMsg({
                    status:'success',
                    msg:response.data.message
                });
                props.setShow(false);
                setIsLoadingDeleteAll(false);

            })
        }catch(error){
            setIsLoadingDeleteAll(false);
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
                                <h5 className="modal-title" id="staticBackdropLabel">Delete Component</h5>
                                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <Alert status={msg.status} msg={msg.msg}/>
                                
                                    <div className="form-floating mb-3">
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            maxLength="255"
                                            id="name"
                                            value={props.data.name?(props.data.name):('')}
                                            disabled={true}
                                        />
                                        <label className="form-check-label" htmlFor="Publish" >Nama component</label>
                                    </div>
                                    
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-danger" disabled={isLoadingDeleteAll} onClick={handleSubmitDeleteAll}>
                                {isLoadingDeleteAll && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Hapus Component Permanent
                                </button>
                                <button type="submit" className="btn btn-warning" disabled={isLoading}>
                                    {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Hapus Dari Page Ini
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

export default DeleteComponentModal