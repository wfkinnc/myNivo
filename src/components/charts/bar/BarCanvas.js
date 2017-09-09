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
import { ResponsiveBarCanvas } from 'nivo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import BarControls from './BarControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import { settingsMapper } from '../../../lib/settings'
import nivoTheme from '../../../nivoTheme'
import { generateHeavyDataSet as generateData } from './generators'

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

export default class BarCanvas extends Component {
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

            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,
            xPadding: 0.15,
            groupMode: 'stacked',
            layout: 'horizontal',

            colors: 'd320b',
            colorBy: 'id',

            // axes
            'enable axisTop': true,
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
                chartClass="BarCanvas"
                tags={['bar', 'canvas', 'experimental']}
                diceRoll={this.diceRoll}
            />
        )

        const code = generateCode('BarCanvas', {
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
                        <ChartTabs
                            chartClass="bar"
                            code={code}
                            data={data}
                            nodeCount={data.length * keys.length}
                        >
                            <ResponsiveBarCanvas
                                data={data}
                                keys={keys}
                                {...mappedSettings}
                                theme={nivoTheme}
                            />
                        </ChartTabs>
                    </div>
                    <BarControls
                        scope="BarCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">
                        A variation around the <Link to="/bar">Bar</Link> component. Well suited for
                        large data sets as it does not impact DOM tree depth and does not involve
                        React diffing stuff (not that useful when using canvas), however you'll lose
                        the isomorphic ability and transitions (for now).
                    </p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>&lt;ResponsiveBarCanvas /&gt;</code>.
                    </p>
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="Bar" properties={properties} />
                </div>
            </div>
        )
    }
}
