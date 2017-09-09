/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import APIClient from '../../api-client/APIClient'
import { settingsMapper } from '../../../lib/settings'
import BarControls from './BarControls'
import { generateLightDataSet } from './generators'

const propsMapper = settingsMapper(
    {
        axisTop: (value, settings) => (settings['enable axisTop'] ? value : null),
        axisRight: (value, settings) => (settings['enable axisRight'] ? value : null),
        axisBottom: (value, settings) => (settings['enable axisBottom'] ? value : null),
        axisLeft: (value, settings) => (settings['enable axisLeft'] ? value : null),
    },
    {
        exclude: ['enable axisTop', 'enable axisRight', 'enable axisBottom', 'enable axisLeft'],
    }
)

export default class BarAPI extends Component {
    state = {
        ...generateLightDataSet(),
    }

    render() {
        const { data, keys } = this.state

        return (
            <APIClient
                componentName="Bar"
                apiPath="/charts/bar"
                dataProperty="data"
                controls={BarControls}
                propsMapper={propsMapper}
                defaultProps={{
                    width: 1200,
                    height: 500,
                    margin: {
                        top: 40,
                        right: 50,
                        bottom: 40,
                        left: 50,
                    },
                    data: JSON.stringify(data, null, '  '),
                    keys: keys,
                    indexBy: 'country',
                    colors: 'nivo',
                    colorBy: 'id',
                    xPadding: 0.2,
                    groupMode: 'stacked',
                    layout: 'vertical',

                    // axes
                    // axes
                    'enable axisTop': false,
                    axisTop: {
                        orient: 'top',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: 36,
                    },
                    'enable axisRight': false,
                    axisRight: {
                        orient: 'right',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: 0,
                    },
                    'enable axisBottom': true,
                    axisBottom: {
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'center',
                        legendOffset: 36,
                    },
                    'enable axisLeft': true,
                    axisLeft: {
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'food',
                        legendPosition: 'center',
                        legendOffset: -40,
                    },

                    // grid
                    enableGridX: false,
                    enableGridY: true,

                    // labels
                    enableLabels: true,
                    labelsTextColor: 'inherit:darker(1.6)',
                    labelsLinkColor: 'inherit',
                }}
            />
        )
    }
}
