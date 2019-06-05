import React from 'react';

const VideoUploadArea = (props) => {
    return (
        <div id='upload-area'
            onDrop={props.handleDrop}
            onDragEnter={e => e.preventDefault()}
            onDragOver={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}>

            <label id='upload-input'>
                <input onChange={props.handleFile} type="file" />
                <i className="fas fa-arrow-up"></i>
                <span>Upload file</span>
                <span id='upload-area-text'>Or Drag and Drop</span>
            </label>


        </div>
    )
}

export default VideoUploadArea;