import styled from '@emotion/styled'
import PropTypes from 'prop-types'

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

const NewsItem = ({ titleClassName, source, title, url, date }) => (
  <Wrapper>
    <h3 className={titleClassName}>
      <a href={url} target='_blank' rel='nofollow noreferrer noopener'>{title}</a> <small>-{source}</small> {date && <small>{date}</small>}
    </h3>
  </Wrapper>
)

NewsItem.propTypes = {
  titleClassName: PropTypes.string,
  source: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string
}

NewsItem.defaultProps = {
  titleClassName: ''
}
export default NewsItem
