/**
 * @author ryeon
 * @since 2023. 12. 28.
 */
import lib from '../utils/lib'
import ApiFacade from '../utils/api'

const service = (() => {
  async function verifyPartners(myAuth, partners) {
    const includeMyself = partners.filter((partner) => partner.id === myAuth.id)
    const partnersVerified = partners.filter((partner) => {
      return lib.exists(partner.id) && lib.exists(partner.pwd)
    })

    if (lib.exists(partnersVerified)) {
      const partnersAuth = await Promise.all(
        partnersVerified.map(async (idAndPwd, i) => {
          const result =
            idAndPwd.id === myAuth.id
              ? myAuth
              : await ApiFacade(myAuth.serverInfo).getAccessToken(
                  idAndPwd.id,
                  idAndPwd.pwd
                )
          const partnerAuth = lib.exists(result.data) ? result.data : result
          const value = lib.exists(partnerAuth.error)
            ? { ...idAndPwd, ...{ success: false, i } }
            : { ...partnerAuth, ...idAndPwd, ...{ success: true, i } }
          return value
        })
      )

      const failed = partnersAuth.filter((e) => !e.success).map((e) => e.i)
      const success = failed.length === 0
      const error = success
        ? null
        : `${failed[0] + 1}번째 상대 계정 정보를 확인해 주세요. 로그인할 수 없습니다.`
      return {
        success,
        error,
        failed,
        partnersAuth: includeMyself ? partnersAuth.concat(myAuth) : partnersAuth
      }
    } else {
      return {
        success: false,
        error: '유효한 대화 상대 계정 정보가 없습니다. 입력을 확인해 주세요.'
      }
    }
  }

  return { verifyPartners }
})()

export default service
