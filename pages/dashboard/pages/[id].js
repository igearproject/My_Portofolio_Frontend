import { useState,useEffect} from "react";
import MainLayout from "../../../layout/MainLayout";
import { Plus, Edit2, Trash, ArrowUp, ArrowDown, ZoomIn } from "react-feather";
import ReactTooltip from 'react-tooltip';
import { useRouter } from 'next/router';
import axios from "axios"
import Alert from "../../../components/Alert";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import PublishModal from "../../../components/pages/PublishModal";
import AddComponentModal from "../../../components/pages/component/AddComponentModal";
import ToastAlert from "../../../components/ToastAlert";
import DeleteComponentModal from "../../../components/pages/component/DeleteComponentModal";
import Link from "next/link";
import SearchAddComponentModal from "../../../components/pages/component/SearchAddComponentModal";

import supportError from "../../../services/supportError";

const Url = () => {
    const router = useRouter()
    const {id} = router.query
    
    const [isMounted,setIsMounted] = useState(false); // Need this for the react-tooltip

    const [msg,setMsg]=useState('');
    const [token,setToken]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [isLoadingSimpan,setIsLoadingSimpan]=useState(false);
    
    const [openPublishModal,setOpenPublishModal]=useState(false);
    const [openAddComponentModal,setOpenAddComponentModal]=useState(false);
    const [openDeleteComponentModal,setOpenDeleteComponentModal]=useState(false);
    const [openSearchComponentModal,setOpenSearchComponentModal]=useState(false);
    const [components,setComponents]=useState([]);
    const [componentsDelete,setComponentsDelete]=useState([]);
    
    
    const [title,setTitle]=useState('');
    const [type,setType]=useState('post');
    const [url,setUrl]=useState('');
    const [publish,setPublish]=useState(false);
    // dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') 
    const [publishTime,setPublishTime]=useState('');
    const [metaKeyword,setMetaKeyword]=useState('');
    const [metaDescription,setMetaDescription]=useState('');
    const [showComment,setShowComment]=useState(false);

    useEffect(() => {
        setIsMounted(true);
        
    },[]);
    useEffect(()=>{
        if(id&&token){
            getData();
        }
    },[id,token]);
    const getData=()=>{
        setIsLoading(true);
        try{
            axios.get(`pages/${id}`)
            .then((response)=>{
                const data=response.data.data;
                setTitle(data.title);
                setType(data.type);
                setUrl(data.url);
                setPublish(data.publish);
                setPublishTime(data.publish_time);
                setMetaKeyword(data.meta_keyword);
                setMetaDescription(data.meta_decryption);
                setShowComment(data.show_comment);

                setComponents(response.data.components);

            }).catch(err=>{
                setMsg(supportError.getData('component',err));
            });
            setIsLoading(false);
            
        }catch(error){
            setMsg({
                status:'error',
                msg:error.message
            });
            setIsLoading(false);
        }
    };


    const changeOrderNumber=async(idList,too)=>{
        setIsLoading(true);
        try{
            let url=`list-components/${idList}/order-number`;
            if(too=='up'){
                url=`list-components/${idList}/order-number?up=true`;
            }
			axios.put(url)
            .then((response)=>{
                getData();
                setMsg({
                    status:'success',
                    msg:response.data.message
                });
                // setIsLoading(false);
            });
			
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
            // setIsLoading(false);
		}
    }

    const handleSubmitEditPage=async(e)=>{
        e.preventDefault();
        setIsLoadingSimpan(true);
        try{
            await axios.put(`pages/${id}`,{
                title:title,
                type:type,
                url:url,
                publish:publish,
                publish_time:publishTime,
                meta_keyword:metaKeyword,
                meta_decryption:metaDescription,
                show_comment:showComment
            }).then((response)=>{
                getData();
                setMsg({
                    status:'success',
                    msg:response.data.message
                });
                
                setIsLoadingSimpan(false);

            })
        }catch(error){
            setIsLoadingSimpan(false);
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

    const handleOpenDeleteModal=async(component)=>{
        setOpenDeleteComponentModal(true);
        setComponentsDelete(component);
    }

    return (
        <MainLayout setToken={setToken}>
            <Alert status={msg.status} msg={msg.msg}/>
            
            {isLoading?(
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <Skeleton style={{height:'100px'}}/> 
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <Skeleton count={3} style={{height:'50px'}}/> 
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Skeleton count={5} style={{height:'60px'}}/> 
                    </div>
                </div>
                   
            ):(
            <form onSubmit={(e)=>handleSubmitEditPage(e)}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-floating mb-3  ">
                            <input 
                                type="text"  
                                onChange={(e)=>setTitle(e.target.value)} 
                                id="title" 
                                value={title?(title):('')}
                                required 
                                className="form-control" 
                                maxLength="255"
                                style={{
                                    height:'100px',
                                    fontSize:'2rem',
                                    fontWeight:'400'
                                }}
                            />
                            <label htmlFor="title" className="form-label">Title</label>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="card" style={{minHeight:'70vh'}}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h2 className="h5" style={{fontWeight:'300'}}>List Component</h2>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <button  type="button" className="btn btn-sm btn-secondary me-2" data-tip="Cari Component Yang Sudah Ada" data-for='componentSearchAdd' onClick={()=>setOpenSearchComponentModal(true)}>
                                            <ZoomIn/>
                                        </button>
                                        {isMounted && <ReactTooltip id="componentSearchAdd" place="bottom" type="success" effect="solid" textColor='white' backgroundColor='#0d6efd' className="tooltip-extra"/>}

                                        <button  type="button" className="btn btn-sm btn-primary" data-tip="Tambah Component Baru" data-for='componentAdd' onClick={()=>setOpenAddComponentModal(true)}>
                                            <Plus/>
                                        </button>

                                        {isMounted && <ReactTooltip id="componentAdd" place="bottom" type="success" effect="solid" textColor='white' backgroundColor='#0d6efd' className="tooltip-extra"/>}
                                    </div>
                                </div>
                                <ul className="list-group">
                                    {components&&(
                                        components.map((data,index)=>{
                                            const component=data.components;
                                            return (
                                                <li className="list-group-item" key={index}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-inline-flex align-items-center">
                                                            <div className="btn-group me-2 btn-group-sm" role="group">
                                                                <button onClick={()=>{changeOrderNumber(data.id,'down')}} type="button" className="btn btn-light btn-warning"  data-tip="Turunkan component" data-for='componentUp'><ArrowDown/></button>
                                                                {isMounted && <ReactTooltip id="componentUp" place="bottom" type="success" effect="solid" textColor='white' backgroundColor='#6c757d' className="tooltip-extra"/>}
                                                                <button onClick={()=>changeOrderNumber(data.id,'up')} type="button" className="btn btn-light btn-warning" data-tip="Naikan component" data-for='componentDown'><ArrowUp/></button>
                                                                {isMounted && <ReactTooltip id="componentDown" place="bottom" type="success" effect="solid" textColor='white' backgroundColor='#6c757d' className="tooltip-extra"/>}
                                                            </div>
                                                            <span className="h6">{data.order_number}. {component.name}</span>
                                                        </div>
                                                        
                                                        <div className="btn-group btn-group-sm">
                                                            <Link href={`/dashboard/components/${component.id}?page=${id}`}>
                                                                <a>
                                                                    <button  type="button" className="btn btn-sm btn-light" data-tip="Edit component" data-for='editpage'><Edit2/></button>
                                                                </a>
                                                            </Link>
                                                            {isMounted && <ReactTooltip id="editpage" place="bottom" type="success" effect="solid" textColor='white' backgroundColor='#198754' className="tooltip-extra"/>}
                                                            <button onClick={()=>handleOpenDeleteModal(component)} type="button" className="btn btn-sm btn-light" data-tip="Hapus component" data-for='deletepage' ><Trash/></button>
                                                            {isMounted && <ReactTooltip id="deletepage" place="bottom" type="error" effect="solid"  textColor='white' backgroundColor='#dc3545' className="tooltip-extra"/>}
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    )}                                  
                                </ul>

                            </div>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating mb-3  ">
                            <select 
                                className="form-select" 
                                onChange={(e)=>{setType(e.target.value);if(e.target.value==="home"){setUrl('home')}}} 
                                id="type" 
                                value={type}
                                aria-label="Select type page" 
                            >
                                <option value="post" >Post - url example.com/post/(url)</option>
                                <option value="page" >Page - url example.com/(url)</option>
                                <option value="home" >Home - url example.com</option>
                            </select>
                            <label htmlFor="type" className="form-label">Type</label>
                        </div>
                        <div className="form-floating mb-3  ">
                            <input 
                                type="text"  
                                onChange={(e)=>setUrl(e.target.value)} 
                                id="Url" 
                                value={url?(url):('')} 
                                disabled={type==="home"&&(true)}
                                maxLength="255"
                                required 
                                className="form-control" 
                            />
                            <label htmlFor="Url" className="form-label">Url</label>
                            <div id="urlHelp" className="form-text">Jangan menggunakan spasi dan slash (/)</div>
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                role="switch" 
                                id="onCommnent"
                                checked={showComment=="1"?(true):(false)}
                                onChange={(e)=>setShowComment(e.target.checked)}
                                // onChange={()=>{if(setShowComment){setShowComment(false)}else{setShowComment(true)}}}
                            />
                            <label className="form-check-label" htmlFor="onCommnent" >Show Comment</label>
                        </div>
                        <div className="form-floating mb-3  ">
                            <input 
                                type="text"  
                                onChange={(e)=>setMetaKeyword(e.target.value)} 
                                id="MetaKeyword" 
                                value={metaKeyword?(metaKeyword):('')}  
                                maxLength="255"
                                className="form-control" 
                                style={{
                                    height:'100px'
                                }}
                            />
                            <label htmlFor="MetaKeyword" className="form-label">Meta Keyword</label>
                            <div id="MetaKeywordHelp" className="form-text">Gunakan (|) atau (,) untuk memisahkan keyword</div>
                        </div>
                        <div className="form-floating mb-3  ">
                            <input 
                                type="text"  
                                onChange={(e)=>setMetaDescription(e.target.value)} 
                                id="MetaDescription" 
                                value={metaDescription?(metaDescription):('')}   
                                maxLength="255"
                                className="form-control" 
                                style={{
                                    height:'100px'
                                }}
                            />
                            <label htmlFor="MetaDescription" className="form-label">Meta Description</label>
                        </div>
                    </div>
                </div>
                <hr className="mb-3"/>
                <div className="row mb-3">
                    {/* <Alert status={msg.status} msg={msg.msg}/> */}
                    <ToastAlert status={msg.status} msg={msg.msg} setMsg={setMsg} autoClose={true}/>

                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-start align-items-center">
                            {publish=="1"&&(
                                <button disabled className="btn btn-success bg-light text-success me-2">
                                    Published {publishTime}
                                </button>
                            )}
                            <button type="button" className="btn btn-secondary " onClick={()=>setOpenPublishModal(true)}>
                                {publish=="0"?('Publish now'):('Atur Publish')}
                            </button>
                        </div>

                        
                        
                    </div>
                    <div className="col-md-6 d-md-flex d-lg-flex justify-content-end mb-3">
                        <button type="submit" disabled={isLoadingSimpan} className="btn btn-primary">
                            {isLoadingSimpan && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Simpan perubahan
                        </button>
                    </div>
                </div>
            </form>
            )}
            <PublishModal 
                id={id} 
                publish={publish} 
                publishTime={publishTime} 
                setPublish={setPublish} 
                setPublishTime={setPublishTime} 
                show={openPublishModal} 
                setShow={setOpenPublishModal} 
                getData={getData}
                setMsg={setMsg}
            />
            <AddComponentModal 
                pageId={id} 
                show={openAddComponentModal} 
                setShow={setOpenAddComponentModal} 
                getData={getData}
                setMsg={setMsg}
            />
            <DeleteComponentModal 
                pageId={id} 
                data={componentsDelete}
                setData={setComponentsDelete}
                show={openDeleteComponentModal} 
                setShow={setOpenDeleteComponentModal} 
                getData={getData}
                setMsg={setMsg}
            />
            <SearchAddComponentModal 
                pageId={id} 
                show={openSearchComponentModal} 
                setShow={setOpenSearchComponentModal} 
                getData={getData}
                setMsg={setMsg}
            />
        </MainLayout>
    )
}

export default Url