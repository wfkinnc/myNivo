/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ChartControls from '../../controls/ChartControls'
import { getPropertiesGroupsControls } from '../../../lib/componentProperties'
import properties from './properties'

const groupsByScope = {
    TreeMap: getPropertiesGroupsControls(properties, 'TreeMap'),
    TreeMapHTML: getPropertiesGroupsControls(properties, 'TreeMapHTML'),
    TreeMapPlaceholders: getPropertiesGroupsControls(properties, 'TreeMapPlaceholders'),
    api: getPropertiesGroupsControls(properties, 'api'),
}

export default class TreeMapControls extends PureComponent {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        scope: PropTypes.oneOf(Object.keys(groupsByScope)).isRequired,
    }

    render() {
        const { settings, scope, onChange } = this.props

        const groups = groupsByScope[scope]

        return (
            <ChartControls
                ns="treemap"
                scope={scope}
                settings={settings}
                onChange={onChange}
                groups={groups}
            />
        )
    }
}
