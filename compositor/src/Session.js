// Copyright 2019 Erik De Rijcke
//
// This file is part of Greenfield.
//
// Greenfield is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Greenfield is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Greenfield.  If not, see <https://www.gnu.org/licenses/>.

'use strict'

import { Display } from 'westfield-runtime-server'
import WebFS from './WebFS'

/**
 * Listens for client announcements from the server.
 */
export default class Session {
  /**
   * @returns {Session}
   */
  static create () {
    const display = new Display()
    const compositorSessionId = this._uuidv4()
    DEBUG && console.log(`[compositor-session: ${compositorSessionId}] - Starting new compositor session.`)
    return new Session(display, compositorSessionId)
  }

  /**
   * @returns {string}
   * @private
   */
  static _uuidv4 () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  /**
   * Use Session.create(..) instead
   * @param {Display}display
   * @param {string}compositorSessionId
   * @private
   */
  constructor (display, compositorSessionId) {
    /**
     * @type {Display}
     */
    this.display = display
    /**
     * @type {string}
     */
    this.compositorSessionId = compositorSessionId
    /**
     * @type {WebFS}
     */
    this.webFS = WebFS.create(this.compositorSessionId)
  }

  terminate () {
    this.display.clients.forEach(client => client.close())
  }

  flush () {
    this.display.flushClients()
  }
}
