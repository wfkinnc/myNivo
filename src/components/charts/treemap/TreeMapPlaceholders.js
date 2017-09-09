/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import MediaQuery from 'react-responsive'
import { ResponsiveTreeMapPlaceholders } from 'nivo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import TreeMapControls from './TreeMapControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'

const placeholdersProperties = properties.filter(
    ({ controlGroup }) => !['Labels', 'Border'].includes(controlGroup)
)

export default class TreeMapPlaceholders extends Component {
    state = {
        settings: {
            identity: 'name',
            value: 'loc',

            namespace: 'html',

            margin: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
            },
            tile: 'squarify',
            leavesOnly: false,
            innerPadding: 3,
            outerPadding: 3,
            colors: 'nivo',
            animate: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { root, diceRoll } = this.props
        const { settings } = this.state

        const code = generateCode('TreeMapPlaceholders', settings)

        const header = (
            <ChartHeader
                chartClass="TreeMapPlaceholders"
                tags={['hierarchy', 'placeholders', 'isomorphic']}
                diceRoll={diceRoll}
            />
        )

        return (
            <div className="page_content grid">
                <div className="chart-page_aside">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <div className="main-chart">
                        <ChartTabs chartClass="treemap" code={code} data={root}>
                            <ResponsiveTreeMapPlaceholders root={cloneDeep(root)} {...settings}>
                                {nodes =>
                                    nodes.map((node, i) => {
                                        return (
                                            <div
                                                key={`${i}.${node.key}.${node.data.loc}`}
                                                style={{
                                                    position: 'absolute',
                                                    top: node.style.y,
                                                    left: node.style.x,
                                                    width: node.style.width,
                                                    height: node.style.height,
                                                    background: node.style.color,
                                                    borderRadius: '3px',
                                                }}
                                            />
                                        )
                                    })}
                            </ResponsiveTreeMapPlaceholders>
                        </ChartTabs>
                    </div>
                </div>
                <div className="chart-page_main">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">
                        Use{' '}
                        <a
                            href="https://github.com/d3/d3-hierarchy#treemap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            d3-hierarchy.treemap
                        </a>, see{' '}
                        <a
                            href="http://bl.ocks.org/mbostock/6bbb0a7ff7686b124d80"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            this block
                        </a>.
                    </p>
                    <p className="description">Take total control over TreeMap component.</p>
                    <TreeMapControls
                        scope="TreeMapPlaceholders"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation
                        chartClass="TreeMapPlaceholders"
                        properties={placeholdersProperties}
                    />
                </div>
            </div>
        )
    }
}
