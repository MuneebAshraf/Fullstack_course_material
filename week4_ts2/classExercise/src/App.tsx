import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import InputName from "./components/InputName";
import ViewName from "./components/ViewName";

function App() {
  const [name, setName] = useState<string>("")

  return (
    <div className="App">
        <InputName name={name} setName={setName} />
        <ViewName />
        <PeopleViewer/>
    </div>
  )
}

export default App
