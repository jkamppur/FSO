
const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'user 1',
        username: 'pTest',
        password: 'fdsa23r'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator("[name='Username']")).toBeVisible()
    await expect(page.locator("[name='Password']")).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
})

  // Teht 5.18
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator("[name='Username']").fill('pTest')
      await page.locator("[name='Password']").fill('fdsa23r')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    
    test('fails with wrong credentials', async ({ page }) => {
      await page.locator("[name='Username']").fill('pTest')
      await page.locator("[name='Password']").fill('fincorrect')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong credentials')).toBeVisible()
      await expect(page.locator("[name='Username']")).toBeVisible()
    })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.locator("[name='Username']").fill('pTest')
      await page.locator("[name='Password']").fill('fdsa23r')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    // Teht 5.19
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'add blog' }).click()
      await page.locator("[name='title']").fill('user1\'s story')
      await page.locator("[name='author']").fill('user1')
      await page.locator("[name='url']").fill('www.user1.blog')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })
  })

  })
})