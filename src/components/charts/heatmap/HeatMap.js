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
import { ResponsiveHeatMap } from 'nivo'
import isFunction from 'lodash/isFunction'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import HeatMapControls from './HeatMapControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import nivoTheme from '../../../nivoTheme'
import { settingsMapper } from '../../../lib/settings'
import config from '../../../config'
import { generateLightDataSet } from './generators'

const CustomCell = ({
    value,
    x,
    y,
    width,
    height,
    color,
    opacity,
    borderWidth,
    borderColor,
    textColor,
}) =>
    <g transform={`translate(${x}, ${y})`}>
        <path
            transform={`rotate(${value < 50 ? 180 : 0})`}
            fill={color}
            fillOpacity={opacity}
            strokeWidth={borderWidth}
            stroke={borderColor}
            d={`
                M0 -${Math.round(height / 2)}
                L${Math.round(width / 2)} ${Math.round(height / 2)}
                L-${Math.round(width / 2)} ${Math.round(height / 2)}
                L0 -${Math.round(height / 2)}
            `}
        />
        <text
            alignmentBaseline="central"
            textAnchor="middle"
            style={{ fill: textColor }}
            dy={value < 50 ? -6 : 6}
        >
            {value}
        </text>
    </g>

const mapSettings = settingsMapper(
    {
        cellShape: value => {
            if (value === `Custom(props) => (…)`) return CustomCell
            return value
        },
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
        ...generateLightDataSet(),
        settings: {
            indexBy: 'country',

            margin: {
                top: 100,
                right: 60,
                bottom: 30,
                left: 60,
            },

            minValue: 'auto',
            maxValue: 'auto',
            forceSquare: true,
            sizeVariation: 0.4,
            padding: 2,
            colors: 'nivo',

            // axes
            'enable axisTop': true,
            axisTop: {
                orient: 'top',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -55,
                legend: '',
                legendOffset: 36,
            },
            'enable axisRight': false,
            axisRight: {
                orient: 'right',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'center',
                legendOffset: 0,
            },
            'enable axisBottom': false,
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
                legend: 'country',
                legendPosition: 'center',
                legendOffset: -40,
            },

            enableGridX: false,
            enableGridY: true,

            // cells
            cellShape: 'circle',
            cellOpacity: 1,
            cellBorderWidth: 0,
            cellBorderColor: 'inherit:darker(0.4)',

            // labels
            enableLabels: true,
            labelTextColor: 'inherit:darker(1.4)',

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            // interactivity
            isInteractive: true,
            hoverTarget: 'cell',
            cellHoverOpacity: 1,
            cellHoverOthersOpacity: 0.25,
        },
    }

    diceRoll = () => {
        this.setState({ ...generateLightDataSet() })
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
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
            <ChartHeader chartClass="HeatMap" tags={['heatmap', 'svg']} diceRoll={this.diceRoll} />
        )

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <div className="main-chart" style={{ height: '500px' }}>
                        <ChartTabs chartClass="heatmap" code={code} data={data}>
                            <ResponsiveHeatMap
                                data={data}
                                keys={keys}
                                {...mappedSettings}
                                theme={nivoTheme}
                            />
                        </ChartTabs>
                    </div>
                    <HeatMapControls
                        scope="HeatMap"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">
                        An heat map matrix, you can chose between various colors scales or pass
                        yours, you also have the ability to change the cell shape for rectangle or
                        circle and even use a custom rendering function.
                    </p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>&lt;ResponsiveHeatMap /&gt;</code>.
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
                            href={`${config.nivoApiUrl}/samples/heatmap.svg`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            sample
                        </a>{' '}
                        or <Link to="/heatmap/api">try it using the API client</Link>. You can also
                        see more example usages in{' '}
                        <a
                            href={`${config.storybookUrl}?selectedKind=HeatMap&selectedStory=default`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            the storybook
                        </a>.
                    </p>
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="HeatMap" properties={properties} />
                </div>
            </div>
        )
    }
}
