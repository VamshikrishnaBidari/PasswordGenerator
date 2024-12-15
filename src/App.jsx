import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&*[]{}()^~`"
    for(let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])
  
  useEffect(() => {
    PasswordGenerator()
  }, [length, numAllowed, charAllowed, PasswordGenerator])

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select();
    passwordRef.current?.selectSelectionRange(0, password.length);
  }, [password])

  return(
    <>
    <h1 className="text-4xl text-center text-white mt-10 font-['Poppins'] font-bold">Password Generator</h1>
    <div className="max-w-4xl mx-auto rounded-lg w-full mt-10 h-48 bg-gray-700 p-4 font-['Poppins']">
      <div className='flex flex-wrap'>
        <input type="text" 
          className="w-4/5 text-blue-700 text-xl font-['Poppins'] rounded-lg focus:outline-none px-4 py-3"
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
        className="bg-blue-700 hover:bg-blue-600 text-white text-xl font-bold py-3 px-4 rounded-lg w-1/5"
        onClick={copyPassword}
        >copy</button>
      </div>
      <div className='flex flex-wrap p-4 mt-5'>
        <input type="range" 
          className="w-2/6 cursor-pointer mr-5"
          min="8" max="50"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        /> <label htmlFor="range"
          className='text-white text-2xl font-["Poppins"]'
        >Length: {length}</label>
        <input type="checkbox" className="ml-10"
          checked={numAllowed}
          onChange = {() => setNumAllowed((prev) => !prev) }
        />
        <label htmlFor="checkbox" className='text-white text-2xl font-["Poppins"] ml-3'>Numbers</label>
        <input type="checkbox" className="ml-10"
          checked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label className='text-white text-2xl font-["Poppins"] ml-3'>Characters</label>
      </div>
    </div>
    </>
  )
}

export default App
