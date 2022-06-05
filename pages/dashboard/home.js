import { useState,useEffect} from "react";
import MainLayout from "../../layout/MainLayout";
import { Plus, Edit2, Trash } from "react-feather";
import ReactTooltip from 'react-tooltip';
import { useRouter } from 'next/router';
import axios from "axios";
import dayjs from "dayjs";
import id from "dayjs/locale/id";
import relativeTime from 'dayjs/plugin/relativeTime';

import Alert from "../../components/Alert";
import Link from "next/link";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import supportError from "../../services/supportError";

const Home = () => {
    const [token,setToken]=useState(null);
    const [pages,setPages]=useState([]);
    const [isMounted,setIsMounted] = useState(false); // Need this for the react-tooltip
    const [isLoading,setIsLoading]=useState(true);

    const [isLoadingAdd,setIsLoadingAdd]=useState(false);
    const [showModalAdd,setshowModalAdd]=useState(false);
    const [msgAdd,setMsgAdd]=useState('');

    const [isLoadingDelete,setIsLoadingDelete]=useState(false);
    const [showModalDelete,setShowModalDelete]=useState(false);
    const [msgDelete,setMsgDelete]=useState('');
    const [dataDelete,setDataDelete]=useState([]);

    const [msg,setMsg]=useState('');

    const [title,setTitle]=useState('');
    const [type,setType]=useState('post');
    const [url,setUrl]=useState('');
    const [publish,setPublish]=useState(false);
    const [publishTime,setPublishTime]=useState(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') );
    const [metaKeyword,setMetaKeyword]=useState('');
    const [metaDescription,setmetaDescription]=useState('');
    const [showComment,setShowComment]=useState(false);

    const router = useRouter();

    dayjs.locale(id);
    dayjs.extend(relativeTime)
    

    const getData=()=>{
        try{
            setIsLoading(true);
			axios.get('pages'
            // ,{
			// 	headers:{
			// 		Authorization:`${token}`
			// 	}
				
			// }
            ).then((response)=>{
                // console.log(response);
                setPages(response.data.data.data);
            }).catch(err=>{
                setMsg(supportError.getData('component',err));
            });
            setIsLoading(false);
			
		}catch(error){
            console.log('Logout error : ',error.message);
            setIsLoading(false);
		}
    };
    useEffect(() => {
        setIsMounted(true);
    },[]);
    useEffect(() => {
        if(token){
            getData();
        }
    },[token]);

    const handleSubmitAdd=async(e)=>{
        e.preventDefault();
        setIsLoadingAdd(true);
        try{
            setIsLoadingAdd(true);
            let slug=url;
            if(type==="home"){
                slug='home';
            }
            await axios.post('pages',{
                title:title,
                type:type,
                url:slug,
                publish:publish,
                publish_time:publishTime,
                meta_keyword:metaKeyword,
                meta_description:metaDescription,
                show_comment:showComment
            }).then((response)=>{
                e.target.reset();
                setMsg({
                    status:'success',
                    msg:response.data.message
                });
                getData();
                setIsLoadingAdd(false);
                setshowModalAdd(false);
                setType('post');

            })
        }catch(error){
            setIsLoadingAdd(false);
            if(error.response){
                setMsgAdd({
                    status:'error',
                    msg:error.response.data.message
                });
            }else{
                setMsgAdd({
                    status:'error',
                    msg:error.message
                });
            }
        }

    }
    
    const handleOpenDelete=async(page)=>{
        setDataDelete(page);
        setShowModalDelete(true);
    }


    const handleDelete=async(id)=>{
        setIsLoadingDelete(true);
        try{
            await axios.delete(`pages/${id}`)
            .then((response)=>{
                setMsg({
                    status:'success',
                    msg:response.data.message
                });
                getData();
                setIsLoadingDelete(false);
                setShowModalDelete(false);
                setDataDelete([]);

            })
        }catch(error){
            setIsLoadingDelete(false);
            if(error.response){
                setMsgAdd({
                    status:'error',
                    msg:error.response.data.message
                });
            }else{
                setMsgAdd({
                    status:'error',
                    msg:error.message
                });
            }
        }
    }

  return (
    <MainLayout setToken={setToken}>
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="display-3 ">Pages</h1>
            <div>
                <button className="btn btn-primary shadow" data-tip="Buat Page Baru" data-for='addpage'  onClick={()=>setshowModalAdd(true)}><Plus /></button>
                {isMounted && <ReactTooltip id="addpage" place="left" type="info" effect="solid" backgroundColor="#0d6efd" textColor="white"/>}
            </div>
        </div>
        <Alert status={msg.status} msg={msg.msg}/>
        <div className="table-responsive bg-white p-3 rounded-3">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Url</th>
                        <th scope="col">Title</th>
                        <th scope="col">Publish</th>
                        <th scope="col">Last Update</th>
                        <th scope="col">Menu</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading?(
                        // <tr>
                        //     <td colSpan="5">
                        //         <div className="d-flex justify-content-center m-5">
                        //             <div className="spinner-border" role="status">
                        //             </div>
                        //         </div>
                        //     </td>
                        // </tr>
                        <>
                            <tr>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                            </tr>
                            <tr>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                            </tr>
                            <tr>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                                <td><Skeleton/></td>
                            </tr>
                        </>
                    ):(
                        <>
                        {pages.map((page,index)=>{
                            return(
                                <tr key={index}>
                                    <td scope="row">{page.url}</td>
                                    <td>{page.title}</td>
                                    <td>{page.publish==="1"?(<span>Yes</span>):(<span>No</span>)}</td>
                                    <td>{dayjs(page.updated_at).fromNow()}</td>
                                    <td>
                                        <div className="d-flex justify-content-start">
                                            <Link href={`/dashboard/pages/${page.id}`}>
                                                <a className="btn btn-light btn-sm me-1" data-tip="Edit Page" data-for='editpage'><Edit2/></a>
                                            </Link>
                                            {isMounted && <ReactTooltip id="editpage" place="bottom" type="success" effect="solid" textColor='white' backgroundColor='#198754' className="tooltip-extra"/>}
                                        
                                            <button onClick={()=>handleOpenDelete(page)} className="btn btn-light btn-sm"  data-tip="Hapus Page" data-for='deletepage' ><Trash/></button>
                                            {isMounted && <ReactTooltip id="deletepage" place="bottom" type="error" effect="solid"  textColor='white' backgroundColor='#dc3545' className="tooltip-extra"/>}
                                            
                                        </div>
                                    </td>
                                </tr>
                            )})
                        }
                        </>
                    )}
                    
                </tbody>
            </table>
        </div>
        
        {/* addModal */}
        {showModalAdd&&(
        <form onSubmit={(e)=>handleSubmitAdd(e)}>
                <div id="addModal" className="d-flex justify-content-center align-items-start" style={{position:'fixed',zIndex:'9999',top:'56px',left:'0',width:'100%',maxWidth:'100%',height:'100%',backgroundColor:'rgba(33,37,41,0.5)'}}>
                    <div className="modal-dialog flex-sm-fill" style={{minWidth:'50%'}}>
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Buat Page Baru</h5>
                            <button type="button" className="btn-close" onClick={()=>setshowModalAdd(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Alert status={msgAdd.status} msg={msgAdd.msg}/>
                            
                                <div className="mb-3  ">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" onChange={(e)=>setTitle(e.target.value)} id="title" required className="form-control" placeholder="Title page"/>
                                </div>
                                <div className="mb-3  ">
                                    <label htmlFor="type" className="form-label">Type</label>
                                    <select className="form-select" onChange={(e)=>setType(e.target.value)} id="type" aria-label="Select type page" >
                                        <option value="post">Post - url example.com/post/(url)</option>
                                        <option value="page">Page - url example.com/(url)</option>
                                        <option value="home">Home - url example.com</option>
                                    </select>
                                </div>
                                <div className="mb-3  ">
                                    <label htmlFor="id" className="form-label">Url</label>
                                    <input type="text" onChange={(e)=>setUrl(e.target.value)} id="id" value={type==="home"?('home'):(url)} required disabled={type==="home"&&(true)} className="form-control" placeholder="Url page"/>
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" disabled={isLoadingAdd}>
                                {isLoadingAdd && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Buat Page
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
                
        </form>
        )}
        {/* addModal */}
        {/* deleteModal */}
        {showModalDelete&&(
            <div id="deleteModal" className="d-flex justify-content-center align-items-start" style={{position:'fixed',zIndex:'9999',top:'56px',left:'0',width:'100%',maxWidth:'100%',height:'100%',backgroundColor:'rgba(33,37,41,0.5)'}}>
                <div className="modal-dialog flex-sm-fill" style={{minWidth:'50%'}}>
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Hapus Page</h5>
                        <button type="button" className="btn-close" onClick={()=>setShowModalDelete(false)} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Alert status={msgAdd.status} msg={msgAdd.msg}/>
                        
                            <div className="mb-3  ">
                                <h5>{dataDelete.title}</h5>
                                <span>{dataDelete.type} /{dataDelete.url}</span>
                            </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" disabled={isLoadingDelete} onClick={()=>handleDelete(dataDelete.id)}>
                            {isLoadingDelete && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Hapus Page
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        )}
        {/* deleteModal */}
    </MainLayout>
  )
}

export default Home