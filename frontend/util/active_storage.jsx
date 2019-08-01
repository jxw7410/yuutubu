import {DirectUpload} from 'activestorage';


export const uploadFile = (file, url) => {
    return new Promise((resolve,reject) => {
        debugger
        const upload = new DirectUpload(file, url)
        upload.create((error, blob) => {
            if (error)
                reject('Failed')
            else 
                resolve(blob)
        })
    })
} 