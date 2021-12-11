export class NoVideosFoundException extends Error {
  constructor(value?: string) {
    super(value || 'No se encontraron videos')
  }
}