import http from './httpClient';

class fileUploadService{
    upload(image,altText,onUploadProgress,token){
        let formData=new FormData();
        formData.append('image',image);
        formData.append('alt_text',altText);
        const config = {
            onUploadProgress: (progressEvent) => (progressEvent.loaded)
        }
        return http.post('images',formData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'Authorization':token
            },
            onUploadProgress
        });
    }
    get(token) {
        return http.get("/images",{
            headers:{
                'Authorization':token,
            },
        });
    }
    delete(id,token){
        return http.delete(`/images/${id}`,{
            headers:{
                'Authorization':token,
            },
        });
    }
}

export default new fileUploadService();