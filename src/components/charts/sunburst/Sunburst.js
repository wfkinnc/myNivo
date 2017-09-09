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
import ChartHeader from '../../ChartHeader'
import ChartTabs from '../../ChartTabs'
import SunburstControls from './SunburstControls'
import { ResponsiveSunburst } from 'nivo'
import generateCode from '../../../lib/generateChartCode'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'
import { settingsMapper } from '../../../lib/settings'
import nivoTheme from '../../../nivoTheme'

const mapSettings = settingsMapper({
    colorBy: value => {
        if (value === 'd => d.color') return d => d.color
        return value
    },
})

export default class Sunburst extends Component {
    state = {
        settings: {
            margin: {
                top: 40,
                right: 20,
                bottom: 20,
                left: 20,
            },

            identity: 'name',
            value: 'loc',

            cornerRadius: 2,

            // border
            borderWidth: 1,
            borderColor: 'white',

            // theming
            colors: 'nivo',
            colorBy: 'id',
            childColor: 'inherit',

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

        const code = generateCode('Sunburst', mappedSettings)

        const header = (
            <ChartHeader
                chartClass="Sunburst"
                tags={['hierarchy', 'radial', 'circle']}
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
                        <ChartTabs chartClass="sunburst" code={code} data={data}>
                            <ResponsiveSunburst data={data} {...mappedSettings} theme={nivoTheme} />
                        </ChartTabs>
                    </div>
                </div>
                <div className="chart-page_main">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">
                        The responsive alternative of this component is&nbsp;
                        <code>&lt;ResponsiveSunburst /&gt;</code>.
                    </p>
                    <SunburstControls
                        scope="Sunburst"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="Sunburst" properties={properties} />
                </div>
            </div>
        )
    }
}
