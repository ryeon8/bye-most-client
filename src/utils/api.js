/**
 * cors 정책 우회를 위한 api 호출 서버 호출 facade.
 * @author r3n
 */

import axios from 'axios'
const apiServer = process.env.REACT_APP_API_SERVER

/** 사용 방법 및 응답 결과가 필요한 경우는 postman api 문서 참조. */
const ApiFacade = (serverInfo) => {
  return {
    /**
     * mattermost server access token 조회.
     *
     * @param {string} id mattermost 로그인 계정(email, username)
     * @param {string} pwd mattermost 로그인 계정 비밀번호
     * @returns access token
     */
    getAccessToken: (id, pwd) => {
      const params = { serverInfo, id: id.trim(), pwd }
      return axios.post(`${apiServer}/mattermost/api/access/token`, params)
    },
    getIds: (token, usernames) => {
      const params = { serverInfo, token, usernames }
      return axios.post(`${apiServer}/mattermost/api/get/users/id`, params)
    },
    getChannelId: (token, withIds) => {
      const params = { serverInfo, token, withIds }
      return axios.post(`${apiServer}/mattermost/api/get/channel/id`, params)
    },
    getPostsForChannel: (token, channelId) => {
      const params = { serverInfo, token, channelId }
      return axios.post(
        `${apiServer}/mattermost/api/get/posts/in/channel`,
        params
      )
    },
    deletePost: (token, postId) => {
      const params = { serverInfo, token, postId }
      return axios.post(`${apiServer}/mattermost/api/do/delete/post`, params)
    }
  }
}

export default ApiFacade
