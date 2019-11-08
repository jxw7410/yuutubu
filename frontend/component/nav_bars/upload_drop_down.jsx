import React from 'react'
import {withRouter} from 'react-router-dom';


const UploadDropDown = props => {
  const [displayDropDown, changeState] = React.useState(false);
  const dropDownCtnRef = React.useRef(null);

  function toUploadPage(e){
    dropDownCtnRef.current.blur();
    props.history.push('./upload');
  }


  return (
    <div ref={dropDownCtnRef}
      tabIndex='0' 
      onClick={() => changeState(true)}
      onBlur={() => changeState(false)}>
      <i className="fas fa-video nav-i-link">
        <ul style={ displayDropDown ? null : {display: 'none'}} 
          className='video-upload-modal box-shad-s1'>
          <li className='flexh-1'
            style={{height: '40px'}}
            onClick={toUploadPage}>
            Upload Video
          </li>
        </ul>
      </i>
      <div className='i-msg'>Upload Video</div>
    </div>
  )
}

export default UploadDropDown;