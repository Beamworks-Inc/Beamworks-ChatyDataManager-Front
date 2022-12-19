import React from 'react';
type Profile={
    username : string,
    name : string
}
const Profile= ({ username, name }: Profile) => {
  return (
    <div>
      <b>{username}</b>&nbsp;
      <span>({name})</span>
    </div>
  );
};

export default Profile;