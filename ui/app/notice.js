const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const ReactMarkdown = require('react-markdown')
const connect = require('react-redux').connect
const actions = require('./actions')



module.exports = connect(mapStateToProps)(Notice)

function mapStateToProps (state) {
  return {
    lastUnreadNotice: state.metamask.lastUnreadNotice,
  }
}

inherits(Notice, Component)
function Notice () {
  Component.call(this)
}

Notice.prototype.render = function () {
  const props = this.props

  return (
    h('div', {
      style: {
        background: 'white',
      },
    }, [
      `${props.lastUnreadNotice.title}`,
      h(ReactMarkdown, {
        source: props.lastUnreadNotice.body,
        skipHtml: true,
      }),
      h('button', {
        onClick: () => props.dispatch(actions.markNoticeRead(props.lastUnreadNotice)),
      }, 'Mark as Read'),
    ])
  )
}