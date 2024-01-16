import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateEvent from './CreateEvent';
import ViewEventPage from "./ViewEventPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateEvent />
  },
  {
    path: "/event/:id",
    element: <ViewEventPage />
  }
]);

export default function Router() {
    
    return (
        <RouterProvider router={router} />
    )

}