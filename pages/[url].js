import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import PageNotFound from '../components/PageNotFound';
import Script from 'next/script';


export async function getStaticProps(props) {
    const url=props.params.url;
    let page=[],components=[],msg=null;
    const baseUrl=process.env.SERVER_URL_API;
	try{
		await axios.get(`${baseUrl}page/${url}`)
		.then((response)=>{
			page=response.data.data;
			components=response.data.components;
            console.log('page =>',page);
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
  
	// Pass data to the page via props
	return { 
        props: { 
            page,components,msg 
        }, 
        revalidate: 10,
    }
}

export async function getStaticPaths() {
    let pages=[],paths=[];
	const baseUrl=process.env.NEXT_PUBLIC_SERVER_URL_API;
    try{
		await axios.get(`${baseUrl}pages-publish`).then((response)=>{
            pages=response.data.data;
            paths =pages.data.map((page) => ({
                params: { url: page.url },
            }));
            
        })
	}catch(error){
		console.log(error.message);
	}

    return { paths, fallback: 'blocking' }
}

export default function Page({page,components,msg}) {
	let cssCustom='';
	let htmlCustom='';
	let jsCustom='';
	
	components.map((data)=>{
		const component=data.components;
		if(component.style){
			cssCustom+=component.style;
		}
		if(component.html){
			htmlCustom+=component.html;
		}
		if(component.script){
			jsCustom+=component.script;
		}
	});
	
	return (
		<>
		<Head>
            {page.title?(
                <title>{page.title} - Gede Arya</title>
            ):(
                <title>Page Not Found - Gede Arya</title>
            )}
			{page.meta_keyword&&(<meta name="keyword" content={page.meta_keyword} />)}
			{page.meta_decryption&&(<meta name="description" content={page.meta_decryption} />)}
			{/* <link rel="icon" href="/favicon.ico" /> */}
			
		</Head>
		
		
		{page.title?(
			<div dangerouslySetInnerHTML={{__html: htmlCustom}} />
			
		):(
			<PageNotFound/>
		)}

		{cssCustom&&(
            <style jsx global>
                {cssCustom}
            </style>
        )}
		
		<Script
			src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.3/gsap.min.js"
		/>
		<Script
			src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.3/ScrollTrigger.min.js"
		/>
		<Script
			src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.1/dist/js/splide.min.js"
		/>
		<Script id="animation" strategy="lazyOnload">
			{`
				gsap.registerPlugin(ScrollTrigger);
			`}
		</Script>
		{jsCustom&&(
			<Script id="custom js by gedearya"
				strategy="lazyOnload"
			>
				{jsCustom}
			</Script>
		)}
		{/* {components.map((component,index)=>{
			return (
				<div key={index+' '+component.name}>
					{component.script&&(
						<Script id={index+' '+component.name}
							strategy="lazyOnload"
						>
							{component.script}
						</Script>
					)}
				</div>
			)
					
		})} */}

		</>
	)
}
