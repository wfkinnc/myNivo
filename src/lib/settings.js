import omit from 'lodash/omit'

export const settingsMapper = (mapping, { exclude = [] } = {}) => settings => {
    const overrides = {}

    Object.keys(settings).forEach(key => {
        if (mapping[key]) {
            overrides[key] = mapping[key](settings[key], settings)
        }
    })

    return Object.assign({}, omit(settings, exclude), overrides)
}
