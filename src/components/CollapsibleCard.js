import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CollapsibleCard extends Component {
    static propTypes = {
        expandedByDefault: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        expandedByDefault: false,
    }

    constructor(props) {
        super(props)

        this.state = {
            expanded: props.expandedByDefault,
        }
    }

    handleToggleClick = () => {
        const { expanded } = this.state
        this.setState({ expanded: !expanded })
    }

    render() {
        const { title, children } = this.props
        const { expanded } = this.state

        return (
            <div className={`card ${expanded ? '_is-expanded' : ''}`}>
                <div className="card_header" onClick={this.handleToggleClick}>
                    <h3>
                        {title}
                    </h3>
                    <span className="card_toggle" />
                </div>
                {expanded &&
                    <div className="card_body">
                        {children}
                    </div>}
            </div>
        )
    }
}
