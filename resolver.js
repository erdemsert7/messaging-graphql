const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

const resolvers = {
  Query: {
    getUserByUsername: async (_, { username }, { token }) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users?username=${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user');
      }
    },
    getUserByEmail: async (_, { email }, { token }) => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/users?email=${email}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.data;
        } catch (error) {
          throw new Error(error.response?.data?.message || 'Failed to fetch user');
        }
      },
    getMessages: async (_, { otherUsername }, { token }) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/messages/${otherUsername}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch messages');
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/users`, {
          username,
          email,
          password,
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create user');
      }
    },
    sendMessage: async (_, { receiverUsername, content }, { token }) => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/messages`,
          { receiverUsername, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to send message');
      }
    },
  },
};

module.exports = resolvers;