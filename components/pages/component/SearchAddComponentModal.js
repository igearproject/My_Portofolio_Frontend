import { useEffect, useState } from "react";
import Alert from "../../Alert";
import axios from "axios";
import ReactTooltip from 'react-tooltip';
import Skeleton from "react-loading-skeleton";
import { Plus, Edit2 } from "react-feather";
import Link from "next/link";

const SearchAddComponentModal = (props) => {
    const [name,setName]=useState('');
    const [search,setSearch]=useState('');
    const [components,setComponents]=useState([]);

    const [orderNumber,setOrderNumber]=useState(1);
    
    const [isLoadData,setIsLoadData]=useState(true);
    const [isLoading,setIsLoading]=useState(false);

    const [msg,setMsg]=useState([]);
    const [isMounted,setIsMounted] = useState(false); // Need this for the react-tooltip
    useEffect(() => {
        setIsMounted(true);
    },[]);

    useEffect(() => {
        if(search){
            getData(search);
        }
    },[search]);
    const getData=(keyword)=>{
        setIsLoadData(true);
        try{
			axios.get(`components?search=${keyword}`)
            .then((response)=>{
                setComponents(response.data.data);
            })
            setIsLoadData(false);
			
		}catch(error){
			
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
            setIsLoadData(false);
		}
    }

    const handleAdd=async(componentId)=>{
        setIsLoading(true);
        try{
            await axios.post(`list-components`,{
                page_id:props.pageId,
                component_id:componentId
            }).then((response)=>{
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
        },[30000])
    },[msg])
  return (
    <>
        {props.show&&(
        
                <div id="publishModal" className="d-flex justify-content-center align-items-start" style={{position:'fixed',zIndex:'9999',top:'56px',left:'0',width:'100%',maxWidth:'100%',height:'100%',backgroundColor:'rgba(33,37,41,0.5)'}}>
                    <div className="modal-dialog flex-sm-fill" style={{minWidth:'50%'}}>
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Cari Component</h5>
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
                                    value={search}
                                    onChange={(e)=>setSearch(e.target.value)}
                                    placeholder="Tulis nama komponen disini"
                                    autoComplete="off"
                                />
                                <label className="form-check-label" htmlFor="Publish" >Nama component</label>
                            </div>
                            <hr className="mb-3"/>
                            <ul className="list-group">
                                {components&&(
                                    components.map((component,index)=>{
                                        return (
                                            <li className="list-group-item" key={index}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="h6">{component.name}</span>
                                                    
                                                    <div className="btn-group btn-group-sm">
                                                        <Link href={`/dashboard/components/${component.id}?page=${props.pageId}`}>
                                                            <a>
                                                                <button  type="button" className="btn btn-sm btn-light" data-tip="Edit component" data-for='editpage'><Edit2/></button>
                                                            </a>
                                                        </Link>
                                                        {isMounted && <ReactTooltip id="editpage" place="bottom" type="success" effect="solid" textColor='white' backgroundColor='#198754' className="tooltip-extra"/>}
                                                        <button onClick={()=>handleAdd(component.id)} type="button" className="btn btn-sm btn-primary" data-tip="Tambah component" data-for='addComponent'><Plus/></button>
                                                        {isMounted && <ReactTooltip id="addComponent" place="bottom" type="success" effect="solid" textColor='white' backgroundColor='#198754' className="tooltip-extra"/>}

                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                )}                                  
                            </ul>

                        </div>
                        {/* <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Simpan
                            </button>
                        </div> */}
                        </div>
                    </div>
                </div>
        )}
    </>
  )
}

export default SearchAddComponentModal