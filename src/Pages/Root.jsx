// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'

const Root = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Root