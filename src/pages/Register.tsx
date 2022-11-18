import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RegisterUserInput } from '../schema/auth'
import { axios } from '../services'
import { userStore } from '../store'
import { User } from '../types'

function Register() {
  const [registerInfo, setRegisterInfo] = useState<RegisterUserInput>({
    password: '',
    email: '',
    username: '',
    imagen: '',
    alias: 'Sportbar'
  })
  const [img, setImg] = useState('')
  const [sending, setSending] = useState(false)
  const { setUser } = userStore()
  const nav = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value
    })
  }

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

  useEffect(() => {
    setRegisterInfo({
      ...registerInfo,
      imagen: img
    })
  }, [img])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setSending(true)
      await toast.promise(
        async () => {
          const { data }: AxiosResponse<User['body']> = await axios.post(
            '/api/register',
            registerInfo
          )
          await setUser(data)
        },
        {
          pending: 'Sending Info',
          success: 'User created successfully'
        }
      )
      setSending(false)
      nav('/inicio')
    } catch (e: any) {
      console.error(e)
      setSending(false)
      if (e.response.status === 413)
        return toast.error('The image is so big, please choose other')
      if (e.response.status === 400)
        return toast.error('This user already exist')
      toast.error(e)
    }
  }

  return (
    <div className='relative py-16 bg-[url("/bg-qatar.png")] bg-cover bg-no-repeat'>
      <div className='relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40'>
        <div className='m-auto space-y-4 md:w-8/12 lg:w-full'>
          <img
            src='logo.png'
            loading='lazy'
            className='w-16 ml-4'
            alt='tailus logo'
          />
          <div className='rounded-xl border bg-opacity-50 backdrop-blur-2xl bg-gray-900 shadow-xl'>
            <div className='lg:grid lg:grid-cols-2'>
              <div className='rounded-lg lg:block' hidden>
                <img
                  src='register-hero.jpg'
                  className='rounded-l-xl object-cover'
                  loading='lazy'
                  alt='music mood'
                />
              </div>
              <div className='p-6 sm:p-16'>
                <h2 className='mb-8 text-2xl text-yellow-300 font-bold'>
                  Register
                </h2>
                <form className='space-y-8' onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor='user' className='text-white'>
                      Username
                    </label>
                    <input
                      onChange={handleChange}
                      name='username'
                      id='user'
                      className='block w-full px-4 py-3 rounded-md border border-gray-300 text-white transition duration-300 focus:ring-2 bg-gray-400 focus:ring-sky-300 focus:outline-none invalid:ring-2 invalid:ring-red-400'
                    />
                  </div>
                  <div>
                    <label htmlFor='email' className='text-white'>
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      type='email'
                      name='email'
                      id='email'
                      className='block w-full px-4 py-3 rounded-md border border-gray-300 text-white transition bg-gray-400 duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none invalid:ring-2 invalid:ring-red-400'
                    />
                  </div>
                  <div>
                    <label htmlFor='pwd' className='text-gray-200'>
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      type='password'
                      name='password'
                      id='pwd'
                      className='block w-full px-4 py-3 rounded-md border border-gray-300 transition duration-300 bg-gray-400 text-white focus:ring-2 focus:ring-sky-300 focus:outline-none invalid:ring-2 invalid:ring-red-400'
                    />
                  </div>
                  <div>
                  <label className="block mb-2 text-md text-gray-200 dark:text-gray-300" htmlFor="file_input">Upload file</label>
                  <input className="block w-full text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={(e) => handleImage(e)} />
                  </div>
                  {sending ? (
                    <button
                      disabled
                      className='w-full py-3 px-6 rounded-md bg-yellow-300 focus:bg-yellow-400 active:bg-yellow-500'
                    >
                      <span className='text-white'>Sending</span>
                    </button>
                  ) : (
                    <button
                      type='submit'
                      className='w-full py-3 px-6 rounded-md bg-yellow-300 focus:bg-yellow-400 active:bg-yellow-500'
                    >
                      <span className='text-white'>Register</span>
                    </button>
                  )}
                  <p className='border-t pt-6 text-sm'>
                    Al ready register?{' '}
                    <Link to='/' className='text-yellow-300'>
                      Log In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
