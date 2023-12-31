'use client'

import { Icon } from '@chakra-ui/react'
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineDollar, AiOutlineFilePdf, AiOutlineUser, AiOutlineUserSwitch } from 'react-icons/ai'


export const Dollar = ({ props }) => { return <IconWrapper icon={AiOutlineDollar} {...props} /> }
export const ListingAgent = ({ props }) => { return <IconWrapper icon={AiOutlineUser} {...props} /> }
export const CoListingAgent = ({ props }) => { return <IconWrapper icon={AiOutlineUserSwitch} {...props} /> } 
export const Task = ({ props }) => { return <IconWrapper icon={AiOutlineClockCircle} {...props} /> }
export const DueDate = ({ props }) => { return <IconWrapper icon={AiOutlineCalendar} {...props} /> }
export const Offer = ({ props }) => { return <IconWrapper icon={AiOutlineFilePdf} fontSize="5xl" color="green.500" /> }

const IconWrapper = ({ icon, ...props }) => { return <Icon as={icon} fontSize="2xl" {...props}  /> }