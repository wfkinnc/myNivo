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
import { ResponsiveBar } from 'nivo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import BarControls from './BarControls'
import config from '../../../config'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import { settingsMapper } from '../../../lib/settings'
import nivoTheme from '../../../nivoTheme'
import { generateLightDataSet as generateData } from './generators'

const mapSettings = settingsMapper(
    {
        colorBy: value => {
            if (value === `({ id, data }) => data[\`\${id}Color\`]`)
                return ({ id, data }) => data[`${id}Color`]
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

export default class Bar extends Component {
    state = {
        ...generateData(),
        settings: {
            // data
            indexBy: 'country',

            margin: {
                top: 50,
                right: 60,
                bottom: 50,
                left: 60,
            },

            xPadding: 0.2,
            groupMode: 'stacked',
            layout: 'vertical',

            colors: 'nivo',
            colorBy: 'id',

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
                legend: 'country',
                legendPosition: 'center',
                legendOffset: 36,
            },
            'enable axisLeft': true,
            axisLeft: {
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'center',
                legendOffset: -40,
            },

            enableGridX: false,
            enableGridY: true,
            enableLabels: true,
            labelsTextColor: 'inherit:darker(1.6)',
            labelsLinkColor: 'inherit',

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            // interactivity
            isInteractive: true,
        },
    }

    diceRoll = () => {
        this.setState(generateData())
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = mapSettings(settings)

        const header = (
            <ChartHeader
                chartClass="Bar"
                tags={['basic', 'isomorphic', 'api']}
                diceRoll={this.diceRoll}
            />
        )

        const code = generateCode('Bar', {
            keys,
            ...mappedSettings,
        })

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <div className="main-chart main-chart-horizontal">
                        <ChartTabs chartClass="bar" code={code} data={data}>
                            <ResponsiveBar
                                data={data}
                                keys={keys}
                                {...mappedSettings}
                                theme={nivoTheme}
                            />
                        </ChartTabs>
                    </div>
                    <BarControls
                        scope="Bar"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">
                        Bar chart with grouping ability, stacked or side by side. You can also
                        switch to horizontal layout.
                    </p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>&lt;ResponsiveBar /&gt;</code>.
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
                            href={`${config.nivoApiUrl}/samples/bar.svg`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            sample
                        </a>{' '}
                        or <Link to="/bar/api">try it using the API client</Link>. You can also see
                        more example usages in{' '}
                        <a
                            href={`${config.storybookUrl}?selectedKind=Bar&selectedStory=stacked`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            the storybook
                        </a>.
                    </p>
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="Bar" properties={properties} />
                </div>
            </div>
        )
    }
}
