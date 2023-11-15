import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import TheMenu from './TheMenu.vue'
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

const mountTheMenu = () => {
  return mount(TheMenu, {
    global: {
      plugins: [mockRouter]
    }
  })
}

describe('TheMenu', () => {
  let wrapper

  it('should mount the component', () => {
    wrapper = mountTheMenu()

    expect(wrapper.vm).toBeDefined()
  })

  it('should match the snapshot', () => {
    wrapper = mountTheMenu()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should push to the home route', async () => {
    await mockRouter.push('/')
    await mockRouter.isReady()

    wrapper = mountTheMenu()

    await wrapper.find("[data-test-id='menu-link']").trigger('click')
    await nextTick()

    expect(mockRouter.currentRoute.value.name).toBe('receivers-list')
  })
})
