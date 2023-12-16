
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ResultPage from './components/ResultPage/ResultPage';

function App() {

  const router=createBrowserRouter([
    {path:'/',
     element:<LandingPage/>
     },
     {
      path:'/result/:id',
      element:<ResultPage/>
     }
  ])

  return (
   <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
