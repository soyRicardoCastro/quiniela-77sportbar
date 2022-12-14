import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Layout } from '../components'
import { usePronostico } from '../query/pronosticos'
import { userStore } from '../store'
import { toast } from 'react-toastify'
import { axios } from '../services'
import { AxiosResponse } from 'axios'
import { User } from '../types'

function Pronostico() {
  const params = useParams()
  const id = params.id as string
  const { data } = usePronostico(id)
  const [golesLocal, setGolesLocal] = useState(data?.golesLocal || 0)
  const [golesVisita, setGolesVisita] = useState(data?.golesVisita || 0)
  const [sending, setSending] = useState(false)
  const { user, setUser } = userStore()

  const nav = useNavigate()

  const minusVisita = () => golesVisita > 0 && setGolesVisita(golesVisita - 1)
  const minusLocal = () => golesLocal > 0 && setGolesLocal(golesLocal - 1)
  const plusVisita = () => setGolesVisita(golesVisita + 1)
  const plusLocal = () => setGolesLocal(golesLocal + 1)

  const handleSubmit = async () => {
    try {
      setSending(true)

      if (!user) return

      const apuesta = {
        golesLocal: golesLocal,
        golesVisita: golesVisita
      }

      await toast.promise(
        async () => axios.put(`/api/updatePronostico/${id}`, apuesta),
        {
          pending: 'Sending bet',
          success: 'Successfully',
          error: 'Error'
        }
      )

      const { data }: AxiosResponse<User['body']> = await axios.get(
        `/api/usuarios/${user._id}`
      )
      setUser(data)
      nav('/mis-pronosticos')
      setSending(false)
    } catch (e) {
      console.error(e)
      setSending(false)
    }
  }

  return (
    <Layout title='Pronostico'>
      <article className='flex flex-col md:flex-row items-center justify-evenly max-w-md mx-auto py-3 px-3 bg-gray-900 rounded-md gap-2'>
        <div className='text-xl text-white font-semibold flex flex-col items-center justify-center'>
          <img
            src={data?.partido.equipoLocal.imagen}
            className='mb-3 w-24 rounded-md'
            alt={data?.partido.equipoLocal.nombre}
          />

          <div className='flex flex-col text-2xl w-full mx-auto justify-center items-center'>
            <p>{data?.partido.equipoLocal.nombre}</p>

            <div className='flex items-center justify-between w-full my-3'>
              <button onClick={minusLocal} className='text-2xl font-bold'>
                -
              </button>
              <p className='text-5xl font-bold'>{golesLocal}</p>
              <button onClick={plusLocal} className='text-2xl font-bold'>
                +
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-3xl font-black text-white hidden md:inline-flex'>
            VS
          </h3>
        </div>

        <div className='text-xl text-white font-semibold flex flex-col items-center justify-center'>
          <img
            src={data?.partido.equipoVisita.imagen}
            className='mb-3 w-24 rounded-md'
            alt={data?.partido.equipoVisita.nombre}
          />

          <div className='flex flex-col w-full mx-auto justify-center items-center text-2xl'>
            <p>{data?.partido.equipoVisita.nombre}</p>

            <div className='flex items-center justify-between w-full my-3'>
              <button onClick={minusVisita} className='text-2xl font-bold'>
                -
              </button>
              <p className='text-5xl font-bold'>{golesVisita}</p>
              <button onClick={plusVisita} className='text-2xl font-bold'>
                +
              </button>
            </div>
          </div>
        </div>
      </article>

      {sending ? (
        <button
          disabled
          className='mx-auto flex justify-center w-52 my-10 px-6 py-3 rounded-md bg-yellow-100 text-xl font-medium text-white'
        >
          Sending
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className='mx-auto flex justify-center w-52 my-10 px-6 py-3 rounded-md bg-yellow-300 text-xl font-medium text-white'
        >
          Bet
        </button>
      )}
    </Layout>
  )
}

export default Pronostico
