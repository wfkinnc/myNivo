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
import { ResponsiveBubble } from 'nivo'
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import generateCode from '../../../lib/generateChartCode'
import BubbleControls from './BubbleControls'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import { settingsMapper } from '../../../lib/settings'
import config from '../../../config'
import nivoTheme from '../../../nivoTheme'

const mapSettings = settingsMapper({
    colorBy: value => {
        if (value === 'd => d.color') return d => d.color
        return value
    },
    label: value => {
        if (value === `d => \`\${d.id}: \${d.value}\``) return d => `${d.id}: ${d.value}`
        return value
    },
})

export default class BubbleReact extends Component {
    state = {
        settings: {
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
            identity: 'name',
            value: 'loc',
            colors: 'nivo',
            colorBy: 'depth',
            padding: 1,
            enableLabel: true,
            leavesOnly: false,

            // labels
            label: 'id',
            labelSkipRadius: 10,
            labelTextColor: 'inherit:darker(.8)',

            borderWidth: 0,
            borderColor: 'inherit:darker(.3)',

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

        const mappedSettings = mapSettings(settings)

        const code = generateCode('Bubble', mappedSettings)

        return (
            <div className="page_content grid">
                <div className="chart-page_aside">
                    <MediaQuery query="(max-width: 1000px)">
                        <ChartHeader
                            chartClass="Bubble"
                            tags={['hierarchy', 'svg', 'isomorphic', 'api']}
                            diceRoll={diceRoll}
                        />
                    </MediaQuery>
                    <div className="main-chart">
                        <ChartTabs chartClass="bubble" code={code} data={root}>
                            <ResponsiveBubble
                                root={cloneDeep(root)}
                                {...mappedSettings}
                                theme={nivoTheme}
                            />
                        </ChartTabs>
                    </div>
                </div>
                <div className="chart-page_main">
                    <MediaQuery query="(min-width: 1000px)">
                        <ChartHeader
                            chartClass="Bubble"
                            tags={['bubble', 'hierarchy', 'react', 'isomorphic']}
                            diceRoll={diceRoll}
                        />
                    </MediaQuery>
                    <p className="description">
                        Bubble chart (circle packing) with zooming ability. Use React for rendering
                        and react-motion for transitions.
                    </p>
                    <p className="description">
                        This chart offer various implementations, you can even{' '}
                        <Link to="/bubble/placeholders">render whatever you want</Link> instead of
                        the boring circles.
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
                            href={`${config.nivoApiUrl}/samples/bubble.svg`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            sample
                        </a>{' '}
                        or <Link to="/bubble/api">try it using the API client</Link>. You can also
                        see more example usages in{' '}
                        <a
                            href={`${config.storybookUrl}?selectedKind=Bubble&selectedStory=default`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            the storybook
                        </a>.
                    </p>
                    <BubbleControls
                        scope="Bubble"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="Bubble" properties={properties} />
                </div>
            </div>
        )
    }
}
