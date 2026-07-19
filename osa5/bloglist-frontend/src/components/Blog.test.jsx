import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
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

  // blogin tiedot sekä tykkäysten määrä näytetään kirjautumattomalle käyttäjälle, nappeja ei näytetä

  test('null user doesn\'t see buttons', () => {


    let container = render(
      <MemoryRouter>
        <Blog blogs={[blog]} userInfo={null} addLike={mockHandler} removeBlog={mockHandler}/>
      </MemoryRouter>
    )
    const element = screen.getByText('Test Creator: test blog')
    expect(element).toBeDefined()
    const element2 = screen.getByText('likes 100')
    expect(element2).toBeDefined()
    const likeButton = screen.queryByRole('button', { name: /like/i })
    expect(likeButton).toBeNull()
    const deleteButton = screen.queryByRole('button', { name: /delete/i })
    expect(deleteButton).toBeNull()
  })

  // kirjautuneelle käyttäjälle, joka ei ole blogin luoja näytetään ainoastaan tykkäysnappi

  test('log viewer see only like button', () => {

    const userInfo = {
      name: 'Blog viewer'
    }

    let container = render(
      <MemoryRouter>
        <Blog blogs={[blog]} userInfo={userInfo} addLike={mockHandler} removeBlog={mockHandler}/>
      </MemoryRouter>
    )

    const element = screen.getByText('Test Creator: test blog')
    expect(element).toBeDefined()
    const element2 = screen.getByText('likes 100')
    expect(element2).toBeDefined()
    const likeButton = screen.queryByRole('button', { name: /like/i })
    expect(likeButton).toBeDefined()
    const deleteButton = screen.queryByRole('button', { name: /delete/i })
    expect(deleteButton).toBeNull()
  })

  test('log adder see both buttons', () => {

    const userInfo = {
      name: 'Blog adder'
    }

    let container = render(
      <MemoryRouter>
        <Blog blogs={[blog]} userInfo={userInfo} addLike={mockHandler} removeBlog={mockHandler}/>
      </MemoryRouter>
    )

    const element = screen.getByText('Test Creator: test blog')
    expect(element).toBeDefined()
    const element2 = screen.getByText('likes 100')
    expect(element2).toBeDefined()
    const likeButton = screen.queryByRole('button', { name: /like/i })
    expect(likeButton).toBeDefined()
    const deleteButton = screen.queryByRole('button', { name: /delete/i })
    expect(deleteButton).toBeDefined()
  })
})