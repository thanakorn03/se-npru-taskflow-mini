import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { reset as resetTasks } from '../store/slices/taskSlice';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { theme, setTheme, themes } = useTheme();

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetTasks());
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 border-b border-base-200">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary-content" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">
            Task<span className="text-primary">Flow</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Switcher */}
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-sm btn-circle"
            title="เปลี่ยนธีม"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>
          <div
            tabIndex={0}
            className="dropdown-content z-50 mt-2 p-3 shadow-xl bg-base-200 rounded-2xl w-52"
          >
            <p className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-2 px-1">
              Theme
            </p>
            <div className="grid grid-cols-4 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  title={t.label}
                  className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all hover:scale-110 ${
                    theme === t.id
                      ? 'ring-2 ring-primary ring-offset-1 ring-offset-base-200'
                      : ''
                  }`}
                >
                  <span
                    className="w-7 h-7 rounded-full shadow-sm border border-base-300"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="text-[9px] text-base-content/60 leading-none">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User info + Logout */}
        {user && (
          <>
            <span className="text-sm text-base-content/50 hidden sm:block">
              <span className="font-medium text-base-content">{user.name}</span>
            </span>
            <button onClick={onLogout} className="btn btn-ghost btn-sm gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round"/>
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
