import LOGIN from '../pages/login.jsx';
import HOME from '../pages/home.jsx';
import ADMIN from '../pages/admin.jsx';
import SETTINGS from '../pages/settings.jsx';
import USER_DETAILS from '../pages/user-details.jsx';
export const routers = [{
  id: "login",
  component: LOGIN
}, {
  id: "home",
  component: HOME
}, {
  id: "admin",
  component: ADMIN
}, {
  id: "settings",
  component: SETTINGS
}, {
  id: "user-details",
  component: USER_DETAILS
}]