import { lazy, Suspense } from "react";
import { Redirect, Route, Router, Switch, useRouteMatch } from "react-router-dom";
import customHistory from "../helpers/history";
import { ProfileAttachmentsProvider } from "../stores/attachments"

const ContactDetails = lazy(() => import("../pages/contact-details"));
const BuyerPersonalDetails = lazy(() => import("../pages/buyer-personal-details"));
const UserDocuments = lazy(() => import("../pages/user-documents"));
const PhoneVerification = lazy(() => import("../pages/phone-verification"));
const EmailVerification = lazy(() => import("../pages/email-verification"));
const UserAddress = lazy(() => import("../pages/user-address"));

const ProfileRoutes = () => {
  const { path, url } = useRouteMatch();
  return (
    <Router history={customHistory}>
      <Suspense fallback="loading">
        <Switch>
          <Route path={`${path}/contact-details`} exact>
            <ContactDetails />
          </Route>
          <Route path={`${path}/phone-verification`} exact>
            <PhoneVerification />
          </Route>
          <Route path={`${path}/email-verification`} exact>
            <EmailVerification />
          </Route>
          <Route path={`${path}/personal-details`} exact>
            <BuyerPersonalDetails />
          </Route>
          <Route path={`${path}/address`} exact>
            <UserAddress />
          </Route>
          <Route path={`${path}/attachments`} exact>
            <ProfileAttachmentsProvider>
              <UserDocuments />
            </ProfileAttachmentsProvider>
          </Route>
          <Route path={`${path}`}>
            <Redirect to={`${path}/personal-details`} />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default ProfileRoutes;
