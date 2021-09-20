export class MobileTokenMovementControls extends Application {
  constructor(options = {}) {
    super(options)
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: `./modules/mobile-token-movement/templates/mobile-token-movement-controls.html`,
      popOut: false,
    })
  }

  getToken() {
    let token = game.user.character.getActiveTokens()[0]
    token.control({ releaseOthers: true })
    token.border.visible = false
    return token
  }

  move(x, y) {
    let t = this.getToken()
    let newX = t.x + t.w * x
    let newY = t.y + t.h * y
    const newPoint = canvas.grid.getSnappedPosition(newX, newY)
    if (!t.checkCollision(newPoint)) {
      t.document.update(newPoint)
      canvas.animatePan({
        duration: 250,
        x: newPoint.x + t.w / 2,
        y: newPoint.y + t.h / 2,
        scale: canvas.scene._viewPosition.scale,
      })
    }
  }

  selectToken() {
    let t = this.getToken()
    canvas.animatePan({
      duration: 150,
      x: t.x + t.w / 2,
      y: t.y + t.h / 2,
      scale: canvas.scene._viewPosition.scale,
    })
  }

  zoomIn() {
    const view = canvas.scene._viewPosition
    canvas.animatePan({
      duration: 200,
      x: view.x,
      y: view.y,
      scale: view.scale * 1.25,
    })
  }

  zoomOut() {
    const view = canvas.scene._viewPosition
    canvas.animatePan({
      duration: 200,
      x: view.x,
      y: view.y,
      scale: view.scale * 0.80,
    })
  }

  moveTopLeft() {
    this.move(-1, -1)
  }

  moveLeft() {
    this.move(-1, 0)
  }

  moveBottomLeft() {
    this.move(-1, 1)
  }

  moveTop() {
    this.move(0, -1)
  }

  moveBottom() {
    this.move(0, 1)
  }

  moveTopRight() {
    this.move(1, -1)
  }

  moveRight() {
    this.move(1, 0)
  }

  moveBottomRight() {
    this.move(1, 1)
  }

  activateListeners(html) {
    super.activateListeners(html)
    $('.mtmc-select', html).click($.proxy(this.selectToken, this))
    $('.mtmc-zoomin', html).click($.proxy(this.zoomIn, this))
    $('.mtmc-zoomout', html).click($.proxy(this.zoomOut, this))
    $('.mtmc-topleft', html).click($.proxy(this.moveTopLeft, this))
    $('.mtmc-left', html).click($.proxy(this.moveLeft, this))
    $('.mtmc-bottomleft', html).click($.proxy(this.moveBottomLeft, this))
    $('.mtmc-top', html).click($.proxy(this.moveTop, this))
    $('.mtmc-bottom', html).click($.proxy(this.moveBottom, this))
    $('.mtmc-topright', html).click($.proxy(this.moveTopRight, this))
    $('.mtmc-right', html).click($.proxy(this.moveRight, this))
    $('.mtmc-bottomright', html).click($.proxy(this.moveBottomRight, this))
  }
}