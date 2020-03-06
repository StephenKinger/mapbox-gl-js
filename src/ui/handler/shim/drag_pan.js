// @flow

import {bezier} from '../../../util/util';
import type MousePanHandler from './../mouse_pan';
import type TouchPanHandler from './../touch_pan';

import type InertiaOptions from '../../handler_inertia';

export type DragPanOptions = InertiaOptions;

/**
 * The `DragPanHandler` allows the user to pan the map by clicking and dragging
 * the cursor.
 */
export default class DragPanHandler {

    _mousePan: MousePanHandler;
    _touchPan: TouchPanHandler;

    /**
     * @private
    */
    constructor(mousePan: MousePanHandler, touchPan: TouchPanHandler) {
        this._mousePan = mousePan;
        this._touchPan = touchPan;
    }


    /**
     * Enables the "drag to pan" interaction.
     *
     * @param {Object} [options]
     * @param {number} [options.linearity=0] factor used to scale the drag velocity
     * @param {Function} [options.easing=bezier(0, 0, 0.3, 1)] easing function applled to `map.panTo` when applying the drag.
     * @param {number} [options.maxSpeed=1400] the maximum value of the drag velocity.
     * @param {number} [options.deceleration=2500] the rate at which the speed reduces after the pan ends.
     *
     * @example
     *   map.dragPan.enable();
     * @example
     *   map.dragpan.enable({
     *      linearity: 0.3,
     *      easing: bezier(0, 0, 0.3, 1),
     *      maxSpeed: 1400,
     *      deceleration: 2500,
     *   });
     */
    enable(options: DragPanOptions) {
        this._mousePan.enable(options);
        this._touchPan.enable(options);
    }

    /**
     * Disables the "drag to pan" interaction.
     *
     * @example
     * map.dragPan.disable();
     */
    disable() {
        this._mousePan.disable();
        this._touchPan.disable();
    }

    /**
     * Returns a Boolean indicating whether the "drag to pan" interaction is enabled.
     *
     * @returns {boolean} `true` if the "drag to pan" interaction is enabled.
     */
    isEnabled() {
        return this._mousePan.isEnabled() && this._touchPan.isEnabled();
    }

    /**
     * Returns a Boolean indicating whether the "drag to pan" interaction is active, i.e. currently being used.
     *
     * @returns {boolean} `true` if the "drag to pan" interaction is active.
     */
    isActive() {
        return this._mousePan.isActive() || this._touchPan.isActive();
    }
}
