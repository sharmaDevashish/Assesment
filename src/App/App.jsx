import { useState } from 'react';
import './App.css';
import validInput from "../StateFlowDetails/validInput.json";
//import stateChangeMap from "../StateFlowDetails/stateChangeNew.json";
import stateChangeMap from "../StateFlowDetails/stateChangeInitial.json";
import PopupMessage from "./PopupMessage/popupMsg";

const App = () => {
  const [currentState, setCurrentState] = useState("S0");
  const [stateMovement, setStateMovement] = useState("S0");
  const [inputText, setInputText] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const getNewState = () => {
    if (verifyValue(inputText)) {
      let result = stateChangeMap[currentState][inputText];
      if (result === "Invalid I/P") {
        setAlertMessage("Invalid input for current state.");
        callPopup();
      }
      if (result === "Out") {
        setAlertMessage("Current input exits the program.");
        setCurrentState("S0");
        setStateMovement("S0");
        callPopup();
      }
      if (result !== "Out" && result !== "Invalid I/P") {
        setAlertMessage("Current state updated to " + result);
        setCurrentState(result);
        setStateMovement(prevState => prevState + " ->" + result);
      }
    } else {
      setAlertMessage("Not a Valid Input.");
      callPopup();
    }
    setInputText("");
  }

  const callPopup = () => {
    setShowPopup(true);
    setTimeout(() => { setShowPopup(false) }, 2000);
  }

  const verifyValue = (value) => {
    return validInput.includes(parseInt(value));
  }

  const handleChange = (e) => {
    let val = e.target.value;
    setInputText(val);
  }

  const resetState = () =>{
    setCurrentState("S0");
    setStateMovement("S0");
    setInputText("");
  }

  return (
    <div >
      <header>
        Assessment
      </header>
      <div className='App'>
        <div>
          <input className='inputText' type="text" value={inputText} onChange={handleChange} />
          <button className='button' onClick={getNewState}>Get State</button>
          <button className='button' onClick={resetState}>Reset</button>
        </div>
        <div className='container'>
          <p className='stateP'>Current State: {currentState}</p>
          <p className='stateP'>State Movement: {stateMovement}</p>
        </div>
      </div>
      {showPopup && <PopupMessage message={alertMessage} />}
    </div>
  );
}

export default App;
