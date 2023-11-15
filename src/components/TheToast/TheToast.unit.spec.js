import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TheToast from './TheToast.vue'
import { createTestingPinia } from '@pinia/testing'
import { useToastStore } from '@/stores/toastStore'

function mountTheToast({ props } = {}) {
  return mount(TheToast, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    },
    props: {
      ...props
    }
  })
}
describe('TheToast', () => {
  let wrapper

  it('should mount the component', () => {
    wrapper = wrapper = mountTheToast({
      props: {
        kind: 'success',
        message: 'Success Message'
      }
    })

    expect(wrapper.vm).toBeDefined()
  })

  it('should match the snapshot', () => {
    wrapper = wrapper = mountTheToast({
      props: {
        kind: 'success',
        message: 'Success Message'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render with success style and correct message', () => {
    wrapper = mountTheToast({
      props: {
        kind: 'success',
        message: 'Success Message'
      }
    })

    expect(wrapper.find('.the-toast__success').exists()).toBe(true)
    expect(wrapper.find('.the-toast__message').text()).toBe('Success Message')
  })

  it('should render with danger style and correct message', () => {
    wrapper = mount(TheToast, {
      props: {
        kind: 'danger',
        message: 'Danger Message'
      }
    })

    expect(wrapper.find('.the-toast__danger').exists()).toBe(true)
    expect(wrapper.find('.the-toast__message').text()).toBe('Danger Message')
  })

  it('should call store action on toast close', async () => {
    wrapper = mount(TheToast, {
      props: {
        kind: 'success',
        message: 'Success Message'
      }
    })

    const store = useToastStore()

    await wrapper.find("[data-test-id='close-toast']").trigger('click')

    expect(store.setToastInfo).toHaveBeenCalled()
    expect(store.setToastInfo).toHaveBeenLastCalledWith({
      showToast: false
    })
  })
})
