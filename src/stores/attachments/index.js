import { createContext, useEffect, useContext, useState } from "react";

const initialState = {
  attachments: [],
  isLoading: false,
  reload: () => { },
  addAttachment: () => { }
}

const ProfileAttachmentsContext = createContext(initialState);

export const ProfileAttachmentsProvider = ({ children }) => {
  const [attachments, setAttachments] = useState(initialState.attachments);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);

  const load = () => {
    setIsLoading(true);
    fetch("/api/uploads").then(async (response) => {
      let data = undefined;
      if (response.ok) {
        data = await response.json();
      }
      setAttachments(data);
    }).catch(err => console.log("ERROR", err))
      .finally(() => setIsLoading(false));
  }

  const reload = load;

  const addAttachment = (data) => {
    if (data?.id) {
      let newAttachments = attachments.filter(item => item?.id !== data.id);
      newAttachments.push(data);
      setAttachments(newAttachments);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if(isLoading) {
    return <div>loading ...</div>
  }

  return (
    <ProfileAttachmentsContext.Provider value={{ attachments, isLoading, reload, addAttachment }}>
      {children}
    </ProfileAttachmentsContext.Provider>
  );
};

export const useProfileAttachments = () => useContext(ProfileAttachmentsContext);
