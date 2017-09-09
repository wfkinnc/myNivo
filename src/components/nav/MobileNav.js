/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'

export default class MobileNav extends Component {
    render() {
        return (
            <div>
                <div className="mobile-tabs__menu">
                    <div className="mobile-tabs__menu__item">
                        <span className="mobile-tabs__menu__item__icon">
                            <span className="mobile-tabs__menu__item__count">12</span>
                        </span>
                        <span className="mobile-tabs__menu__item__label">charts</span>
                    </div>
                    <div className="mobile-tabs__menu__item">
                        <span className="mobile-tabs__menu__item__icon" />
                        <span className="mobile-tabs__menu__item__label">Guides</span>
                    </div>
                    <div className="mobile-tabs__menu__item">
                        <span className="mobile-tabs__menu__item__icon" />
                        <span className="mobile-tabs__menu__item__label">API</span>
                    </div>
                    <div className="mobile-tabs__menu__item">
                        <span className="mobile-tabs__menu__item__icon" />
                        <span className="mobile-tabs__menu__item__label">GitHub</span>
                    </div>
                </div>
            </div>
        )
    }
}
