import { useState } from 'react'

const PersonFilter = (props) => {

  const [localFilter, setLocalFilter] = useState('')

  const handleFilterChange = (event) => {
    setLocalFilter(event.target.value)
    props.setNewFilter(event.target.value)
  }

  return (
    <div>
      filter show with: 
        <input value={localFilter}
        onChange={handleFilterChange}/>
    </div>
  )
}

export default PersonFilter