import axios from 'axios';

export const api = (() => {
  const instance = axios.create({
    baseURL: 'https://forum-api.dicoding.dev/v1',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
  };

  const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
  };

  const getAccessToken = () => localStorage.getItem('accessToken');

  const login = async ({ email, password }) => {
    try {
      const response = await instance.post('/login', { email, password });
      const { token } = response.data.data;
      return token;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const response = await instance.post('/register', {
        name,
        email,
        password,
      });
      const { user } = response.data.data;
      return user;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const getOwnProfile = async () => {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const response = await instance.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { user } = response.data.data;
      return user;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const getAllUsers = async () => {
    const response = await instance.get('/users');
    const { users } = response.data.data;
    return users;
  };

  const createThread = async ({ title, body, category }) => {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const response = await instance.post(
        '/threads',
        { title, body, category },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const { thread } = response.data.data;
      return thread;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const getAllThreads = async () => {
    const response = await instance.get('/threads');
    const { threads } = response.data.data;
    return threads;
  };

  const upVoteThread = async (threadId) => {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const response = await instance.post(
        `/threads/${threadId}/up-vote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const { vote } = response.data.data;
      return vote;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const downVoteThread = async (threadId) => {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const response = await instance.post(
        `/threads/${threadId}/down-vote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const { vote } = response.data.data;
      return vote;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const clearVoteThread = async (threadId) => {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const response = await instance.post(
        `/threads/${threadId}/neutral-vote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const { vote } = response.data.data;
      return vote;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const getThreadDetail = async (id) => {
    const response = await instance.get(`/threads/${id}`);
    const { detailThread } = response.data.data;
    return detailThread;
  };

  const addComment = async ({ threadId, content }) => {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const response = await instance.post(
        `/threads/${threadId}/comments`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const { comment } = response.data.data;
      return comment;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const upVoteComment = async ({ threadId, commentId }) => {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const response = await instance.post(
        `/threads/${threadId}/comments/${commentId}/up-vote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const { vote } = response.data.data;
      return vote;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const downVoteComment = async ({ threadId, commentId }) => {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const response = await instance.post(
        `/threads/${threadId}/comments/${commentId}/down-vote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const { vote } = response.data.data;
      return vote;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const clearVoteComment = async ({ threadId, commentId }) => {
    const token = getAccessToken();
    if (!token) {
      throw new Error('Unauthorized');
    }

    try {
      const response = await instance.post(
        `/threads/${threadId}/comments/${commentId}/neutral-vote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const { vote } = response.data.data;
      return vote;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  const getLeaderboards = async () => {
    try {
      const response = await instance.get('/leaderboards');
      const { leaderboards } = response.data.data;
      return leaderboards;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  };

  return {
    setAccessToken,
    removeAccessToken,
    getAccessToken,
    login,
    register,
    getOwnProfile,
    getAllUsers,
    createThread,
    getAllThreads,
    upVoteThread,
    downVoteThread,
    clearVoteThread,
    getThreadDetail,
    addComment,
    upVoteComment,
    downVoteComment,
    clearVoteComment,
    getLeaderboards,
  };
})();
