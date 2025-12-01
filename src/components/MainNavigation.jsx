import { NavLink, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useAuth } from "../auth/AuthContext";
import Logo from "./Logo";

function MainNavigation() {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOutUser();
    navigate("/", { replace: true });
  }

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Logo size="md" />

        <nav className={classes.nav}>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Contact
              </NavLink>
            </li>

            {user ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    className={classes.linkButton}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainNavigation;
