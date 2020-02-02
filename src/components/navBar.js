import Link from 'next/link'
import styled from '@emotion/styled'

const StyledNav = styled.nav`
  padding: 20px 0;

  a {
    margin-right: 10px
  }
`

const NavBar = () => {
  return (
    <StyledNav>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/myanmar-news'>
        <a className='mm-font'>မြန်မာသတင်း</a>
      </Link>
    </StyledNav>
  )
}

export default NavBar
