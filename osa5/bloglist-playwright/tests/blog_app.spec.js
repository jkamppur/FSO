
const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Playwright Test',
        username: 'pTest',
        password: 'fdsa23r¤#'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator("[name='Username']")).toBeVisible()
    await expect(page.locator("[name='Password']")).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })
})