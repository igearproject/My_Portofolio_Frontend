import {useState } from "react";
import Alert from "../Alert";
import fileUploadService from "../../services/fileUploadService";
import Image from "next/image";
import { Code, Trash, Copy } from "react-feather";
import ToastAlert from "../ToastAlert";

const ShowImageModal = (props) => {
    const [isLoading,setIsLoading]=useState(false);
    const [msg,setMsg]=useState([]);
    const [toastMsg,setToastMsg]=useState([]);
    
    const deleteImage=async(event)=>{
        event.preventDefault();
        setIsLoading(true);
        setMsg([]);
        fileUploadService.delete(props.showData.id,props.token)
        .then((response) => {
            props.setMsg({
                status:'success',
                msg:response.data.message
            });
            setIsLoading(false);
            props.getData();
            props.setShowData([]);
            props.setShow(false);

        })
        .catch((error) => {
            console.log(error.message);
            setMsg({
                status:'error',
                msg:'Delete gambar gagal'
            });
            setIsLoading(false);
        });
        
    }  

    const CopyToClipboard=async(text)=>{
        if ('clipboard' in navigator) {
            setToastMsg({
                status:'success',
                msg:'Link berhasil di copi'
            });
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }
    
    
  return (
    <>
        {props.show&&(
        <form onSubmit={(e)=>deleteImage(e)}>
                <div id="publishModal" className="d-flex justify-content-center align-items-start" style={{position:'fixed',zIndex:'9999',top:'56px',left:'0',width:'100%',maxWidth:'100%',height:'100%',backgroundColor:'rgba(33,37,41,0.5)'}}>
                    <div className="modal-dialog flex-sm-fill" style={{minWidth:'50%'}}>
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Lihat Detail Gambar</h5>
                            <button type="button" className="btn-close" onClick={()=>props.setShow(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {msg&&(
                                <Alert status={msg.status} msg={msg.msg}/>
                            )}
                            {toastMsg&&(
                                <ToastAlert status={toastMsg.status} msg={toastMsg.msg} setMsg={setToastMsg} autoClose={true}/>
                            )}
                            <div className="mb-3 img-fluid" style={{maxHeight:"200px",position:'relative'}}>
                                <Image 
                                    // layout="responsive" 
                                    layout="fixed" 
                                    width="250px" 
                                    height="250px" 
                                    objectFit="contain"
                                    src={process.env.NEXT_PUBLIC_SERVER_IMAGE_URL+props.showData.name_file} 
                                />
                            </div>
                            <div className="form-floating mb-3">
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    maxLength="255"
                                    id="alt"
                                    value={props.showData.alt_text}
                                    // onChange={(e)=>setAlt(e.target.value)}
                                    placeholder="Tulis text alternatif untuk gambar ini"
                                    disabled
                                />
                                <label className="form-check-label" htmlFor="Publish" >Alt Text</label>
                            </div>
                            <div className="input-group mb-3">
                                <button className="btn btn-primary" onClick={()=>CopyToClipboard(process.env.NEXT_PUBLIC_SERVER_IMAGE_URL+props.showData.name_file)} type="button" id="button-addon1"><Copy/></button>
                                <input 
                                    type="text" 
                                    value={process.env.NEXT_PUBLIC_SERVER_IMAGE_URL+props.showData.name_file} 
                                    disabled
                                    className="form-control" 
                                    placeholder="" 
                                    aria-label="Link image from server" 
                                    aria-describedby="button-addon1"
                                />
                            </div>                             
                            
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-danger" disabled={isLoading}>
                                {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} <Trash/>
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

export default ShowImageModal