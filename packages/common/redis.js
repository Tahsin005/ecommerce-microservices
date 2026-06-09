import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
})

redisClient.on('error', (err) => {
  console.error('[Redis] Client Error', err)
})

redisClient.on('connect', () => {
  console.log('[Redis] Connected successfully')
})

redisClient.connect().catch(console.error)

export const cacheMiddleware = (durationSeconds = 60) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next()
    }

    const key = `cache:${req.originalUrl || req.url}`

    try {
      const cachedResponse = await redisClient.get(key)

      if (cachedResponse) {
        return res.status(200).json(JSON.parse(cachedResponse))
      }

      const originalJson = res.json.bind(res)
      res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          redisClient.setEx(key, durationSeconds, JSON.stringify(body)).catch((err) => {
            console.error(`[Redis] Error setting cache for key ${key}:`, err)
          })
        }
        return originalJson(body)
      }

      next()
    } catch (err) {
      console.error(`[Redis] Cache middleware error for key ${key}:`, err)
      next()
    }
  }
}

export default redisClient
