import { prefix } from './';

export const getRequest = (path: string) => {
  return fetch(`${prefix}/${path}`).then(res => res.json());
};

export const postRequest = (path: string, body: any) => {
  return fetch(`${prefix}/${path}`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
};
