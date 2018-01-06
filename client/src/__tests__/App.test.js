import createTestContext from 'react-cosmos-test/enzyme'
import fixture from '__fixtures__/app'

const { mount, getWrapper } = createTestContext({ fixture })

beforeEach(mount)

it('renders without crashing', async () => {
  expect(getWrapper().text()).toContain('hello world')
})
