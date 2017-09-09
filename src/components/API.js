/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import ComponentsItem from './ComponentsItem'

class API extends Component {
    render() {
        return (
            <div className="inner-content">
                <Helmet title="HTTP API" />
                <div className="page_content">
                    <div className="chart_header">
                        <h1 className="page_header">API client</h1>
                    </div>
                    <p className="description">
                        nivo provides an HTTP API, available in the{' '}
                        <a
                            href="https://github.com/plouc/nivo-api"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            nivo-api
                        </a>{' '}
                        repository. The following components are exposed through the API:
                    </p>
                    <p className="description">
                        The components exposed through the API are rendered to svg, which allow to
                        use the rendered charts as <code>&lt;img /&gt;</code> <code>src</code>.
                    </p>
                    <div className="nivo_components">
                        <ComponentsItem path="/bar/api" name="<Bar />" className="bar" />
                        <ComponentsItem path="/bubble/api" name="<Bubble />" className="bubble" />
                        <ComponentsItem
                            path="/calendar/api"
                            name="<Calendar />"
                            className="calendar"
                        />
                        <ComponentsItem path="/chord/api" name="<Chord />" className="chord" />
                        <ComponentsItem
                            path="/heatmap/api"
                            name="<HeatMap />"
                            className="heatmap"
                        />
                        <ComponentsItem path="/line/api" name="<Line />" className="line" />
                        <ComponentsItem path="/pie/api" name="<Pie />" className="pie" />
                        <ComponentsItem path="/radar/api" name="<Radar />" className="radar" />
                        <ComponentsItem path="/sankey/api" name="<Sankey />" className="sankey" />
                        <ComponentsItem
                            path="/sunburst/api"
                            name="<Sunburst />"
                            className="sunburst"
                        />
                        <ComponentsItem
                            path="/treemap/api"
                            name="<TreeMap />"
                            className="treemap"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default API
