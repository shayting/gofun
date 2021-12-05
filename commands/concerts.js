// 計算日期差距
import { dateCount } from '../time.js'
import { concertData } from '../data.js'
import template from '../template/eventFlex.js'

export default async (event) => {
  // 使用者輸入縣市指令
  const region = event.message.text.replace('@', '')
  // 深層複製
  const concertFlex = JSON.parse(JSON.stringify(template))
  try {
    // 篩選縣市後的陣列
    const filterData = []
    // 篩選最近的五個日期陣列
    const minDaysData = []
    // const { data } = await axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=17')
    for (const concert of concertData) {
      // 篩選縣市
      if (concert.showInfo[0].location.includes(region)) {
        filterData.push(concert)
      }
    }
    console.log(filterData)
    for (let i = 0; i < filterData.length; i++) {
      if (i < 5) {
        minDaysData.push({
          Name: filterData[i].title,
          Time: filterData[i].showInfo[0].time,
          Location: filterData[i].showInfo[0].locationName,
          Address: filterData[i].showInfo[0].location,
          Count: dateCount(filterData[i].showInfo[0].time),
          Website: filterData[i].webSales
        })
        // 數字由小到大排列
        minDaysData.sort((a, b) => a.Count - b.Count)
      } else {
        if (dateCount(filterData[i].showInfo[0].time) < minDaysData[4].Count) {
          minDaysData.pop()
          minDaysData.push({
            Name: filterData[i].title,
            Time: filterData[i].showInfo[0].time,
            Location: filterData[i].showInfo[0].locationName,
            Address: filterData[i].showInfo[0].location,
            Count: dateCount(filterData[i].showInfo[0].time),
            Website: filterData[i].webSales
          })
          minDaysData.sort((a, b) => a.Count - b.Count)
        }
      }
    }
    if (minDaysData.length > 0) {
      for (let i = 0; i < minDaysData.length; i++) {
        concertFlex.contents.contents.push(
          {
            type: 'bubble',
            size: 'kilo',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: minDaysData[i].Name,
                  weight: 'bold',
                  size: 'md',
                  wrap: true
                },
                {
                  type: 'separator',
                  color: '#43C499',
                  margin: 'sm'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: minDaysData[i].Time.slice(0, -3),
                      size: 'sm'
                    }
                  ]
                },
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: '地點：',
                      size: 'sm',
                      flex: 2
                    },
                    {
                      type: 'text',
                      text: minDaysData[i].Location,
                      size: 'sm',
                      flex: 8,
                      wrap: true
                    }
                  ],
                  justifyContent: 'flex-start'
                },
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: '地址：',
                      size: 'sm',
                      flex: 2
                    },
                    {
                      type: 'text',
                      text: minDaysData[i].Address.trim(),
                      size: 'sm',
                      wrap: true,
                      flex: 8
                    }
                  ]
                }
              ],
              spacing: 'sm',
              paddingAll: '13px'
            },
            footer: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'button',
                  style: 'primary',
                  height: 'sm',
                  action: {
                    type: 'uri',
                    label: '售票網站',
                    uri: minDaysData[i].Website
                  },
                  color: '#43C499'
                }
              ]
            }
          }
        )
      }
      event.reply(concertFlex)
      console.log(minDaysData)
    } else {
      event.reply('近期沒有活動')
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
