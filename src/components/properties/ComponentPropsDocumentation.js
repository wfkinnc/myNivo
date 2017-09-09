import React, { Component } from 'react'
import CollapsibleCard from '../CollapsibleCard'
import ComponentPropsTable from './ComponentPropsTable'

export default class ComponentPropsDocumentation extends Component {
    shouldComponentUpdate() {
        return false
    }

    render() {
        const { chartClass, properties } = this.props

        return (
            <CollapsibleCard title={`${chartClass} properties`} expandedByDefault={true}>
                <ComponentPropsTable
                    properties={properties.filter(property => property.excludeFromDoc !== true)}
                />
            </CollapsibleCard>
        )
    }
}
