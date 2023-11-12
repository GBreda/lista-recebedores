import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AddNewReceiver from './AddNewReceiver.vue'

describe('AddNewReceiver', () => {
  let wrapper

  it('should mount the component', () => {
    wrapper = mount(AddNewReceiver)

    expect(wrapper.vm).toBeDefined()
  })

  it('should match the snapshot', () => {
    wrapper = mount(AddNewReceiver)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should emit event to add new receiver', async () => {
    wrapper = mount(AddNewReceiver)

    wrapper.find("[data-test-id='add-new-receiver']").trigger('click')

    expect(wrapper.emitted()).toHaveProperty('add:new-receiver')
  })
})
