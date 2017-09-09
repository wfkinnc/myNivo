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
import { ResponsiveSankey } from 'nivo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import SankeyControls from './SankeyControls'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import config from '../../../config'
import nivoTheme from '../../../nivoTheme'

export default class Sankey extends Component {
    state = {
        settings: {
            margin: {
                top: 40,
                right: 60,
                bottom: 40,
                left: 60,
            },

            align: 'justify',
            colors: 'd320b',

            // nodes
            nodeOpacity: 0.75,
            nodeHoverOpacity: 1,
            nodeWidth: 18,
            nodePaddingX: 4,
            nodePaddingY: 12,
            nodeBorderWidth: 0,
            nodeBorderColor: 'inherit:darker(0.4)',

            // links
            linkOpacity: 0.15,
            linkHoverOpacity: 0.4,
            linkContract: 0,

            // labels
            enableLabels: true,
            labelPosition: 'outside',
            labelOrientation: 'vertical',
            labelPadding: 16,
            labelTextColor: 'inherit:darker(0.8)',

            // motion
            animate: true,
            motionStiffness: 120,
            motionDamping: 11,

            // interactivity
            isInteractive: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, randomizeLinkValues } = this.props
        const { settings } = this.state

        const code = generateCode('Sankey', settings)

        const header = (
            <ChartHeader
                chartClass="Sankey"
                tags={['relational', 'flow', 'api']}
                diceRoll={randomizeLinkValues}
            />
        )

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <div className="main-chart" style={{ height: '500px' }}>
                        <ChartTabs chartClass="sankey" code={code} data={data}>
                            <ResponsiveSankey data={data} {...settings} theme={nivoTheme} />
                        </ChartTabs>
                    </div>
                    <SankeyControls
                        scope="Sankey"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">
                        Computes a sankey diagram from nodes and links, uses{' '}
                        <a
                            href="https://github.com/d3/d3-sankey"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            d3-sankey
                        </a>, see{' '}
                        <a
                            href="https://bl.ocks.org/mbostock/ca9a0bb7ba204d12974bca90acc507c0"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            this block
                        </a>. The responsive alternative of this component is{' '}
                        <code>&lt;ResponsiveSankey /&gt;</code>.
                    </p>
                    <p className="description">
                        Please be careful with the data you use for this chart as it does not
                        support cyclic dependencies.<br />
                        For example, something like <code>A —> A</code> or{' '}
                        <code>A —> B —> C —> A</code> will crash.
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
                            href={`${config.nivoApiUrl}/samples/sankey.svg`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            sample
                        </a>{' '}
                        or <Link to="/sankey/api">try it using the API client</Link>. You can also
                        see more example usages in{' '}
                        <a
                            href={`${config.storybookUrl}?selectedKind=Sankey&selectedStory=default`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            the storybook
                        </a>.
                    </p>
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="Sankey" properties={properties} />
                </div>
            </div>
        )
    }
}
