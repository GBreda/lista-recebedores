import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusPill from './StatusPill.vue'

function mountStatusPill({ props } = {}) {
  return mount(StatusPill, {
    props: {
      ...props
    }
  })
}

describe('StatusPill', () => {
  it('should mount the component', () => {
    const wrapper = mountStatusPill({
      props: {
        status: 'rascunho'
      }
    })

    expect(wrapper.vm).toBeDefined()
  })

  it('should match the snapshot', () => {
    const wrapper = mountStatusPill({
      props: {
        status: 'rascunho'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders "Rascunho" status correctly', () => {
    const wrapper = mountStatusPill({
      props: {
        status: 'rascunho'
      }
    })

    const pill = wrapper.find('.status-pill')
    const text = wrapper.find('.status-pill--text')

    expect(pill.classes()).toContain('status-pill-draft')
    expect(text.text()).toBe('Rascunho')
  })

  it('renders "Validado" status correctly', () => {
    const wrapper = mountStatusPill({
      props: {
        status: 'validado'
      }
    })

    const pill = wrapper.find('.status-pill')
    const text = wrapper.find('.status-pill--text')

    expect(pill.classes()).toContain('status-pill-validated')
    expect(text.text()).toBe('Validado')
  })
})
