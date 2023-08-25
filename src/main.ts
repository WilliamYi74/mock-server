import Koa from 'koa'
// @ts-ignore
import cors from '@koa/cors'
import { repositoryRouter } from './router'
const app = new Koa()
app.use(cors())
app.use(repositoryRouter.routes()).use(repositoryRouter.allowedMethods())
app.listen(9090, ()=>{
  console.info('mock server run at localhost:9090')
})