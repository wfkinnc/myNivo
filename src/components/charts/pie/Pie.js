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
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import PieControls from './PieControls'
import { ResponsivePie } from 'nivo'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import { settingsMapper } from '../../../lib/settings'
import nivoTheme from '../../../nivoTheme'
import config from '../../../config'

const mapSettings = settingsMapper({
    colorBy: value => {
        if (value === 'd => d.color') return d => d.color
        return value
    },
    radialLabel: value => {
        if (value === `d => \`\${d.id} (\${d.value})\``) return d => `${d.id} (${d.value})`
        return value
    },
    sliceLabel: value => {
        if (value === `d => \`\${d.id} (\${d.value})\``) return d => `${d.id} (${d.value})`
        return value
    },
})

export default class Pie extends Component {
    state = {
        settings: {
            margin: {
                top: 80,
                right: 80,
                bottom: 80,
                left: 80,
            },
            innerRadius: 0.5,
            colors: 'nivo',
            colorBy: 'id',
            padAngle: 1,
            cornerRadius: 3,

            // border
            borderWidth: 0,
            borderColor: 'inherit:darker(0.6)',

            // radial labels
            enableRadialLabels: true,
            radialLabel: 'id',
            radialLabelsSkipAngle: 10,
            radialLabelsTextXOffset: 6,
            radialLabelsTextColor: 'inherit:darker(1)',
            radialLabelsLinkOffset: 0,
            radialLabelsLinkDiagonalLength: 16,
            radialLabelsLinkHorizontalLength: 24,
            radialLabelsLinkStrokeWidth: 2,
            radialLabelsLinkColor: 'inherit',

            // slice labels
            enableSlicesLabels: true,
            sliceLabel: 'value',
            slicesLabelsSkipAngle: 10,
            slicesLabelsTextColor: 'inherit:darker(1)',

            // motion
            animate: true,
            motionStiffness: 90,
            motionDamping: 15,

            // isInteractive
            isInteractive: true,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { data, diceRoll } = this.props
        const { settings } = this.state

        const mappedSettings = mapSettings(settings)

        const code = generateCode('Pie', mappedSettings)

        const header = (
            <ChartHeader
                chartClass="Pie"
                tags={['basic', 'radial', 'circle', 'isomorphic', 'api']}
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
                        <ChartTabs chartClass="pie" code={code} data={data}>
                            <ResponsivePie data={data} {...mappedSettings} theme={nivoTheme} />
                        </ChartTabs>
                    </div>
                </div>
                <div className="chart-page_main">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p>
                        Generates a pie chart from an array of data, each datum must have an id and
                        a value property.<br />
                        Note that margin object does not take radial labels into account,&nbsp; so
                        you should adjust it to leave enough room for it.
                    </p>
                    <p className="description">
                        The responsive alternative of this component is&nbsp;
                        <code>&lt;ResponsivePie /&gt;</code>.
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
                            href={`${config.nivoApiUrl}/samples/pie.svg`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            sample
                        </a>{' '}
                        or <Link to="/pie/api">try it using the API client</Link>. You can also see
                        more example usages in{' '}
                        <a
                            href={`${config.storybookUrl}?selectedKind=Pie&selectedStory=default`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            the storybook
                        </a>.
                    </p>
                    <PieControls
                        scope="Pie"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="Pie" properties={properties} />
                </div>
            </div>
        )
    }
}
