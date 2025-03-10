import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { serve } from '@hono/node-server'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Create Hono app
const app = new Hono()
const port = process.env.PORT || 8080  // Using port 8080

// Middleware
app.use('*', logger())
app.use('*', cors())

// Routes
app.get('/', (c) => {
  return c.json({ message: 'AI Bootcamp API is running!' })
})

// API routes for AI Bootcamp
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// AI integration endpoint
app.post('/api/chat', async (c) => {
  const body = await c.req.json()
  return c.json({
    message: 'This will be connected to OpenAI models in the future',
    received: body
  })
})

// For Bun runtime
export default {
  port: Number(port),
  fetch: app.fetch
}

// For Node.js runtime
// Check if this is the main module being run directly
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'test') {
  try {
    console.log(`Starting server on port ${port}...`)
    serve({
      fetch: app.fetch,
      port: Number(port)
    })
    console.log(`Server running on port ${port}`)
  } catch (error) {
    console.error(`Failed to start server on port ${port}:`, error)
    // Try an alternative port if the first one is in use
    const altPort = Number(port) + 1
    console.log(`Trying alternative port ${altPort}...`)
    serve({
      fetch: app.fetch,
      port: altPort
    })
    console.log(`Server running on alternative port ${altPort}`)
  }
}
