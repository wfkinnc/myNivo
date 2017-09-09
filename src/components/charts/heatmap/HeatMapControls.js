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
    HeatMap: getPropertiesGroupsControls(properties, 'HeatMap'),
    HeatMapCanvas: getPropertiesGroupsControls(properties, 'HeatMapCanvas'),
    api: getPropertiesGroupsControls(properties, 'api'),
}

export default class HeatMapControls extends PureComponent {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        scope: PropTypes.oneOf(Object.keys(groupsByScope)).isRequired,
    }

    render() {
        const { scope, settings, onChange } = this.props

        const groups = groupsByScope[scope]

        return (
            <ChartControls
                ns="sankey"
                scope={scope}
                settings={settings}
                onChange={onChange}
                groups={groups}
            />
        )
    }
}
