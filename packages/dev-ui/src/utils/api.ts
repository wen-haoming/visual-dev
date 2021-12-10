export const urlPrefix = `http://localhost:10078/web-devtools`;

export const getRequest = (path: string) => {
  return fetch(`${urlPrefix}/${path}`).then((res) => res.json());
};

export const postRequest = (path: string, body: any) => {
  return fetch(`${urlPrefix}/${path}`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};
