/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Calendar } from 'nivo'
import { marginProperties } from '../../../lib/componentProperties'

const defaults = Calendar.defaultProps

export default [
    {
        key: 'width',
        scopes: ['api'],
        description: (
            <span>
                not required if using&nbsp;<code>&lt;ResponsiveCalendar&nbsp;/&gt;</code>.
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
                not required if using&nbsp;<code>&lt;ResponsiveCalendar&nbsp;/&gt;</code>.
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
        key: 'direction',
        description: (
            <code className="code-string">"horizontal"</code>,
            (
                <span>
                    defines calendar layout direction, must be one of{' '}
                    <code className="code-string">"horizontal"</code> or{' '}
                    <code className="code-string">"vertical"</code>
                </span>
            )
        ),
        help: 'defines calendar layout direction.',
        type: '{string}',
        required: false,
        default: defaults.direction,
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    ...marginProperties,
    // Years
    {
        key: 'yearSpacing',
        description: 'define spacing between each year row/column depending on the direction.',
        type: '{number}',
        required: false,
        default: defaults.yearSpacing,
        controlType: 'range',
        controlGroup: 'Years',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 160,
            step: 5,
        },
    },
    {
        key: 'yearLegendOffset',
        description: 'define offset from year edge to its label.',
        type: '{number}',
        required: false,
        default: defaults.yearLegendOffset,
        controlType: 'range',
        controlGroup: 'Years',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    // Months
    {
        key: 'monthBorderWidth',
        description: 'width of month borders.',
        type: '{number}',
        required: false,
        default: defaults.monthBorderWidth,
        controlType: 'range',
        controlGroup: 'Months',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 6,
        },
    },
    {
        key: 'monthLegendOffset',
        description: 'define offset from month edge to its label.',
        type: '{number}',
        required: false,
        default: defaults.monthLegendOffset,
        controlType: 'range',
        controlGroup: 'Months',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    /*
    {
        key: 'monthBorderColor',
        description: 'color to use for month borders.',
        type: '{string}',
        required, false
        default: defaults.monthBorderColor,
        controlType: 'colorPicker',
        controlGroup: 'Months',
        //<ColorPicker
        //    animation="slide-up"
        //    color={settings.monthBorderColor}
        //    onChange={this.handleMonthBorderColorUpdate}
        ///>
    },
    */
    // Days
    {
        key: 'daySpacing',
        description: 'define spacing between each day cell.',
        type: '{number}',
        required: false,
        default: defaults.daySpacing,
        controlType: 'range',
        controlGroup: 'Days',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'dayBorderWidth',
        description: 'width of days border.',
        type: '{number}',
        required: false,
        default: defaults.dayBorderWidth,
        controlType: 'range',
        controlGroup: 'Days',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 6,
        },
    },
    /*
    {
        key: 'dayBorderColor',
        description: 'color to use for days border.',
        type: '{string}',
        required, false
        default: defaults.dayBorderColor,
        controlType: 'colorPicker',
        controlGroup: 'Days',
        //<ColorPicker
        //    animation="slide-up"
        //    color={settings.monthBorderColor}
        //    onChange={this.handleMonthBorderColorUpdate}
        ///>
    },
    */
    /*
    [
        'onDayClick',
        'function',
        true,
        <code>
            () => {}
        </code>,
        'click handler for calendar days.',
    ],
     */
    {
        key: 'animate',
        scopes: ['Calendar'],
        description: 'Enable/disable transitions.',
        type: '{boolean}',
        required: false,
        default: defaults.animate,
        controlType: 'switch',
        controlGroup: 'Animation',
    },
]
