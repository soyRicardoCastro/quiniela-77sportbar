import { useState } from 'react'
import { toast } from 'react-toastify'
import { Layout } from '../components'
import { axios } from '../services'
import { userStore } from '../store'
import { AxiosResponse } from 'axios'
import { User } from '../types'

function Settings() {
  const [modalOpen, setModalOpen] = useState(false)
  const { user, setUser } = userStore()
  const [name, setName] = useState(user?.username ? user?.username : '')
  const [img, setImg] = useState('')

  const src =
    user?.imagen !== ''
      ? user?.imagen
      : 'https://flowbite.com/docs/images/people/profile-picture-2.jpg'

  const toggleModal = () => setModalOpen(!modalOpen)

  // @ts-ignore
  const handleImage = (e) => {
    const file = e.target.files[0]
    setFileToBase(file)
  }
  // @ts-ignore
  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    // @ts-ignore
    reader.onloadend = () => setImg(reader.result)
  }

  const handleSubmit = async () => {
    toggleModal()
    try {
      interface Send {
        username?: string
        imagen?: string | unknown
      }
      let send: Send = {}
      if (name !== '') {
        send.username = name
      }
      if (img !== '') {
        send.imagen = img
      }
      console.log(send)
      const { data }: AxiosResponse<User['body']> = await axios.put(
        `/api/usuarios/${user?._id}`,
        send
      )
      setUser(data)
      toast.success('Successfully')
    } catch (error: any) {
      console.error(error)
      if (error.response.status === 413)
        return toast.error('La imagen es muy grande, elije otra')
      toast.error('Error')
    }
  }

  return (
    <Layout title='Settings'>
      <div className='flex items-center justify-center flex-col'>
        <div className='max-w-md p-6 rounded-md flex flex-col gap-4 justify-center settings_ui bg-gray-900 bg-opacity-90'>
          <picture className='user-img'>
            <img src={src} alt='user_image' className='user_image' />
          </picture>

          <label className='flex flex-col gap-2 my-5 text-gray-200'>
            Nombre
            <input
              type='text'
              name='name'
              className='rounded-md text-black'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>

          <label className="block mb-2 text-md text-gray-200 dark:text-gray-300" htmlFor="file_input">Upload file</label>
          <input className="block w-full text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" name='image' type="file" onChange={(e) => handleImage(e)} />

          {img !== '' && <img src={img} alt='' className='w-16 h-16' />}

          <button type='submit' className='px-3 py-2 rounded-md text-md text-white bg-yellow-300' onClick={handleSubmit}>Enviar</button>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
