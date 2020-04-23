import Link from 'next/link'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const StyledNav = styled.nav`
  padding: 10rem;
  display: grid;
  grid-template-columns: 50px 9fr;
  grid-column-gap: 10px;
  grid-template-areas: "logo-g nav-g";
  border-bottom: 1px solid ${props => props.theme.colors.washedWhite};

  .logo-g {
    grid-area: logo-g;
    justify-self: start;
    align-self: center;
  }
  .nav-g {
    grid-area: nav-g;
    justify-self: end;
    align-self: center;
  }

  a {
    text-decoration: none;
    font-size: 18rem;
    color: ${props => props.theme.colors.black};
  }
`

const rotateKeyFrame = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
`
const Logo = styled.div`
  .rotate {
    animation: ${rotateKeyFrame} 15s infinite linear;
  }
`
const NavBar = () => {
  return (
    <StyledNav>
      <div className='logo-g'>
        <Link href='/'>
          <a>
            <Logo>
              <img className='icon-g rotate' src='/logo.png' alt='Coronavirus Info Logo' width='30' />
            </Logo>
          </a>
        </Link>
      </div>
      <div className='nav-g'>
        <Link href='/'>
          <a style={{ marginRight: '20px' }}>Global Status</a>
        </Link>
        <Link href='/myanmar-news'>
          <a className='mm-font'>မြန်မာသတင်း</a>
        </Link>
      </div>
    </StyledNav>
  )
}

export default NavBar
