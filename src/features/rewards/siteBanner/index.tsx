/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import * as CSS from 'csstype'
import {
  StyledWrapper,
  StyledDonation,
  StyledContent,
  StyledBanner,
  StyledBannerImage,
  StyledClose,
  StyledContentWrapper,
  StyledLogoWrapper,
  StyledLogoBorder,
  StyledTextWrapper,
  StyledTitle,
  StyledText,
  StyledRecurring,
  StyledRemove,
  StyledWallet,
  StyledTokens,
  StyledCenter,
  StyledIconRecurringBig,
  StyledIconRemove,
  StyledSocialItem,
  StyledSocialIcon,
  StyledOption,
  StyledIconRecurring,
  StyledLogoText
} from './style'

import Donate from '../donate/index'
import Checkbox from '../../../components/formControls/checkbox/index'
import { getLocale } from '../../../helpers'
import {
  RefreshIcon,
  CloseStrokeIcon,
  TwitterColorIcon,
  YoutubeColorIcon,
  TwitchColorIcon
} from '../../../components/icons'

type Social = {type: SocialType, name: string, handler: string}
type SocialType = 'twitter' | 'youtube' | 'twitch'
type Donation = {tokens: number, converted: number, selected?: boolean}

export interface Props {
  balance: number
  currentAmount: number
  donationAmounts: Donation[]
  onAmountSelection: (tokens: number) => void
  id?: string
  title?: string
  domain: string
  bgImage?: string
  logo?: string
  social?: Social[]
  currentDonation?: number
  children?: React.ReactNode
  onDonate: (amount: number, monthly: boolean) => void
  onClose?: () => void
  logoBgColor?: CSS.Color
}

interface State {
  monthly: boolean
}

export default class SiteBanner extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      monthly: false
    }
  }

  getLogo (logo: string | undefined, domain: string) {
    return !logo
      ? <StyledLogoText>{(domain && domain.substring(0,1)) || ''}</StyledLogoText>
      : <img src={logo} />
  }

  getSocialData (item: Social) {
    let link = ''
    let logo = null
    switch (item.type) {
      case 'twitter':
        link = `https://twitter.com/${item.handler}`
        logo = <TwitterColorIcon />
        break
      case 'youtube':
        link = `https://www.youtube.com/channel/${item.handler}`
        logo = <YoutubeColorIcon />
        break
      case 'twitch':
        link = `https://www.twitch.tv/${item.handler}`
        logo = <TwitchColorIcon />
        break
    }

    return {
      link,
      logo
    }
  }

  getSocial = (social?: Social[]) => {
    if (!social || social.length === 0) {
      return null
    }

    const self = this
    return social.map((item: Social) => {
      const data = self.getSocialData(item)
      return (
        <StyledSocialItem
          key={`${self.props.id}-social-${item.type}`}
          href={data.link}
          target={'_blank'}
        >
          <StyledSocialIcon>
            {data.logo}
          </StyledSocialIcon> {item.name || item.handler}
        </StyledSocialItem>
      )
    })
  }

  getTitle (title?: string) {
    return title ? title : getLocale('welcome')
  }

  getText (children?: React.ReactNode) {
    if (!children) {
      return (
        <>
          <p>
            {getLocale('rewardsBannerText1')}
          </p>
          <p>
            {getLocale('rewardsBannerText2')}
          </p>
        </>
      )
    }

    return children
  }

  onMonthlyChange = (key: string, selected: boolean) => {
    this.setState({ monthly: selected })
  }

  onDonate = (amount: number) => {
    if (this.props.onDonate) {
      this.props.onDonate(amount, this.state.monthly)
    }
  }

  onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key.toLowerCase() === 'escape' && this.props.onClose) {
      this.props.onClose()
    }
  }

  render () {
    const {
      id,
      bgImage,
      onClose,
      logo,
      social,
      children,
      title,
      currentDonation,
      balance,
      donationAmounts,
      domain,
      onAmountSelection,
      logoBgColor,
      currentAmount
    } = this.props

    return (
      <StyledWrapper id={id} onKeyUp={this.onKeyUp} tabIndex={0}>
        <StyledBanner>
          <StyledClose onClick={onClose}>{close}</StyledClose>
          <StyledBannerImage bgImage={bgImage}>
            <StyledCenter>
              {domain}
            </StyledCenter>
          </StyledBannerImage>
          <StyledContentWrapper>
            <StyledContent>
              <StyledLogoWrapper>
                <StyledLogoBorder padding={!logo} bg={logoBgColor}>
                  {this.getLogo(logo, domain)}
                </StyledLogoBorder>
                {this.getSocial(social)}
              </StyledLogoWrapper>
              <StyledTextWrapper>
                <StyledTitle>{this.getTitle(title)}</StyledTitle>
                <StyledText>{this.getText(children)}</StyledText>
              </StyledTextWrapper>
              {
                currentDonation && !isNaN(currentDonation) && currentDonation > 0
                ? <StyledRecurring>
                  <StyledIconRecurringBig>
                    <RefreshIcon />
                  </StyledIconRecurringBig>
                  <span>{getLocale('currentDonation', { currentDonation })}</span>
                  <StyledRemove>
                    <StyledIconRemove><CloseStrokeIcon /></StyledIconRemove>{getLocale('remove')}
                  </StyledRemove>
                </StyledRecurring>
                : null
              }
            </StyledContent>
            <StyledDonation>
              <StyledWallet>
                {getLocale('walletBalance')} <StyledTokens>{balance} {getLocale('tokens')}</StyledTokens>
              </StyledWallet>
              <Donate
                balance={balance}
                donationAmounts={donationAmounts}
                title={getLocale('donationAmount')}
                onDonate={this.onDonate}
                actionText={getLocale('sendDonation')}
                onAmountSelection={onAmountSelection}
                donateType={'big'}
                currentAmount={currentAmount}
              >
                <Checkbox
                  value={{ make: this.state.monthly }}
                  onChange={this.onMonthlyChange}
                  type={'dark'}
                >
                  <div data-key='make'>
                    <StyledOption>{getLocale('makeMonthly')}</StyledOption> <StyledIconRecurring><RefreshIcon /></StyledIconRecurring>
                  </div>
                </Checkbox>
              </Donate>
            </StyledDonation>
          </StyledContentWrapper>
        </StyledBanner>
      </StyledWrapper>
    )
  }
}
