import Link from 'next/link'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const StyledNav = styled.nav`
  padding: 10rem;
  display: grid;
  grid-template-columns: 3fr 7fr;
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
  display: grid;
  grid-template-columns: 35px 150px;
  grid-template-areas: "icon-g name-g";
  font-size: 20rem;

  .icon-g {
    grid-area: icon-g;
    align-self: center;
  }
  .name-g {
    grid-area: name-g;
    align-self: center;
  }
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
              <span className='name-g'>Coronavirus Info</span>
            </Logo>
          </a>
        </Link>
      </div>
      <div className='nav-g'>
        <Link href='/myanmar-news'>
          <a className='mm-font'>မြန်မာ</a>
        </Link>
      </div>
    </StyledNav>
  )
}

export default NavBar
