import './assets/css/index.css'
import { useState, useCallback, useEffect, useRef } from "react";
function PasswordGenerator() {
    let [length, setLength] = useState(8)
    let [numberAllowed, setNumberAllowed] = useState(true)
    let [charAllowed, setcharAllowed] = useState(true)
    let [password, setPassword] = useState("")

    let passwordRef = useRef(null)

    let PasswordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlmnopqrst"
        let character = "{!$^&#*)_|"
        let number = "1234567890"

        if (numberAllowed) (str += number)
        if (charAllowed) (str += character)

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
        }
        setPassword(pass)

    }, [length, numberAllowed, charAllowed, setPassword])

    let copyPasswordToClipboard = useCallback(() => {
        passwordRef.current.select();
        window.navigator.clipboard.writeText(password)
    }, [password])

    useEffect(() => {
        PasswordGenerator()
    }, [length, numberAllowed, charAllowed, PasswordGenerator])

    return (
        <>
            <div className="container">
                <h2 className="title">Password Generator</h2>
                <div className="result">
                    <div className='position-relative'>
                        <input type="text" className="form-control" ref={passwordRef} readOnly defaultValue={password} />
                        <button className='btn btn-info copy_btn' onClick={copyPasswordToClipboard}><i className="fa-regular fa-clipboard"></i>Copy</button>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="range" className='form-label d-block text-center text-white'>Length</label>
                        <div className='d-flex justify-content-around'>
                            <p className='m-0 p-0 text-white'>0</p>
                            <input type="range" name="range" id="range" max="20" min="4" defaultValue={length}
                                onChange={(e) => {
                                    setLength(e.target.value)
                                }}
                            />
                            <p className='m-0 p-0 text-white'>20</p>
                        </div>
                        <label htmlFor="range" className='form-label d-block text-center text-white'>{length}</label>
                    </div>
                </div>
                <div className="settings">
                    <div className="setting">
                        <input type="checkbox" id="uppercase" defaultChecked={numberAllowed}
                            onChange={() => {
                                setNumberAllowed((prev) => !prev)
                            }}
                        />
                        <label htmlFor="uppercase">Include Numer</label>
                    </div>
                    <div className="setting">
                        <input type="checkbox" id="lowercase" defaultChecked={charAllowed}
                            onChange={() => {
                                setcharAllowed((prev) => !prev)
                            }}
                        />
                        <label htmlFor="lowercase">Include Character</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PasswordGenerator