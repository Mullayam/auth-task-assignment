import { useAppSelector } from '@/hooks/useAppStore'
import UserProfileCard from './UserProfileCard'
import { Navigate } from 'react-router-dom'
import ListOfUsers from './listOfUsers'
import { useCallback, useEffect, useState } from 'react'
import { apiHandlers } from '@/lib/api/handler'
const Home = () => {
  const { user } = useAppSelector(x => x.auth)
  const [displayProfile, setDisplayProfile] = useState<string | null>(null)
  const [currentUser, setCurentUser] = useState(user)

  if (!user) {
    return <Navigate to="/login" />
  }
  useEffect(() => {
    document.title = "Dashboard"
  }, [])


  const fetchUserWithId = useCallback(async (id: string) => {
    try {
      setDisplayProfile(id)
      const { data } = await apiHandlers.getSingleUser(id)
      if (!data.success) {
        throw new Error(data.message)
      }
      setCurentUser(data.result)
    } catch (error) {
      setDisplayProfile(null)
    }
  }, [])

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome back, {user.name}</p>
      <div className='flex flex-col md:flex-row gap-4 flex-wrap'>
        <UserProfileCard user={currentUser} />
        <ListOfUsers
          fetchUserWithId={fetchUserWithId}
        />
      </div>
    </main>
  )
}

export default Home