import React from 'react';
import PreviewVideo from './preview_video';
//shady tactc nooooo

const VideoUploadForm = props => {
    //debugger
    return (
        <form id='video-submit-form'>
            <div id='video-submit-form-col-1'>
                <div>{
                    props.fileUrl ?
                        <video controls>
                            <source src={props.fileUrl} type='video/mp4' />
                        </video>
                        : <div id='loading-video'><div className='spinner' /></div>
                    }

                    <span>
                        Video Status: {
                            props.fileUrl && props.thumbnailUrl ?
                            "Ready" : "Pending"
                        }
                    </span>
                </div>
            </div>

            <div id='video-submit-form-col-2'>
                <div id='video-submit-button-ctn'>
                 
                {
                    props.uploading ?  
                        <div id='uploading-spinner'> <div className='spinner' /></div>
                    :
                    
                    props.doneUploading ? 
                        <h1>Video Upload Successful!</h1>
                    :
                        props.thumbnailUrl && props.fileUrl ?
                        <button id='submit-button-enabled'
                            onClick={props.handleSubmit}
                        >Publish</button> :
                        <button id='submit-button-disabled'
                            disabled>Publish</button>
                }</div>

                <div id='video-submit-form-lower-section'>
                    <input onChange={props.handleTypeEvent('title')} 
                        type='text' 
                        placeholder='Title' />

                    <textarea 
                        onChange={props.handleTypeEvent('description')} 
                        placeholder="Description" 
                        rows='10' />

                    <div id='thumbnail-section'>
                        Video thumbnail:{
                            props.fileUrl ?
                                props.thumbnailUrl ?
                                    <div id ='thumbnail-img'>
                                        <img src={props.thumbnailUrl} />
                                     </div> :
                                     <>
                                        <PreviewVideo 
                                            fileUrl={props.fileUrl}
                                            handleThumbnail={props.handleThumbnail}
                                        />
                                        <div id='loading-thumbnail'>
                                            <div className='spinner'></div>
                                        </div>
                                     </> :
                                <div id='loading-thumbnail'>
                                    <div className='spinner'></div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </form>
    )
}

export default VideoUploadForm;