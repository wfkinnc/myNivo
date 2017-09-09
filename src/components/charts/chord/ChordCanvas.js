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
import { ResponsiveChordCanvas } from 'nivo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import ChordControls from './ChordControls'
import generateCode from '../../../lib/generateChartCode'
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

const MATRIX_SIZE = 38

export default class ChordCanvas extends Component {
    state = {
        ...generateChordData({ size: MATRIX_SIZE }),
        settings: {
            margin: {
                top: 80,
                right: 80,
                bottom: 80,
                left: 80,
            },

            pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

            padAngle: 0.006,
            innerRadiusRatio: 0.86,
            innerRadiusOffset: 0,

            // arcs
            arcOpacity: 1,
            arcBorderWidth: 1,

            // ribbons
            ribbonOpacity: 0.5,
            ribbonBorderWidth: 1,

            // labels
            enableLabels: true,
            label: 'id',
            labelOffset: 9,
            labelRotation: -90,
            labelTextColor: 'inherit:darker(1)',

            colors: 'd320b',

            // interactivity
            isInteractive: true,
            arcHoverOpacity: 1,
            arcHoverOthersOpacity: 0.4,
            ribbonHoverOpacity: 0.75,
            ribbonHoverOthersOpacity: 0,

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
            'ChordCanvas',
            { keys, ...mappedSettings },
            {
                dataKey: 'matrix',
            }
        )

        const header = (
            <ChartHeader
                chartClass="ChordCanvas"
                tags={['relational', 'canvas', 'experimental']}
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
                        <ChartTabs chartClass="chord" code={code} data={matrix} nodeCount={MATRIX_SIZE * MATRIX_SIZE + MATRIX_SIZE}>
                            <ResponsiveChordCanvas
                                matrix={matrix}
                                keys={keys}
                                {...mappedSettings}
                                theme={nivoTheme}
                            />
                        </ChartTabs>
                    </div>
                    <ChordControls
                        scope="ChordCanvas"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">
                        A variation around the <Link to="/chord">Chord</Link> component. Well
                        suited for large data sets as it does not impact DOM tree depth and does not
                        involve React diffing stuff (not that useful when using canvas), however
                        you'll lose the isomorphic ability and transitions (for now).
                    </p>
                    <p className="description">
                        The responsive alternative of this component is{' '}
                        <code>&lt;ResponsiveChordCanvas /&gt;</code>.
                    </p>
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="ChordCanvas" properties={properties} />
                </div>
            </div>
        )
    }
}
