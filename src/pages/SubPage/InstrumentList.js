import React from 'react'
import NavBar from '../../components/Sub/NavBar'
import DropdownInstrument from '../../components/Sub/Dropdown/DropdownInstrument'
import DropdownInAll from '../../components/Sub/Dropdown/DropdownInAll'

const InstrumentList = () => {
  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex', gap: '835px' }}>
        <DropdownInstrument /><DropdownInAll />
      </div>
    </div>
  )
}

export default InstrumentList