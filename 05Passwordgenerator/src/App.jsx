import { useCallback, useState, useRef, useEffect} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);

  const [numberAllowed, setNumberAllowed] = useState(false);

  const [characterAllowed, setCharacterAllowed] = useState(false);

  const [password, setPassword] = useState('');

  //useRef hook to store the password
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass ="";
    let str ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numberAllowed){
      str+="0123456789";
    }
    if(characterAllowed){
      str+="!@#$%^&*()_+";
    }
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
      setPassword(pass);
    }
  },[length,numberAllowed,characterAllowed,setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    alert('Password copied to clipboard');
    window.navigator.clipboard.writeText(password)
  },[password]);

  //useEffect hook to generate password
  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed, characterAllowed,passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-screen-md mx-auto shadow-md rounded-lg p-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-2xl font-bold text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
          value={password} 
          className='outline-none w-full py-1 px-3' 
          placeholder='Password'
          readOnly
          ref={passwordRef} />

          <button
            onClick={copyPasswordToClipboard}
            className='bg-blue-500 text-white px-3 py-1 shrink-0'>Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={8}
            max={25}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}} />
            <label htmlFor="lable">Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {setNumberAllowed((prev) => !prev)}} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={characterAllowed}
            id='characterInput'
            onChange={() => {setCharacterAllowed((prev) => !prev)}} />
            <label htmlFor="characterInput">Special Characters</label>
          </div> 
        </div>
      </div>
    </>
  )
}

export default App;
