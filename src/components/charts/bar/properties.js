/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { BarDefaultProps as defaults } from 'nivo'
import { marginProperties, axesProperties } from '../../../lib/componentProperties'

export default [
    {
        key: 'data',
        scopes: '*',
        description: 'Chart data.',
        type: '{Array.<Object>}',
        required: true,
    },
    {
        key: 'indexBy',
        scopes: '*',
        description:
            'Key to use to index the data, this key must exist in each data item. You can also provide a function which will receive the data item and must return the desired index',
        type: '{string|Function}',
        required: false,
        default: defaults.indexBy,
    },
    {
        key: 'keys',
        scopes: '*',
        description: 'Keys to use to determine each serie.',
        type: '{Array.<string>}',
        required: false,
        default: defaults.keys,
    },
    {
        key: 'width',
        scopes: ['api'],
        description: (
            <span>
                not required if using&nbsp;<code>&lt;ResponsiveBar&nbsp;/&gt;</code>.
            </span>
        ),
        help: 'Chart width.',
        type: '{number}',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        scopes: ['api'],
        description: (
            <span>
                not required if using&nbsp;<code>&lt;ResponsiveBar&nbsp;/&gt;</code>.
            </span>
        ),
        help: 'Chart height.',
        type: '{number}',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'pixelRatio',
        scopes: ['BarCanvas'],
        description: `Adjust pixel ratio, useful for HiDPI screens.`,
        required: false,
        default: 'Depends on device',
        type: `{number}`,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 1,
            max: 2,
        },
    },
    {
        key: 'groupMode',
        scopes: '*',
        description: `How to group bars, must be one of: 'grouped', 'stacked'.`,
        type: '{string}',
        required: false,
        default: defaults.groupMode,
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: 'stacked', value: 'stacked' },
                { label: 'grouped', value: 'grouped' },
            ],
        },
    },
    {
        key: 'layout',
        scopes: '*',
        description: `How to display bars, must be one of: 'horizontal', 'vertical'.`,
        type: '{string}',
        required: false,
        default: defaults.layout,
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'colors',
        scopes: '*',
        description: 'Defines color range.',
        type: '{string|Function|Array}',
        required: false,
        default: 'nivo',
        controlType: 'colors',
        controlGroup: 'Base',
    },
    {
        key: 'colorBy',
        scopes: '*',
        description:
            'Property to use to determine node color. If a function is provided, it will receive current node data and must return a color.',
        required: false,
        default: 'id',
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                {
                    label: 'id',
                    value: 'id',
                },
                {
                    label: 'index',
                    value: 'index',
                },
                {
                    label: `({ id, data }) => data[\`\${id}Color\`]`,
                    value: `({ id, data }) => data[\`\${id}Color\`]`,
                },
            ],
        },
    },
    {
        key: 'xPadding',
        scopes: '*',
        description: 'Padding between each bar.',
        type: '{number}',
        required: false,
        default: defaults.xPadding,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 0,
            max: 0.9,
            step: 0.05,
        },
    },
    ...marginProperties,
    {
        key: 'enableLabels',
        scopes: '*',
        description: 'Enable/disable labels.',
        type: '{boolean}',
        required: false,
        default: defaults.enableLabels,
        controlType: 'switch',
        controlGroup: 'Labels',
    },
    {
        key: 'labelsTextColor',
        scopes: '*',
        description: 'Defines how to compute label text color.',
        type: '{string|Function}',
        required: false,
        default: defaults.labelsTextColor,
        controlType: 'color',
        controlGroup: 'Labels',
    },
    {
        key: 'labelsLinkColor',
        scopes: '*',
        description: 'Defines how to compute label link color.',
        type: '{string|Function}',
        required: false,
        default: defaults.labelsLinkColor,
        controlType: 'color',
        controlGroup: 'Labels',
    },
    ...axesProperties,
    {
        key: 'enableGridX',
        scopes: '*',
        description: 'Enable/disable x grid.',
        type: '{boolean}',
        required: false,
        default: defaults.enableGridX,
        controlType: 'switch',
        controlGroup: 'Grid',
    },
    {
        key: 'enableGridY',
        scopes: '*',
        description: 'Enable/disable y grid.',
        type: '{boolean}',
        required: false,
        default: defaults.enableGridY,
        controlType: 'switch',
        controlGroup: 'Grid',
    },
    {
        key: 'isInteractive',
        scopes: ['Bar', 'BarCanvas'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'animate',
        scopes: ['Bar'],
        description: 'Enable/disable transitions.',
        type: '{boolean}',
        required: false,
        default: true,
        controlType: 'switch',
        controlGroup: 'Animation',
    },
]
