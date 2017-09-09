import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import ComponentsItem from './ComponentsItem'

const defaultComponents = [
    {
        key: 'bar',
        path: '/bar',
        name: '<Bar />',
        className: 'bar',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-bar',
        path: '/bar',
        name: '<ResponsiveBar />',
        className: 'bar',
        extras: ['react', 'svg'],
    },
    {
        key: 'bar-canvas',
        path: '/bar/canvas',
        name: '<BarCanvas />',
        className: 'bar',
        extras: ['react', 'canvas'],
    },
    {
        key: 'responsive-bar-canvas',
        path: '/bar/canvas',
        name: '<ResponsiveBarCanvas />',
        className: 'bar',
        extras: ['react', 'canvas'],
    },
    {
        key: 'bar-api',
        path: '/bar/api',
        name: '<Bar /> HTTP API',
        className: 'bar',
        extras: ['react', 'api'],
    },
    {
        key: 'bubble',
        path: '/bubble',
        name: '<Bubble />',
        className: 'bubble',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-bubble',
        path: '/bubble',
        name: '<ResponsiveBubble />',
        className: 'bubble',
        extras: ['react', 'svg'],
    },
    {
        key: 'bubble-placeholders',
        path: '/bubble/placeholders',
        name: '<BubblePlaceholders />',
        className: 'bubble',
        extras: ['react', 'placeholders'],
    },
    {
        key: 'bubble-api',
        path: '/bubble/api',
        name: '<Bubble /> HTTP API',
        className: 'bubble',
        extras: ['react', 'api'],
    },
    {
        key: 'calendar',
        path: '/calendar',
        name: '<Calendar />',
        className: 'calendar',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-calendar',
        path: '/calendar',
        name: '<ResponsiveCalendar />',
        className: 'calendar',
        extras: ['react', 'svg'],
    },
    {
        key: 'calendar-api',
        path: '/calendar/api',
        name: '<Calendar /> HTTP API',
        className: 'calendar',
        extras: ['react', 'api'],
    },
    {
        key: 'chord',
        path: '/chord',
        name: '<Chord />',
        className: 'chord',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-chord',
        path: '/chord',
        name: '<ResponsiveChord />',
        className: 'chord',
        extras: ['react', 'svg'],
    },
    {
        key: 'chord-canvas',
        path: '/chord/canvas',
        name: '<ChordCanvas />',
        className: 'chord',
        extras: ['react', 'canvas'],
    },
    {
        key: 'responsive-chord-canvas',
        path: '/chord/canvas',
        name: '<ResponsiveChordCanvas />',
        className: 'chord',
        extras: ['react', 'canvas'],
    },
    {
        key: 'chord-api',
        path: '/chord/api',
        name: '<Chord /> HTTP API',
        className: 'chord',
        extras: ['react', 'api'],
    },
    {
        key: 'heatmap',
        path: '/heatmap',
        name: '<HeatMap />',
        className: 'heatmap',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-heatmap',
        path: '/heatmap',
        name: '<ResponsiveHeatMap />',
        className: 'heatmap',
        extras: ['react', 'svg'],
    },
    {
        key: 'heatmap-canvas',
        path: '/heatmap/canvas',
        name: '<HeatMapCanvas />',
        className: 'heatmap',
        extras: ['react', 'canvas'],
    },
    {
        key: 'responsive-heatmap-canvas',
        path: '/heatmap/canvas',
        name: '<ResponsiveHeatMapCanvas />',
        className: 'heatmap',
        extras: ['react', 'canvas'],
    },
    {
        key: 'heatmap-api',
        path: '/heatmap/api',
        name: '<HeatMap /> HTTP API',
        className: 'heatmap',
        extras: ['react', 'api'],
    },
    {
        key: 'line',
        path: '/line',
        name: '<Line />',
        className: 'line',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-line',
        path: '/line',
        name: '<ResponsiveLine />',
        className: 'line',
        extras: ['react', 'svg'],
    },
    {
        key: 'line-api',
        path: '/line/api',
        name: '<Line /> HTTP API',
        className: 'line',
        extras: ['react', 'api'],
    },
    {
        key: 'stream',
        path: '/stream',
        name: '<Stream />',
        className: 'stream',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-stream',
        path: '/stream',
        name: '<ResponsiveStream />',
        className: 'stream',
        extras: ['react', 'svg'],
    },
    {
        key: 'pie',
        path: '/pie',
        name: '<Pie />',
        className: 'pie',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-pie',
        path: '/pie',
        name: '<ResponsivePie />',
        className: 'pie',
        extras: ['react', 'svg'],
    },
    {
        key: 'pie-api',
        path: '/pie/api',
        name: '<Pie /> HTTP API',
        className: 'pie',
        extras: ['react', 'api'],
    },
    {
        key: 'radar',
        path: '/radar',
        name: '<Radar />',
        className: 'radar',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-radar',
        path: '/radar',
        name: '<ResponsiveRadar />',
        className: 'radar',
        extras: ['react', 'svg'],
    },
    {
        key: 'radar-api',
        path: '/radar/api',
        name: '<Radar /> HTTP API',
        className: 'radar',
        extras: ['react', 'api'],
    },
    {
        key: 'sankey',
        path: '/sankey',
        name: '<Sankey />',
        className: 'sankey',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-sankey',
        path: '/sankey',
        name: '<ResponsiveSankey />',
        className: 'sankey',
        extras: ['react', 'svg'],
    },
    {
        key: 'sankey-api',
        path: '/sankey/api',
        name: '<Sankey /> HTTP API',
        className: 'sankey',
        extras: ['react', 'api'],
    },
    {
        key: 'sunburst',
        path: '/sunburst',
        name: '<Sunburst />',
        className: 'sunburst',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-sunburst',
        path: '/sunburst',
        name: '<ResponsiveSunburst />',
        className: 'sunburst',
        extras: ['react', 'svg'],
    },
    {
        key: 'sunburst-api',
        path: '/sunburst/api',
        name: '<Sunburst /> HTTP API',
        className: 'sunburst',
        extras: ['react', 'api'],
    },
    {
        key: 'treemap',
        path: '/treemap',
        name: '<TreeMap />',
        className: 'treemap',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-treemap',
        path: '/treemap',
        name: '<ResponsiveTreeMap />',
        className: 'treemap',
        extras: ['react', 'svg'],
    },
    {
        key: 'treemap-html',
        path: '/treemap/html',
        name: '<TreeMapHTML />',
        className: 'treemap',
        extras: ['react', 'html'],
    },
    {
        key: 'responsive-treemap-html',
        path: '/treemap/html',
        name: '<ResponsiveTreeMapHTML />',
        className: 'treemap',
        extras: ['react', 'html'],
    },
    {
        key: 'treemap-placeholders',
        path: '/treemap/placeholders',
        name: '<TreeMapPlaceholders />',
        className: 'treemap',
        extras: ['react', 'placeholders'],
    },
    {
        key: 'treemap-api',
        path: '/treemap/api',
        name: '<TreeMap /> HTTP API',
        className: 'treemap',
        extras: ['react', 'api'],
    },
    {
        key: 'voronoi',
        path: '/voronoi',
        name: '<Voronoi />',
        className: 'voronoi',
        extras: ['react', 'svg'],
    },
    {
        key: 'responsive-voronoi',
        path: '/voronoi',
        name: '<ResponsiveVoronoi />',
        className: 'voronoi',
        extras: ['react', 'svg'],
    },
]

class Components extends Component {
    state = {
        term: '',
        components: defaultComponents,
    }

    handleSearch = e => {
        const { history } = this.props
        history.replace({
            pathname: '/components',
            query: { term: e.target.value },
        })
    }

    render() {
        const { location: { query } } = this.props
        const term = query ? query.term : null

        let filtered
        if (!term) {
            filtered = defaultComponents
        } else {
            filtered = defaultComponents.filter(component => {
                return component.name.toLowerCase().includes(term.toLowerCase())
            })
        }

        return (
            <div className="inner-content">
                <div className="page_content">
                    <Helmet title="Components" />
                    <div className="chart_header">
                        <h1 className="page_header">Components/APIs</h1>
                    </div>
                    <div className="nivo_components_search">
                        <input
                            type="text"
                            onChange={this.handleSearch}
                            placeholder={'Search components by term, e.g. "chord"'}
                            value={term || ''}
                        />
                    </div>
                    <div className="nivo_components">
                        {filtered.map(component =>
                            <ComponentsItem
                                key={component.key}
                                path={component.path}
                                name={component.name}
                                className={component.className}
                                extras={component.extras || []}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Components)
