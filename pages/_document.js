import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
    
    return (
        <Html>
            <Head>
                {/* <meta charSet='utf-8' />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
                {/* <meta name="author" content="I Gede Arya Surya Gita" />
                <meta name="keywords" content="gede arya,jasa web developer, programmer laravel, programmer nextjs, programmer reactjs, programmer nodejs, programmer expressjs" />
                <meta name="description" content="website portofolo i gede arya surya gita a web programmer,fulstack web developer with Javascript(Reactjs, Nextjs,Expressjs) or php (Laravel) " /> */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"/>
                {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script> */}
                {/* <title>GedeArya - Fulstack Web Developer</title> */}
                <link rel="shortcut icon" href="/img_home/logogedearya.png" />

                {/* carousel for homepage */}
                <link href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.1/dist/css/splide.min.css" rel="stylesheet" />
                <link href="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.css" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
                
            </body>
        </Html>
    )
}