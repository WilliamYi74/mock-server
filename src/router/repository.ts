import KoaRouter from 'koa-router'
import Mock from 'mockjs'
import R from '../model/response'
const router = new KoaRouter({
  prefix: '/repository',
})
interface Repository {
  id: string;
  code: string;
  name: string;
  supplier: string;
  country: string;
  province: string;
  city: string;
  postCode: string;
  phoneNumber: number;
  detailAddress: string;
}
const usePageData = () => {
  const records: Repository[] = []
  for (let i = 0; i < 1000; i++) {
    records.push({
      'id': Mock.mock('@guid'),
      'code': Mock.mock('@string("lower", 5)'),
      'name': Mock.mock('@first'),
      'supplier': Mock.mock('@string("lower", 5)'),
      'country': `中国 ${Mock.mock('@region()')}`,
      'province': Mock.mock('@province'),
      'city': Mock.mock('@city'),
      'postCode': Mock.mock('@zip'),
      'phoneNumber': Mock.mock('@integer(13874022020, 15974018890)'),
      'detailAddress': Mock.mock('@county(true)'),
    })
  }
  return (current = 1, size = 100) => ({
    records: records.slice((current - 1) * size, current * size),
    total: records.length
  })
}
const getPageData = usePageData()
router.get('/list', (ctx) => {
  const { current, size } = ctx.query
  const { records, total } = getPageData(Number(current), Number(size))
  const results = Mock.mock({
    records,
    total,
    size,
    current,
  })
  ctx.body = new R(200, results, true)
})
export default router