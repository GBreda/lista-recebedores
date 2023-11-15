import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import AddNewReceiver from './AddNewReceiver.vue'
import { nextTick } from 'vue'

const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      name: 'add-new-receiver',
      path: '/add-new-receiver',
      component: { template: '<div>add new receiver mock</div>' }
    }
  ]
})

const mountAddNewReceiver = () => {
  return mount(AddNewReceiver, {
    global: {
      plugins: [mockRouter]
    }
  })
}

describe('AddNewReceiver', () => {
  let wrapper

  it('should mount the component', () => {
    wrapper = mountAddNewReceiver()

    expect(wrapper.vm).toBeDefined()
  })

  it('should match the snapshot', () => {
    wrapper = mountAddNewReceiver()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should push to the /add-new-receiver route', async () => {
    await mockRouter.push('/add-new-receiver')
    await mockRouter.isReady()

    wrapper = mountAddNewReceiver()

    await wrapper.find("[data-test-id='add-new-receiver']").trigger('click')
    await nextTick()

    expect(mockRouter.currentRoute.value.name).toBe('add-new-receiver')
  })
})
