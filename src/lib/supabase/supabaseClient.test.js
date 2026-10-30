import test from 'node:test'
import assert from 'node:assert/strict'

import { isPlaceholderUrl, createFallbackSupabaseClient } from './supabaseClient.js'

test('recognizes placeholder Supabase URLs', () => {
  assert.equal(isPlaceholderUrl('https://your-project.supabase.co'), true)
  assert.equal(isPlaceholderUrl('https://example.supabase.co'), true)
  assert.equal(isPlaceholderUrl('https://real-project.supabase.co'), false)
})

test('fallback client prevents null auth crashes', async () => {
  const fallback = createFallbackSupabaseClient()

  const result = await fallback.auth.signInWithPassword({ email: 'test@example.com', password: 'test' })

  assert.equal(result.data.user, null)
  assert.equal(result.data.session, null)
  assert.match(result.error.message, /Supabase.*configur/i)
})
