import { useEffect, useState } from "react";
import Alert from "../../Alert";
import axios from "axios";

const AddComponentModal = (props) => {
    const [name,setName]=useState('');
    const [html,setHtml]=useState('<p>Hellow World<p>');
    const [script,setScript]=useState('');
    const [style,setStyle]=useState('');
    const [data,setData]=useState('');
    const [sampleImage,setSampleImage]=useState('');

    // const [orderNumber,setOrderNumber]=useState(1);

    const [isLoading,setIsLoading]=useState(false);
    const [msg,setMsg]=useState([]);
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            await axios.post(`components?page=${props.pageId}`,{
                name,
                html,
                script,
                style,
                data,
                sample_image:sampleImage
                // order_number:orderNumber
            }).then((response)=>{
                e.target.reset();
                setName('');
                props.getData();
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
    useEffect(()=>{
        setTimeout(()=>{
            setMsg([])
        },[10000])
    },[msg])
  return (
    <>
        {props.show&&(
        <form onSubmit={(e)=>handleSubmit(e)}>
                <div id="publishModal" className="d-flex justify-content-center align-items-start" style={{position:'fixed',zIndex:'9999',top:'56px',left:'0',width:'100%',maxWidth:'100%',height:'100%',backgroundColor:'rgba(33,37,41,0.5)'}}>
                    <div className="modal-dialog flex-sm-fill" style={{minWidth:'50%'}}>
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Buat Component Baru</h5>
                            <button type="button" className="btn-close" onClick={()=>props.setShow(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Alert status={msg.status} msg={msg.msg}/>
                            
                                <div className="form-floating mb-3">
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        maxLength="255"
                                        id="name"
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                        placeholder="Tulis nama komponen disini"
                                    />
                                    <label className="form-check-label" htmlFor="Publish" >Nama component</label>
                                </div>
                                
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Simpan
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

export default AddComponentModal