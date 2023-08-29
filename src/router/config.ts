import KoaRouter from 'koa-router'
import R from '../model/response'
const configRouter = new KoaRouter({
  prefix: '/config'
})
const useConfig = () => {
  const id = 123
  const map = new Map<number, Map<string, string>>()
  return {
    id,
    getValue: (id: number, keyCode: string) => {
      const entries = map.get(id)
      if (entries === undefined) {
        return null
      }
      return entries.get(keyCode) || null
    },
    setValue: (id: number, keyCode: string, keyValue: string) => {
      const entries = map.get(id)
      if (entries === undefined) {
        const keyCodeMap = new Map<string, string>()
        keyCodeMap.set(keyCode, keyValue)
        map.set(id, keyCodeMap)
      } else {
        entries.set(keyCode, keyValue)
      }
    }
  }
}
const { id, getValue, setValue } = useConfig()
configRouter.get('/queryCfg', (ctx) => {
  const { keyCode } = ctx.request.query
  const keyValue = getValue(id, keyCode as string)
  ctx.body = new R(200,
    {
      id,
      keyValue
    }, true)
})
configRouter.post('/saveCfg', (ctx) => {
  const { id, keyCode, keyValue } = ctx.request.body
  setValue(Number(id), keyCode, keyValue)
  ctx.body = new R(200, true, true)
})
export default configRouter