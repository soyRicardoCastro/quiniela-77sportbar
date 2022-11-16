import { Link } from 'react-router-dom'

interface Props {
  body: {
    id: number
    imgA: string
    imgB: string
    nameA: string
    nameB: string
    isActive: boolean
  }
}

function TeamsCard({ imgA, imgB, nameA, nameB, isActive, id }: Props['body']) {
  return isActive ? (
    <article className='w-full max-w-md'>
      <div className='bg-gray-900 p-4 md:p-8 rounded-md'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <header className='flex flex-col md:grid md:grid-cols-3 md:place-content-center md:place-items-center gap-3 md:gap-6 items-center justify-center'>
            <div className='flex justify-center flex-col items-center'>
              <figure className='w-24'>
                <img className='mb-3 w-full rounded-md' src={imgA} alt={nameA} />
              </figure>
              <h5 className='mb-1 text-2xl overscroll-contain font-semibold text-white text-center'>
                {nameA}
              </h5>
            </div>
            <h4 className='text-4xl text-white font-extrabold'>VS</h4>
            <div className='flex justify-center flex-col items-center'>
              <figure className='w-24'>
                <img className='mb-3 w-full rounded-md' src={imgB} alt={nameB} />
              </figure>
              <h5 className='mb-1 text-2xl font-semibold text-white text-center'>
                {nameB}
              </h5>
            </div>
          </header>
          <div className='mt-4 flex space-x-3 lg:mt-6'>
            <Link
              to={`/apostar/${id}`}
              className='inline-flex items-center rounded-lg bg-yellow-300 py-3 px-6 text-center text-xl font-medium text-white focus:outline-none focus:ring-4 transition'
            >
              Bet
            </Link>
          </div>
        </div>
      </div>
    </article>
  ) : null
}

export default TeamsCard
