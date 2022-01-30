export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export const fetchDefaultHeaders = {
  'Content-Type': 'application/json',
}
export const makeRequest = async ({
  url = '',
  method = HTTPMethods.GET,
  body = '',
  headers = {},
}) => {
  const bodyOfFetchReq: {
    method: HTTPMethods
    body?: string
    headers: any
  } = {
    method,
    body: body || '',
    headers: Object.keys(headers)
      ? {
          ...fetchDefaultHeaders,
          ...headers,
        }
      : fetchDefaultHeaders,
  }
  if (!bodyOfFetchReq.body) {
    delete bodyOfFetchReq.body
  }
  const promise = await fetch(`${url}`, bodyOfFetchReq)
  return await promise.json()
}
