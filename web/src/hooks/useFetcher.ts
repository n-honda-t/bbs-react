// TODO: 200 系以外の型も入れられるようにしたい. もしくは、axios に変えるか.
const wrap = <T>(task: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    task
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(json => {
              // jsonが取得できた場合だけresolve
              resolve(json)
            })
            .catch(error => {
              reject(error)
            })
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

const fetcher = <T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  return wrap<T>(fetch(input, init))
}

export const useFetcher = () => {
  return {
    fetcher
  }
}
