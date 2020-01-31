import styled from '@emotion/styled'

const Wrapper = styled.div`
  margin: 30rem 0;

  h3 small {
    color: #d1d1e9;
  }

  a {
    color: #6246ea;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const NewsItem = ({ source, title, url }) => (
  <Wrapper>
    <h3><a href={url} target='blank' rel='nofollower noreferer noopener'>{title}</a> <small>-{source.name}</small></h3>
  </Wrapper>
)

export default NewsItem
