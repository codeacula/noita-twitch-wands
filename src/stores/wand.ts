import { defineStore } from 'pinia'
import { ref } from 'vue'

interface WandStats {
  sprite: string
  reload_time: number
  mana_charge_speed: number
  spread_degrees: number
  shuffle_deck_when_empty: boolean
  ui_name: string
  mana_max: number
  actions_per_round: number
  speed_multiplier: number
  fire_rate_wait: number
  deck_capacity: number
}

interface Wand {
  stats: WandStats
  always_cast: string[]
  deck: string[]
}

interface OnlyWandsMessage {
  type: string
  wands: Wand[] | null
}

export const useWandStore = defineStore('wand', () => {
  const ws = ref(null as WebSocket | null)

  const updateStreamerHandle = (streamerHandle: string) => {
    ws.value = new WebSocket(`wss://onlywands.com/client=${streamerHandle}`)

    ws.value.onopen = () => {
      console.log('Connected to the WebSocket server')
      ws.value?.send('Hello Server!')
    }

    ws.value.onmessage = event => {
      const message = JSON.parse(event.data)

      console.log(message)

      if (message.type === 'wands') {
        console.log(`Codeacula has ${message?.wands?.length} wands`)
      }
    }

    ws.value.onerror = error => {
      console.error('WebSocket error:', error)
    }

    ws.value.onclose = () => {
      console.log('Disconnected from the WebSocket server')
    }
  }

  return { ws, updateStreamerHandle }
})
