import React from 'react'
import logo from '../assets/kanerika_logo.jpg'
function StartChat() {
  return (
    <div className='flex flex-col items-center p-6'>
        <img src={logo} alt="kanerika-logo" width={100} />
      <h1>Welcome/Start to chat</h1>
    </div>
  )
}

export default StartChat
