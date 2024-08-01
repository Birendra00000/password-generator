"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";

const MainPage = () => {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [specialCharacter, setspecialCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef();
  console.log(passwordRef);
  const handleNumbers = () => {
    setNumbers((numbers) => !numbers);
  };
  const handleSpecialCharacters = () => {
    setspecialCharacter((specialCharacter) => !specialCharacter);
  };

  //useRef hooks
  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let strg = "  ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) {
      strg += "0987654321";
    }
    if (specialCharacter) {
      strg += ",`~?@#$%^&*+-/:;";
    }

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * strg.length + 1);
      pass += strg.charAt(char);
    }
    setPassword(pass);
  }, [length, numbers, specialCharacter, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, specialCharacter, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-600 h-[300px] text-orange-500">
      <h3 className="text-white text-center p-2 text-semibold text-[20px]">
        Random Password Generator
      </h3>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 placeholder="
          placeholder="password"
          ref={passwordRef}
        />
        <button
          className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0"
          onClick={copyPasswordtoClipboard}
        >
          copy
        </button>
      </div>
      <div className="flex  flex-col gap-4 text-wm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="inputNumber"
            defaultChecked={numbers}
            onChange={handleNumbers}
          />
          <label htmlFor="inputNumber">Numbers</label>
        </div>{" "}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="inputspecialchar"
            defaultChecked={specialCharacter}
            onChange={handleSpecialCharacters}
          />
          <label htmlFor="inputspecialchar">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
