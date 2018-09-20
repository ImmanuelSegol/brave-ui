/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Components
import Card from '../../../src/components/layout/card'
import Toggle from '../../../src/components/formControls/toggle'
import Button from '../../../src/components/buttonsIndicators/button'
import Table, { Cell, Row } from '../../../src/components/dataTables/table'

// Feature-specific components
import {
  Grid,
  FlexColumn,
  SwitchLabel,
  Label,
  Paragraph,
  SectionBlock,
  SubTitle
} from '../../../src/features/sync'

// Modals
import SyncANewDeviceModal from './modals/syncNewDevice'
import ResetSyncModal from './modals/resetSync'

// Utils
import locale from './page/fakeLocale'

interface SyncEnabledContentState {
  syncANewDeviceModal: boolean
  resetSyncModal: boolean
  resetSyncAreYouSureModal: boolean
}

class SyncEnabledContent extends React.PureComponent<{}, SyncEnabledContentState> {
  constructor (props: {}) {
    super(props)
    this.state = {
      syncANewDeviceModal: false,
      resetSyncModal: false,
      resetSyncAreYouSureModal: false
    }
  }

  get rows (): Row[] {
    return [
      {
        content: [
          { content: 1 },
          { content: 'MacOS without the ESC key' },
          { content: '6/12/2018, 12:10:16 PM' }
        ]
      },
      {
        content: [
          { content: 2 },
          { content: 'Windowz machineh' },
          { content: '8/1/2018, 7:12:32 PM' }
        ]
      }
    ]
  }

  get header (): Cell[] {
    return [
      { content: locale.id },
      { content: locale.deviceName },
      { content: locale.lastActive }
    ]
  }

  syncANewDevice = () => {
    this.setState({ syncANewDeviceModal: !this.state.syncANewDeviceModal })
  }

  resetSync = () => {
    this.setState({ resetSyncModal: !this.state.resetSyncModal })
  }

  resetSyncAreYouSure = () => {
    this.setState({ resetSyncAreYouSureModal: !this.state.resetSyncAreYouSureModal })
  }

  render () {
    return (
      <>
        {
          this.state.syncANewDeviceModal
            ? <SyncANewDeviceModal onClose={this.syncANewDevice} />
            : null
        }
        {
          this.state.resetSyncModal
            ? <ResetSyncModal onClose={this.resetSync} />
            : null
        }
        <Card>
          <Grid columns='1fr 1fr'>
            <FlexColumn items='center'>
              <Toggle id='syncThisDevice' size='large' checked={false} />
              <SwitchLabel htmlFor='syncThisDevice'>{locale.syncThisDevice}</SwitchLabel>
            </FlexColumn>
            <FlexColumn direction='column'>
              <Label>{locale.deviceName}</Label>
              <Paragraph>MacOS without the ESC key</Paragraph>
            </FlexColumn>
          </Grid>
        </Card>
        <SectionBlock>
          <SubTitle level={2}>{locale.devices}</SubTitle>
          <Table header={this.header} rows={this.rows} />
          <Button
            level='primary'
            type='accent'
            size='medium'
            text={locale.syncANewDevice}
            onClick={this.syncANewDevice}
          />
        </SectionBlock>
        <SectionBlock>
          <SubTitle level={2}>{locale.syncData}</SubTitle>
          <Paragraph>{locale.syncDataInfo}</Paragraph>
          <Grid columns='auto 1fr' rows='1fr 1fr 1fr' gap='5px'>
            <Toggle id='bookmarks' checked={false} />
            <SwitchLabel htmlFor='bookmarks'>
              {locale.bookmarks}
            </SwitchLabel>
            <Toggle id='savedSiteSettings' checked={false} />
            <SwitchLabel htmlFor='savedSiteSettings'>
              {locale.savedSiteSettings}
            </SwitchLabel>
            <Toggle id='browsingHistory' checked={false} />
            <SwitchLabel htmlFor='browsingHistory'>
              {locale.browsingHistory}
            </SwitchLabel>
          </Grid>
        </SectionBlock>
        <SectionBlock>
          <SubTitle level={2}>{locale.clearData}</SubTitle>
          <Button
            level='primary'
            type='accent'
            size='medium'
            text={locale.resetSync}
            onClick={this.resetSync}
          />
        </SectionBlock>
      </>
    )
  }
}

export default SyncEnabledContent
