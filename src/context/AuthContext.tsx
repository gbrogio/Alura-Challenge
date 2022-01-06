import React, { createContext, useEffect, useState } from 'react';
import { setCookie, destroyCookie } from 'nookies';

import { User } from '@firebase/auth';
import useRouter from 'next/router';
import { authParams, dataParams } from 'lib-firebase';
import { ProjectProps } from 'types';

const AuthContext = createContext(null);

interface reloadUserInfo {
  reloadUserInfo: {
    screenName: string
  }
}

const formatUser = (user: User & reloadUserInfo) => ({
  email: user.email,
  name: user.displayName,
  photo: user.photoURL,
  uid: user.uid,
  screenName: user.reloadUserInfo.screenName,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [isUser, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter;

  const CookieName = 'CHALLENGE_ALURA_GBROGIO_COOKIE';

  const setSession = (session) => {
    if (session) {
      setCookie(undefined, CookieName, session, {
        maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
        path: '/',
      });
    } else {
      destroyCookie(undefined, CookieName);
    }
  };

  const handleUser = async (currentUser) => {
    if (currentUser) {
      const formattedUser = formatUser(currentUser);
      await setUser(formattedUser);
      setSession(currentUser.refreshToken);

      return currentUser.displayName;
    }
    setUser(null);
    setSession(false);

    return false;
  };

  const signInGithub = () => {
    try {
      setLoading(true);
      authParams.signInWithRedirect(authParams.auth, authParams.githubProvider)
        .then((result) => {
          const { user } = result;
          handleUser(user);
        });
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    try {
      setLoading(true);
      authParams.signOut(authParams.auth).then(() => {
        destroyCookie(undefined, CookieName);
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteAccount = async () => {
    try {
      setLoading(true);
      const docRefUser = dataParams.doc(dataParams.database, 'users', isUser.uid);
      const docSnapUser = await dataParams.getDoc(docRefUser);
      const docSnapData = await dataParams.getDocs(dataParams.collection(dataParams.database, 'projects'));
      const id = authParams.auth.currentUser.uid;

      docSnapData.forEach((doc) => {
        const data = doc.data() as (ProjectProps & { first: { first: 'first' } });

        if (!data.first) {
          if (data.usersLike.includes(id)) {
            const likesFiltered = data.projectLikes - 1;
            let usersFiltered;

            for (let i = 0; i < data.usersLike.length; i++) {
              if (data.usersLike[i] === id) {
                usersFiltered = data.usersLike.splice(i - 1, 1);
              }
            }

            dataParams.updateDoc(dataParams.doc(dataParams.database, 'projects', data.pid), {
              projectLikes: likesFiltered,
              usersLike: usersFiltered,
            });
          }
        }
      });
      if (docSnapUser.exists()) {
        const { projects } = docSnapUser.data();

        for (let i = 0; i < projects.length; i++) {
          dataParams.deleteDoc(dataParams.doc(dataParams.database, 'projects', projects[i]));
        }
      }

      await dataParams.deleteDoc(dataParams.doc(dataParams.database, 'users', id));
      // console.log(isCredentials);
      // authParams.reauthenticateWithCredential(
      //   authParams.auth.currentUser,
      //   null,
      // )
      //   .then(() => {
      //     console.log('successs');
      //   });
    } finally {
      setLoading(false);
      signOut();
      router.reload();
    }
  };

  useEffect(() => {
    const unSubscribe = authParams.onIdTokenChanged(authParams.auth, handleUser);

    return () => unSubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      isUser,
      isLoading,
      signInGithub,
      signOut,
      deleteAccount,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
