import { useState, useImperativeHandle, forwardRef } from 'react'

// Komponentin luova funktio on kääritty funktiokutsun forwardRef sisälle,
// jolloin komponentti pääsee käsiksi sille määriteltyyn refiin.

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Komponentti tarjoaa useImperativeHandle-hookin avulla sisäisesti määritellyn
  // funktionsa toggleVisibility ulkopuolelta kutsuttavaksi.
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })



  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable