const Alert = (props) => {
    let showMessage='';
    if(props.status){
        if(props.status==='success'){
            showMessage=(
                <div className="alert alert-success alert-dismissible" role="alert">
                    {props.msg}
                    {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>showMessage=''}></button> */}
                </div>
            );
        }else if(props.status==='error'){
            showMessage=(
                <div className="alert alert-danger alert-dismissible" role="alert">
                    {props.msg}
                    {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>showMessage=''}></button> */}
                </div>
            );
        }else{
            showMessage='';
        }
    }
    return (
        <div>
            {showMessage}
        </div>
    )
}

export default Alert