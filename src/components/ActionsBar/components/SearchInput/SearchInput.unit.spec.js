import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useSearchInputStore } from '@/stores/searchInputStore'
import SearchInput from './SearchInput.vue'

const mountSearchInput = () => {
  return mount(SearchInput, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    }
  })
}

describe('SearchInput', () => {
  let wrapper

  it('should mount the component', () => {
    wrapper = mountSearchInput()

    expect(wrapper.vm).toBeDefined()
  })

  it('should match the snapshot', () => {
    wrapper = mountSearchInput()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should emit input event on search input', async () => {
    wrapper = mountSearchInput()

    const store = useSearchInputStore()

    const input = wrapper.find("[data-test-id='search-input']")

    input.setValue('conta x')

    expect(store.setSearchInputValue).toHaveBeenCalled()
    expect(store.setSearchInputValue).toHaveBeenLastCalledWith('conta x')
  })
})
