/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { ResponsiveBubblePlaceholders } from 'nivo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import BubbleControls from './BubbleControls'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import nivoTheme from '../../../nivoTheme'

export default class BubblePlaceholdersPage extends Component {
    state = {
        settings: {
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
            namespace: 'html',
            identity: 'name',
            value: 'loc',
            padding: 1,
            leavesOnly: false,
            colors: 'nivo',
            colorBy: 'depth',

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 12,

            // interactivity
            isInteractive: true,

            // zooming
            isZoomable: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { root, diceRoll } = this.props
        const { settings } = this.state

        const code = generateCode('BubblePlaceholders', settings)

        return (
            <div className="page_content grid">
                <div className="chart-page_aside">
                    <MediaQuery query="(max-width: 1000px)">
                        <ChartHeader
                            chartClass="BubblePlaceholders"
                            tags={['hierarchy', 'placeholders', 'isomorphic']}
                            diceRoll={diceRoll}
                        />
                    </MediaQuery>
                    <div className="main-chart">
                        <ChartTabs chartClass="bubble" code={code} data={root}>
                            <ResponsiveBubblePlaceholders
                                root={cloneDeep(root)}
                                {...settings}
                                theme={nivoTheme}
                            >
                                {nodes =>
                                    nodes.map(node => {
                                        return (
                                            <div
                                                key={node.key}
                                                onClick={node.zoom}
                                                style={{
                                                    position: 'absolute',
                                                    top: node.style.y - node.style.r,
                                                    left: node.style.x - node.style.r,
                                                    width: node.style.r * 2,
                                                    height: node.style.r * 2,
                                                    borderRadius: node.style.r,
                                                    border: `2px solid ${node.style.color}`,
                                                    backgroundSize: 'contain',
                                                    backgroundImage: `url(http://placekitten.com/240/240)`,
                                                }}
                                            />
                                        )
                                    })}
                            </ResponsiveBubblePlaceholders>
                        </ChartTabs>
                    </div>
                </div>
                <div className="chart-page_main">
                    <MediaQuery query="(min-width: 1000px)">
                        <ChartHeader
                            chartClass="BubblePlaceholders"
                            tags={['bubble', 'hierarchy', 'placeholders', 'isomorphic']}
                            diceRoll={diceRoll}
                        />
                    </MediaQuery>
                    <p className="description">
                        Take total control over Bubble component (kittens compliant). This
                        implementation also offer zooming ability, each node you receive will have a
                        zoom function, just call it to zoom on the node it's bound to.
                    </p>
                    <p className="description">
                        This chart offer various implementations, you can also render it in{' '}
                        <Link to="/bubble">SVG</Link>.
                    </p>

                    <BubbleControls
                        scope="BubblePlaceholders"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation
                        chartClass="BubblePlaceholders"
                        properties={properties}
                    />
                </div>
            </div>
        )
    }
}
