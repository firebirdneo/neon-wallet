import React from 'react'
import { shallow, mount } from 'enzyme'

import Claim from '../../app/containers/Claim/Claim'

describe('Claim', () => {
  const props = {
    doGasClaim: () => {},
    disableClaimButton: false,
    claimAmount: '1.25406935',
  }

  test('should render claim GAS button as enabled', () => {
    const wrapper = shallow(<Claim {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render claim GAS button as disabled', () => {
    const wrapper = shallow(<Claim {...props} disableClaimButton />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should claim GAS when button is clicked', () => {
    const claimSpy = jest.fn()
    const wrapper = mount(<Claim {...props} doGasClaim={claimSpy} />)

    wrapper.find('button#claim').simulate('click')

    expect(claimSpy).toHaveBeenCalled()
  })

  test('Claim button should be disabled in watchOnly', () => {
    const claimSpy = jest.fn()
    const watchOnlyProps = { ...props }
    watchOnlyProps.isWatchOnly = true
    const wrapper = mount(<Claim {...watchOnlyProps} doGasClaim={claimSpy} />)
    expect(claimSpy).toHaveBeenCalledTimes(0)
    expect(wrapper.find('button#claim').prop('disabled')).toBeTruthy()
  })
})
