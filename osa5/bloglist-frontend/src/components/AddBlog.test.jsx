import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import AddNewBlog from './AddBlog'

test('<AddBlog /> Calls handleAddNewBlog with correct parameters', async () => {
  const user = userEvent.setup()
  const handleAddNewBlog = vi.fn()

  // useNavigate vaatii MemoryRouter käyttöä.
  const { container } = render(
    <MemoryRouter>
      <AddNewBlog addBlog={handleAddNewBlog} />
    </MemoryRouter>
  )

  const titleInput = container.querySelector('#titleInput')
  const authorInput = container.querySelector('#authorInput')
  const urlInput = container.querySelector('#urlInput')

  const submitButton = screen.getByText('create')

  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'test url')

  await user.click(submitButton)

  expect(handleAddNewBlog.mock.calls).toHaveLength(1)
  expect(handleAddNewBlog.mock.calls[0]).toHaveLength(3)
  expect(handleAddNewBlog.mock.calls[0][0]).toBe('test title')
  expect(handleAddNewBlog.mock.calls[0][1]).toBe('test author')
  expect(handleAddNewBlog.mock.calls[0][2]).toBe('test url')

})