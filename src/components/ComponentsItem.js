import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ComponentsItem extends Component {
    render() {
        const { path, name, className, extras, tags } = this.props

        return (
            <Link to={path} className="nivo_components_item">
                <div className="nivo_components_item_header">
                    <span className={`nivo-icon red sprite-icons-${className}-red`} />
                    <span className="nivo_components_item_name">
                        {name}
                    </span>
                    {extras.length > 0 &&
                        <div className="extras">
                            {extras.map(extra =>
                                <span key={extra} className={`nivo-icon nivo-icon-${extra}`} />
                            )}
                        </div>}
                </div>
                {tags.length > 0 &&
                    <div className="nivo_components_item_tags">
                        {tags.map(tag =>
                            <span key={tag} className="nivo_components_item_tags_item">
                                {tag}
                            </span>
                        )}
                    </div>}
            </Link>
        )
    }
}

ComponentsItem.defaultProps = {
    extras: [],
    tags: [],
}

export default ComponentsItem
