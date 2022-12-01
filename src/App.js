import React from "react";

import EmployeeList from "./components/QuestionTable";
import Context from "./components/Context";

function App() {
 
  return (  
    <div className="App">
      <header className="App-header">
      <Context >
        <EmployeeList/>
      </Context>
      </header>
    </div>
  );
}

export default App;
