import React,{useState,useContext,useEffect} from 'react'
import ChartContext from '../Context/ChartContext';
import { useParams } from "react-router-dom"

function CreateChannelModal() {
  const [workspaceName ,setWorkspaceName]=useState('')
  const [workspaceId ,setWorkspaceId]=useState('')
  const [name, SetName] = useState('');
  const id=useParams();
  const chartContext=useContext(ChartContext);
  const {createChannel}=chartContext;

  useEffect(() => {
    const Id=id;
    const data=Id.id.split('-');
    setWorkspaceName(data[1]);
    setWorkspaceId(data[0]);
  }, [])
  

  const handleChange=(event)=> {
    SetName(event.target.value);
  } 

  const Submitform=()=>{
    const payLoad={channelName:name,workSpaceId:workspaceId}
    console.log(payLoad)
    createChannel(payLoad)
    SetName("");
  }
    
  return (
    <div>
    <div className="modal fade" id="createChannelsButton" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Channels</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <label htmlFor="email">Channel Name</label>
          <input onChange={handleChange} value={name}  type="text" name="name" id="name" placeholder='Enter Channel Name' />

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button className="btn btn-primary" onClick={Submitform}>Create</button>
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default CreateChannelModal