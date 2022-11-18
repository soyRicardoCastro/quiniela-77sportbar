import { Layout } from '../components'
import { Table } from 'flowbite-react'
import { useUsers } from '../query/users'
import { userStore } from '../store'

function Leaderboard() {
  const { data: users } = useUsers()
  const { user: profile } = userStore()
  const usersSorted = users?.sort((a, b) => b.puntos - a.puntos)

  const styleName = 'text-yellow-300'

  return (
    <Layout title='Leaderboard'>
      <Table>
        <Table.Head>
          <Table.HeadCell>
            Position
          </Table.HeadCell>
          <Table.HeadCell>
            Username
          </Table.HeadCell>
          <Table.HeadCell>
            Score
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className='bg-gray-900 bg-opacity-90 py-10'>
          {usersSorted?.map((user, i) => (
          <Table.Row key={i} className='my-4'>
            <Table.Cell className={`font-bold text-md text-center ${user._id === profile?._id && styleName}`}>
              {i + 1}
            </Table.Cell>
            <Table.Cell className={`font-bold text-md text-center ${user._id === profile?._id && styleName}`}>
              {user.username}
            </Table.Cell>
            <Table.Cell className={`font-bold text-md text-center ${user._id === profile?._id && styleName}`}>
              {user.puntos}
            </Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
      </Table>

    </Layout>
  )
}

export default Leaderboard
