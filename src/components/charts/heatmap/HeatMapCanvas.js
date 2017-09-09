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
import { ResponsiveHeatMapCanvas } from 'nivo'
import isFunction from 'lodash/isFunction'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import HeatMapControls from './HeatMapControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import nivoTheme from '../../../nivoTheme'
import { settingsMapper } from '../../../lib/settings'
import { generateHeavyDataSet } from './generators'

const mapSettings = settingsMapper(
    {
        axisTop: (value, settings) => (settings['enable axisTop'] ? value : null),
        axisRight: (value, settings) => (settings['enable axisRight'] ? value : null),
        axisBottom: (value, settings) => (settings['enable axisBottom'] ? value : null),
        axisLeft: (value, settings) => (settings['enable axisLeft'] ? value : null),
    },
    {
        exclude: ['enable axisTop', 'enable axisRight', 'enable axisBottom', 'enable axisLeft'],
    }
)

export default class HeatMap extends Component {
    state = {
        ...generateHeavyDataSet(),
        settings: {
            indexBy: 'country',

            margin: {
                top: 100,
                right: 60,
                bottom: 100,
                left: 60,
            },

            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,
            minValue: 'auto',
            maxValue: 'auto',
            forceSquare: false,
            sizeVariation: 0,
            padding: 0,
            colors: 'BrBG',

            // axes
            'enable axisTop': true,
            axisTop: {
                orient: 'top',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: '',
                legendOffset: 36,
            },
            'enable axisRight': true,
            axisRight: {
                orient: 'right',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'center',
                legendOffset: 0,
            },
            'enable axisBottom': true,
            axisBottom: {
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
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
                legend: 'country',
                legendPosition: 'center',
                legendOffset: -40,
            },

            enableGridX: false,
            enableGridY: true,

            // cells
            cellShape: 'rect',
            cellOpacity: 1,
            cellBorderWidth: 0,
            cellBorderColor: 'inherit:darker(0.4)',

            // labels
            enableLabels: true,
            labelTextColor: 'inherit:darker(1.4)',

            // motion
            animate: true,
            motionStiffness: 120,
            motionDamping: 9,

            // interactivity
            isInteractive: true,
            hoverTarget: 'rowColumn',
            cellHoverOpacity: 1,
            cellHoverOthersOpacity: 0.5,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    diceRoll = () => {
        this.setState({ ...generateHeavyDataSet() })
    }

    render() {
        const { data, keys, settings } = this.state

        const mappedSettings = mapSettings(settings)

        const code = generateCode(
            'HeatMap',
            Object.assign({ keys }, mappedSettings, {
                cellShape: isFunction(mappedSettings.cellShape)
                    ? 'Custom(props) => (…)'
                    : mappedSettings.cellShape,
            })
        )

        const header = (
            <ChartHeader
                chartClass="HeatMapCanvas"
                tags={['heatmap', 'canvas', 'experimental']}
                diceRoll={this.diceRoll}
            />
        )

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <div className="main-chart" style={{ height: '500px' }}>
                        <ChartTabs
                            chartClass="heatmap"
                            code={code}
                            data={data}
                            nodeCount={data.length * keys.length}
                        >
                            <ResponsiveHeatMapCanvas
                                data={data}
                                keys={keys}
                                {...mappedSettings}
                                theme={nivoTheme}
                            />
                        </ChartTabs>
                    </div>
                    <HeatMapControls
                        scope="HeatMapCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">
                        A variation around the <Link to="/heatmap">HeatMap</Link> component. Well
                        suited for large data sets as it does not impact DOM tree depth and does not
                        involve React diffing stuff (not that useful when using canvas), however
                        you'll lose the isomorphic ability and transitions (for now).
                    </p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>&lt;ResponsiveHeatMapCanvas /&gt;</code>.
                    </p>
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="HeatMap" properties={properties} />
                </div>
            </div>
        )
    }
}
