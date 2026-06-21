
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

    async function addBlog(page, title, author, url) {
      await page.getByRole('button', { name: 'add blog' }).click()
      await page.locator("[name='title']").fill(title)
      await page.locator("[name='author']").fill(author)
      await page.locator("[name='url']").fill(url)
      await page.getByRole('button', { name: 'create' }).click()
    }    

    // Teht 5.19
    test('a new blog can be created', async ({ page }) => {
      await addBlog(page, 'user1\'s story', 'user1', 'www.user1.blog')
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })

    // Teht 5.20
    test('Like can be added to blog', async ({ page }) => {
      // Create a blog
      await addBlog(page, 'user1\'s story 2', 'user1', 'www.user1.blog')

      // View blog
      await page.getByRole('button', { name: 'view' }).click()

      // Check blog contains like button and 'likes 0'
      await expect(page.getByRole('button', { name: 'like' })).toBeVisible()
      await expect(page.getByText('likes 0')).toBeVisible();      

      // Like blog
      await page.getByRole('button', { name: 'like' }).click()
      // See that Page cointains likes 1
      await expect(page.getByText('likes 1')).toBeVisible();      
    })

    // Teht 5.21
    test('Blog can be deleted', async ({ page }) => {

      // Create a blog
      await addBlog(page, 'user1\'s story to be deleted', 'user 1', 'www.user1.blog')

      // View blog
      await page.getByRole('button', { name: 'view' }).click()
      // Like blog (issue in code that blog must be liked before it can be deleted.)
      await page.getByRole('button', { name: 'like' }).click()

      page.on('dialog', async dialog => {
        console.log('Dialogi havaittu:', dialog.message());
        await dialog.accept(); // Painetaan OK
      });

      // Delete blog and confirm
      await page.getByRole('button', { name: 'Remove' }).click()
      await expect(page.getByRole('button', { name: 'view' })).not.toBeVisible();  
    })

    // Teht 5.22
    test('Blog can not be be deleted by other user', async ({ page, request }) => {

      // Create a blog
      await addBlog(page, 'user1\'s story to be deleted', 'user 1', 'www.user1.blog')

      // View blog
      await page.getByRole('button', { name: 'view' }).click()
      // Like blog (issue in code that blog must be liked before it can be deleted.)
      await page.getByRole('button', { name: 'like' }).click()
      // Check that romove button exists 
      await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible()

      // Logout
      await page.getByRole('button', { name: 'logout' }).click()

      // Create second user
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'user 2',
          username: 'pTest2',
          password: 'fdsa23r2'
        }
      })

      // login with new user
      await page.locator("[name='Username']").fill('pTest2')
      await page.locator("[name='Password']").fill('fdsa23r2')
      await page.getByRole('button', { name: 'login' }).click()

      // View blog and confirm that remove button is not visible
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 1')).toBeVisible();      
      await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
    })
    
    async function VerifyFirstBlogIsUpper(page, blog1url, blog2url) {
      const blog1Element = page.getByText(blog1url);
      const blog2Element = page.getByText(blog2url);

      const blog1box = await blog1Element.boundingBox();
      const blog2box = await blog2Element.boundingBox();

      expect(blog1box).not.toBeNull();
      expect(blog2box).not.toBeNull();
      expect(blog2box.y).toBeGreaterThan(blog1box.y);
    }    

    // Teht 5.23
    test('Blogs are ordered by Likes', async ({ page }) => {

      // Create first blog and like once
      await addBlog(page, 'user1\'s hits', 'user 1', 'www.user1.blog')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible();      
      
      // Add second blog and view it
      await addBlog(page, 'user1\'s new hits', 'user 1', 'www.user2.blog')
      await page.getByRole('button', { name: 'view' }).last().click()
      await expect(page.getByText('likes 0')).toBeVisible();      

      // Get locations
      await VerifyFirstBlogIsUpper(page, 'www.user1.blog', 'www.user2.blog')

      // Add 2 likes to later blog
      await page.getByRole('button', { name: 'like' }).last().click()
      const likeOnes = page.getByText('likes 1');
      await expect(likeOnes).toHaveCount(2);
      await page.getByRole('button', { name: 'like' }).last().click()
      await expect(page.getByText('likes 2')).toBeVisible();      

      await VerifyFirstBlogIsUpper(page, 'www.user2.blog', 'www.user1.blog')
    })
    
  })
  })
})