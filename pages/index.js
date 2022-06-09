import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import PageNotFound from '../components/PageNotFound';
import Script from 'next/script';
import supportError from '../services/supportError';

export async function getStaticProps() {
	let page=[],components=[],msg={
		status:'success',
		msg:'load page success'
	};
	try{
		await axios.get(`page/home`)
		.then((response)=>{
			page=response.data.data;
			components=response.data.components;
		})
	}catch(error){
		
		msg=supportError.getData('component',error);
	}
  
	// Pass data to the page via props
	return { props: { page,components,msg } }
}

export default function Home({page,components,msg}) {
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
			<title>{page.title} - Gede Arya</title>
			{page.meta_keyword&&(<meta name="keyword" content={page.meta_keyword} />)}
			{page.meta_decryption&&(<meta name="description" content={page.meta_decryption} />)}
			
		</Head>
		
		
		{page?(
			<div dangerouslySetInnerHTML={{__html: htmlCustom}} />
			
		):(
			<PageNotFound/>
		)}

		<style jsx global>
			{cssCustom}
		</style>

		<Script
			src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.3/gsap.min.js"
		/>
		<Script
			src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.3/ScrollTrigger.min.js"
		/>
		<Script
			src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.1/dist/js/splide.min.js"
		/>
		<Script
			src="https://unpkg.com/fastest-validator"
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
