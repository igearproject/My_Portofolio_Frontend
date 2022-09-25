import { useEffect, useState } from "react";
import Alert from "../Alert";
import fileUploadService from "../../services/fileUploadService";

const AddImageModal = (props) => {
    const [name,setName]=useState('');
    const [alt,setAlt]=useState('');
    const [selectedFile,setSelectedFile]=useState('');
    const [progress,setProgress]=useState(0);
    const [fileInfo,setFileInfo]=useState([]);

    const [isLoading,setIsLoading]=useState(false);
    const [msg,setMsg]=useState([]);

    const uploadImage=async(event)=>{
        event.preventDefault();
        setIsLoading(true);
        setProgress(0);
        setMsg([]);
        fileUploadService.upload(selectedFile,alt,(e)=>{
            let percentComplete = e.loaded / e.total;
            percentComplete = parseInt(percentComplete * 100);
            // console.log(percentComplete);
            setProgress(percentComplete);
        },props.token)
        .then((response) => {
            setMsg({
                status:'success',
                msg:response.data.message
            });
            setAlt('')
            setSelectedFile('0')
            event.target.reset();
            setIsLoading(false);
            props.getData();
            setFileInfo(response.data.name_file)
            props.setShow(false);

        })
        .catch((error) => {
            
            setProgress(0);
            console.log(error.message);
            setMsg({
                status:'error',
                msg:'Upload gambar gagal'
            });
            setIsLoading(false);
        });
        setSelectedFile(undefined);
        // setTimeout(()=>{
        //     setMsg([])
        // },5000);
    }  
    
    
  return (
    <>
        {props.show&&(
        <form onSubmit={(e)=>uploadImage(e)} encType='multipart/form-data'>
                <div id="publishModal" className="d-flex justify-content-center align-items-start" style={{position:'fixed',zIndex:'9999',top:'56px',left:'0',width:'100%',maxWidth:'100%',height:'100%',backgroundColor:'rgba(33,37,41,0.5)'}}>
                    <div className="modal-dialog flex-sm-fill" style={{minWidth:'50%'}}>
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Upload Gambar Baru</h5>
                            <button type="button" className="btn-close" onClick={()=>props.setShow(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {progress>0&&isLoading&&(
                                <div className="progress mb-3">
                                    <div 
                                        className="progress-bar bg-success " 
                                        role="progressbar" 
                                        style={{width:progress+"%"}}
                                        aria-valuenow={progress} 
                                        aria-valuemin="0" 
                                        aria-valuemax="100"
                                    >
                                        {progress+"%"}
                                    </div>
                                </div>
                            )}
                            {msg&&(
                                <Alert status={msg.status} msg={msg.msg}/>
                            )}
                            <div className="mb-3">
                                {/* <label className="form-label" htmlFor="Publish" >Pilih Gambar</label> */}
                                <input 
                                    className="form-control form-control-lg" 
                                    type="file" 
                                    maxLength="255"
                                    id="file"
                                    // value={selectedFile}
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                    placeholder="Pilih gambar"
                                />
                                
                            </div>
                            <div className="form-floating mb-3">
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    maxLength="255"
                                    id="alt"
                                    value={alt}
                                    onChange={(e)=>setAlt(e.target.value)}
                                    placeholder="Tulis text alternatif untuk gambar ini"
                                />
                                <label className="form-check-label" htmlFor="Publish" >Alt Text</label>
                            </div>                                
                            
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Upload
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

export default AddImageModal