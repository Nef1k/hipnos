import s from './BaseLayout.module.css';
import {Outlet} from "react-router-dom";

const BaseLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  )
}

export default BaseLayout;
