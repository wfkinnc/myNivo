/*
 * This file is part of the nivo project.
 *
 * (c) 2016-today Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Route } from 'react-router-dom'

import BarPage from './components/charts/bar/BarPage'
import Bar from './components/charts/bar/Bar'
import BarCanvas from './components/charts/bar/BarCanvas'
import BarAPI from './components/charts/bar/BarAPI'
import HeatMapPage from './components/charts/heatmap/HeatMapPage'
import HeatMap from './components/charts/heatmap/HeatMap'
import HeatMapCanvas from './components/charts/heatmap/HeatMapCanvas'
import HeatMapAPI from './components/charts/heatmap/HeatMapAPI'
import LinePage from './components/charts/line/LinePage'
import Line from './components/charts/line/Line'
import LineAPI from './components/charts/line/LineAPI'
import StreamPage from './components/charts/stream/StreamPage'
import Stream from './components/charts/stream/Stream'
import PiePage from './components/charts/pie/PiePage'
import Pie from './components/charts/pie/Pie'
import PieAPI from './components/charts/pie/PieAPI'
import RadarPage from './components/charts/radar/RadarPage'
import Radar from './components/charts/radar/Radar'
import RadarAPI from './components/charts/radar/RadarAPI'
import BubblePage from './components/charts/bubble/BubblePage'
import BubbleReact from './components/charts/bubble/BubbleReact'
import BubbleAPI from './components/charts/bubble/BubbleAPI'
import BubblePlaceholders from './components/charts/bubble/BubblePlaceholders'
import SankeyPage from './components/charts/sankey/SankeyPage'
import Sankey from './components/charts/sankey/Sankey'
import SankeyAPI from './components/charts/sankey/SankeyAPI'
import SunburstPage from './components/charts/sunburst/SunburstPage'
import Sunburst from './components/charts/sunburst/Sunburst'
import SunburstAPI from './components/charts/sunburst/SunburstAPI'
import TreeMapPage from './components/charts/treemap/TreeMapPage'
import TreeMapReact from './components/charts/treemap/TreeMapReact'
import TreeMapHTML from './components/charts/treemap/TreeMapHTML'
import TreeMapPlaceholders from './components/charts/treemap/TreeMapPlaceholders'
import TreeMapAPI from './components/charts/treemap/TreeMapAPI'
import CalendarPage from './components/charts/calendar/CalendarPage'
import Calendar from './components/charts/calendar/Calendar'
import CalendarAPI from './components/charts/calendar/CalendarAPI'
import ChordPage from './components/charts/chord/ChordPage'
import Chord from './components/charts/chord/Chord'
import ChordCanvas from './components/charts/chord/ChordCanvas'
import ChordAPI from './components/charts/chord/ChordAPI'
import VoronoiPage from './components/charts/voronoi/VoronoiPage'
import Voronoi from './components/charts/voronoi/Voronoi'
import Colors from './components/pages/Colors'
import About from './components/pages/About'
import Components from './components/Components'
import API from './components/API'

const SITEMAP = [
    {
        label: 'Charts',
        children: [
            {
                className: 'bar',
                path: '/bar',
                label: 'Bar',
                component: BarPage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<Bar />',
                        component: Bar,
                        exact: true,
                    },
                    {
                        className: 'canvas',
                        path: '/canvas',
                        label: '<BarCanvas />',
                        component: BarCanvas,
                    },
                    {
                        className: 'api',
                        path: '/api',
                        label: '<Bar /> HTTP API',
                        component: BarAPI,
                    },
                ],
            },
            {
                className: 'line',
                path: '/line',
                label: 'Line',
                component: LinePage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<Line />',
                        component: Line,
                        exact: true,
                    },
                    {
                        className: 'api',
                        path: '/api',
                        label: '<Line /> HTTP API',
                        component: LineAPI,
                    },
                ],
            },
            {
                className: 'stream',
                path: '/stream',
                label: 'Stream',
                component: StreamPage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<Stream />',
                        component: Stream,
                        exact: true,
                    },
                ],
            },
            {
                className: 'pie',
                path: '/pie',
                label: 'Pie',
                component: PiePage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<Pie />',
                        component: Pie,
                        exact: true,
                    },
                    {
                        className: 'api',
                        path: '/api',
                        label: '<Pie /> HTTP API',
                        component: PieAPI,
                    },
                ],
            },
            {
                className: 'sunburst',
                path: '/sunburst',
                label: 'Sunburst',
                component: SunburstPage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<Sunburst />',
                        component: Sunburst,
                        exact: true,
                    },
                    {
                        className: 'api',
                        path: '/api',
                        label: '<Sunburst /> HTTP API',
                        component: SunburstAPI,
                    },
                ],
            },
            {
                className: 'chord',
                path: '/chord',
                label: 'Chord',
                component: ChordPage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<Chord />',
                        component: Chord,
                        exact: true,
                    },
                    {
                        className: 'canvas',
                        path: '/canvas',
                        label: '<ChordCanvas />',
                        component: ChordCanvas,
                    },
                    {
                        className: 'api',
                        path: '/api',
                        label: '<Chord /> HTTP API',
                        component: ChordAPI,
                    },
                ],
            },
            {
                className: 'bubble',
                path: '/bubble',
                label: 'Bubble',
                component: BubblePage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<Bubble />',
                        component: BubbleReact,
                        exact: true,
                    },
                    {
                        className: 'placeholders',
                        path: '/placeholders',
                        label: '<BubblePlaceholders />',
                        component: BubblePlaceholders,
                    },
                    {
                        className: 'api',
                        path: '/api',
                        label: '<Bubble /> HTTP API',
                        component: BubbleAPI,
                    },
                ],
            },
            {
                className: 'radar',
                path: '/radar',
                label: 'Radar',
                component: RadarPage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<Radar />',
                        component: Radar,
                        exact: true,
                    },
                    {
                        className: 'api',
                        path: '/api',
                        label: '<Radar /> HTTP API',
                        component: RadarAPI,
                    },
                ],
            },
            {
                className: 'treemap',
                path: '/treemap',
                label: 'TreeMap',
                component: TreeMapPage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<TreeMap />',
                        component: TreeMapReact,
                        exact: true,
                    },
                    {
                        className: 'html',
                        path: '/html',
                        label: '<TreeMapHTML />',
                        component: TreeMapHTML,
                    },
                    {
                        className: 'placeholders',
                        path: '/placeholders',
                        label: '<TreeMapPlaceholders />',
                        component: TreeMapPlaceholders,
                    },
                    {
                        className: 'api',
                        path: '/api',
                        label: '<TreeMap /> HTTP API',
                        component: TreeMapAPI,
                    },
                ],
            },
            {
                className: 'heatmap',
                path: '/heatmap',
                label: 'HeatMap',
                component: HeatMapPage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<HeatMap />',
                        component: HeatMap,
                        exact: true,
                    },
                    {
                        className: 'canvas',
                        path: '/canvas',
                        label: '<HeatMapCanvas />',
                        component: HeatMapCanvas,
                    },
                    {
                        className: 'api',
                        path: '/api',
                        label: '<HeatMap /> HTTP API',
                        component: HeatMapAPI,
                    },
                ],
            },
            {
                className: 'calendar',
                path: '/calendar',
                label: 'Calendar',
                component: CalendarPage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<Calendar />',
                        component: Calendar,
                        exact: true,
                    },
                    {
                        className: 'api',
                        path: '/api',
                        label: '<Calendar /> HTTP API',
                        component: CalendarAPI,
                    },
                ],
            },
            {
                className: 'sankey',
                path: '/sankey',
                label: 'Sankey',
                component: SankeyPage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<Sankey />',
                        component: Sankey,
                        exact: true,
                    },
                    {
                        className: 'api',
                        path: '/api',
                        label: '<Sankey /> HTTP API',
                        component: SankeyAPI,
                    },
                ],
            },
            {
                className: 'voronoi',
                path: '/voronoi',
                label: 'Voronoi',
                component: VoronoiPage,
                children: [
                    {
                        className: 'react',
                        path: '/',
                        label: '<Voronoi />',
                        component: Voronoi,
                        isIndex: true,
                    },
                ],
            },
        ],
    },
    {
        label: 'Guides',
        children: [
            {
                className: 'colors',
                path: '/guides/colors',
                label: 'Colors',
                component: Colors,
            },
        ],
    },
    {
        label: 'misc',
        children: [
            {
                className: 'about',
                path: '/about',
                label: 'About',
                component: About,
            },
            {
                className: 'components',
                path: '/components',
                label: 'Components',
                component: Components,
            },
            {
                className: 'api-client',
                path: '/api',
                label: 'API',
                component: API,
            },
        ],
    },
]

export const getSectionItems = sectionLabel => {
    const section = SITEMAP.find(({ label }) => label === sectionLabel)

    return section.children
}

export const getRoutes = () => {
    const routes = []

    SITEMAP.forEach(item => {
        if (item.children && item.children.length > 0) {
            item.children.forEach(sectionItem => {
                const routeChildren = []

                if (sectionItem.children) {
                    sectionItem.children.forEach(childItem => {
                        routeChildren.push(
                            <Route
                                key={`${sectionItem.path}${childItem.path}`}
                                path={`${sectionItem.path}${childItem.path}`}
                                component={childItem.component}
                                exact={!!childItem.exact}
                            />
                        )
                    })
                }

                routes.push(
                    <Route
                        key={sectionItem.path}
                        path={sectionItem.path}
                        render={() => <sectionItem.component childRoutes={routeChildren} />}
                    />
                )
            })
        }
    })

    return routes
}
