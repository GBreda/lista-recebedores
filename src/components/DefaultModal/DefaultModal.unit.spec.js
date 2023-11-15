import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import DefaultModal from './DefaultModal.vue'

const mountDefaultModal = ({ slots } = {}) => {
  return mount(DefaultModal, {
    props: {
      showModal: true
    },
    slots: {
      ...slots
    }
  })
}

describe('DefaultModal', () => {
  let wrapper

  it('should mount the component', () => {
    wrapper = mountDefaultModal()

    expect(wrapper.vm).toBeDefined()
  })

  it('should match the snapshot', () => {
    wrapper = mountDefaultModal()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should emit close event on close button click', async () => {
    wrapper = mountDefaultModal()

    await wrapper.find("[data-test-id='close-modal']").trigger('click')

    expect(wrapper.emitted()['close:modal']).toBeTruthy()
  })

  it('should emit close event on back button click', async () => {
    wrapper = mountDefaultModal()

    await wrapper.find("[data-test-id='back-button']").trigger('click')

    expect(wrapper.emitted()['close:modal']).toBeTruthy()
  })

  it('should emit remove event on remove button click', async () => {
    wrapper = mountDefaultModal()

    await wrapper.find("[data-test-id='remove-button']").trigger('click')

    expect(wrapper.emitted()['update:remove']).toBeTruthy()
  })

  it('should emit confirm event on confirm button click', async () => {
    wrapper = mountDefaultModal()

    await wrapper.find("[data-test-id='confirm-button']").trigger('click')

    expect(wrapper.emitted()['update:confirm']).toBeTruthy()
  })

  it('should render header slot content', () => {
    const wrapper = mountDefaultModal({
      slots: {
        header: '<div data-test-id="header">Custom Header Content</div>'
      }
    })

    expect(wrapper.find('[data-test-id="header"]').text()).toBe('Custom Header Content')
  })

  it('should render body slot content', () => {
    const wrapper = mountDefaultModal({
      slots: {
        body: '<div data-test-id="body">Custom Body Content</div>'
      }
    })

    expect(wrapper.find('[data-test-id="body"]').text()).toBe('Custom Body Content')
  })

  it('should render footer slot content', () => {
    const wrapper = mountDefaultModal({
      slots: {
        footer: '<div data-test-id="footer">Custom Footer Content</div>'
      }
    })

    expect(wrapper.find('[data-test-id="footer"]').text()).toBe('Custom Footer Content')
  })
})
