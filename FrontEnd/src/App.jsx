import {BookingForm, Home, MapControls, PaymentForm, SpotDetailsModal, SpotMarker} from './components/index';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path : "/",
    element : <div>
      <Home/>
    </div>
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}