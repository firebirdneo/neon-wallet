// @flow
import React, { Component } from 'react'
import { compose } from 'recompose'

import Sidebar from './Sidebar'
import Footer from './Footer'
import ModalRenderer from '../ModalRenderer'
import Notifications from '../Notifications'
import withThemeData from '../../hocs/withThemeData'
import { upgradeUserWalletNEP6 } from '../../modules/generateWallet'

import styles from './App.scss'
import themes from '../../themes'

type Props = {
  children: React$Node,
  address: string,
  checkVersion: Function,
  showErrorNotification: Function
}

class App extends Component<Props> {
  async componentDidMount() {
    this.props.checkVersion()

    try {
      await upgradeUserWalletNEP6()
    } catch (error) {
      this.props.showErrorNotification({
        message: `Error upgrading legacy wallet: ${error.message}`
      })
    }
  }

  render() {
    const { children, address, theme } = this.props

    return (
      <div style={themes[theme]} className={styles.container}>
        {address && <Sidebar className={styles.sidebar} />}
        <div className={styles.wrapper}>
          <div className={styles.content}>{children}</div>
          <Notifications />
          <ModalRenderer />
        </div>
        {address && <Footer className={styles.footer} />}
      </div>
    )
  }
}

export default compose(withThemeData())(App)
