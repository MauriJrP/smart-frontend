import React from 'react'
import {ButtonGroup, Button, Container} from '@mui/material'
import {Outlet, NavLink} from 'react-router-dom'

export default function SmartPage() {
  return (
    <Container className="bg-white mx-auto md:p-10 flex flex-col items-center gap-5 overflow-x-auto ">
      <ButtonGroup variant="text" aria-label="text button group" className='overflow-x-auto max-w-full' >
        <Button className='min-w-min'>
          <NavLink  to="curriculums" className={({ isActive }) => isActive ? 'text-black ' : 'hover:text-gray-500'}>Mallas</NavLink>
        </Button>
        <Button className='min-w-min'>
          <NavLink to="add-curriculum" className={({ isActive }) => isActive ? 'text-black ' : 'hover:text-gray-500'}>Agregar Malla</NavLink>
        </Button>
        <Button className='min-w-min'>
          <NavLink to="students" className={({ isActive }) => isActive ? 'text-black ' : 'hover:text-gray-500'}>Estudiantes</NavLink>
        </Button>
        <Button className='min-w-min'>
          <NavLink to="reports" className={({ isActive }) => isActive ? 'text-black ' : 'hover:text-gray-500'}>Reportes</NavLink>
        </Button>
        {/* <Button>
          <NavLink to="remove-place" className={({ isActive }) => isActive ? 'text-black ' : 'hover:text-gray-500'}>Reportes</NavLink>
        </Button> */}
      </ButtonGroup>

      <Outlet />
    </Container>
  )
}
