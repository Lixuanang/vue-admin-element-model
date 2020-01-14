import { setPublicPath } from 'systemjs-webpack-interop'

const projectConfig = require('../project.json')
if (process.env.NODE_ENV !== 'development') {
  setPublicPath(projectConfig.server + projectConfig.resourceEntryUrl)
} else {
  if (location.pathname.startsWith(projectConfig.path)) {
    setPublicPath(projectConfig.server + projectConfig.resourceEntryUrl)
  }
}
