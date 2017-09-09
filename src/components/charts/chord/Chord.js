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
import { ResponsiveChord } from 'nivo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ChordControls from './ChordControls'
import generateCode from '../../../lib/generateChartCode'
import config from '../../../config'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import nivoTheme from '../../../nivoTheme'
import { generateChordData } from 'nivo-generators'
import { settingsMapper } from '../../../lib/settings'

const mapSettings = settingsMapper({
    label: value => {
        if (value === `d => \`\${d.id} [\${d.value}]\``) return d => `${d.id} [${d.value}]`
        return value
    },
})

const MATRIX_SIZE = 5

export default class Chord extends Component {
    state = {
        ...generateChordData({ size: MATRIX_SIZE }),
        settings: {
            margin: {
                top: 80,
                right: 80,
                bottom: 80,
                left: 80,
            },

            padAngle: 0.02,
            innerRadiusRatio: 0.96,
            innerRadiusOffset: 0.02,

            // arcs
            arcOpacity: 1,
            arcBorderWidth: 1,

            // ribbons
            ribbonOpacity: 0.5,
            ribbonBorderWidth: 1,

            // labels
            enableLabels: true,
            label: 'id',
            labelOffset: 12,
            labelRotation: -90,
            labelTextColor: 'inherit:darker(1)',

            colors: 'nivo',

            // interactivity
            isInteractive: true,
            arcHoverOpacity: 1,
            arcHoverOthersOpacity: 0.25,
            ribbonHoverOpacity: 0.75,
            ribbonHoverOthersOpacity: 0.25,

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 7,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    diceRoll = () => {
        this.setState({ ...generateChordData({ size: MATRIX_SIZE }) })
    }

    render() {
        const { settings, matrix, keys } = this.state

        const mappedSettings = mapSettings(settings)

        const code = generateCode(
            'Chord',
            { keys, ...mappedSettings },
            {
                dataKey: 'matrix',
            }
        )

        const header = (
            <ChartHeader
                chartClass="Chord"
                tags={['relational', 'isomorphic', 'api']}
                diceRoll={this.diceRoll}
            />
        )

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <div className="main-chart" style={{ height: '600px' }}>
                        <ChartTabs chartClass="chord" code={code} data={matrix}>
                            <ResponsiveChord
                                matrix={matrix}
                                keys={keys}
                                {...mappedSettings}
                                theme={nivoTheme}
                            />
                        </ChartTabs>
                    </div>
                    <ChordControls
                        scope="Chord"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">
                        Chord diagram, uses{' '}
                        <a
                            href="https://github.com/d3/d3-chord"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            d3-chord
                        </a>, see{' '}
                        <a
                            href="http://bl.ocks.org/mbostock/4062006"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            this block
                        </a>. The responsive alternative of this component is{' '}
                        <code>&lt;ResponsiveChord /&gt;</code>.
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
                            href={`${config.nivoApiUrl}/samples/chord`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            sample
                        </a>{' '}
                        or <Link to="/chord/api">try it using the API client</Link>.
                    </p>
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="Chord" properties={properties} />
                </div>
            </div>
        )
    }
}
