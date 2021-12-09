import 'dotenv/config'
import linebot from 'linebot'
import concerts from './commands/concerts.js'
import map from './commands/map.js'
import exhibitions from './commands/exhibitions.js'
import top5expo from './commands/popularExhibition.js'
import top5concert from './commands/popularConcert.js'
import instruction from './commands/instruction.js'
import quickExhibition from './commands/quickExhibition.js'
import quickConcert from './commands/quickConcert.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動！')
})

// 訊息事件
bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('@')) {
      concerts(event)
    } else if (event.message.text.startsWith('map')) {
      map(event)
    } else if (event.message.text === '人氣展覽') {
      top5expo(event)
    } else if (event.message.text === '推薦演唱會') {
      top5concert(event)
    } else if (event.message.text === '使用教學') {
      instruction(event)
    } else if (event.message.text === '展覽') {
      quickExhibition(event)
    } else if (event.message.text === '演唱會') {
      quickConcert(event)
    } else {
      event.reply('Hi~請點選下方按鈕。')
    }
  } else if (event.message.type === 'location') {
    exhibitions(event)
  }
})
