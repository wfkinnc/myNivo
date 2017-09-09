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
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { ResponsiveTreeMapHTML } from 'nivo'
import ChartHeader from '../../ChartHeader'
import TreeMapControls from './TreeMapControls'
import generateCode from '../../../lib/generateChartCode'
import ChartTabs from '../../ChartTabs'
import config from '../../../config'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'

export default class TreeMapHTML extends Component {
    state = {
        settings: {
            // data
            identity: 'name',
            value: 'loc',

            margin: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
            },

            // labels
            enableLabels: true,
            label: 'loc',
            labelFormat: '.0s',
            labelSkipSize: 0,
            labelTextColor: 'inherit:darker(.6)',
            orientLabels: true,

            tile: 'squarify',
            leavesOnly: false,
            innerPadding: 3,
            outerPadding: 3,

            colors: 'nivo',
            colorBy: 'depth',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'inherit:darker(.3)',

            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            isInteractive: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { root, diceRoll } = this.props
        const { settings } = this.state

        const colorBy = settings.colorBy === 'd => d.color' ? d => d.color : settings.colorBy
        const label =
            settings.label === `d => \`\${d.name} (\${d.loc})\``
                ? d => `${d.name} (${d.loc})`
                : settings.label
        const labelFormat = label === 'loc' ? settings.labelFormat : undefined

        const code = generateCode('TreeMapHTML', {
            ...settings,
            label,
            labelFormat,
            colorBy,
        })

        const header = (
            <ChartHeader
                chartClass="TreeMapHTML"
                tags={['hierarchy', 'html', 'isomorphic']}
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
                            <ResponsiveTreeMapHTML
                                root={cloneDeep(root)}
                                {...settings}
                                label={label}
                                labelFormat={labelFormat}
                                colorBy={colorBy}
                            />
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
                        </a>. The difference with the <code>&lt;TreeMap /&gt;</code> component is
                        this one generates HTML markup whereas the other generates SVG.
                    </p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>&lt;ResponsiveTreeMapHTML /&gt;</code>.
                    </p>
                    <p className="description">
                        The <code>&lt;TreeMap /&gt;</code> component is also available in the{' '}
                        <a
                            href="https://github.com/plouc/nivo-api"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            nivo-api
                        </a>, see{' '}
                        <a
                            href={`${config.nivoApiUrl}/samples/treemap`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            sample
                        </a>{' '}
                        or <Link to="/treemap/api">try it using the API client</Link>.
                    </p>
                    <TreeMapControls
                        scope="TreeMapHTML"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="TreeMapHTML" properties={properties} />
                </div>
            </div>
        )
    }
}
