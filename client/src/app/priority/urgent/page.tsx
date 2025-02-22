import React from 'react'
import { Priority } from '@/state/api'
import ReusablePriorityPage from '../reusablePriorityPage';

type Props = {};


const Urgent = (props: Props) => {
  return (
    <ReusablePriorityPage priority={Priority.Urgent}/>
  )
}

export default Urgent
