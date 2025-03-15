// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Autocomplete from './components/Autocomplete';

function App() {

  const sampleOptionsList = [
    {
      value: "EW1",
      name: "Pasir Ris"
    },
    {
      value: "EW2/DT32",
      name: "Tampines"
    },
    {
      value: "EW3",
      name: "Simei"
    },
    {
      value: "EW4/CG",
      name: "Tanah Merah"
    },
    {
      value: "EW5",
      name: "Bedok"
    },
    {
      value: "EW6",
      name: "Kembangan"
    },
    {
      value: "EW7",
      name: "Eunos"
    },
    {
      value: "EW8/CC9",
      name: "Paya Lebar"
    },
    {
      value: "EW9",
      name: "Aljunied"
    },
    {
      value: "EW10",
      name: "Kallang"
    }
  ]

  const sampleRenderObjectOption = (option: any) => {
    return (
      <>
        <span>{option.name}</span>
        <span>{option.value}</span>
      </>
    )
  }

  return (
    <>
      <Autocomplete
        searchType="async"
        description={"Searching of MRT Stations"}
        label={"Async Search"}
        options={sampleOptionsList}
        renderOption={sampleRenderObjectOption}
        multiple={true}
      />
      <Autocomplete
        label="Fruits"
        description="Select your favorite fruits."
        searchType="sync"
        options={["Apple", "Banana", "Cherry"]}
        renderOption={(option) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>🍎</span>
            <span>{typeof option === "string" ? option : option.name}</span>
          </div>
        )}
        placeholder="Search fruits..." />
    </>
  )
}

export default App
