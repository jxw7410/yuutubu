import UploadForm from './upload_form'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withUploadPageContext } from './upload_page_context';
import { openModal } from '../../actions/modal/modal_action';
import {
  createVideo,
  requestDirectUpload,
  deleteDirectUpload,
} from '../../actions/video/video_action';



const msp = state => ({
  user: state.session,
});



const mdp = dispatch => ({
  createVideo: videoPayload => dispatch(createVideo(videoPayload)),
  requestDirectUpload: file => dispatch(requestDirectUpload(file)),
  deleteDirectUpload: blob_ids => dispatch(deleteDirectUpload(blob_ids)),
  openModal: modalMetaData => dispatch(openModal(modalMetaData)),
})

// hoc of hoc of hoc 
export default withUploadPageContext(withRouter(connect(msp, mdp)(UploadForm)));