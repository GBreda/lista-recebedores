import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheHeader from './TheHeader.vue'

describe('TheHeader', () => {
  let wrapper

  it('should mount the component', () => {
    wrapper = mount(TheHeader)

    expect(wrapper.vm).toBeDefined()
  })

  it('should match the snapshot', () => {
    wrapper = mount(TheHeader)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should contain alt text on the logo', () => {
    wrapper = mount(TheHeader)

    const logo = wrapper.find("[data-test-id='logo']")

    expect(logo.attributes('alt')).toBeTruthy()
    expect(logo.attributes('alt')).toContain('Transfeera logo')
  })
})
