import { createContext, useEffect, useContext, useState } from "react";
import _ from "lodash";

const initialState = {
  data: undefined,
  isLoading: false,
};

const ProfileContext = createContext(initialState);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(initialState);

  const load = () => {
    setProfile({ isLoading: true });
    fetch("/api/profile").then(async (response) => {
      let data = undefined;
      if (response.ok) {
        data = await response.json();
      }
      setProfile({ data, isLoading: false });
    }).catch(err => {
      setProfile({ data: {}, isLoading: false });
      console.log("ERROR", err)
    });
  }
  
  const setData = (data) => {
    if (!_.isEqual(data, profile.data)) {
      fetch(`/api/profile`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }).then(response => { load(); })
        .catch(error => console.error(error))
        .finally(() => { });
    }
  }

  useEffect(() => {
    load();
  }, []);

  if(profile?.isLoading) {
    return <div> loading ...</div>
  }

  return (
      <ProfileContext.Provider value={{ ...profile, setData }}>
       {children}
      </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
