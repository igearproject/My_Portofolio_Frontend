import Image from "next/image";
import NotFoundImage from "../public/undraw_page_not_found.svg";

const PageNotFound = () => {
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{height:'100vh'}}>
                <div className="col-md-6">
                    <Image src={NotFoundImage} alt="Ilustrasi page not found"/>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;