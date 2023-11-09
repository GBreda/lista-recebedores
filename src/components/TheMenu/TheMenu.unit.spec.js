import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheMenu from './TheMenu.vue'

describe('TheMenu', () => {
  let wrapper

  it('should mount the component', () => {
    wrapper = mount(TheMenu)

    expect(wrapper.vm).toBeDefined()
  })

  it('should match the snapshot', () => {
    wrapper = mount(TheMenu)

    expect(wrapper.element).toMatchSnapshot()
  })
})
