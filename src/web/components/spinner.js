import styled from '@emotion/styled'
import BeatLoader from 'react-spinners/BeatLoader'

import theme from '../theme'

const SpinnerWrapper = styled.div`
  width: 100px;
  margin: 100rem auto;
  text-align: center;
`

const Spinner = () => (
  <SpinnerWrapper>
    <BeatLoader color={theme.colors.purple} />
  </SpinnerWrapper>
)

export default Spinner
