/* This Source Code Form is subject to the terms of the Mozilla Public
 * License. v. 2.0. If a copy of the MPL was not distributed with this file.
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled, { css } from 'styled-components'

interface BaseButtonProps {
  active?: boolean
}

const BaseButton = styled<BaseButtonProps, 'button'>('button')`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  display: block;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
  outline: inherit;
`

export const SkipButton = styled(BaseButton)`
  color: #76777A;
  text-decoration: underline;
  font-weight: 300;

  &:hover {
    color: #8B8A8E;
  }
`

export const Bullet = styled(BaseButton)`
  padding: 0 7px;
  font-size: 40px;
  color: #76777A;

  &:hover {
    color: #8B8A8E;
  }

  ${p => p.active && css`
    color: #FB542B;

    &:hover {
      color: #FB542B;
    }
  `}
`