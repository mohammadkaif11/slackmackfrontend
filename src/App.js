import "./App.css";
import LoginPage from "./Component/LoginPage";
import Login from "./Component/Login";
import WorkSpace from "./Component/WorkSpace";
import ChartState from "./Context/ChartState";
import UserState from "./Context/UserState";
import { Route, Routes } from "react-router-dom";
import CreateWorkspaces from "./Component/CreateWorkspaces";
import AdminChart from "./Component/AdminChart";
import UserChart from "./Component/UserChart";
import SocketContext, { socket } from "./Context/socket";

function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <UserState>
          <ChartState>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Workspace" element={<WorkSpace />} />
              <Route path="/createworkspace" element={<CreateWorkspaces />} />
              <Route path="/chartAdmin/:id" element={<AdminChart />} />
              <Route path="/chartUser/:id" element={<UserChart />} />
            </Routes>
          </ChartState>
        </UserState>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
