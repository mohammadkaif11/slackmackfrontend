import React,{useState,useContext,useEffect} from 'react'
import ChartContext from '../Context/ChartContext';
import { useParams } from "react-router-dom"

function Modal() {
  const [workspaceName ,setWorkspaceName]=useState('')
  const [workspaceId ,setWorkspaceId]=useState('')
  const [email, setEmail] = useState('');
  const id=useParams();
  const chartContext=useContext(ChartContext);
  const {AddUser}=chartContext;

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
    const payLoad={email:email,workSpaceId:workspaceId,workSpaceName:workspaceName}
    AddUser(payLoad);
    setEmail("");
  }
    

  return (
    <div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">ADD USER IN YOUR WORKSPACE</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <label for="email">Enter email</label>
          <input onChange={handleChange} value={email}  type="email" name="email" id="email" placeholder='Enter email address' />

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button className="btn btn-primary" onClick={Submitform}>ADD</button>
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default Modal