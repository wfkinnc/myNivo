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
import PieControls from './PieControls'

export default class PieAPI extends Component {
    render() {
        return (
            <APIClient
                componentName="Pie"
                apiPath="/charts/pie"
                dataProperty="data"
                controls={PieControls}
                defaultProps={{
                    width: 800,
                    height: 800,
                    margin: {
                        top: 100,
                        right: 100,
                        bottom: 100,
                        left: 100,
                    },
                    data: JSON.stringify(this.props.data, null, '  '),

                    innerRadius: 0.5,
                    padAngle: 1,
                    cornerRadius: 5,

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

                    // theming
                    colors: 'nivo',
                    colorBy: 'id',
                }}
            />
        )
    }
}
