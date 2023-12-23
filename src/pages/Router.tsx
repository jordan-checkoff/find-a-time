import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateEvent from './CreateEvent';
import ViewEvent from "./ViewEvent";


const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateEvent />
  },
  {
    path: "/event/:id",
    element: <ViewEvent />
  }
]);

export default function Router() {
    
    return (
        <RouterProvider router={router} />
    )

}