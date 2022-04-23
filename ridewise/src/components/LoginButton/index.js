import React from 'react';
import axios from 'axios';
import { atom, useRecoilState } from 'recoil';
import { toastAtom } from '../ToastNotification';
import { GoogleLogin } from 'react-google-login';

export const userDataAtom = atom({
  key: 'userDataAtom',
  default: null,
});

export default function LoginButton() {
  const [, setUserData] = useRecoilState(userDataAtom);
  const [, setToastData] = useRecoilState(toastAtom);

  const onSuccess = loginData => {
    axios
      .post(
        `${process.env.REACT_APP_MONGO_DB_BASE_URL}/addUser?secret=${process.env.REACT_APP_REALM_SECRET}`,
        {
          name: loginData.profileObj.name,
          userId: loginData.profileObj.googleId,
          email: loginData.profileObj.email,
          profilePic: loginData.profileObj.imageUrl,
        }
      )
      .then(() => {
        console.log('Users Table updated at DB side!!');
        setUserData(loginData.profileObj);
        setToastData({
          message: 'User Synced',
          isOpen: true,
        });
      });
  };

  const onFailure = res => {
    console.log('Login failed: res:', res);
    console.log('Something went wrong with your login!!');
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        isSignedIn={true}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        scope="profile"
      />
    </div>
  );
}
