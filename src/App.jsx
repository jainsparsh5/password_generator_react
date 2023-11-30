import { useState, useCallback, useEffect ,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [symAllowed, setSymAllowed] = useState(false);
  const [pass, setPass] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let generatedPass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) {
      str += "0123456789";
    }

    if (symAllowed) {
      str += "!@#$%^&*()_+";
    }

    for (let i = 0; i < length; i++) {
      generatedPass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPass(generatedPass);
  }, [length, numAllowed, symAllowed, setPass]);

  let flag = false;

  const copyPassToClipboard = () => {
    passwordRef.current.select();
    document.execCommand("copy");
    alert("Password copied to clipboard");
  }

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, symAllowed, passwordGenerator]);



  return (
    <>
      <h1 className="text-4xl text-center mt-16 text-white">
        Password Generator using React
      </h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <div className="flex shadow rounded-lg overflow-hidden my-4">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPassToClipboard}
          className="outline-none bg-blue-700 text-white px-3 hover:transition-all hover:bg-blue-600 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={symAllowed}
              id="symbolInput"
              onChange={() => {
                setSymAllowed((prev) => !prev);
              }}
            />
            <label>Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
