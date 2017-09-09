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
import ChordControls from './ChordControls'

const matrix = [
    [11975, 5871, 8916, 2868, 1967],
    [1951, 10048, 2060, 6171, 1967],
    [8010, 16145, 8090, 8045, 1967],
    [1013, 990, 940, 6907, 2306],
    [1013, 990, 940, 6907, 800],
]

class ChordAPI extends Component {
    render() {
        return (
            <APIClient
                componentName="Chord"
                apiPath="/charts/chord"
                dataProperty="data"
                controls={ChordControls}
                defaultProps={{
                    width: 800,
                    height: 800,
                    data: JSON.stringify(matrix, null, '  '),
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    },
                    padAngle: 0.02,
                    innerRadiusRatio: 0.96,
                    innerRadiusOffset: 0.01,
                    ribbonOpacity: 0.5,
                    ribbonBorderWidth: 1,
                    arcOpacity: 1,
                    arcBorderWidth: 1,
                    colors: 'nivo',
                    colorBy: 'depth',

                    // labels
                    enableLabels: true,
                    label: 'id',
                    labelOffset: 12,
                    labelRotation: -90,
                    labelTextColor: 'inherit:darker(1)',
                }}
            />
        )
    }
}

export default ChordAPI
