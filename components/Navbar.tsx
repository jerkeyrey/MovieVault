import React from 'react'
import { Button } from '@/components/ui/button'
import SearchBar from './SearchBar'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h3 className='navbar-title'>MovieVault</h3>
      <SearchBar />
      <Button className='bookmark-btn'>Bookmarks</Button>
    </nav>
  )
}

export default Navbar