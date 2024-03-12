/**
 * 공통으로 사용되는 유틸리티성 함수 모음.
 *
 * @author r3n
 * @since 2023. 12. 20.
 */
const lib = (() => {
  /**
   * 검증 대상의 존재 여부 검증.
   *
   * @param {*} arg 검증 대상
   * @returns {boolean} true: 문자열의 경우 arg가 공백이 아닌 문자열로 이루어진 경우, 배열의 경우는 요소가 1개 이상인 경우, 이 외는 객체가 undefined & null이 아닌 경우
   */
  const exists = (arg) => {
    if (arg === undefined || arg === null) {
      return false
    } else if (typeof arg === 'string') {
      return arg.trim().length > 0
    } else if (Array.isArray(arg)) {
      return arg.length > 0
    }

    return true
  }

  return { exists }
})()

export default lib
