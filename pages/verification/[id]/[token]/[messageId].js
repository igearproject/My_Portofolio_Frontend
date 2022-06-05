import Link from "next/link";
import Head from 'next/head';
import Alert from "../../../../components/Alert";
import axios from "axios";

export async function getServerSideProps(context){
    const params=context.params;
    const nameNew=context.query.name;
    let msg=null;
    let url=`${process.env.NEXT_PUBLIC_SERVER_URL_API}email-list/${params.id}/${params.token}/${params.messageId}`;
    if(nameNew){
        url+=`?name=${nameNew}`;
    }
    try{
        await axios.post(url)
        .then((response)=>{
            msg={
                status:'success',
                msg:response.data.message
            };
        })
    }catch(error){
        
        if(error.response){
            msg={
                status:'error',
                msg:error.response.data.message
            };
        }else{
            msg={
                status:'error',
                msg:error.message
            };
        }
    }
    
    return { props: { msg } }
}

const VerificationMessage=(props)=>{
    return(
        <main>
            <Head>
                <title>Verification Email - GedeArya</title>
            </Head>
            <div className="container container-sm">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-5">
                        <div className="card mt-5 shadow">
                            <div className="card-body">
                                <h1 className="display-6">Verification Email</h1>
                                <hr className="mb-4"/>
                                <Alert status={props.msg.status} msg={props.msg.msg}/>

                                <Link href="/">
                                    <a className="btn btn-primary">Back to Home</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default VerificationMessage;