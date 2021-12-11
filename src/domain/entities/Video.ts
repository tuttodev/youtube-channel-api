export interface Video {
  title: VideoTitle
  views: VideoViews
  createdAt: VideoCreatedAt
  imageUrl: VideoImageUrl
}

export class VideoImageUrl {
  private _value: string
  constructor(value: string) {
    this._value = value
  }

  set value(value: string) {
    this._value = value
  }
}

export class VideoTitle {
  private _value: string
  constructor(value: string) {
    this._value = value
  }

  set value(value: string) {
    this._value = value
  }
}

export class VideoViews {
  private _value: number
  constructor(value: number) {
    this._value = value
  }

  set value(value: number) {
    this._value = value
  }
}

export class VideoCreatedAt {
  private _value: Date
  constructor(value: Date) {
    this._value = value
  }

  set value(value: Date) {
    this._value = value
  }
}
