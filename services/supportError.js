class supportError{
    getData(content,err){
        let message={
            status:'error',
            msg:err.message
        };
        if (err.response){
            if (err.response.status === 403) {
                message.msg=`Anda tidak memiliki akses untuk data ${content}`;
            }else if(err.response.status === 401){
                message.msg=`Anda perlu login ulang`;
            }else{
                message.msg=`Request data ${content} gagal`;
            }
        }
        return message
    }
}

export default new supportError();