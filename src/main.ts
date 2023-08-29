import Koa from 'koa'
// @ts-ignore
import cors from '@koa/cors'
import {koaBody} from 'koa-body'
import { repositoryRouter,configRouter } from './router'
const app = new Koa()
app.use(cors())
app.use(koaBody());
app.use(repositoryRouter.routes()).use(repositoryRouter.allowedMethods())
app.use(configRouter.routes()).use(configRouter.allowedMethods())
app.listen(9090, ()=>{
  console.info('mock server run at localhost:9090')
})