import React, { createContext, useState } from 'react'
export const ToggleContext = createContext()

const ToggleProvider = ({ children }) => {
  const [toggled, setToggled] = useState(false)

  const getSidebarCss = () => {
    return toggled ? 'sidebar js-sidebar collapsed' : 'sidebar js-sidebar'
  }

  const handleToggle = () => {
    setToggled(!toggled)
  }

  return (
    <ToggleContext.Provider value={{ getSidebarCss, handleToggle }}>
      {children}
    </ToggleContext.Provider>
  )
}

export default ToggleProvider
