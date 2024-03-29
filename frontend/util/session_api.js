export const confirmEmail = email => {
  return $.ajax({
    method: "POST",
    url: `api/session/email`,
    data: email 
  });
}

export const signUp = user => {
  return $.ajax({
    method: "POST",
    url: 'api/users',
    data: { user },
  });
};

export const login = user => {
  return $.ajax({
    method: "POST",
    url: 'api/session',
    data: { user },
  });
};

export const logOut = () => {
  return $.ajax({
    method: "DELETE",
    url: 'api/session',
  });
};