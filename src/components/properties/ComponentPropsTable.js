import React, { PureComponent } from 'react'
import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import isFunction from 'lodash/isFunction'

const defaultValue = value => {
    if (isPlainObject(value)) {
        return `${JSON.stringify(value)}`
    } else if (isArray(value)) {
        const elements = value.reduce((acc, v, i) => {
            acc.push(React.cloneElement(defaultValue(v), { key: i }))
            if (i + 1 < value.length) {
                acc.push(<span key={`${i}.comma`}>, </span>)
            }
            return acc
        }, [])

        return (
            <span>
                [{elements}]
            </span>
        )
    } else if (isString(value)) {
        return (
            <code className="code-string">
                '{value}'
            </code>
        )
    } else if (isNumber(value)) {
        return (
            <code className="code-number">
                {value}
            </code>
        )
    } else if (isBoolean(value)) {
        return (
            <code className="code-boolean">
                {value ? 'true' : 'false'}
            </code>
        )
    } else if (isFunction(value)) {
        return `{${value.toString()}}`
    }

    return value
}

export default class ComponentPropsTable extends PureComponent {
    render() {
        const { properties } = this.props

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>property</th>
                        <th>type</th>
                        <th>required</th>
                        <th>default</th>
                        <th>description</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(prop =>
                        <tr key={prop.key}>
                            <td>
                                {prop.key}
                            </td>
                            <td>
                                <code>
                                    {prop.type || 'n/a'}
                                </code>
                            </td>
                            <td>
                                {prop.required ? 'yes' : 'no'}
                            </td>
                            <td>
                                {prop.default !== undefined ? defaultValue(prop.default) : 'n/a'}
                            </td>
                            <td>
                                {prop.description}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}
