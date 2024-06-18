// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useSelector } from 'react-redux'
import userIcon from '../../assets/userIcon.svg'

const UserProfile = () => {
  const {user} =useSelector(state=>state.user)
  return (
    <div>
      <img src={userIcon} alt="" />
      <h3>{user.firstName+" " +user.lastName}</h3>
      <h4>{user.email}</h4>

    </div>
  )
}

export default UserProfile