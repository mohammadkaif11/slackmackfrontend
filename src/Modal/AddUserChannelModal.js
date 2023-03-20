import React,{useState,useContext,useEffect} from 'react'
import ChartContext from '../Context/ChartContext';
import { useParams } from "react-router-dom"

function AddUserChannelModal(props) {
  console.log('channelName',props.channelName)  

  const [workspaceName ,setWorkspaceName]=useState('')
  const [workspaceId ,setWorkspaceId]=useState('')
  const [email, setEmail] = useState('');
  const id=useParams();
  const chartContext=useContext(ChartContext);
  const {addChannel}=chartContext;

  useEffect(() => {
    const Id=id;
    const data=Id.id.split('-');
    setWorkspaceName(data[1]);
    setWorkspaceId(data[0]);
  }, [])
  

  const handleChange=(event)=> {
    setEmail(event.target.value);
  } 


  const Submitform=()=>{
    const payLoad={email:email,workSpaceId:workspaceId,workSpaceName:workspaceName,channelId:props.channelId}
    addChannel(payLoad);
    setEmail("");
  }
    
  return (
    <div>
    <div className="modal fade" id={props.ModalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">ADD USER IN YOUR {props.channelName}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <label htmlFor="email">Enter email</label>
          <input onChange={handleChange} value={email}  type="email" name="email" id="email" placeholder='Enter email address' />

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button className="btn btn-primary" onClick={Submitform}>ADD</button>
          </div>
        </div>
      </div>
    </div>
</div>
  )
}

export default AddUserChannelModal