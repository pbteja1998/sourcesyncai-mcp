import wretch from 'wretch'
import FormDataAddon from 'wretch/addons/formData'
import QueryStringAddon from 'wretch/addons/queryString'

/**
 * Creates a configured wretch client with middleware and addons
 */
export const WretchClient = (baseURL: string) =>
  wretch(baseURL)
    .middlewares([
      (next) => async (url, opts) => {
        const response = await next(url, opts)
        try {
          Reflect.get(response, 'type', response)
        } catch {
          Object.defineProperty(response, 'type', {
            get: () => 'default',
          })
        }
        return response
      },
    ])
    .addon(FormDataAddon)
    .addon(QueryStringAddon)
