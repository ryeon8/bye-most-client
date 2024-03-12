/**
 * cors 정책 우회를 위한 api 호출 서버 호출 facade.
 * 
 * @author r3n
 */

import axios from 'axios'
const apiServer = process.env.REACT_APP_API_SERVER

const ApiFacade = (serverInfo) => {
  return {
    /**
     * mattermost server access token 조회.
     *
     * @param {string} id mattermost 로그인 계정(email, username)
     * @param {string} pwd mattermost 로그인 계정 비밀번호
     * @returns {string} mattermost access token
     */
    getAccessToken: (id, pwd) => {
      const params = { serverInfo, id: id.trim(), pwd }
      return axios.post(`${apiServer}/mattermost/api/access/token`, params)
    },
    /**
     * mattermost 계정 내부 id 조회.
     * 
     * @param {string} token mattermost access token
     * @param {Array<string>} usernames mattermost id를 조회하려는 대상 username 목록
     * @returns {object} mattermost id 정보
     * - [username]: mattermost id
     */
    getIds: (token, usernames) => {
      const params = { serverInfo, token, usernames }
      return axios.post(`${apiServer}/mattermost/api/get/users/id`, params)
    },
    /**
     * 특정 계정 목록만이 참여한 채널 id 조회.
     * 
     * @param {string} token mattermost access token
     * @param {Array<string>} withIds 대화를 함께한 mattermost 계정 내부 id 목록
     * @returns {string} mattermost channel id
     */
    getChannelId: (token, withIds) => {
      const params = { serverInfo, token, withIds }
      return axios.post(`${apiServer}/mattermost/api/get/channel/id`, params)
    },
    /**
     * 특정 채널에 등록된 대화 목록 조회. 60건씩 반환.
     * 
     * @param {string} token mattermost access token
     * @param {string} channelId mattermost channel id
     * @returns {object} mattermost 대화 post 목록
     */
    getPostsForChannel: (token, channelId) => {
      const params = { serverInfo, token, channelId }
      return axios.post(
        `${apiServer}/mattermost/api/get/posts/in/channel`,
        params
      )
    },
    /**
     * mattermost 단일 post 삭제 처리.
     * 
     * @param {string} token 
     * @param {string} postId 
     * @returns {object} 삭제 결과
     * - success: {boolen} 삭제 성공 여부
     * - postId: {string} 삭제된 댓글 post id
     * - result: {string} 삭제 실패 시 status text
     */
    deletePost: (token, postId) => {
      const params = { serverInfo, token, postId }
      return axios.post(`${apiServer}/mattermost/api/do/delete/post`, params)
    }
  }
}

export default ApiFacade
