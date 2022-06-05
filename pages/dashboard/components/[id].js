import { useState,useEffect} from "react";
import MainLayout from "../../../layout/MainLayout";
import { useRouter } from 'next/router';
import axios from "axios"
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import ToastAlert from "../../../components/ToastAlert";

import dynamic from "next/dynamic";
import { ArrowLeft } from "react-feather";
import Link from "next/link";
const TextEditor = dynamic(import('../../../components/TextEditor'),
    { ssr: false }
)

import supportError from "../../../services/supportError";


const EditComponent = () => {
    const router = useRouter()
    const {id,page} = router.query

    const [textEditorMode,setTextEditorMode]=useState('html');
    const [msg,setMsg]=useState('');
    const [token,setToken]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [isLoadingSimpan,setIsLoadingSimpan]=useState(false);

    const [name,setName]=useState('');
    const [html,setHtml]=useState('');
    const [script,setScript]=useState('');
    const [style,setStyle]=useState('');
    const [data,setData]=useState('');
    const [sampleImage,setSampleImage]=useState('');

    const getData=()=>{
        setIsLoading(true);
        try{
            axios.get(`components/${id}`)
            .then((response)=>{
                const data=response.data.data;
                setName(data.name);
                setHtml(data.html);
                setScript(data.script);
                setStyle(data.style);
                setData(data.data);
                setSampleImage(data.sample_image);

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
    useEffect(()=>{
        if(id&&token){
            getData();
        }
    },[id,token]);


    const onChangeTextEditor=async(newValue)=>{
        setHtml(newValue);
    }
    const onChangeJsTextEditor=async(newValue)=>{
        setScript(newValue);
    }
    const onChangeCssTextEditor=async(newValue)=>{
        setStyle(newValue);
    }
    


    const handleSubmit=async(e)=>{
        e.preventDefault();
        setIsLoadingSimpan(true);
        try{
            await axios.put(`components/${id}`,{
                name,
                html,
                script,
                style,
                data,
                sample_image:sampleImage
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
    return (
        <MainLayout setToken={setToken}>
            {isLoading?(
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <Skeleton style={{height:'70vh'}}/> 
                    </div>
                    <hr/>
                    <div className="col-md-6">
                        <Skeleton style={{height:'50px'}}/>
                    </div>
                    <div className="col-md-6">
                        <Skeleton style={{height:'50px'}}/> 
                    </div>
                </div>
                   
            ):(
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="row mb-3">
                        <div className="col">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <button 
                                    type="button"
                                    onClick={()=>setTextEditorMode('html')} 
                                    className={textEditorMode==="html"?('btn btn-link nav-link active'):('btn btn-link nav-link')}
                                >
                                    HTML
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    type="button"
                                    onClick={()=>setTextEditorMode('js')} 
                                    className={textEditorMode==="js"?('btn btn-link nav-link active'):('btn btn-link nav-link')}
                                >
                                    JS
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    type="button"
                                    onClick={()=>setTextEditorMode('css')} 
                                    className={textEditorMode==="css"?('btn btn-link nav-link active'):('btn btn-link nav-link')}
                                >
                                    CSS
                                </button>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div className="row">
                        
                        <div className="col">
                            {textEditorMode==="html"?(
                                <TextEditor code={html} theme='monokai' language="html" onChange={onChangeTextEditor}/>
                            ):textEditorMode==="js"?(
                                <TextEditor code={script?(script):('')} theme='monokai' language="javascript" onChange={onChangeJsTextEditor}/>
                            ):(
                                <TextEditor code={style?(style):('')} theme='monokai' language="css" onChange={onChangeCssTextEditor}/>
                            )}
        
                        </div>

                    </div>
                    <hr/>
                    <div className="row mb-3">
                        <ToastAlert status={msg.status} msg={msg.msg} setMsg={setMsg} autoClose={true}/>

                        <div className="col-md-6 mb-3">
                            <div className="d-flex justify-content-start align-items-center">
                                {page&&(
                                    <Link href={`/dashboard/pages/${page}`}>
                                        <a className="btn btn-secondary me-3 h-100">
                                            <ArrowLeft/>
                                        </a>
                                    </Link>
                                )}
                                <div className="form-floating w-100">
                                    <input 
                                        className="form-control w-100" 
                                        type="text" 
                                        maxLength="255"
                                        id="name"
                                        value={name?(name):('')}
                                        onChange={(e)=>setName(e.target.value)}
                                        placeholder="Tulis nama komponen disini"
                                    />
                                    <label className="form-check-label" htmlFor="Publish" >Nama component</label>
                                </div>
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
        </MainLayout>
    )
}

export default EditComponent