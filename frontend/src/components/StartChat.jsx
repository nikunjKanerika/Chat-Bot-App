import React from 'react'
import logo from '../assets/kanerika_logo.jpg'
function StartChat() {
  return (
    <div className='flex flex-col items-center p-6'>
        <img src={logo} alt="kanerika-logo" width={200} />
      <h1 className='text-lg'>Hi, How can I help you?</h1>
    </div>
  )
}

export default StartChat
