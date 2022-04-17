import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  NavLink
} from 'react-router-dom';

import { RangeFixed } from '../../pages/exercise1';
import { RangeFree } from '../../pages/exercise2';

export const Navigation = () => {
  return (
    <BrowserRouter>
      <div className="main-layout">
        <nav>
            <div className='title'>{`< Range />`}</div>
          <ul>
            <li>
              <NavLink to="/exercise1" className={({isActive}) => isActive ? "nav-active": ''} >Exercise 1</NavLink>
            </li>
            <li>
              <NavLink to="/exercise2"  className={({isActive}) => isActive ? "nav-active": ''} >Exercise 2</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to='/exercise1' replace />} />
          <Route path="/exercise1" element={<RangeFixed />} />
          <Route path="/exercise2" element={<RangeFree />} />

          <Route path="/*" element={<Navigate to='/exercise1' replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}