import React, { useState } from 'react'
import { FormControl, MenuItem, InputLabel } from '@mui/material'
import PropTypes from 'prop-types'

import { DltSelect } from "./DltSelect"

function SelectLabel(props) {
    const [labels, setLabels] = useState([{ id: 0, text: 'Hold Buy' }, { id: 1, text: 'Hold Sell' }, { id: 2, text: 'Buy' }, { id: 3, text: 'Sell' }])
  return (
    <FormControl fullWidth color='warning' focused>
      <InputLabel sx={{fontSize: 18}} shrink>{props.label}</InputLabel>
      <DltSelect onChange={props.onChange} value={props.value} name={props.name} readOnly={props.readOnly} disabled={props.disabled} sx={{'.Mui-disabled': {backgroundColor: '#0a061f', color: 'gray', '-webkit-text-fill-color': 'gray'}}}>
          {labels.map((v, i) => (
            <MenuItem value={v.id} key={i}>{v.text}</MenuItem>
          ))}
      </DltSelect>
    </FormControl>
  )
}

SelectLabel.propTypes = {
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool
}

SelectLabel.defaultProps = {
  readOnly: false,
  disabled: false
}

export default SelectLabel
