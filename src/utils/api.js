import axios from 'axios';

const baseURL = 'https://forum-api.dicoding.dev/v1';
const headers = { 'Content-Type': 'application/json' };
const instance = axios.create({ baseURL, headers });

const api = {
  setAccessToken: (token) => localStorage.setItem('accessToken', token),
  removeAccessToken: () => localStorage.removeItem('accessToken'),
  getAccessToken: () => localStorage.getItem('accessToken'),
  checkAccessToken: () => {
    const token = api.getAccessToken();
    if (!token) {
      throw new Error('Invalid token structure');
    }
    return token;
  },

  login: async ({ email, password }) => {
    try {
      const { data } = await instance.post(
        '/login',
        { email, password },
      );
      return data.data.token;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  register: async ({ name, email, password }) => {
    try {
      const { data } = await instance.post(
        '/register',
        {
          name,
          email,
          password,
        },
      );
      return data.data.user;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  getOwnProfile: async () => {
    const token = api.checkAccessToken();

    try {
      const { data } = await instance.get(
        '/users/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data.data.user;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  getAllUsers: async () => {
    const { data } = await instance.get('/users');
    return data.data.users;
  },

  createThread: async ({ title, body, category }) => {
    const token = api.checkAccessToken();

    try {
      const { data } = await instance.post(
        '/threads',
        { title, body, category },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data.data.thread;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  getAllThreads: async () => {
    const { data } = await instance.get('/threads');
    return data.data.threads;
  },

  getThreadDetail: async (id) => {
    const { data } = await instance.get(`/threads/${id}`);
    return data.data.detailThread;
  },

  createComment: async ({ threadId, content }) => {
    const token = api.checkAccessToken();

    try {
      const { data } = await instance.post(
        `/threads/${threadId}/comments`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data.data.comment;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  voteThread: async (threadId, voteType) => {
    const token = api.checkAccessToken();

    try {
      const { data } = await instance.post(
        `/threads/${threadId}/${voteType}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data.data.vote;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  voteComment: async ({ threadId, commentId, voteType }) => {
    const token = api.checkAccessToken();

    try {
      const { data } = await instance.post(
        `/threads/${threadId}/comments/${commentId}/${voteType}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data.data.vote;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  getLeaderboards: async () => {
    const { data } = await instance.get('/leaderboards');
    return data.data.leaderboards;
  },
};

export default api;
