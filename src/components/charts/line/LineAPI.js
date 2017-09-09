/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import APIClient from '../../api-client/APIClient'
import { settingsMapper } from '../../../lib/settings'
import LineControls from './LineControls'

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

const LineAPI = ({ data }) =>
    <APIClient
        componentName="Line"
        apiPath="/charts/line"
        dataProperty="data"
        controls={LineControls}
        propsMapper={propsMapper}
        defaultProps={{
            width: 600,
            height: 400,
            data: JSON.stringify(data, null, '  '),
            margin: {
                top: 40,
                right: 50,
                bottom: 40,
                left: 50,
            },

            minY: 'auto',
            maxY: 'auto',

            stacked: true,
            curve: 'linear',

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
                legend: 'country code',
                legendOffset: 36,
                legendPosition: 'center',
            },
            'enable axisLeft': true,
            axisLeft: {
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'center',
            },

            // grid
            enableGridX: true,
            enableGridY: true,

            // theming
            colors: 'nivo',
            colorBy: 'id',

            // dots
            enableDots: true,
            dotSize: 14,
            dotColor: 'inherit:darker(.5)',
            dotBorderWidth: 3,
            dotBorderColor: '#fff',
            enableDotLabel: false,
            dotLabel: 'y',
            dotLabelYOffset: -12,
        }}
    />

export default LineAPI
