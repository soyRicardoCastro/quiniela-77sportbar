import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface Props {
  body: {
    children: JSX.Element | JSX.Element[]
    title: string
  }
}

function Layout({ children, title }: Props['body']) {
  return (
    <main className='w-full h-full flex bg-[url("/bg-qatar.png")] bg-cover bg-center bg-opacity-60 bg-no-repeat bg-fixed dark'>
      <Sidebar />

      <div className='w-full  my-12 mx-5'>
        <Header title={title} />
        {children}
      </div>
    </main>
  )
}

export default Layout
