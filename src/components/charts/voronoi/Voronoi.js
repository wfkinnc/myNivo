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
import { Voronoi, ResponsiveVoronoi } from 'nivo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import VoronoiControls from './VoronoiControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'

class VoronoiReact extends Component {
    constructor(props) {
        super(props)

        this.handleSettingsUpdate = this.handleSettingsUpdate.bind(this)

        this.state = {
            settings: Object.assign({}, Voronoi.defaultProps, {
                borderWidth: 2,
                borderColor: '#c6432d',
                linkColor: '#f4735e',
                colors: 'nivo',
            }),
        }
    }

    handleSettingsUpdate(settings) {
        this.setState({ settings })
    }

    render() {
        const { data, diceRoll } = this.props
        const { settings } = this.state

        const code = generateCode('Voronoi', settings)

        const header = (
            <ChartHeader
                chartClass="Voronoi"
                tags={['voronoi', 'experimental']}
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
                        <ChartTabs chartClass="voronoi" code={code} data={data}>
                            <ResponsiveVoronoi
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                }}
                                data={data}
                                {...settings}
                            />
                        </ChartTabs>
                    </div>
                </div>
                <div className="chart-page_main">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">
                        Voronoi Tessellation, uses{' '}
                        <a
                            href="https://github.com/d3/d3-voronoi"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            d3-voronoi
                        </a>, see{' '}
                        <a
                            href="http://bl.ocks.org/mbostock/4060366"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            this block
                        </a>. The responsive alternative of this component is{' '}
                        <code>&lt;ResponsiveVoronoi /&gt;</code>.
                    </p>
                    <VoronoiControls
                        scope="Voronoi"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="Voronoi" properties={[]} />
                </div>
            </div>
        )
    }
}

export default VoronoiReact
