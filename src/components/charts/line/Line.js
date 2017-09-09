/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { ResponsiveLine } from 'nivo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import LineControls from './LineControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import config from '../../../config'
import { settingsMapper } from '../../../lib/settings'
import nivoTheme from '../../../nivoTheme'

const mapSettings = settingsMapper(
    {
        colorBy: value => {
            if (value === 'd => d.color') return d => d.color
            return value
        },
        dotLabel: value => {
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

export default class Line extends Component {
    state = {
        settings: {
            margin: {
                top: 50,
                right: 60,
                bottom: 50,
                left: 60,
            },

            minY: 'auto',
            maxY: 'auto',

            stacked: true,
            curve: 'linear',

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
                legend: 'country code',
                legendOffset: 36,
                legendPosition: 'center',
            },
            'enable axisLeft': true,
            axisLeft: {
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'center',
            },

            // grid
            enableGridX: true,
            enableGridY: true,

            colors: 'nivo',
            colorBy: 'id',

            // dots
            enableDots: true,
            dotSize: 10,
            dotColor: 'inherit:darker(.3)',
            dotBorderWidth: 2,
            dotBorderColor: '#fff',
            enableDotLabel: true,
            dotLabel: 'y',
            dotLabelYOffset: -12,

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

    render() {
        const { data, diceRoll } = this.props
        const { settings } = this.state

        const mappedSettings = mapSettings(settings)

        const code = generateCode('Line', mappedSettings)

        const header = (
            <ChartHeader
                chartClass="Line"
                tags={['basic', 'isomorphic', 'api']}
                diceRoll={diceRoll}
            />
        )

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <div className="main-chart main-chart-horizontal">
                        <ChartTabs chartClass="line" code={code} data={data}>
                            <ResponsiveLine data={data} {...mappedSettings} theme={nivoTheme} />
                        </ChartTabs>
                    </div>
                    <LineControls
                        scope="Line"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">Line chart with stacking ability.</p>
                    <p>
                        Given an array of data series having an id and a nested array of points
                        (with x, y properties), it will compute the line for each data serie.&nbsp;
                        If stacked is true, y values will be automatically aggregated.
                    </p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>&lt;ResponsiveLine /&gt;</code>.
                    </p>
                    <p className="description">
                        This component is available in the{' '}
                        <a
                            href="https://github.com/plouc/nivo-api"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            nivo-api
                        </a>, see{' '}
                        <a
                            href={`${config.nivoApiUrl}/samples/line.svg`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            sample
                        </a>{' '}
                        or <Link to="/line/api">try it using the API client</Link>. You can also see
                        more example usages in{' '}
                        <a
                            href={`${config.storybookUrl}?selectedKind=Line&selectedStory=default`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            the storybook
                        </a>.
                    </p>
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="Line" properties={properties} />
                </div>
            </div>
        )
    }
}
