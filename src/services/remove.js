/**
 * @author ryeon
 * @since 2023. 12. 28.
 */
import lib from '../utils/lib'
import ApiFacade from '../utils/api'

const removingTimeId = []
const service = (() => {
  function init(domain) {
    const apiFacade = ApiFacade(domain)

    const removeConversations = (auth, delay, partnersAuth) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const withIds = partnersAuth.map((e) => e.myId)
          apiFacade
            .getChannelId(auth.token, withIds)
            .then(async (res) => {
              const channelId = res.data.channelId
              if (lib.exists(channelId)) {
                let posts
                const tryCount = 3 // 최대 삭제 시도 횟수.
                const tooManyFailed = {} // { postId: { error: , post: , count: }}
                const failed = {} // { postid: {error: , post: , count: } }
                do {
                  if (lib.exists(posts)) {
                    const failedResultThisTime = await removePosts(
                      auth,
                      delay,
                      partnersAuth,
                      posts
                    )

                    // 실패 횟수 기록 & 계속해 실패 건 안내용.
                    if (lib.exists(failedResultThisTime)) {
                      failedResultThisTime.forEach((e) => {
                        const prevFailed = failed[e.post.id]
                        e.count = prevFailed ? prevFailed.count + 1 : 1
                      })

                      // 삭제 실패 전체 이력 관리.
                      const f = failedResultThisTime.map((e) => {
                        return { [e.post.id]: e }
                      })
                      Object.assign(failed, ...f) // 이전에 등록된 값이 있다면 금번 결과로 override됨.

                      // 최대 삭제 시도 횟수 초과 이력 관리.
                      const t = failedResultThisTime
                        .filter((e) => e.count >= tryCount)
                        .map((e) => {
                          return { [e.post.id]: e }
                        })
                      Object.assign(tooManyFailed, ...t)
                    }
                  }

                  // 삭제 가능 대화 이력 조회. 삭제 실패 최대 횟수를 초과한 건은 필터링 처리.
                  const fetchResult = await apiFacade.getPostsForChannel(
                    auth.token,
                    channelId
                  )
                  posts = lib.exists(fetchResult.data.error)
                    ? []
                    : fetchResult.data
                  const postIds = Object.keys(posts)
                  for (let i = 0; i < postIds.length; i++) {
                    if (tooManyFailed[postIds[i]]) {
                      delete posts[postIds[i]]
                    } else {
                      // 다른 동작을 수행하고자 하는 경우에는 여기에 추가
                    }
                  }
                } while (Object.keys(posts).length > 0)

                resolve({
                  success: Object.keys(tooManyFailed).length < 1,
                  tooManyFailed
                })
              } else {
                reject({ success: false, error: null, noChannel: true })
              }
            })
            .catch((e) => {
              reject({ success: false, error: e, noChannel: true })
            })
        }, 1000) // 최소 1초는 로딩 마크가 보이도록.
      })
    }

    const removePost = (token, post, delay) => {
      return new Promise((resolve, reject) => {
        const timeId = setTimeout(() => {
          apiFacade.deletePost(token, post.id).then(resolve).catch(reject)
        }, delay * 1000)
        removingTimeId.push(timeId)
      })
    }

    const removePosts = async (auth, delay, partnersAuth, posts) => {
      const postIds = Object.keys(posts)
      const idAndTokenMap = partnersAuth.map((e) => {
        return { [e.myId]: e.token }
      })
      const tokens = Object.assign({}, ...idAndTokenMap)

      const failed = []
      for (let i = 0; i < postIds.length; i++) {
        const post = posts[postIds[i]]
        try {
          if (post.id === 'rwtjfkxcabdz3jwxzjg931gdqa') {
            // 삭제 실패 테스트를 위한 코드. 강제로 오류 발생 처리.
            console.log(undefined.a)
          }

          const token = tokens[post.user_id]
          await removePost(token, post, delay)
        } catch (e) {
          failed.push({ error: e, post })
        }
      }

      return failed
    }

    return { removeConversations }
  }

  const cancelRemoving = () => {
    removingTimeId.forEach((id) => {
      clearTimeout(id)
    })
  }

  return { init, cancelRemoving }
})()

export default service
