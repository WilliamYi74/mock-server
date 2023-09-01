import KoaRouter from 'koa-router'
import Mock from 'mockjs'
import R from '../model/response';
const router = new KoaRouter({
  prefix: '/channel'
})
interface Channel {
  id: string;
  channelType: string;
  channelName: string;
  supplier: string;
  transferType: string;
  chargeType: string;
  capacity: string;
  capacityRatio: number;
  goodsProperty: string;
  updateTime: string;
}
const usePageData = () => {
  const records: Channel[] = []
  for (let i = 0; i < 1000; i++) {
    records.push({
      'id': Mock.mock('@guid'),
      'channelType': '供应渠道',
      'channelName': Mock.mock('@first'),
      'supplier': '八方通',
      'transferType': '海运',
      'chargeType': `${Mock.mock('@string("upper", 2)')}计费`,
      'capacity': Mock.mock('@integer(6000, 6999)'),
      'capacityRatio': Mock.mock('@integer(0, 1)'),
      'goodsProperty': '带电,带磁',
      'updateTime': Mock.mock('@date'),
    })
  }
  return (current = 1, size = 100) => ({
    records: records.slice((current - 1) * size, current * size),
    total: records.length
  })
}
const getPageData = usePageData()
router.get('/list', (ctx) => {
  const { current, size } = ctx.request.query
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