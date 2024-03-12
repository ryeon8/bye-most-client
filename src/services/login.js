/**
 * 로그인 service.
 *
 * @author r3n
 */
import lib from './../utils/lib'
import ApiFacade from './../utils/api'

const service = (() => {
  /**
   * 사용자가 Mattermost 서버에 로그인합니다.
   *
   * @param {string} serverInfo Mattermost 서버 URL (포함된 프로토콜)
   * @param {string} id Mattermost 로그인 계정 (이메일 또는 사용자 이름)
   * @param {string} pwd Mattermost 로그인 계정 비밀번호
   * @returns {Object} Mattermost 서버 로그인 결과
   * @property {boolean} success Access token 취득 성공 여부
   * @property {Object} auth 로그인 결과 정보
   * @property {string} auth.token Mattermost 서버 액세스 토큰
   * @property {string} auth.serverInfo Mattermost 서버 URL
   * @property {string} auth.id Mattermost 로그인 ID
   * @property {string} auth.pwd Mattermost 로그인 비밀번호
   * @property {string|null} error 오류 발생 시 오류 내용
   */

  async function signin(serverInfo, id, pwd) {
    if (!lib.exists(serverInfo)) {
      return {
        success: false,
        error: 'mattermost 서버 정보는 필수 항목입니다.'
      }
    } else if (!lib.exists(id)) {
      return { success: false, error: '사용자 계정은 필수 항목입니다.' }
    } else if (!lib.exists(pwd)) {
      return { success: false, error: '계정 비밀번호는 필수 항목입니다.' }
    } else {
      try {
        const result = await ApiFacade(serverInfo).getAccessToken(id, pwd)
        const auth = result.data
        if (lib.exists(auth.error)) {
          return {
            success: false,
            error: '입력 내용을 확인해 주세요. 서버에 로그인할 수 없습니다.'
          }
        } else {
          auth.serverInfo = serverInfo
          auth.id = id
          auth.pwd = pwd
          return { success: true, auth }
        }
      } catch (e) {
        console.log(e)
        return { success: false, error: '통신 중 오류가 발생했습니다.' }
      }
    }
  }

  return { signin }
})()

export default service
