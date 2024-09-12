import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const QuickLinkHome = () => {
  return (
    <div>
    <Link to="/giftCards">
      <Button className="bg-black text-white">
        List of Gift Cards
      </Button>
    </Link>
  </div>
  )
}

export default QuickLinkHome