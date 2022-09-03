import { lazy, Suspense } from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import customHistory from "../helpers/history";

import { useSession } from "../stores/session";

import NewLoanApplicationComponent from "../components/new-loan-application";

const ProfileSetup = lazy(() => import("../pages/profile-setup"));
const LoanPage = lazy(() => import("../pages/loan-page"));

const RequireAuth = ({ user, children }) => {
  const session = useSession();
  //return session.isAuthenticated ? children : window.location.href = '/auth/login';
  return session
    ? session.isAuthenticated
      ? children
      : <Redirect to='/auth/login' />
    : null;
}

const AppRoutes = () => {
  const currentUrl = encodeURIComponent(window.location.href);
  return (
    <Router history={customHistory}>
      <Suspense fallback="loading">
        <Switch>
          <Route path="/profile">
            <RequireAuth>
              <ProfileSetup />
            </RequireAuth>
          </Route>
          <Route path="/auth/login" render={() => window.location.href = `/auth/login?returnUrl=${currentUrl}`} />
          <Route path="/auth/logout" render={() => window.location.href = '/auth/logout'} />
          <Route path="/new-loan-application">
            <RequireAuth>
              <NewLoanApplicationComponent />
            </RequireAuth>
          </Route>
          <Route path="/loan-applications/:appId">
            <RequireAuth>
              <LoanPage />
            </RequireAuth>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
