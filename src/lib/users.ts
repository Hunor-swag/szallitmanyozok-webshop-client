export async function getUserByEmail(email: string) {
  const res = await fetch(`${process.env.API_URL}/api/auth/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  const data = await res.json();
  return data;
}

// export async function getUserById(id: number) {
//   const res = await fetch(`/api/auth/users`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       id,
//     }),
//   });
//   const data = await res.json();
//   return data;
// }
