/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChartControls from '../../controls/ChartControls'

export default class VoronoiControls extends Component {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        scope: PropTypes.oneOf(['Voronoi']).isRequired,
    }

    render() {
        const { settings, scope, onChange } = this.props

        return (
            <ChartControls
                ns="voronoi"
                scope={scope}
                settings={settings}
                onChange={onChange}
                groups={[
                    {
                        name: 'Base',
                        controls: [
                            {
                                name: 'enableSites',
                                type: 'switch',
                                help: 'Enable/disable sites.',
                            },
                            {
                                name: 'enableLinks',
                                type: 'switch',
                                help: 'Enable/disable links.',
                            },
                            {
                                name: 'enablePolygons',
                                type: 'switch',
                                help: 'Enable/disable polygons.',
                            },
                            {
                                name: 'borderWidth',
                                unit: 'px',
                                type: 'range',
                                help: 'Border width for polygons.',
                                min: 0,
                                max: 10,
                            },
                            {
                                name: 'linkWidth',
                                unit: 'px',
                                type: 'range',
                                help: 'Links line width.',
                                min: 0,
                                max: 10,
                            },
                        ],
                    },
                ]}
            />
        )
    }
}
