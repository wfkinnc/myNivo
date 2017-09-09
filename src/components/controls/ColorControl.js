/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const getModifierGamma = directive => {
    let gamma = 1

    const inheritMatches = directive.match(/inherit:(darker|brighter)\(([0-9.]+)\)/)
    if (inheritMatches) {
        gamma = parseFloat(inheritMatches[2])
    }

    return gamma
}

class ColorControl extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value
    }

    handleColorChange = _value => {
        let value
        let directive = _value.value

        if (
            directive.indexOf('inherit:darker') === 0 ||
            directive.indexOf('inherit:brighter') === 0
        ) {
            const gamma = this.refs.gamma ? this.refs.gamma.value : 1
            value = `${directive}(${gamma})`
        } else {
            value = directive
        }

        console.log(value)

        const { onChange } = this.props
        onChange(value)
    }

    handleGammaChange = e => {
        const { value: directive } = this.props
        const gamma = Number(e.target.value)

        let value
        if (directive.indexOf('inherit:darker') === 0) {
            value = `inherit:darker(${gamma})`
        } else if (directive.indexOf('inherit:brighter') === 0) {
            value = `inherit:brighter(${gamma})`
        } else {
            value = directive
        }

        const { onChange } = this.props
        onChange(value)
    }

    render() {
        const { value, label, help } = this.props

        let requireAmount = false
        let selectValue = value
        let gamma = 1

        if (value.indexOf('inherit:darker') === 0) {
            selectValue = 'inherit:darker'
            requireAmount = true
            gamma = getModifierGamma(value)
        } else if (value.indexOf('inherit:brighter') === 0) {
            selectValue = 'inherit:brighter'
            requireAmount = true
            gamma = getModifierGamma(value)
        }

        return (
            <div className="control control-color">
                <label className="control_label">
                    {label}: <code className="code code-string">'{value}'</code>
                </label>
                <div>
                    <Select
                        options={[
                            { value: 'theme', label: 'theme' },
                            { value: 'inherit', label: 'inherit' },
                            {
                                value: 'inherit:darker',
                                label: 'inherit:darker',
                            },
                            {
                                value: 'inherit:brighter',
                                label: 'inherit:brighter',
                            },
                        ]}
                        onChange={this.handleColorChange}
                        value={selectValue}
                        clearable={false}
                    />
                </div>
                {requireAmount &&
                    <div>
                        <div className="control-help">Adjust gamma.</div>
                        <input
                            ref="gamma"
                            type="range"
                            min="0"
                            max="4"
                            step="0.1"
                            value={gamma}
                            onChange={this.handleGammaChange}
                        />
                    </div>}
                <div className="control-help">
                    {help}
                </div>
            </div>
        )
    }
}

ColorControl.propTypes = {
    label: PropTypes.string.isRequired,
    help: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
}

ColorControl.defaultProps = {
    label: 'color',
    help: 'Color directive.',
}

export default ColorControl
