import { concertData } from '../data.js'
import template from '../template/eventFlex.js'

export default async (event) => {
  const concertFlex = JSON.parse(JSON.stringify(template))
  const popularData = []
  try {
    // 篩選最熱門的五筆資料（推薦）
    for (let i = 0; i < concertData.length; i++) {
      if (i < 5) {
        popularData.push(
          {
            Name: concertData[i].title,
            Time: concertData[i].showInfo[0].time,
            Location: concertData[i].showInfo[0].locationName,
            Address: concertData[i].showInfo[0].location,
            Website: concertData[i].webSales,
            Hitrate: concertData[i].hitRate
          }
        )
        popularData.sort((a, b) => b.Hitrate - a.Hitrate)
      } else {
        if (concertData[i].hitRate > popularData[4].Hitrate) {
          popularData.pop()
          popularData.push(
            {
              Name: concertData[i].title,
              Time: concertData[i].showInfo[0].time,
              Location: concertData[i].showInfo[0].locationName,
              Address: concertData[i].showInfo[0].location,
              Website: concertData[i].webSales,
              Hitrate: concertData[i].hitRate
            }
          )
          popularData.sort((a, b) => b.Hitrate - a.Hitrate)
        }
      }
    }

    for (let i = 0; i < popularData.length; i++) {
      concertFlex.contents.contents.push(
        {
          type: 'bubble',
          size: 'mega',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: popularData[i].Name + '🔥HOT',
                weight: 'bold',
                size: 'lg',
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
                    text: popularData[i].Time.slice(0, -3),
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
                    text: popularData[i].Location,
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
                    text: popularData[i].Address.trim(),
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
                  uri: popularData[i].Website
                },
                color: '#43C499'
              }
            ]
          }
        }
      )
    }
    event.reply(concertFlex)
  } catch (error) {
    console.log(error)
  }
}
