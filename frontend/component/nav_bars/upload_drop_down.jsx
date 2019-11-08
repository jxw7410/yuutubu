import React from 'react'
import { withRouter } from 'react-router-dom';


const UploadDropDown = props => {
  const [displayDropdown, changeState] = React.useState(false);

  function toUploadPage(e) {
    changeState(false);
    props.history.push('/upload');
  }

  function toggleDropdown(e) {
    if (e.currentTarget === e.target) {
      const newState = !displayDropdown;
      changeState(newState);
    }
  }

  return (
    <div
      className='dropdown-container'
      tabIndex='0'
      onBlur={() => changeState(false)}>
      <i onClick={toggleDropdown}
        className="fas fa-video nav-i-link" />
      
      <div className='i-msg'>Upload Video</div>
      
      <ul style={displayDropdown ? null : { display: 'none' }}
        className='video-upload-dropdown box-shad-s1'>
        <li className='flexh-1'
          style={{ height: '40px' }}
          onClick={toUploadPage}>
          Upload Video
        </li>
      </ul>
    </div>
  )
}

export default withRouter(UploadDropDown);