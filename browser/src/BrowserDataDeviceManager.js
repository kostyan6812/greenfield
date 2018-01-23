'use strict'

import westfield from 'westfield-runtime-server'
import greenfield from './protocol/greenfield-browser-protocol'
import BrowserDataSource from './BrowserDataSource'
import BrowserDataDevice from './BrowserDataDevice'

export default class BrowserDataDeviceManager extends westfield.Global {
  static create () {
    return new BrowserDataDeviceManager()
  }

  constructor () {
    super(greenfield.GrDataDeviceManager.name, 3)
  }

  bindClient (client, id, version) {
    const grDataDeviceManagerResource = new greenfield.GrDataDeviceManager(client, id, version)
    grDataDeviceManagerResource.implementation = this
  }

  /**
   *
   *                Create a new data source.
   *
   *
   * @param {GrDataDeviceManager} resource
   * @param {number} id data source to create
   *
   * @since 1
   *
   */
  createDataSource (resource, id) {
    const grDataSourceResource = new greenfield.GrDataSource(resource.client, id, resource.version)
    BrowserDataSource.create(grDataSourceResource)
  }

  /**
   *
   *                Create a new data device for a given seat.
   *
   *
   * @param {GrDataDeviceManager} resource
   * @param {number} id data device to create
   * @param {GrSeat} seat seat associated with the data device
   *
   * @since 1
   *
   */
  getDataDevice (resource, id, seat) {
    const grDataDeviceResource = new greenfield.GrDataDevice(resource.client, id, resource.version)
    grDataDeviceResource.implementation = seat.implementation.browserDataDevice
    grDataDeviceResource.userData = {offer: null}
    seat.implementation.browserDataDevice.resources.push(grDataDeviceResource)
  }
}
