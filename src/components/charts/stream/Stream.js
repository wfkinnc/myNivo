/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import { ResponsiveStream } from 'nivo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import StreamControls from './StreamControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import { settingsMapper } from '../../../lib/settings'
import nivoTheme from '../../../nivoTheme'
import { generateLightDataSet } from './generators'

const mapSettings = settingsMapper(
    {
        colorBy: value => {
            if (value === 'd => d.color') return d => d.color
            return value
        },
        markersLabel: value => {
            if (value === `d => \`\${d.x}: \${d.y}\``) return d => `${d.x}: ${d.y}`
            return value
        },
        axisTop: (value, settings) => (settings['enable axisTop'] ? value : undefined),
        axisRight: (value, settings) => (settings['enable axisRight'] ? value : undefined),
        axisBottom: (value, settings) => (settings['enable axisBottom'] ? value : undefined),
        axisLeft: (value, settings) => (settings['enable axisLeft'] ? value : undefined),
    },
    {
        exclude: ['enable axisTop', 'enable axisRight', 'enable axisBottom', 'enable axisLeft'],
    }
)

export default class Stream extends Component {
    state = {
        ...generateLightDataSet(),
        settings: {
            margin: {
                top: 50,
                right: 60,
                bottom: 50,
                left: 60,
            },

            // axes
            'enable axisTop': false,
            axisTop: {
                orient: 'top',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
            },
            'enable axisRight': false,
            axisRight: {
                orient: 'right',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 0,
            },
            'enable axisBottom': true,
            axisBottom: {
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
            },
            'enable axisLeft': false,
            axisLeft: {
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: -40,
            },
            enableGridX: true,
            enableGridY: false,

            curve: 'catmullRom',
            offsetType: 'wiggle',
            order: 'none',

            colors: 'nivo',
            fillOpacity: 0.85,

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            // interactivity
            isInteractive: true,

            // stack tooltip
            enableStackTooltip: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    diceRoll = () => {
        this.setState({ ...generateLightDataSet() })
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = mapSettings(settings)

        const code = generateCode('Stream', mappedSettings)

        const header = (
            <ChartHeader
                chartClass="Stream"
                tags={['stacked', 'isomorphic']}
                diceRoll={this.diceRoll}
            />
        )

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <div className="main-chart main-chart-horizontal">
                        <ChartTabs chartClass="stream" code={code} data={data}>
                            <ResponsiveStream
                                data={data}
                                keys={keys}
                                {...mappedSettings}
                                theme={nivoTheme}
                            />
                        </ChartTabs>
                    </div>
                    <StreamControls
                        scope="Stream"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">Stream chart.</p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>&lt;ResponsiveStream /&gt;</code>.
                    </p>
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="Stream" properties={properties} />
                </div>
            </div>
        )
    }
}
