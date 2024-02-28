import React from 'react'
import NavBar from '../../../components/Sub/NavBar'
import DropdownInstrument from '../../../components/Sub/Dropdown/DropdownInstrument'
import DropdownInAll from '../../../components/Sub/Dropdown/DropdownInAll'

const InstrumentList = () => {
  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DropdownInstrument />
        <div style={{ marginLeft: 'auto' }}>
          <DropdownInAll />
        </div>
      </div>
    </div>
  )
}
//style={{ display: 'flex', justifyContent: 'flex-end' }}

export default InstrumentList