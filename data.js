import axios from 'axios'
import schedule from 'node-schedule'

// 資料陣列
export let concertData = []
export let exhibitionData = []

// 更新資料
export const getData = () => {
  axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=17')
    .then(response => {
      concertData = response.data
      console.log('演唱會資料成功更新')
    })
  axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6')
    .then(response => {
      exhibitionData = response.data
      console.log('展覽資料成功更新')
    })
}

// 機器人啟動時先更新資料
// getData()

// 設定排程每日 0:00 更新
schedule.scheduleJob('0 0 * * *', getData)
