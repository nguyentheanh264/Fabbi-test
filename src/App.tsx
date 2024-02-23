import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/global.css";
import Order from "./templates/Order";

function App() {
  return (
    <div className="App">
      <Order />
      <ToastContainer
        containerId="test-toast"
        position="top-center"
        autoClose={3000}
        // hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        limit={3}
      />
    </div>
  );
}

export default App;
