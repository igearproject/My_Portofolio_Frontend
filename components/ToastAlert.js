import { useEffect } from "react";
import { CheckCircle, XCircle } from "react-feather";

const ToastAlert = (props) => {
    let toast='';
    const handleClose=async()=>{
        props.setMsg([]);
    };
    useEffect(()=>{
        if(props.autoClose===true){
            setTimeout(()=>{
                // props.setMsg([]);
                // toast='';
                handleClose();
            },5000);

        }
    },[toast]);
    
    if(props.status==="success"){
        toast= (
            <div className="position-fixed bottom-0 end-0 align-items-center text-white bg-success border-0 mb-3 me-3 rounded-3" style={{zIndex:19}} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex ">
                    <div className="toast-body">
                        <CheckCircle/> <span className="me-auto">{props.msg}</span>
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={handleClose}></button>
                </div>
            </div>
        )

    }else if(props.status==="error"){
        toast= (
            <div className="position-fixed bottom-0 end-0 align-items-center text-white bg-danger border-0 mb-3 me-3 rounded-3" style={{zIndex:19}} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        <XCircle/> <span className="me-auto">{props.msg}</span>
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={handleClose}></button>
                </div>
            </div>
        )
    }
    
    return (
        <div>
            {toast}
        </div>
    );
}

export default ToastAlert