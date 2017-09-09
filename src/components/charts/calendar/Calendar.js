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
import generateCode from '../../../lib/generateChartCode'
import CalendarControls from './CalendarControls'
import { ResponsiveCalendar } from 'nivo'
import ComponentPropsDocumentation from '../../properties/ComponentPropsDocumentation'
import properties from './properties'

export default class Calendar extends Component {
    state = {
        data: [],
        settings: {
            margin: {
                top: 30,
                right: 30,
                bottom: 30,
                left: 30,
            },
            direction: 'horizontal',
            yearSpacing: 40,
            yearLegendOffset: 10,
            daySpacing: 0,
            dayBorderWidth: 1,
            dayBorderColor: '#000',
            monthBorderWidth: 3,
            monthBorderColor: '#000',
            monthLegendOffset: 10,
            animate: false,
        },
    }

    handleSettingsUpdate = settings => {
        this.setState({ settings })
    }

    render() {
        const { from, to, data } = this.props
        const { settings } = this.state

        const code = generateCode('Calendar', settings)

        const header = (
            <ChartHeader chartClass="Calendar" tags={['calendar', 'react', 'isomorphic']} />
        )

        return (
            <div className="page_content grid">
                <div className="chart-page_main">
                    <MediaQuery query="(max-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <div className="main-chart" style={{ height: '500px' }}>
                        <ChartTabs chartClass="calendar" code={code} data={data}>
                            <ResponsiveCalendar
                                from={from}
                                to={to}
                                data={data}
                                onDayClick={d => console.log(d)}
                                colorScale={{
                                    type: 'linear',
                                    domain: [0, 80, 160, 240, 320, 400],
                                    range: [
                                        '#e8c1a0',
                                        '#f47560',
                                        '#f1e15b',
                                        '#e8a838',
                                        '#61cdbb',
                                        '#97e3d5',
                                    ],
                                }}
                                {...settings}
                            />
                        </ChartTabs>
                    </div>
                    <CalendarControls
                        scope="Calendar"
                        settings={settings}
                        onChange={this.handleSettingsUpdate}
                    />
                </div>
                <div className="chart-page_aside">
                    <MediaQuery query="(min-width: 1000px)">
                        {header}
                    </MediaQuery>
                    <p className="description">
                        This component is heavily inspired by{' '}
                        <a
                            href="https://bl.ocks.org/mbostock/4063318"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            this block
                        </a>.
                    </p>
                    <p className="description">
                        This component renders the calendar using d3 only for computing positions.
                        DOM mutations are managed by React, you can enable transitions using the{' '}
                        <code>motion</code> property, but due to the large amount of nodes, it's
                        barely usable, if you want the fancy animations you should use the{' '}
                        <Link to="/calendar/d3">&lt;CalendarD3 /&gt;</Link> component instead which
                        deals better with transitions.
                    </p>
                    <p>
                        This component is suitable for isomorphic rendering but require to disable
                        transitions (<code>{'motion={false}'}</code>) and use the{' '}
                        <code>&lt;Calendar /&gt;</code> component not the{' '}
                        <code>&lt;ResponsiveCalendar /&gt;</code> one.
                    </p>
                </div>
                <div className="grid_item grid_item-full">
                    <ComponentPropsDocumentation chartClass="Calendar" properties={properties} />
                </div>
            </div>
        )
    }
}
