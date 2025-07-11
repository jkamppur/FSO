import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  const blog = {
    title: 'test blog',
    url: 'test url',
    likes: 100,
    author: 'Test Creator',
    userId: [{ name: 'Blog adder' }]
  }

  const userInfo = {
    name: 'Blog adder'
  }

  const mockHandler = vi.fn()

  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} userInfo={userInfo} removeBlog={mockHandler} addLike={mockHandler} />
    ).container
  })

  test('render minimized blog content', () => {

    const element = screen.getByText('test blog Test Creator')
    expect(element).toBeDefined()
    expect(element).not.toHaveTextContent('likes')
  })

  test('render detailed blog content', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText('test blog')
    expect(element).toBeDefined()
    const element2 = screen.getByText('test url')
    expect(element2).toBeDefined()
    const element3 = screen.getByText('likes 100')
    expect(element3).toBeDefined()
    const element4 = screen.getByText('Test Creator')
    expect(element4).toBeDefined()
  })

  test('blog like button calls event handler correct count', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(1)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})