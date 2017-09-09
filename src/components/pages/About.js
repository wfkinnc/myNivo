/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

class About extends Component {
    render() {
        return (
            <div className="inner-content">
                <div className="page_content">
                    <Helmet title="About" />
                    <div className="chart_header">
                        <h1 className="page_header">About</h1>
                    </div>
                    <p>
                        <a
                            href="https://github.com/plouc/nivo"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            nivo
                        </a>{' '}
                        provides supercharged React components to easily build dataviz apps, it's
                        built on top of d3.
                    </p>
                    <p>
                        Several libraries already exist for React d3 integration, but just a few
                        provide server side rendering ability and fully declarative charts.
                    </p>
                    <div className="grid">
                        <div className="grid_item grid_item-2_4">
                            <h2>Features</h2>
                            <ul>
                                <li>
                                    supports{' '}
                                    <a
                                        href="https://github.com/d3/d3/blob/master/CHANGES.md"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        d3 v4
                                    </a>
                                </li>
                                <li>composable</li>
                                <li>
                                    <Link
                                        to={{
                                            pathname: '/components',
                                            query: { term: 'responsive' },
                                        }}
                                    >
                                        responsive charts
                                    </Link>{' '}
                                    (<code>&lt;Responsive* /&gt;</code> components)
                                </li>
                                <li>highly customizable</li>
                                <li>
                                    motion/transitions, even the non-d3 based components (DOM
                                    managed by React) support transitions within the help of{' '}
                                    <a
                                        href="https://github.com/chenglou/react-motion"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        react-motion
                                    </a>
                                </li>
                                <li>component playground</li>
                                <li>exhaustive documentation</li>
                                <li>isomorphic rendering</li>
                                <li>
                                    support for SVG and{' '}
                                    <Link
                                        to={{
                                            pathname: '/components',
                                            query: { term: 'html' },
                                        }}
                                    >
                                        HTML
                                    </Link>{' '}
                                    (I'm also considering canvas support)
                                </li>
                                <li>
                                    <Link
                                        to={{
                                            pathname: '/components',
                                            query: { term: 'placeholder' },
                                        }}
                                    >
                                        placeholder components
                                    </Link>{' '}
                                    for advanced customization
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/plouc/nivo-api"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        server side rendering API
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="grid_item grid_item-2_4">
                            <h2>Repositories</h2>
                            <ul>
                                <li>
                                    <a
                                        href="https://github.com/plouc/nivo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        nivo
                                    </a>{' '}
                                    - the nivo library
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/plouc/nivo-api"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        nivo-api
                                    </a>{' '}
                                    - the nivo http api
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/plouc/nivo-api-docker"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        nivo-api-docker
                                    </a>{' '}
                                    - a Docker image for the nivo http api
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/plouc/nivo-generators"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        nivo-generators
                                    </a>{' '}
                                    - the data generators used for nivo-website and http API samples
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/plouc/nivo-website"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        nivo-website
                                    </a>{' '}
                                    - the source for the nivo website
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About
