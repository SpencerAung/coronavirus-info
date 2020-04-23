
import styled from '@emotion/styled'

const IFrameWrapper = styled.div`
  margin: 80rem auto 0;
  width: 355px;
  text-align: center;
`

export default () => (
  <IFrameWrapper>
    <iframe
      src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMinistryOfHealthAndSportsMyanmar&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=232356748203581'
      width='340'
      height='500'
      style={{ border: 'none', overflow: 'hidden' }}
      scrolling='no'
      frameborder='0'
      allowTransparency='true'
      allow='encrypted-media'
    />
  </IFrameWrapper>
)
