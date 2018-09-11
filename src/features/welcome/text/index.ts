/* This Source Code Form is subject to the terms of the Mozilla Public
 * License. v. 2.0. If a copy of the MPL was not distributed with this file.
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from 'styled-components'
import { Heading } from '../../../index'

export const Title = styled(Heading)`
  font-size: 32px;
  color: #212121;
  margin: 30px 0 0;
  text-align: center;
  line-height: 44px;
`

export const Paragraph = styled<{}, 'p'>('p')`
  display: block;
  -webkit-font-smoothing: antialiased;
  font-size: 18px;
  color: #76777A;
  line-height: 34px;
  text-align: center;
  margin: 20px 0;
`