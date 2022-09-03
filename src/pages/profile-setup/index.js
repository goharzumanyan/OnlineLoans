import ProfileRoutes from "../../routes/profile.js";
import { ProfileProvider } from "../../stores/profile";

const ProfileSetup = () => {
  return <>
    <ProfileProvider>
      <ProfileRoutes />
    </ProfileProvider>
  </>;
}

export default ProfileSetup;
