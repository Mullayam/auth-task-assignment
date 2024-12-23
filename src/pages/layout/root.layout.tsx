import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from './header';
import LeftSidbar from './leftSidbar';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore';
import { apiHandlers } from '@/lib/api/handler';
import { logoutUser } from '@/store/slices/auth.actions';
import BackgroundLayer from '@/components/bg-layer';

const RootLayout = () => {
  const history = useLocation();
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(true);
  const { user } = useAppSelector(x => x.auth);

  const fetchUser = React.useCallback(async () => {
    const { data } = await apiHandlers.fetchUser();
    if (!data.success) {
      return dispatch(logoutUser())
    }

  }, [dispatch])

  React.useLayoutEffect(() => {
    if (user) fetchUser()

  }, [user, fetchUser])
  if (!user) {
    return <Navigate to="/login" state={{ from: history.pathname }} />
  }
  return (
    <div className="flex flex-col relative">
      <BackgroundLayer />
      <Header open={open} setOpen={setOpen} />
      {/* main container */}
      <div className="flex-1 flex flex-row overflow-y-hidden pt-16">
        <main className={`flex-1 ${open ? "lg:ml-64 xl:ml-70 md:ml-64 " : "lg:ml-16 xl:ml-16 md:ml-16"} p-4 relative w-full duration-75 h-full transition-width bg-transparent overflow-y-auto`}>
          <Outlet />
        </main>
        {/* Left Sidebar */}
        <nav className="order-first">
          <LeftSidbar open={open} />
        </nav>

      </div>
    </div>
  )
}

export default RootLayout