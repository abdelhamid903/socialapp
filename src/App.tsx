
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Notfound from './components/Notfound'
import Feed from './pages/Feed'
import AuthContextProvider from './context/AuthContext'
import ProtectedRouting from './ProtectedRouting'
import PostDetail from './pages/PostDetail'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
export default function App() {
  const routes=createBrowserRouter([
    {
      path:'',element:<Layout/>,children:[
        {index:true,element:<Register/>},
        {path:'login',element:<Login/>},
        {path:'profile',element:<ProtectedRouting><Profile/></ProtectedRouting>},
        {path:'post/:id',element:<ProtectedRouting><PostDetail/></ProtectedRouting>},
        {path:'feed',element:<ProtectedRouting><Feed/></ProtectedRouting>},
        {path:'*',element:<Notfound/>},
      ]
    }
  ])
  const queryClient=new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={routes} />
        </AuthContextProvider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </>
  );
}
