import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  
  function App({data}){
    const notify = () => toast(data);

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }
  export default App;