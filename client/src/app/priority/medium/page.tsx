import React from 'react'
import { Priority } from '@/state/api'
import ReusablePriorityPage from '../reusablePriorityPage';

type Props = {};


const Medium = (props: Props) => {
  return (
    <ReusablePriorityPage priority={Priority.Medium}/>
  )
}

export default Medium
