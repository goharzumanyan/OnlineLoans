import { lazy, Suspense } from "react";
import { Redirect, Route, Router, Switch, useRouteMatch } from "react-router-dom";
import customHistory from "../helpers/history";

const LoanPage = lazy(() => import("../pages/loan-page"));
const ProfileSetup = lazy(() => import("../pages/profile-setup"));

const NewLoanApplicationRoutes = () => {
  const { path, url } = useRouteMatch();
  return (
    <Router history={customHistory}>
      <Suspense fallback="loading">
        <Switch>
          <Route path={`${path}/profile`}>
            <ProfileSetup />
          </Route>
          <Route path={`${path}/application`}>
            <LoanPage />
          </Route>
          <Route path={`${path}`}>
            <Redirect to={`${path}/profile`} />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default NewLoanApplicationRoutes;
