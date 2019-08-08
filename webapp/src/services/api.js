import axios from 'axios';

const API_URL = 'http://localhost:3000/graphql';

const opt = {
  headers: {'Content-Type': 'application/json'}
}


const login = async(user) => {
  const data = {
    query: `mutation addDev(
      $user: String!){
      addDev(
        user: $user
      ){
        _id
      }
    }`,
    variables: {
      user: user
    }
  }

  const { data: res } = await axios.post(API_URL, data, opt);
  return res.data.addDev;

}

const getDev = async(userId) => {
  const data = {
    query: `query dev(
      $id: String!){
      dev(
        id: $id
      ){
        _id,
        name,
        user,
        avatar,
        bio
      }
    }`,
    variables: {
      id: userId
    }
  }

  const { data: res } = await axios.post(API_URL, data, opt);
  return res.data.dev;

}

export {
  login,
  getDev
}


