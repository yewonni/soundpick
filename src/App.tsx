import React from "react";
import "./App.css";

// React.FC 타입을 사용하여 컴포넌트가 올바른 JSX 요소를 반환하도록 지정
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p className="text-3xl">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
