import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import TheHeader from './TheHeader.vue'
import { nextTick } from 'vue'

const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      name: 'receivers-list',
      path: '/'
    }
  ]
})

const mountTheHeader = () => {
  return mount(TheHeader, {
    global: {
      plugins: [mockRouter]
    }
  })
}

describe('TheHeader', () => {
  let wrapper

  it('should mount the component', () => {
    wrapper = mountTheHeader()

    expect(wrapper.vm).toBeDefined()
  })

  it('should match the snapshot', () => {
    wrapper = mountTheHeader()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should contain alt text on the logo', () => {
    wrapper = mountTheHeader()

    const logo = wrapper.find("[data-test-id='logo']")

    expect(logo.attributes('alt')).toBeTruthy()
    expect(logo.attributes('alt')).toContain('Transfeera logo')
  })

  it('should push to the home route', async () => {
    await mockRouter.push('/')
    await mockRouter.isReady()

    wrapper = mountTheHeader()

    await wrapper.find("[data-test-id='logo']").trigger('click')
    await nextTick()

    expect(mockRouter.currentRoute.value.name).toBe('receivers-list')
  })
})
