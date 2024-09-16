export default function findUsers(users, userName) {
  return userName.length >= 4
    ? users.filter((user) =>
        user.name.toLowerCase().includes(userName.toLowerCase())
      )
    : users;
}
